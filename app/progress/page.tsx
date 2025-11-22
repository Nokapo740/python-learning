'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, Target, Code2, ChevronRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ExerciseEditor from '@/components/ExerciseEditor'

interface Exercise {
  id: number
  title: string
  difficulty: string
  description: string
  task: string
  initialCode: string
  solution: string
  hints: string[]
  tests: Array<{ input: string; expected: string }>
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: 'Привет, имя!',
    difficulty: 'Начальный',
    description: 'Создайте программу, которая приветствует пользователя по имени',
    task: 'Напишите функцию greet(name), которая принимает имя и возвращает строку приветствия "Привет, {name}!"',
    initialCode: `def greet(name):
    # Ваш код здесь
    pass

# Тестирование
print(greet("Анна"))`,
    solution: `def greet(name):
    return f"Привет, {name}!"

# Тестирование
print(greet("Анна"))`,
    hints: [
      'Используйте f-строку для форматирования',
      'Функция должна возвращать строку, а не печатать её',
      'Не забудьте восклицательный знак в конце'
    ],
    tests: [
      { input: 'greet("Анна")', expected: 'Привет, Анна!' },
      { input: 'greet("Иван")', expected: 'Привет, Иван!' }
    ]
  },
  {
    id: 2,
    title: 'Проверка четности',
    difficulty: 'Начальный',
    description: 'Определите, является ли число четным',
    task: 'Напишите функцию is_even(n), которая возвращает True если число четное, иначе False',
    initialCode: `def is_even(n):
    # Ваш код здесь
    pass

# Тестирование
print(is_even(4))
print(is_even(7))`,
    solution: `def is_even(n):
    return n % 2 == 0

# Тестирование
print(is_even(4))  # True
print(is_even(7))  # False`,
    hints: [
      'Используйте оператор остатка от деления %',
      'Четное число делится на 2 без остатка',
      'Результат сравнения уже булево значение'
    ],
    tests: [
      { input: 'is_even(4)', expected: 'True' },
      { input: 'is_even(7)', expected: 'False' }
    ]
  },
  {
    id: 3,
    title: 'Сумма списка',
    difficulty: 'Начальный',
    description: 'Посчитайте сумму всех элементов списка',
    task: 'Напишите функцию sum_list(numbers), которая возвращает сумму всех чисел в списке',
    initialCode: `def sum_list(numbers):
    # Ваш код здесь
    pass

# Тестирование
print(sum_list([1, 2, 3, 4, 5]))`,
    solution: `def sum_list(numbers):
    total = 0
    for num in numbers:
        total += num
    return total

# Или проще:
# def sum_list(numbers):
#     return sum(numbers)

# Тестирование
print(sum_list([1, 2, 3, 4, 5]))  # 15`,
    hints: [
      'Создайте переменную для хранения суммы',
      'Используйте цикл for для перебора элементов',
      'Или используйте встроенную функцию sum()'
    ],
    tests: [
      { input: 'sum_list([1, 2, 3, 4, 5])', expected: '15' },
      { input: 'sum_list([10, 20, 30])', expected: '60' }
    ]
  },
  {
    id: 4,
    title: 'Реверс строки',
    difficulty: 'Средний',
    description: 'Переверните строку задом наперед',
    task: 'Напишите функцию reverse_string(s), которая возвращает перевернутую строку',
    initialCode: `def reverse_string(s):
    # Ваш код здесь
    pass

# Тестирование
print(reverse_string("Python"))`,
    solution: `def reverse_string(s):
    return s[::-1]

# Альтернативные способы:
# def reverse_string(s):
#     return ''.join(reversed(s))
#
# def reverse_string(s):
#     result = ''
#     for char in s:
#         result = char + result
#     return result

# Тестирование
print(reverse_string("Python"))  # nohtyP`,
    hints: [
      'Используйте срезы с отрицательным шагом',
      'Синтаксис: string[::-1]',
      'Или используйте функцию reversed()'
    ],
    tests: [
      { input: 'reverse_string("Python")', expected: 'nohtyP' },
      { input: 'reverse_string("Hello")', expected: 'olleH' }
    ]
  },
  {
    id: 5,
    title: 'Палиндром',
    difficulty: 'Средний',
    description: 'Проверьте, является ли строка палиндромом',
    task: 'Напишите функцию is_palindrome(s), которая проверяет, читается ли строка одинаково в обе стороны',
    initialCode: `def is_palindrome(s):
    # Ваш код здесь
    pass

# Тестирование
print(is_palindrome("радар"))
print(is_palindrome("python"))`,
    solution: `def is_palindrome(s):
    # Приводим к нижнему регистру и убираем пробелы
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# Тестирование
print(is_palindrome("радар"))   # True
print(is_palindrome("python"))  # False`,
    hints: [
      'Сравните строку с её перевернутой версией',
      'Не забудьте привести к одному регистру',
      'Используйте s[::-1] для переворота'
    ],
    tests: [
      { input: 'is_palindrome("радар")', expected: 'True' },
      { input: 'is_palindrome("python")', expected: 'False' }
    ]
  },
  {
    id: 6,
    title: 'Числа Фибоначчи',
    difficulty: 'Средний',
    description: 'Сгенерируйте последовательность Фибоначчи',
    task: 'Напишите функцию fibonacci(n), которая возвращает список первых n чисел Фибоначчи',
    initialCode: `def fibonacci(n):
    # Ваш код здесь
    pass

# Тестирование
print(fibonacci(8))`,
    solution: `def fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    
    return fib

# Тестирование
print(fibonacci(8))  # [0, 1, 1, 2, 3, 5, 8, 13]`,
    hints: [
      'Начните с [0, 1]',
      'Каждое следующее число - сумма двух предыдущих',
      'Используйте цикл for для генерации чисел'
    ],
    tests: [
      { input: 'fibonacci(8)', expected: '[0, 1, 1, 2, 3, 5, 8, 13]' },
      { input: 'fibonacci(5)', expected: '[0, 1, 1, 2, 3]' }
    ]
  }
]

