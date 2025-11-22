'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Mail, Calendar, LogOut, Trash2, Save, Shield } from 'lucide-react'

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session])

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

  const handleSave = async () => {
    setLoading(true)
    setMessage('')

    try {
      // Здесь будет API для обновления профиля
      await new Promise(resolve => setTimeout(resolve, 1000))
      setMessage('✅ Настройки сохранены!')
    } catch (error) {
      setMessage('❌ Ошибка сохранения')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Вы уверены? Все данные будут удалены!')) return

    try {
      // Здесь будет API для удаления аккаунта
      await new Promise(resolve => setTimeout(resolve, 1000))
      signOut({ callbackUrl: '/' })
    } catch (error) {
      setMessage('❌ Ошибка удаления аккаунта')
    }
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
              Настройки
            </span>
            <div className="w-20"></div>
          </motion.div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="glass-effect rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-xl font-bold">{session.user?.name || 'Пользователь'}</h2>
                <p className="text-gray-400 text-sm">{session.user?.email}</p>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/50">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <span>Профиль</span>
                  </div>
                </button>
                
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <span>Безопасность</span>
                  </div>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Выйти</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Информация профиля */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Информация профиля</h3>

              {message && (
                <div className={`mb-4 p-4 rounded-xl ${
                  message.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {message}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 opacity-50 cursor-not-allowed"
                      placeholder="Email"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email нельзя изменить</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Дата регистрации</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={session.user?.emailVerified ? new Date(session.user.emailVerified).toLocaleDateString('ru-RU') : 'Не указано'}
                      disabled
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 opacity-50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary-500 to-accent-500 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Сохранение...' : 'Сохранить изменения'}</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Статистика */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Ваша статистика</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-primary-400 mb-1">0</div>
                  <div className="text-sm text-gray-400">Пройдено уроков</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-accent-400 mb-1">0</div>
                  <div className="text-sm text-gray-400">Решено задач</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-400 mb-1">0%</div>
                  <div className="text-sm text-gray-400">Прогресс</div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">0</div>
                  <div className="text-sm text-gray-400">Дней подряд</div>
                </div>
              </div>
            </motion.div>

            {/* Опасная зона */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 border-2 border-red-500/30"
            >
              <h3 className="text-2xl font-bold mb-2 text-red-400">Опасная зона</h3>
              <p className="text-gray-400 mb-6">Эти действия необратимы!</p>

              <button
                onClick={handleDeleteAccount}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span>Удалить аккаунт</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

