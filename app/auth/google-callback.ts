import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { supabase_access_token } = await req.json();
    if (!supabase_access_token) throw new Error("No token provided");

    // Ambil user info dari Supabase
    const { data: { user }, error } = await supabase.auth.getUser(supabase_access_token);
    if (error || !user) throw new Error(error?.message || "User not found");

    // Buat JWT custom
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.user_metadata?.full_name || user.email
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        username: user.user_metadata?.full_name || user.email,
        email: user.email,
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
