"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/layout/sidebar.jsx";

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
    else if (session.user.role !== "student") router.push("/admin-dashboard");
    else console.log("Student session:", session.user);
  }, [session, status, router]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-br from-purple-600 via-pink-500 to-fuchsia-500 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg text-center">
          <h1 className="text-4xl font-bold mb-3 text-green-700">
            Student Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome, {session?.user?.name || "Student"}! Here you can view your
            enrolled courses, grades, and profile info.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition">
              My Courses
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition">
              View Grades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
