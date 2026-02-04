// lib/db.ts
import { createClient } from "@supabase/supabase-js";

// Ambil dari environment variable
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // service role key untuk akses DB

export const db = createClient(supabaseUrl, supabaseAnonKey);
