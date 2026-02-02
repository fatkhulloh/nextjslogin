'use client'

import React, { useState, useEffect } from 'react'
import Navbars from '../layout/Navbars'
import Footer from '../layout/Footer'

export default function About() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  // cek login saat load halaman
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me") // endpoint ambil user dari JWT
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      } finally {
        setLoadingUser(false)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Kirim user ke Navbar */}
      <Navbars user={user} setUser={setUser} />

      {/* Tunggu fetch user selesai */}
      {loadingUser ? (
        <main className="flex-1 flex items-center justify-center p-8">
          <p className="text-gray-500">Loading...</p>
        </main>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-start p-8 space-y-8 w-full max-w-6xl mx-auto">
          {/* Header */}
          <section className="text-center max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
            <p className="text-gray-600 text-lg">
              <span className='font-bold'>Fatkhulloh Login</span> adalah platform profesional yang dirancang untuk mempermudah manajemen tugas, kolaborasi tim,
              dan produktivitas harian Anda. Kami mengutamakan pengalaman pengguna yang intuitif, aman, dan efisien.
            </p>
            {user && (
              <p className="mt-2 text-green-600 font-semibold">
                Selamat datang, {user.username}! Anda sudah login.
              </p>
            )}
          </section>

          {/* Fitur/Keunggulan */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">User Friendly</h2>
              <p className="text-gray-500">
                Antarmuka yang sederhana dan mudah digunakan, cocok untuk semua level pengguna.
              </p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Keamanan Tinggi</h2>
              <p className="text-gray-500">
                Data Anda terlindungi dengan enkripsi terbaru dan sistem autentikasi yang aman.
              </p>
            </div>
            <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Produktivitas Maksimal</h2>
              <p className="text-gray-500">
                Fitur-fitur yang dirancang untuk membantu tim Anda bekerja lebih cepat dan efisien.
              </p>
            </div>
          </section>

          {/* Call-to-action */}
          {!user && (
            <section className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Mulai tingkatkan produktivitas tim Anda hari ini!
              </p>
              <a
                href="/register"
                className="px-6 mt-5 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Daftar Sekarang
              </a>
            </section>
          )}
        </main>
      )}

      <Footer />
    </div>
  )
}
