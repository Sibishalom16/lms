"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/main-layout";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import Card from "@/components/global/card";

export default function StudentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Protect route: redirect unauthorized users
  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session || session.user?.role !== "student") {
      router.replace("/signin");
    }
  }, [session, status, router]);

  // Log session info for submission proof
  console.log("Browser session (Student):", session?.user);

  // Loading state while session is being fetched
  if (status === "loading" || !session || session.user?.role !== "student") {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  return (
    <MainLayout sidebar={<Sidebar role="student" />} navbar={<Navbar />}>
      {/* Whole page background gradient */}
      <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-2 text-white">Student Dashboard</h1>
        <p className="text-lg mb-8 text-white">
          Welcome to your Student Dashboard! 🎉
        </p>

        {/* Dashboard Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h2 className="text-xl font-semibold text-black">My Courses</h2>
            <p className="text-gray-700">
              View and manage your enrolled courses here.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-black">Grades</h2>
            <p className="text-gray-700">
              Check your performance and grades for each subject.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-black">Profile</h2>
            <p className="text-gray-700">
              Update your profile and manage account settings.
            </p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
