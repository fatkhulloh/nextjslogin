'use client'

import { useState, useEffect } from 'react'
import Navbars from '../layout/Navbars'
import Footer from '../layout/Footer'

const About = () => {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/me') // ambil user dari JWT
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
      <Navbars user={user} setUser={setUser} />

      {loadingUser ? (
        <main className="flex-1 flex items-center justify-center p-8">
          <p className="text-gray-500">Loading...</p>
        </main>
      ) : (
        <main className="flex-1 flex items-start justify-center p-8">
          <h1 className="text-4xl font-bold">About</h1>
        </main>
      )}

      <Footer />
    </div>
  )
}

export default About
