import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    
    // Email/Password с OTP
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          throw new Error('Email обязателен')
        }

        // Проверяем OTP если он предоставлен
        if (credentials.otp) {
          const otpCode = await prisma.otpCode.findFirst({
            where: {
              email: credentials.email,
              code: credentials.otp,
              verified: false,
              expiresAt: {
                gt: new Date(),
              },
            },
            include: {
              user: true,
            },
          })

          if (!otpCode) {
            throw new Error('Неверный или истекший OTP код')
          }

          // Отмечаем OTP как использованный
          await prisma.otpCode.update({
            where: { id: otpCode.id },
            data: { verified: true },
          })

          // Верифицируем email пользователя
          await prisma.user.update({
            where: { id: otpCode.userId },
            data: { emailVerified: new Date() },
          })

          return otpCode.user
        }

        // Обычный вход с паролем
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('Неверный email или пароль')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Неверный email или пароль')
        }

        if (!user.emailVerified) {
          throw new Error('Email не подтвержден. Проверьте почту.')
        }

        return user
      },
    }),
  ],
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  
  session: {
    strategy: 'jwt',
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
}

