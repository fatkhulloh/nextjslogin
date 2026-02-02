"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loadingUser: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  updateAuth: () => Promise<void>; // 🔥 TAMBAHAN
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // 🔥 BIKIN FUNGSI BISA DIPANGGIL ULANG
  const updateAuth = async () => {
    try {
      setLoadingUser(true);

      const res = await fetch("/api/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user ?? null);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth error:", err);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  // 🔥 CEK LOGIN SAAT APP LOAD
  useEffect(() => {
    updateAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        setUser,
        updateAuth, // 👈 expose ke luar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
