import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient"; // sesuaikan path

export async function GET() {
  try {
    // Ambil semua data dari tabel users
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.log("DataSupabase:", data);
    return NextResponse.json({ users: data });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
