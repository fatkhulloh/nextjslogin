'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

interface NavbarsProps {
  user: { username: string } | null
  setUser: React.Dispatch<React.SetStateAction<{ username: string } | null>>
}

export default function Navbars({ user, setUser }: NavbarsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loadingUser, setLoadingUser] = useState(true) // <-- baru

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me")
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoadingUser(false) // <-- selesai cek
      }
    }
    fetchUser()
  }, [setUser])

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" })
    setUser(null)
    setDropdownOpen(false)
    window.location.href = "/"
  }

  // Jika masih loading, jangan render tombol login/daftar dulu
  if (loadingUser) return null

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Fatkhulloh_Login</h1>

        <div className="flex items-center gap-6 text-gray-600 font-medium">
          <Link href="/" className="hover:text-blue-600">Beranda</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>

          {!user && (
            <>
              <Link
                href="/login"
                className="px-5 py-2 items-center rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-8 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Daftar
              </Link>
            </>
          )}

          {user && (
            <div className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-full border hover:bg-gray-100 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.username} <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
