import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { generateOTP, sendOTPEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      )
    }

    // Проверяем существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      )
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10)

    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    // Генерируем и отправляем OTP
    const otpCode = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 минут

    await prisma.otpCode.create({
      data: {
        userId: user.id,
        code: otpCode,
        email,
        expiresAt,
      },
    })

    // Отправляем email
    await sendOTPEmail(email, otpCode, name)

    return NextResponse.json({
      message: 'Регистрация успешна! Проверьте email для подтверждения.',
      userId: user.id,
    })
  } catch (error) {
    console.error('Ошибка регистрации:', error)
    return NextResponse.json(
      { error: 'Ошибка при регистрации' },
      { status: 500 }
    )
  }
}

