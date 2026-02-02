'use client'

import { useState, useEffect } from "react"
import Navbars from "./layout/Navbars";
import Footer from "./layout/Footer";
import PublicDashboard from "./layout/PublicDashboard";
import PrivateDashboard from "./layout/PrivateDashboard";
// interface UserData {
//   id:number ,
//   username: string,
//   email: string
// }
export default function Home() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // cek login saat load halaman
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me"); // endpoint ambil user dari JWT
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbars user={user} setUser={setUser} />

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        {loadingUser ? (
          <p className="text-gray-500">Checking session...</p>
        ) : user ? (
          // Jika login Valid
          <PrivateDashboard user={user} />
        ) : (
          // Public Dashboard
          <PublicDashboard />
        )}
      </main>

      <Footer />
    </div>
  );
}
