import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    // Koneksi MySQL
    // const connection = await mysql.createConnection({
    //   host: process.env.MYSQL_HOST,
    //   user: process.env.MYSQL_USER,
    //   password: process.env.MYSQL_PASSWORD,
    //   database: process.env.MYSQL_DATABASE,
    // });
    const connection = await mysql.createConnection({
        // host: 'mysql-fatkhulloh.alwaysdata.net',  // Host AlwaysData
        host: 'mysql-fatkhulloh6939.alwaysdata.net',  // Host AlwaysData
        // host: 'https://ssh-fatkhulloh6939.alwaysdata.net',  // Host AlwaysData
        user: 'fatkhulloh6939',                   // User database
        password: 'Dragonfly6939721@',         // Password database
        database: 'fatkhulloh6939_login',         // Nama database
      });

    try {
      // Cek apakah email atau username sudah ada
      const [rows] = await connection.execute(
        "SELECT id FROM users WHERE email = ? OR username = ?",
        [email, username]
      );

      const existing = rows as any[];

      if (existing.length > 0) {
        return NextResponse.json({ error: "Username atau email sudah terdaftar" }, { status: 400 });
      }

      console.log(`Crypt: __${password}__`)
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      await connection.execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );

      return NextResponse.json({ message: "Akun berhasil dibuat!" });
    } finally {
      await connection.end();
    }

  } catch (err: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
