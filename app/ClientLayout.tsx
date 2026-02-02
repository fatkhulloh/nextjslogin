"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbars from "./layout/Navbars";
import Footer from "./layout/Footer";
import { useAuth } from "./api/context/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, setUser } = useAuth();

  const [darkMode, setDarkMode] = useState(false);

  // halaman tanpa navbar
  const hideNavbar = pathname === "/login" || pathname === "/register";

  // load dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") setDarkMode(true);
  }, []);

  // apply dark mode ke html
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

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
          toggleDarkMode={toggleDarkMode}
        />
      )}

      <main className="min-h-[calc(100vh-130px)]">{children}</main>

      {!hideNavbar && <Footer />}
    </div>
  );
}
