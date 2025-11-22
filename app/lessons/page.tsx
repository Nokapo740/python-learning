'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, BookOpen, Clock, BarChart3, ChevronRight, Target, Lightbulb, Code, CheckCircle } from 'lucide-react'
import { professionalLessons } from '@/data/professional-lessons'
import ExerciseEditor from '@/components/ExerciseEditor'

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<number>(0)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())

  const lesson = selectedLesson !== null ? professionalLessons.find(l => l.id === selectedLesson) : null

  const handleExerciseSuccess = (exerciseId: string) => {
    setCompletedExercises(prev => new Set([...prev, exerciseId]))
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
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
            <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Уроки Python
            </span>
            <div className="w-20"></div>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!lesson ? (
            /* Список уроков */
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  Профессиональные уроки Python
                </span>
              </h1>
              <p className="text-gray-400 mb-8 text-lg">
                Изучайте Python от основ до продвинутых концепций с практикой в каждом уроке
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {professionalLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      setSelectedLesson(lesson.id)
                      setSelectedTopic(0)
                    }}
                    className="glass-effect rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        lesson.difficulty === 'Начальный' ? 'from-green-500 to-emerald-500' :
                        lesson.difficulty === 'Средний' ? 'from-yellow-500 to-orange-500' :
                        'from-red-500 to-pink-500'
                      } flex items-center justify-center`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-white/10">
                        {lesson.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{lesson.description}</p>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>{lesson.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" />
                          <span>{lesson.topics.length} тем</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-xs text-gray-500 mb-2">Вы изучите:</div>
                      <div className="space-y-1">
                        {lesson.learningObjectives.slice(0, 2).map((obj, i) => (
                          <div key={i} className="flex items-start space-x-2 text-sm text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">Нажмите для начала</span>
                      <ChevronRight className="w-5 h-5 text-primary-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Содержимое урока */
            <motion.div
              key="lesson"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid lg:grid-cols-4 gap-8"
            >
              {/* Навигация по темам */}
              <div className="lg:col-span-1">
                <div className="glass-effect rounded-2xl p-6 sticky top-24">
                  <button
                    onClick={() => setSelectedLesson(null)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Все уроки</span>
                  </button>

                  <h2 className="text-lg font-bold mb-2">{lesson.title}</h2>
                  <p className="text-sm text-gray-400 mb-4">{lesson.topics.length} тем</p>
                  
                  <div className="space-y-2">
                    {lesson.topics.map((topic, index) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(index)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                          selectedTopic === index
                            ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/50'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            selectedTopic === index
                              ? 'bg-primary-500'
                              : completedExercises.has(topic.exercise?.id || '')
                              ? 'bg-green-500'
                              : 'bg-white/10'
                          }`}>
                            {completedExercises.has(topic.exercise?.id || '') ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <span className="text-sm font-bold">{index + 1}</span>
                            )}
                          </div>
                          <span className="text-sm">{topic.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Контент темы */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTopic}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Заголовок темы */}
                    <div className="glass-effect rounded-2xl p-8">
                      <h3 className="text-3xl font-bold mb-4">
                        {lesson.topics[selectedTopic].title}
                      </h3>
                      
                      {/* Объяснение простыми словами */}
                      <div className="flex items-start space-x-3 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                        <Lightbulb className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-semibold text-blue-400 mb-1">Простыми словами:</div>
                          <p className="text-gray-300">
                            {lesson.topics[selectedTopic].explanation}
                          </p>
                        </div>
                      </div>

                      {/* Основной контент */}
                      <div className="prose prose-invert max-w-none">
                        <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                          {lesson.topics[selectedTopic].content}
                        </div>
                      </div>
                    </div>

                    {/* Пример кода */}
                    <div className="glass-effect-dark rounded-2xl p-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <Code className="w-5 h-5 text-primary-400" />
                        <h4 className="text-xl font-bold">Пример кода</h4>
                      </div>
                      
                      <pre className="bg-black/50 rounded-xl p-6 overflow-x-auto">
                        <code className="text-sm text-gray-300 font-mono whitespace-pre">
                          {lesson.topics[selectedTopic].example}
                        </code>
                      </pre>
                    </div>

                    {/* Ключевые моменты */}
                    <div className="glass-effect rounded-2xl p-8">
                      <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                        <Target className="w-6 h-6 text-green-400" />
                        <span>Ключевые моменты</span>
                      </h4>
                      <div className="space-y-3">
                        {lesson.topics[selectedTopic].keyPoints.map((point, i) => (
                          <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold">{i + 1}</span>
                            </div>
                            <p className="text-gray-300 pt-0.5">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Практика */}
                    {lesson.topics[selectedTopic].exercise && (
                      <div className="glass-effect rounded-2xl p-8 border-2 border-green-500/30">
                        <div className="flex items-center space-x-2 mb-4">
                          <Code className="w-6 h-6 text-green-400" />
                          <h4 className="text-2xl font-bold text-green-400">Практика</h4>
                        </div>
                        
                        <div className="mb-6">
                          <h5 className="text-xl font-bold mb-2">
                            {lesson.topics[selectedTopic].exercise!.title}
                          </h5>
                          <p className="text-gray-300">
                            {lesson.topics[selectedTopic].exercise!.description}
                          </p>
                        </div>

                        <ExerciseEditor
                          exerciseId={lesson.topics[selectedTopic].exercise!.id}
                          initialCode={lesson.topics[selectedTopic].exercise!.initialCode}
                          tests={lesson.topics[selectedTopic].exercise!.tests}
                          onSuccess={() => handleExerciseSuccess(lesson.topics[selectedTopic].exercise!.id)}
                        />

                        {/* Подсказки */}
                        {lesson.topics[selectedTopic].exercise!.hints.length > 0 && (
                          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                            <div className="font-semibold text-yellow-400 mb-2">💡 Подсказки:</div>
                            <ul className="space-y-1">
                              {lesson.topics[selectedTopic].exercise!.hints.map((hint, i) => (
                                <li key={i} className="text-sm text-gray-300">• {hint}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Навигация между темами */}
                    <div className="flex justify-between">
                      <button
                        onClick={() => setSelectedTopic(Math.max(0, selectedTopic - 1))}
                        disabled={selectedTopic === 0}
                        className="flex items-center space-x-2 px-6 py-3 glass-effect rounded-xl hover:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Предыдущая тема</span>
                      </button>
                      
                      <button
                        onClick={() => setSelectedTopic(Math.min(lesson.topics.length - 1, selectedTopic + 1))}
                        disabled={selectedTopic === lesson.topics.length - 1}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>Следующая тема</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
