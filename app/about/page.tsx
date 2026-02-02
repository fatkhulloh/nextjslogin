"use client";

import { useAuth } from "../api/context/AuthContext";

export default function About() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-start p-8 space-y-10 w-full max-w-6xl mx-auto">
      {/* Header */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          <span className="font-bold">Fatkhulloh Login</span> adalah platform
          profesional yang dirancang untuk mempermudah manajemen tugas,
          kolaborasi tim, dan produktivitas harian Anda.
        </p>

        {user && (
          <p className="mt-3 text-green-500 font-semibold">
            Selamat datang, {user.username}! Anda sudah login.
          </p>
        )}
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">User Friendly</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Antarmuka sederhana dan mudah digunakan oleh semua pengguna.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Keamanan Tinggi</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Data terlindungi dengan sistem autentikasi dan enkripsi modern.
          </p>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Produktivitas Maksimal</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Fitur dirancang untuk meningkatkan efisiensi kerja tim Anda.
          </p>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Mulai tingkatkan produktivitas tim Anda hari ini!
          </p>
          <a
            href="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Daftar Sekarang
          </a>
        </section>
      )}
    </main>
  );
}
