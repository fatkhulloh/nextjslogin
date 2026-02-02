import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import * as jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
  try {
    const { email, pass } = await req.json();

    // Validasi input
    if (!email || !pass) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    // Koneksi MySQL
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    try {

      const [rows] = await connection.execute(
        "SELECT id, username, email, password FROM users WHERE email = ?",
        [email]
      );

      const users = rows as any[];

        console.log(`Length: ${users.length}___ ${email}  __ ${pass}`);
      if (users.length === 0) {
        console.log("Belum terdaftar");
        return NextResponse.json({ error: "Email belum terdaftar" }, { status: 400 });
      }

      const _user = users[0];

    //   const hashedPassword = await bcrypt.hash(pass, 10);
      const isMatch = await bcrypt.compare(pass, _user.password);

      if (!isMatch) {
    //   if (hashedPassword === _user.password) {
        console.log(`Email atau password salah`);
        return NextResponse.json({ error: "Email atau password salah" }, { status: 400 });
      }

      console.log("Login Berhasil");

        // Buat JWT
      const token = jwt.sign(
        { id: _user.id, username: _user.username, email: _user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );



      const response = NextResponse.json({message: "Login berhasil",
            user: { id: _user.id, username: _user.username, email: _user.email },});

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 hari
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return response;
      // return NextResponse.json({
      //   message: "Login berhasil",
      //   user: { id: _user.id, username: _user.username, email: _user.email },
      // });
    } finally {
      await connection.end();
    }
  } catch (err: any) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
