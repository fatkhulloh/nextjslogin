import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { access_token } = await req.json();

    if (!access_token) {
      return NextResponse.json({ error: "No access token" }, { status: 400 });
    }

    // Ambil user dari Supabase menggunakan access token
    const { data: { user }, error: supabaseError } = await db.auth.getUser(access_token);

    if (supabaseError || !user) {
      return NextResponse.json({ error: "Cannot fetch user" }, { status: 400 });
    }

    console.log("Supabase user object:", user);

    // Cek apakah email user sudah terdaftar di tabel users kita
    const { data: existingUsers, error } = await db
      .from("users")
      .select("id, username, email")
      .eq("email", user.email)
      .single();

    if (error || !existingUsers) {
      return NextResponse.json(
        { error: "Email belum terdaftar, silakan register terlebih dahulu" },
        { status: 400 }
      );
    }

    // Buat JWT
    const token = jwt.sign(
      {
        id: existingUsers.id,
        username: existingUsers.username,
        email: existingUsers.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Login berhasil",
      user: existingUsers,
    });

    // Set JWT sebagai cookie
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
