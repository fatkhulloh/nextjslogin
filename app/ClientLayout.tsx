"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbars from "./layout/Navbars";
import Footer from "./layout/Footer";
import { useAuth } from "./api/context/AuthContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, setUser, loadingUser } = useAuth();

  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  const hideNavbar = pathname === "/login" || pathname === "/register";

  // sync dark mode  before render (Hindari Glitch)
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    setDarkMode(saved === "true");
  }, []);

  // apply dark mode
  useEffect(() => {
    if (darkMode === null) return;
    const html = document.documentElement;
    html.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

 
  if (loadingUser || darkMode === null) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors" />
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      {!hideNavbar && (
        <Navbars
          user={user}
          setUser={setUser}
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
        />
      )}

      <main className="min-h-[calc(100vh-80px)]">{children}</main>

      {!hideNavbar && <Footer />}
    </div>
  );
}
