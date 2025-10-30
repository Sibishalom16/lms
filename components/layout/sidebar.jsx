"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Sidebar() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const handleLogout = async () => {
    try {
      const loadingToast = toast.loading("Logging out...", {
        duration: Infinity,
      });
      await signOut({ callbackUrl: "/signin" }); // redirects to signin after logout
      toast.dismiss(loadingToast);
      toast.success("You have been logged out successfully!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="w-64 bg-white p-6 shadow-md h-screen border-r">
      <ul className="space-y-4">
        {role === "admin" ? (
          <>
            <li>
              <Link href="/admin-dashboard" className="font-semibold text-blue-600">
                Admin Dashboard
              </Link>
            </li>
            <li><Link href="#">Edit Lessons</Link></li>
            <li><Link href="#">Manage Users</Link></li>
          </>
        ) : (
          <>
            <li>
              <Link href="/student-dashboard" className="font-semibold text-green-600">
                Student Dashboard
              </Link>
            </li>
            <li><Link href="#">My Courses</Link></li>
            <li><Link href="#">Grades</Link></li>
            <li><Link href="#">Profile</Link></li>
          </>
        )}

        {/* ✅ Logout Button */}
        <li>
          <button
            onClick={handleLogout}
            className={`w-full text-left ${
              role === "admin"
                ? "text-blue-600 hover:text-blue-800"
                : "text-green-600 hover:text-green-800"
            }`}
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
