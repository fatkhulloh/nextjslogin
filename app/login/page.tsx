"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../api/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const { user, updateAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect jika user sudah login
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  // ================== EMAIL + PASSWORD LOGIN ==================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pass }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) setError(data.error || "Login gagal");
      else {
        await updateAuth(); // update context
        router.push("/");
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ================== GOOGLE LOGIN ==================
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        skipBrowserRedirect: true,
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const popup = window.open(
      data.url,
      "google-login",
      "width=500,height=600"
    );

    if (!popup) {
      setError("Popup diblokir. Izinkan popup untuk login");
      setLoading(false);
      return;
    }

    const receiveMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "OAUTH_SUCCESS") {
        popup.close(); // tutup popup

        try {
          // Kirim access_token Supabase ke backend untuk set JWT
          const res = await fetch("/api/auth/callback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ access_token: event.data.session.access_token }),
            credentials: "include",
          });

          if (!res.ok) {
            const err = await res.json();
            setError(err.error || "Login Google gagal");
          } else {
            await updateAuth(); // update state user
            router.push("/");
          }
        } catch {
          setError("Server error saat login Google");
        } finally {
          setLoading(false);
          window.removeEventListener("message", receiveMessage);
        }
      }
    };

    window.addEventListener("message", receiveMessage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative bg-gray-50 dark:bg-gray-900 transition-colors">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <span className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <p className="text-white font-medium">Logging in...</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md rounded-2xl shadow-lg p-8 bg-white text-gray-800 dark:bg-gray-800 dark:text-white transition-all">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        {error && <div className="mb-4 text-sm text-red-500 text-center">{error}</div>}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mb-4 py-3 rounded-lg border flex items-center justify-center gap-3 bg-white text-gray-700 border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition"
        >
          <img src="/google.png" alt="Google" className="w-7 h-5" />
          Login dengan Google
        </button>

        <div className="flex items-center gap-3 my-4">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="text-sm text-gray-400">atau</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        {/* Email Login */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg border bg-gray-100 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Belum punya akun? <a href="/register" className="text-blue-600 hover:underline">Daftar</a>
        </p>
      </div>
    </div>
  );
}
