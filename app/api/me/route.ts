// app/api/me/route.ts
import { NextRequest, NextResponse } from "next/server"
import * as jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error("JWT_SECRET tidak ditemukan")

    const decoded = jwt.verify(token, secret) as { id: number; username: string; email: string }

    return NextResponse.json({ user: { id: decoded.id, username: decoded.username, email: decoded.email } })
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 200 })
  }
}
