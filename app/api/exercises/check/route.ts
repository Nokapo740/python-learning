import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface TestCase {
  input: string
  expected: string
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      )
    }

    const { exerciseId, code, tests } = await request.json()

    if (!exerciseId || !code || !tests) {
      return NextResponse.json(
        { error: 'Отсутствуют обязательные параметры' },
        { status: 400 }
      )
    }

    // Выполняем тесты
    const testResults = []
    let allPassed = true

    for (const test of tests as TestCase[]) {
      try {
        // Попытка выполнить код с помощью eval (ТОЛЬКО ДЛЯ ДЕМО!)
        // В продакшене используйте изолированную среду Python!
        
        let actualResult: any
        
        try {
          // Извлекаем имя функции из кода
          const functionMatch = code.match(/def\s+(\w+)\s*\([^)]*\):/);
          
          if (functionMatch) {
            const functionName = functionMatch[1]
            
            // Конвертируем Python код в JavaScript (очень упрощённо!)
            // Это работает только для простых функций
            let jsCode = code
              .replace(/def\s+(\w+)\s*\([^)]*\):/g, 'function $1(')
              .replace(/return\s+/g, 'return ')
              .replace(/#.*/g, '') // Удаляем комментарии
              .replace(/\bTrue\b/g, 'true')
              .replace(/\bFalse\b/g, 'false')
              .replace(/\bNone\b/g, 'null')
            
            // Пытаемся выполнить как JavaScript
            try {
              eval(jsCode)
              const result = eval(test.input)
              actualResult = String(result)
            } catch (e) {
              // Если не получилось - пробуем простой подход
              actualResult = 'Ошибка выполнения'
            }
          } else {
            actualResult = 'Функция не найдена'
          }
        } catch (e: any) {
          actualResult = 'ERROR: ' + e.message
        }

        const passed = actualResult === test.expected
        testResults.push({
          input: test.input,
          expected: test.expected,
          actual: actualResult,
          passed,
        })

        if (!passed) {
          allPassed = false
        }
      } catch (error: any) {
        testResults.push({
          input: test.input,
          expected: test.expected,
          actual: 'ERROR: ' + error.message,
          passed: false,
        })
        allPassed = false
      }
    }

    // Сохраняем результат в базу данных
    const existing = await prisma.completedExercise.findUnique({
      where: {
        userId_exerciseId: {
          userId: session.user.id,
          exerciseId,
        },
      },
    })

    if (existing) {
      await prisma.completedExercise.update({
        where: { id: existing.id },
        data: {
          code,
          passed: allPassed,
          attempts: existing.attempts + 1,
          completedAt: allPassed ? new Date() : existing.completedAt,
          updatedAt: new Date(),
        },
      })
    } else {
      await prisma.completedExercise.create({
        data: {
          userId: session.user.id,
          exerciseId,
          code,
          passed: allPassed,
          attempts: 1,
          completedAt: allPassed ? new Date() : null,
        },
      })
    }

    return NextResponse.json({
      success: allPassed,
      testResults,
      message: allPassed 
        ? '🎉 Отлично! Все тесты пройдены!' 
        : 'Некоторые тесты не прошли. Попробуйте еще раз!',
    })
  } catch (error) {
    console.error('Ошибка проверки решения:', error)
    return NextResponse.json(
      { error: 'Ошибка при проверке решения' },
      { status: 500 }
    )
  }
}

