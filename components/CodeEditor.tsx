'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Copy, Check } from 'lucide-react'

// Динамический импорт Monaco Editor (работает только на клиенте)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/50 rounded-xl">
      <div className="text-gray-400">Загрузка редактора...</div>
    </div>
  ),
})

interface CodeEditorProps {
  initialCode?: string
  language?: string
  height?: string
  readOnly?: boolean
}

export default function CodeEditor({
  initialCode = '# Напишите свой код здесь\nprint("Привет, мир!")',
  language = 'python',
  height = '400px',
  readOnly = false,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)

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
      // Если Pyodide не загрузился, используем API
      try {
        const response = await fetch('/api/code/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        })

        const data = await response.json()

        if (response.ok && data.success) {
          setOutput(data.output)
        } else {
          setOutput(data.error || 'Ошибка выполнения кода')
        }
      } catch (apiError) {
        setOutput('Ошибка: ' + error.message)
      }
    } finally {
      setIsRunning(false)
    }
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Панель управления */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            <span>{isRunning ? 'Выполняется...' : 'Запустить'}</span>
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
          height={height}
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            readOnly,
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

      {/* Вывод */}
      {output && (
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

