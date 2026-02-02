"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../api/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { updateAuth } = useAuth(); // dariContext

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      if (!res.ok) {
        setError(data.error || "Login gagal");
        return;
      }
     
      await updateAuth();

      router.push("/"); 
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div
        className="
          w-full max-w-md rounded-2xl shadow-lg p-8
          bg-white text-gray-800
          dark:bg-gray-800 dark:text-white
          transition-colors
        "
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-3 rounded-lg border
                bg-gray-100 text-gray-800 border-gray-300
                dark:bg-gray-700 dark:text-white dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="
                w-full px-4 py-3 rounded-lg border
                bg-gray-100 text-gray-800 border-gray-300
                dark:bg-gray-700 dark:text-white dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-lg font-semibold
              bg-blue-600 text-white
              hover:bg-blue-700
              disabled:opacity-60 transition
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Belum punya akun?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}
