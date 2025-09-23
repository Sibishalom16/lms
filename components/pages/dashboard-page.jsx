"use client";
import React from "react";
import MainLayout from "../layout/main-layout";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/navbar";
import Card from "../global/card";

export default function DashboardPage() {
  return (
    <MainLayout
      sidebar={<Sidebar role="admin" />}
      navbar={<Navbar />}
    >
      {/* Whole page background gradient */}
      <div className="min-h-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 p-8 rounded-xl">
        <h1 className="text-4xl font-bold mb-2 text-white">Dashboard</h1>
        <p className="text-lg mb-8 text-white">
          Welcome to your dashboard! 🎉
        </p>

      </div>
    </MainLayout>
  );
}
