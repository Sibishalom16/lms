"use client";
import React from "react";

export default function Sidebar({ role }) {
  // Define menu items based on role
  const menuItems = role === "Admin"
    ? [
        { label: "Admin Dashboard", href: "/admin/dashboard" },
        { label: "Edit Lessons", href: "/admin/lessons" },
        { label: "Manage Users", href: "/admin/users" },
        { label: "Logout", href: "/logout" },
      ]
    : [
        { label: "Student Dashboard", href: "/student/dashboard" },
        { label: "My Courses", href: "/student/courses" },
        { label: "Assignments", href: "/student/assignments" },
        { label: "Logout", href: "/logout" },
      ];

  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg p-6">
      <ul className="space-y-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className="block px-3 py-2 rounded-lg hover:bg-gray-200 font-medium text-gray-700"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
