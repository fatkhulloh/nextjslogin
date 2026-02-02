"use client";

import Link from "next/link";
import { ChevronDown, Sun, Moon, Menu, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface User {
  username: string;
}

interface NavbarsProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbars({
  user,
  setUser,
  darkMode,
  toggleDarkMode,
}: NavbarsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="w-full shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          Fatkhulloh_Login
        </h1>

        {/* ===== DESKTOP MENU ===== */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!user && (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Daftar
              </Link>
            </>
          )}

          {user && (
            <div className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.username}
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded-lg shadow-lg py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== MOBILE MENU BUTTON ===== */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className={`fixed top-0 right-0 w-72 h-full shadow-lg p-6 flex flex-col gap-6 transition-colors
             ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>

            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Beranda
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>

            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            {!user && (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-blue-600 text-white text-center py-2 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="border border-blue-600 text-blue-600 text-center py-2 rounded-lg"
                >
                  Daftar
                </Link>
              </>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="text-left text-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
