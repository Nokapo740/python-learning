import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - получить прогресс пользователя
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      )
    }

    const progress = await prisma.lessonProgress.findMany({
      where: {
        userId: session.user.id,
      },
    })

    const exercises = await prisma.completedExercise.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({
      lessons: progress,
      exercises,
    })
  } catch (error) {
    console.error('Ошибка получения прогресса:', error)
    return NextResponse.json(
      { error: 'Ошибка при получении прогресса' },
      { status: 500 }
    )
  }
}

// POST - обновить прогресс
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      )
    }

    const { lessonId, topicId, completed } = await request.json()

    if (lessonId === undefined || !topicId) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные параметры' },
        { status: 400 }
      )
    }

    // Проверяем существующий прогресс
    const existing = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId_topicId: {
          userId: session.user.id,
          lessonId,
          topicId,
        },
      },
    })

    if (existing) {
      // Обновляем
      await prisma.lessonProgress.update({
        where: { id: existing.id },
        data: {
          completed,
          completedAt: completed ? new Date() : null,
        },
      })
    } else {
      // Создаем новый
      await prisma.lessonProgress.create({
        data: {
          userId: session.user.id,
          lessonId,
          topicId,
          completed,
          completedAt: completed ? new Date() : null,
        },
      })
    }

    return NextResponse.json({
      message: 'Прогресс обновлен',
    })
  } catch (error) {
    console.error('Ошибка обновления прогресса:', error)
    return NextResponse.json(
      { error: 'Ошибка при обновлении прогресса' },
      { status: 500 }
    )
  }
}

