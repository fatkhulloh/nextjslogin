import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

/* ================= SUPABASE (COMMENTED) ================= */
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
/* ======================================================== */

// Rate Limit
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

type RateData = {
  count: number;
  firstRequest: number;
};

const rateStore = new Map<string, RateData>();

export async function POST(req: NextRequest) {
  try {
    // Get IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const rate = rateStore.get(ip);

    if (!rate) {
      rateStore.set(ip, { count: 1, firstRequest: now });
    } else {
      if (now - rate.firstRequest > WINDOW_MS) {
        rate.count = 1;
        rate.firstRequest = now;
      } else {
        rate.count++;
        if (rate.count > RATE_LIMIT) {
          return NextResponse.json(
            { error: "Terlalu banyak percobaan login, coba lagi 1 menit" },
            { status: 429 }
          );
        }
      }
    }

    const { email, pass } = await req.json();

    if (!email || !pass) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    /* ================= MYSQL (ACTIVE) ================= */
    // const connection = await mysql.createConnection({
    //   host: "mysql-fatkhulloh6939.alwaysdata.net",
    //   user: "fatkhulloh6939",
    //   password: "Dragonfly6939721@",
    //   database: "fatkhulloh6939_login",
    // });

    try {
       /* ================= MYSQL (ACTIVE) ================= */
      // const [rows] = await connection.execute(
      //   "SELECT id, username, email, password FROM users WHERE email = ?",
      //   [email]
      // );

      // const users = rows as any[];

      // if (users.length === 0) {
      //   return NextResponse.json(
      //     { error: "Email belum terdaftar" },
      //     { status: 400 }
      //   );
      // }

      // const _user = users[0];
      // const isMatch = await bcrypt.compare(pass, _user.password);

      // if (!isMatch) {
      //   return NextResponse.json(
      //     { error: "Email atau password salah" },
      //     { status: 400 }
      //   );
      // }


      //  ================ SUPABASE VERSION =================
      const { data: users, error } = await supabase
        .from("users")
        .select("id, username, email, password")
        .eq("email", email)
        .single();

      if (error || !users) {
        return NextResponse.json(
          { error: "Email belum terdaftar" },
          { status: 400 }
        );
      }

      const isMatch = await bcrypt.compare(pass, users.password);

      if (!isMatch) {
        return NextResponse.json(
          { error: "Email atau password salah" },
          { status: 400 }
        );
      }

      const _user = users;
      // ====================================================

      const token = jwt.sign(
        { id: _user.id, username: _user.username, email: _user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      rateStore.delete(ip);

      const response = NextResponse.json({
        message: "Login berhasil",
        user: {
          id: _user.id,
          username: _user.username,
          email: _user.email,
        },
      });

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    } finally {
      // for Mysql
      // await connection.end();
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
