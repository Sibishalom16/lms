
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import MainLayout from "../layout/main-layout";
import Sidebar from "../layout/sidebar";
import Navbar from "../layout/navbar";
import Card from "../global/card";
// Import the exported auth options from your nextauth route
import { NEXT_AUTH } from "../api/auth/[...nextauth]/route";

export default async function AdminDashboardPage() {
  // Server-side session fetch
  const session = await getServerSession(NEXT_AUTH);

  // Protect route on server
  if (!session || session.user?.role !== "admin") {
    // Server-side redirect
    redirect("/signin");
  }

  // Server console log (submission proof)
  console.log("Server session (Admin):", session.user);

  return (
    <MainLayout sidebar={<Sidebar role="admin" />} navbar={<Navbar />}>
      <div className="min-h-screen bg-gray-50 p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-6 text-black">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold mb-2 text-black">Welcome!</h2>
            <p className="text-black">
              This is your admin dashboard. Here you can find your courses,
              progress, and admin tools.
            </p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-2 text-black">Manage Users</h2>
            <p className="text-black">
              View, edit, and manage users and permissions.
            </p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

