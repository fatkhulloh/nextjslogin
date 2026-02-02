🚀 Project Overview

Project ini adalah aplikasi web fullstack berbasis Next.js dengan fitur autentikasi (login & register), Dark / Light Mode, serta proteksi keamanan menggunakan JWT dan Rate Limiting.

Aplikasi dirancang dengan arsitektur modular agar mudah dikembangkan, aman, dan scalable.

🛠 Tech Stack
Frontend

Next.js 16.1 

React

Tailwind CSS

Lucide Icons

Context API (Auth & Theme)

Backend

Next.js API Routes

MySQL

mysql2

bcryptjs (hash password)

jsonwebtoken (JWT)

Security

JWT Authentication (HttpOnly Cookie)

Login Rate Limit per IP (per menit)

Password Hashing (bcrypt)

📂 Arsitektur Project
app/
│
├─ api/
│   ├─ login/
│   │   └─ route.ts        # Login + JWT + Rate Limit
│   ├─ register/
│   │   └─ route.ts        # Register user
│   ├─ logout/
│   │   └─ route.ts        # Logout (hapus cookie)
│   └─ me/
│       └─ route.ts        # Ambil data user dari JWT
│
├─ api/context/
│   └─ AuthContext.tsx     # Global auth state
│
├─ layout/
│   ├─ Navbars.tsx         # Navbar + Dark Mode + Mobile Menu
│   └─ Footer.tsx
│
├─ login/
│   └─ page.tsx            # Halaman Login
│
├─ register/
│   └─ page.tsx            # Halaman Register
│
├─ ClientLayout.tsx        # Layout client (theme & auth sync)
├─ layout.tsx              # Root layout
└─ page.tsx                # Halaman Beranda

🔐 Penjelasan Arsitektur Auth
1️⃣ Login

User mengirim email & password

Server:

Cek rate limit per IP (maks 5x/menit)

Validasi user di database

Bandingkan password menggunakan bcrypt

Generate JWT

Simpan token di HttpOnly Cookie

2️⃣ Session Check

Saat halaman dibuka, frontend memanggil:

GET /api/me


Server membaca JWT dari cookie

Jika valid → user dianggap login

3️⃣ Logout

Cookie token dihapus

State user di-reset

🌗 Dark / Light Mode

Mode tema disimpan di localStorage

Class dark disinkronkan ke <html>

Sinkron sebelum render untuk menghindari flicker/glitch

Konsisten di semua halaman termasuk login & register

🧱 Client Layout Flow
ClientLayout
├─ Cek Auth (loadingUser)
├─ Sinkron Dark Mode
├─ Tampilkan Navbar (jika belum login tampilkan button login/register dan publicDashboar,
        jika sudah login hide button login/register dan tampilkan halaman privateDashboard)
├─ Render halaman
└─ Footer


2️⃣ Install Dependency
npm install

3️⃣ Setup Environment

Buat file .env.local

isinya dad di file env.txt

4️⃣ Jalankan Development Server
npm run dev


Buka di browser:

http://localhost:3000

✅ Fitur Utama

🔐 Login & Register

🍪 JWT Authentication

🚫 Rate Limit Login

🌗 Dark / Light Mode

📱 Responsive (Mobile Menu)