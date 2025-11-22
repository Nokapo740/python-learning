'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, GitBranch, Clock, Zap, ChevronRight, Code, Lightbulb, TrendingUp } from 'lucide-react'
import { algorithms } from '@/data/algorithms'

export default function AlgorithmsPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<number | null>(null)

  const algorithm = selectedAlgorithm !== null ? algorithms.find(a => a.id === selectedAlgorithm) : null

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Начальный': return 'from-green-500 to-emerald-500'
      case 'Средний': return 'from-yellow-500 to-orange-500'
      case 'Продвинутый': return 'from-red-500 to-pink-500'
      default: return 'from-blue-500 to-cyan-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Поиск': return '🔍'
      case 'Сортировка': return '📊'
      case 'Графы': return '🕸️'
      default: return '💡'
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
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
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Алгоритмы
            </span>
            <div className="w-20"></div>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!algorithm ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Изучайте алгоритмы
                </span>
              </h1>
              <p className="text-gray-400 mb-12 text-lg">
                Понимание алгоритмов - ключ к эффективному программированию
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {algorithms.map((algo, index) => (
                  <motion.div
                    key={algo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedAlgorithm(algo.id)}
                    className="glass-effect rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getDifficultyColor(algo.difficulty)} flex items-center justify-center text-3xl`}>
                        {getCategoryIcon(algo.category)}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                          {algo.category}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(algo.difficulty)}`}>
                          {algo.difficulty}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {algo.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{algo.description}</p>

                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Время: {algo.timeComplexity}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Zap className="w-4 h-4" />
                        <span>Память: {algo.spaceComplexity}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-sm text-gray-500">Нажмите для изучения</span>
                      <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="algorithm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Навигация */}
              <button
                onClick={() => setSelectedAlgorithm(null)}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Все алгоритмы</span>
              </button>

              {/* Заголовок алгоритма */}
              <div className="glass-effect rounded-2xl p-8 mb-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${getDifficultyColor(algorithm.difficulty)} flex items-center justify-center text-4xl`}>
                        {getCategoryIcon(algorithm.category)}
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold mb-2">{algorithm.title}</h1>
                        <p className="text-gray-400">{algorithm.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className={`text-sm px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(algorithm.difficulty)} text-center`}>
                      {algorithm.difficulty}
                    </span>
                    <span className="text-sm px-4 py-2 rounded-full bg-white/10 text-center">
                      {algorithm.category}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5">
                    <Clock className="w-8 h-8 text-primary-400" />
                    <div>
                      <div className="text-sm text-gray-500">Временная сложность</div>
                      <div className="text-xl font-bold">{algorithm.timeComplexity}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5">
                    <Zap className="w-8 h-8 text-accent-400" />
                    <div>
                      <div className="text-sm text-gray-500">Пространственная сложность</div>
                      <div className="text-xl font-bold">{algorithm.spaceComplexity}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Объяснение */}
              <div className="glass-effect rounded-2xl p-8 mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold">Объяснение</h2>
                </div>
                <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {algorithm.explanation}
                </div>
              </div>

              {/* Визуальные шаги */}
              <div className="glass-effect rounded-2xl p-8 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <h2 className="text-2xl font-bold">Шаги алгоритма</h2>
                </div>
                <div className="space-y-4">
                  {algorithm.visualSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <span className="font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 pt-2">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Код */}
              <div className="glass-effect-dark rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Code className="w-6 h-6 text-primary-400" />
                    <h2 className="text-2xl font-bold">Реализация на Python</h2>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:shadow-lg transition-all">
                    Копировать код
                  </button>
                </div>
                
                <pre className="bg-black/50 rounded-xl p-6 overflow-x-auto">
                  <code className="text-sm text-gray-300 font-mono whitespace-pre">
                    {algorithm.code}
                  </code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

