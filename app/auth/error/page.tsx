'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Ошибка конфигурации сервера'
      case 'AccessDenied':
        return 'Доступ запрещен'
      case 'Verification':
        return 'Ошибка верификации. Токен может быть истекшим.'
      default:
        return 'Произошла ошибка при аутентификации'
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-3xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>

          <h1 className="text-2xl font-bold mb-4">Ошибка входа</h1>
          <p className="text-gray-400 mb-8">{getErrorMessage(error)}</p>

          <Link
            href="/auth/signin"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Попробовать снова</span>
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

