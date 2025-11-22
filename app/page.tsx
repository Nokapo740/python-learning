'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Code2, BookOpen, Trophy, Sparkles, ArrowRight, Brain, Zap, Target, LogOut, User } from 'lucide-react'

export default function Home() {
  const { data: session, status } = useSession()
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Навигация */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center glass-effect rounded-2xl px-6 py-4"
          >
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                PyLearn
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/lessons" className="text-gray-300 hover:text-white transition-colors">
                Уроки
              </Link>
              <Link href="/algorithms" className="text-gray-300 hover:text-white transition-colors">
                Алгоритмы
              </Link>
              <Link href="/progress" className="text-gray-300 hover:text-white transition-colors">
                Практика
              </Link>
              {session ? (
                <div className="flex items-center space-x-4">
                  <Link href="/settings" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{session.user?.name || session.user?.email}</span>
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 px-4 py-2 glass-effect rounded-full hover:bg-white/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Выйти</span>
                  </button>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <button className="bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-primary-500/50 transition-all">
                    Войти
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Главный контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Герой секция */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center space-x-2 glass-effect px-4 py-2 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-300">Современная платформа обучения</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary-400 via-accent-400 to-purple-400 bg-clip-text text-transparent">
              Изучай Python
            </span>
            <br />
            <span className="text-white">с удовольствием</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Интерактивные уроки, практические задания и алгоритмы - всё для успешного освоения программирования
          </p>

          <div className="flex justify-center space-x-4">
            <Link href={session ? "/lessons" : "/auth/signup"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-2 hover:shadow-2xl hover:shadow-primary-500/50 transition-all"
              >
                <span>{session ? 'Продолжить обучение' : 'Начать обучение'}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Узнать больше
            </motion.button>
          </div>
        </motion.div>

        {/* Карточки особенностей */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: BookOpen,
              title: 'Структурированные Уроки',
              description: 'От основ до продвинутых концепций Python с пошаговыми объяснениями',
              gradient: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Brain,
              title: 'Алгоритмы и Задачи',
              description: 'Освойте алгоритмы и структуры данных через практические примеры',
              gradient: 'from-purple-500 to-pink-500'
            },
            {
              icon: Zap,
              title: 'Интерактивный Код',
              description: 'Пишите и запускайте код прямо в браузере с мгновенной обратной связью',
              gradient: 'from-amber-500 to-orange-500'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-effect rounded-2xl p-8 hover:bg-white/10 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:shadow-lg transition-all`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-effect rounded-2xl p-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: '50+', label: 'Уроков Python' },
              { value: '30+', label: 'Алгоритмов' },
              { value: '100+', label: 'Практических Задач' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Футер */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>© 2025 PyLearn. Создано для любителей Python</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

