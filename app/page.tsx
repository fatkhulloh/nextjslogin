'use client'

import { useState, useEffect } from "react"
import Navbars from "./layout/Navbars";
import Footer from "./layout/Footer";

export default function Home() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true); // <-- baru

  // cek login saat load halaman
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me"); // endpoint ambil user dari JWT
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false); // selesai cek
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Kirim user sebagai prop ke Navbar */}
      <Navbars user={user} setUser={setUser} />

      {/* Tunggu fetch user selesai dulu */}
      {loadingUser ? (
        <main className="flex-1 flex items-center justify-center p-8">
          <p className="text-gray-500">Loading...</p>
        </main>
      ) : (
        <main className="flex-1 flex items-start justify-center p-8">
          <h1 className="text-4xl font-bold">Home</h1>
        </main>
      )}

      <Footer />
    </div>
  );
}
