'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Copy, Check, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-xl">
      <div className="text-gray-400">Загрузка редактора...</div>
    </div>
  ),
})

interface TestCase {
  input: string
  expected: string
}

interface ExerciseEditorProps {
  exerciseId: number
  initialCode?: string
  tests: TestCase[]
  onSuccess?: () => void
}

export default function ExerciseEditor({
  exerciseId,
  initialCode = '# Напишите свой код здесь',
  tests,
  onSuccess,
}: ExerciseEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string>('')
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('Выполнение кода...\n')

    try {
      // Загружаем Pyodide если еще не загружен
      if (typeof window !== 'undefined' && !(window as any).pyodide) {
        setOutput('Загрузка Python интерпретатора...\n')
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
        document.head.appendChild(script)
        
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
        })
        
        ;(window as any).pyodide = await (window as any).loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        })
        setOutput('Python готов! Выполнение кода...\n')
      }

      const pyodide = (window as any).pyodide
      
      // Перехватываем stdout
      let outputText = ''
      pyodide.setStdout({
        batched: (text: string) => {
          outputText += text
        }
      })

      try {
        // Выполняем Python код
        await pyodide.runPythonAsync(code)
        setOutput(outputText || 'Код выполнен успешно!\n(Нет вывода)')
      } catch (error: any) {
        setOutput(`Ошибка выполнения:\n${error.message}`)
      }
    } catch (error: any) {
      setOutput('Ошибка: ' + error.message)
    } finally {
      setIsRunning(false)
    }
  }

  const handleCheck = async () => {
    setIsChecking(true)
    setShowResults(false)

    try {
      // Загружаем Pyodide если еще не загружен
      if (typeof window !== 'undefined' && !(window as any).pyodide) {
        setOutput('Загрузка Python интерпретатора...\n')
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
        document.head.appendChild(script)
        
        await new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
        })
        
        ;(window as any).pyodide = await (window as any).loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        })
      }

      const pyodide = (window as any).pyodide
      
      // Выполняем тесты
      const results = []
      let allPassed = true

      for (const test of tests) {
        try {
          // Выполняем код пользователя
          await pyodide.runPythonAsync(code)
          
          // Выполняем тест
          const result = await pyodide.runPythonAsync(test.input)
          
          // Конвертируем результат правильно
          let actual: string
          if (typeof result === 'boolean') {
            // JavaScript boolean -> Python string
            actual = result ? 'True' : 'False'
          } else if (result === null || result === undefined) {
            actual = 'None'
          } else {
            actual = String(result)
          }
          
          const passed = actual === test.expected

          results.push({
            input: test.input,
            expected: test.expected,
            actual,
            passed,
          })

          if (!passed) allPassed = false
        } catch (error: any) {
          results.push({
            input: test.input,
            expected: test.expected,
            actual: `ERROR: ${error.message}`,
            passed: false,
          })
          allPassed = false
        }
      }

      setTestResults(results)
      setShowResults(true)

      if (allPassed && onSuccess) {
        // Сохраняем в базу данных
        try {
          await fetch('/api/exercises/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              exerciseId,
              code,
              tests,
            }),
          })
        } catch (e) {
          // Игнорируем ошибки сохранения
        }

        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
    } catch (error: any) {
      setOutput('Ошибка: ' + error.message)
    } finally {
      setIsChecking(false)
    }
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput('')
    setTestResults([])
    setShowResults(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const allTestsPassed = testResults.length > 0 && testResults.every(t => t.passed)

  return (
    <div className="space-y-4">
      {/* Панель управления */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning || isChecking}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Выполняется...' : 'Запустить'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheck}
            disabled={isRunning || isChecking}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
            <span>{isChecking ? 'Проверка...' : 'Проверить решение'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Сбросить</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
        </motion.button>
      </div>

      {/* Редактор кода */}
      <div className="glass-effect-dark rounded-xl overflow-hidden">
        <MonacoEditor
          height="400px"
          language="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>

      {/* Результаты тестов */}
      {showResults && testResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`glass-effect rounded-xl p-6 ${
            allTestsPassed ? 'border-2 border-green-500/50' : 'border-2 border-red-500/50'
          }`}
        >
          <div className="flex items-center space-x-2 mb-4">
            {allTestsPassed ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg font-semibold text-green-400">
                  🎉 Отлично! Все тесты пройдены!
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-400" />
                <span className="text-lg font-semibold text-red-400">
                  Некоторые тесты не прошли
                </span>
              </>
            )}
          </div>

          <div className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  result.passed ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {result.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="font-mono text-sm text-gray-300">
                      {result.input}
                    </span>
                  </div>
                </div>
                <div className="ml-7 space-y-1 text-sm">
                  <div className="text-gray-400">
                    Ожидалось: <span className="text-green-400 font-mono">{result.expected}</span>
                  </div>
                  {!result.passed && (
                    <div className="text-gray-400">
                      Получено: <span className="text-red-400 font-mono">{result.actual}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Вывод */}
      {output && !showResults && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect-dark rounded-xl p-6"
        >
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-sm font-semibold text-gray-400">Вывод программы</span>
          </div>
          <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
            {output}
          </pre>
        </motion.div>
      )}
    </div>
  )
}

