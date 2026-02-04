import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

/* ================= SUPABASE ================= */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
/* ============================================ */

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    /* ================= MYSQL (COMMENTED) =================
    const connection = await mysql.createConnection({
      host: "mysql-fatkhulloh6939.alwaysdata.net",
      user: "fatkhulloh6939",
      password: "Dragonfly6939721@",
      database: "fatkhulloh6939_login",
    });

    try {
      const [rows] = await connection.execute(
        "SELECT id FROM users WHERE email = ? OR username = ?",
        [email, username]
      );

      const existing = rows as any[];

      if (existing.length > 0) {
        return NextResponse.json(
          { error: "Username atau email sudah terdaftar" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await connection.execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );

      return NextResponse.json({ message: "Akun berhasil dibuat!" });
    } finally {
      await connection.end();
    }
    ====================================================== */

    /* ================= SUPABASE (ACTIVE) ================= */

    // Cek email / username
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .or(`email.eq.${email},username.eq.${username}`)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json(
        { error: "Username atau email sudah terdaftar" },
        { status: 400 }
      );
    }

    // Hash password (tetap bcrypt)
    const hashedPassword = await bcrypt.hash(password, 10);

    const { error: insertError } = await supabase
      .from("users")
      .insert({
        username,
        email,
        password: hashedPassword,
      });

  if (insertError) {
  console.error("SUPABASE ERROR:", insertError);
  return NextResponse.json(
    {
      error: "Gagal membuat akun",
      detail: insertError.message,
      code: insertError.code,
    },
    { status: 500 }
  );
}


    return NextResponse.json({ message: "Akun berhasil dibuat!" });

    /* ===================================================== */

    // return NextResponse.json(
    //   { error: "Register method belum diaktifkan" },
    //   { status: 501 }
    // );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
