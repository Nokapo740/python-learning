import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Авторизация НЕ требуется для выполнения кода в уроках
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Код обязателен' },
        { status: 400 }
      )
    }

    // ВНИМАНИЕ: Это упрощенная симуляция выполнения кода
    // В реальном приложении используйте изолированную среду выполнения
    // Например: Docker контейнер, AWS Lambda, или Pyodide в клиенте
    
    try {
      // Улучшенная симуляция выполнения Python кода
      let output = ''
      
      // Извлекаем все print() вызовы
      const printMatches: RegExpMatchArray[] = Array.from(code.matchAll(/print\(([^)]+)\)/g))
      
      if (printMatches.length > 0) {
        for (const match of printMatches) {
          let content = match[1].trim()
          
          try {
            // Убираем кавычки для строк
            if ((content.startsWith('"') && content.endsWith('"')) ||
                (content.startsWith("'") && content.endsWith("'"))) {
              output += content.slice(1, -1) + '\n'
            }
            // f-строки
            else if (content.startsWith('f"') || content.startsWith("f'")) {
              // Простая обработка f-строк
              let fString = content.slice(2, -1)
              // Заменяем {variable} на значение переменной (упрощённо)
              fString = fString.replace(/\{([^}]+)\}/g, (_, expr) => {
                // Пытаемся вычислить простые выражения
                try {
                  return eval(expr)
                } catch {
                  return `{${expr}}`
                }
              })
              output += fString + '\n'
            }
            // Переменные и выражения
            else {
              try {
                // Пытаемся вычислить как JavaScript выражение
                const result = eval(content)
                output += result + '\n'
              } catch {
                // Если не получилось - просто выводим как есть
                output += content + '\n'
              }
            }
          } catch (e) {
            output += content + '\n'
          }
        }
      }

      return NextResponse.json({
        output: output || 'Код выполнен успешно!\n(Нет вывода)',
        error: null,
        success: true,
      })
    } catch (error: any) {
      return NextResponse.json({
        output: '',
        error: `Ошибка выполнения: ${error.message}`,
        success: false,
      })
    }
  } catch (error) {
    console.error('Ошибка API выполнения кода:', error)
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    )
  }
}

