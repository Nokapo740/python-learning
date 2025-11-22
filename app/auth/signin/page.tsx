'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Chrome, Loader2, Code2 } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [showOTP, setShowOTP] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (showOTP) {
        // Вход с OTP
        const result = await signIn('credentials', {
          email,
          password: '',
          otp,
          redirect: false,
        })

        if (result?.error) {
          setError(result.error)
        } else {
          router.push('/lessons')
        }
      } else {
        // Обычный вход с паролем
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError(result.error)
        } else {
          router.push('/lessons')
        }
      }
    } catch (err) {
      setError('Ошибка при входе')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOTP = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowOTP(true)
        setError('')
      } else {
        setError(data.error || 'Ошибка отправки OTP')
      }
    } catch (err) {
      setError('Ошибка при отправке OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/lessons' })
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Фон */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-8"
        >
          {/* Лого */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 mb-4">
              <Code2 className="w-10 h-10 text-primary-400" />
              <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                PyLearn
              </span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Вход в аккаунт</h1>
            <p className="text-gray-400">Продолжите обучение Python</p>
          </div>

          {/* Google вход */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 mb-6 hover:bg-gray-100 transition-colors"
          >
            <Chrome className="w-5 h-5" />
            <span>Войти через Google</span>
          </motion.button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">или</span>
            </div>
          </div>

          {/* Email форма */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/50 rounded-xl p-3 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {!showOTP ? (
              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-2">OTP код из email</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="000000"
                />
              </div>
            )}

            {!showOTP && (
              <button
                type="button"
                onClick={handleSendOTP}
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                Войти с OTP кодом
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Вход...</span>
                </>
              ) : (
                <>
                  <span>Войти</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>

          {/* Регистрация */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-400">Нет аккаунта? </span>
            <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300 transition-colors font-semibold">
              Зарегистрироваться
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

