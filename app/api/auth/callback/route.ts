import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { access_token } = await req.json();

  if (!access_token) {
    console.log("No access token");
    return NextResponse.json({ error: "No access token" }, { status: 400 });
  }

  // Ambil user info dari Supabase menggunakan access_token
  const { data: { user }, error } = await supabase.auth.getUser(access_token);

  if (error || !user) {
    console.log("Error getting user:", error);
    return NextResponse.json({ error: "Gagal mengambil info user" }, { status: 400 });
  }

  // Log seluruh user untuk debugging
  console.log("Supabase user object:", user);

  // Buat JWT
  const token = jwt.sign(
    {
      id: user.id,
      username: user.user_metadata?.full_name || "UserGoogle",
      email: user.email,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const response = NextResponse.json({
    message: "Login berhasil",
    user: {
      id: user.id,
      username: user.user_metadata?.full_name || "UserGoogle",
      email: user.email,
    },
  });

  // Set cookie JWT
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
}
