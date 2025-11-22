import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email и OTP обязательны' },
        { status: 400 }
      )
    }

    // Ищем OTP код
    const otpCode = await prisma.otpCode.findFirst({
      where: {
        email,
        code: otp,
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
      return NextResponse.json(
        { error: 'Неверный или истекший OTP код' },
        { status: 400 }
      )
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

    return NextResponse.json({
      message: 'Email успешно подтвержден!',
      verified: true,
    })
  } catch (error) {
    console.error('Ошибка верификации OTP:', error)
    return NextResponse.json(
      { error: 'Ошибка при верификации OTP' },
      { status: 500 }
    )
  }
}

