"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/layout/sidebar.jsx";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
    else if (session.user.role !== "admin") router.push("/student-dashboard");
    else console.log("Admin session:", session.user);
  }, [session, status, router]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-3 text-blue-700">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome, {session?.user?.name || "Admin"}! This is your admin
            dashboard. Here you can manage lessons, users, and monitor progress.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              Manage Users
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition">
              Edit Lessons
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
