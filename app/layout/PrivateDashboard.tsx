'use client'
import React from 'react'

interface PrivateDashboardProps {
  user: {
    username: string
    email?: string
  }
}

const PrivateDashboard = ({ user }: PrivateDashboardProps) => {
  return (
    <div className="text-center space-y-4">
      {/* Animasi teks sukses */}
      <p className="text-green-500 text-xl font-semibold animate-bounce">
        🎉 Selamat Anda Berhasil Login!
      </p>

      <h1 className="text-4xl font-bold">Private Dashboard</h1>

      <p className="mt-2 text-gray-500 text-medium">
        Selamat Datang <span className="font-bold">{user.username}</span>, <br />
        Email: <span className="font-bold">{user.email}</span>
      </p>
    </div>
  )
}

export default PrivateDashboard
