"use client";

import { useEffect } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function CallbackPage() {
  useEffect(() => {
    const sendSessionToOpener = async () => {
      // Ambil session terbaru dari Supabase
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting Supabase session:", error.message);
        return;
      }

      if (window.opener && session) {
        // Kirim ke parent window
        window.opener.postMessage({ type: "OAUTH_SUCCESS", session }, window.location.origin);

        // Tutup popup
        window.close();
      } else {
        console.warn("No opener window or session not available");
      }
    };

    sendSessionToOpener();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <p className="text-gray-700 dark:text-white">Memproses login...</p>
    </div>
  );
}
