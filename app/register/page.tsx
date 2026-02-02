'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan")
      } else {
        setSuccess(data.message)
        setTimeout(() => router.push("/login"), 1000)
      }
    } catch {
      setError("Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        min-h-screen flex items-center justify-center px-4
        bg-gray-100 dark:bg-gray-900
        transition-colors
      "
    >
      <div
        className="
          w-full max-w-md rounded-2xl shadow-xl p-8
          bg-white text-gray-800
          dark:bg-gray-800 dark:text-white
          transition-colors
        "
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Buat Akun Baru 👋
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Daftar untuk mulai menggunakan MyApp
          </p>
        </div>

        {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-3 text-center">{success}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Username
            </label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                className="
                  w-full pl-10 pr-4 py-2.5 rounded-lg border
                  bg-gray-100 text-gray-800 border-gray-300
                  dark:bg-gray-700 dark:text-white dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                className="
                  w-full pl-10 pr-4 py-2.5 rounded-lg border
                  bg-gray-100 text-gray-800 border-gray-300
                  dark:bg-gray-700 dark:text-white dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="
                  w-full pl-10 pr-10 py-2.5 rounded-lg border
                  bg-gray-100 text-gray-800 border-gray-300
                  dark:bg-gray-700 dark:text-white dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold
              bg-blue-600 text-white
              hover:bg-blue-700
              disabled:opacity-60 transition
            "
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
