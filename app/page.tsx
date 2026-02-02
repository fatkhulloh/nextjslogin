"use client";

import { useAuth } from "./api/context/AuthContext";
import PublicDashboard from "./layout/PublicDashboard";
import PrivateDashboard from "./layout/PrivateDashboard";

export default function Home() {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Checking session...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {user ? <PrivateDashboard user={user} /> : <PublicDashboard />}
    </div>
  );
}