export default function ProgressPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])

  const exercise = selectedExercise !== null ? exercises.find(e => e.id === selectedExercise) : null

  // Проверка аутентификации
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Загрузка...</div>
      </div>
    )
  }

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  const handleSuccess = () => {
    if (selectedExercise) {
      setCompletedExercises([...completedExercises, selectedExercise])
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Начальный': return 'from-green-500 to-emerald-500'
      case 'Средний': return 'from-yellow-500 to-orange-500'
      case 'Продвинутый': return 'from-red-500 to-pink-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Навигация */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl px-6 py-4 flex items-center justify-between"
          >
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Назад</span>
            </Link>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Практические Задания
            </span>
            <div className="w-20"></div>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!exercise ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Практикуйтесь с задачами
              </span>
            </h1>
            <p className="text-gray-400 mb-12 text-lg">
              Решайте практические задачи и совершенствуйте навыки программирования
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((ex, index) => (
                <motion.div
                  key={ex.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    setSelectedExercise(ex.id)
                    setShowSolution(false)
                    setCurrentHint(0)
                  }}
                  className="glass-effect rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getDifficultyColor(ex.difficulty)} flex items-center justify-center`}>
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(ex.difficulty)}`}>
                      {ex.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                    {ex.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{ex.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Задача #{ex.id}</span>
                    <ChevronRight className="w-5 h-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Боковая панель */}
            <div className="lg:col-span-1 space-y-6">
              <button
                onClick={() => setSelectedExercise(null)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Все задания</span>
              </button>

              {/* Информация о задаче */}
              <div className="glass-effect rounded-2xl p-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getDifficultyColor(exercise.difficulty)} flex items-center justify-center mb-4`}>
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{exercise.title}</h2>
                <p className="text-gray-400 mb-4">{exercise.description}</p>
                <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(exercise.difficulty)} text-sm`}>
                  {exercise.difficulty}
                </span>
              </div>

              {/* Подсказки */}
              <div className="glass-effect rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center space-x-2">
                  <span>💡</span>
                  <span>Подсказки</span>
                </h3>
                <div className="space-y-3">
                  {exercise.hints.slice(0, currentHint + 1).map((hint, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-gray-300 bg-white/5 p-3 rounded-lg"
                    >
                      {index + 1}. {hint}
                    </motion.div>
                  ))}
                  {currentHint < exercise.hints.length - 1 && (
                    <button
                      onClick={() => setCurrentHint(currentHint + 1)}
                      className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Показать следующую подсказку →
                    </button>
                  )}
                </div>
              </div>

              {/* Решение */}
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full py-3 glass-effect rounded-xl hover:bg-white/10 transition-all"
              >
                {showSolution ? 'Скрыть решение' : 'Показать решение'}
              </button>
            </div>

            {/* Основная область */}
            <div className="lg:col-span-2 space-y-6">
              {/* Задание */}
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                  <Code2 className="w-6 h-6 text-primary-400" />
                  <span>Задание</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">{exercise.task}</p>
              </div>

              {/* Редактор кода */}
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Ваше решение</h3>
                <ExerciseEditor
                  exerciseId={exercise.id}
                  initialCode={exercise.initialCode}
                  tests={exercise.tests}
                  onSuccess={handleSuccess}
                />
              </div>

              {/* Решение */}
              {showSolution && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-effect rounded-2xl p-8 border-2 border-green-500/30"
                >
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 text-green-400">
                    <Trophy className="w-6 h-6" />
                    <span>Решение</span>
                  </h3>
                  <div className="glass-effect-dark rounded-xl overflow-hidden">
                    <pre className="p-6 overflow-x-auto">
                      <code className="text-sm text-gray-300 font-mono whitespace-pre">
                        {exercise.solution}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              )}

              {/* Тесты */}
              <div className="glass-effect rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Тестовые случаи</h3>
                <div className="space-y-3">
                  {exercise.tests.map((test, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Вызов:</div>
                          <code className="text-primary-400 font-mono">{test.input}</code>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Ожидается:</div>
                          <code className="text-green-400 font-mono">{test.expected}</code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

