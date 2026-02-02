"use client";

import Link from "next/link";
import { ChevronDown, Sun, Moon } from "lucide-react";
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

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setDropdownOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="w-full shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          Fatkhulloh_Login
        </h1>

        <div className="flex items-center gap-4 md:gap-6 font-medium">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!user && (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-8 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Daftar
              </Link>
            </>
          )}

          {user && (
            <div className="relative">
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.username}
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border rounded-lg shadow-lg py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
