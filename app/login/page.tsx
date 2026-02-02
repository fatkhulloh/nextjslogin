'use client'

import { useState } from 'react'
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Selamat Datang 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Login untuk melanjutkan
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="relative mt-1">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                placeholder="email@contoh.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative mt-1">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg border 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Show / Hide Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                           text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded" />
              Ingat saya
            </label>
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Lupa password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg 
                       bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold 
                       hover:opacity-90 transition shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
