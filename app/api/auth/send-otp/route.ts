import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateOTP, sendOTPEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email обязателен' },
        { status: 400 }
      )
    }

    // Проверяем существует ли пользователь
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 404 }
      )
    }

    // Генерируем OTP
    const otpCode = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 минут

    // Удаляем старые неиспользованные коды
    await prisma.otpCode.deleteMany({
      where: {
        userId: user.id,
        verified: false,
      },
    })

    // Создаем новый OTP
    await prisma.otpCode.create({
      data: {
        userId: user.id,
        code: otpCode,
        email,
        expiresAt,
      },
    })

    // Отправляем email
    await sendOTPEmail(email, otpCode, user.name || undefined)

    return NextResponse.json({
      message: 'OTP код отправлен на email',
    })
  } catch (error) {
    console.error('Ошибка отправки OTP:', error)
    return NextResponse.json(
      { error: 'Ошибка при отправке OTP' },
      { status: 500 }
    )
  }
}

