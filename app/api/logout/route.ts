import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.json({ message: "Logout berhasil" })

  res.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })

  return res
}
