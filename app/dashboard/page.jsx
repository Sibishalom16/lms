export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      {/* Navbar */}
      <nav className="flex justify-end items-center p-4">
        <ul className="flex gap-6">
          <li><a href="/" className="hover:text-yellow-300 transition">Home</a></li>
          <li><a href="/dashboard" className="hover:text-yellow-300 transition">Dashboard</a></li>
          <li><a href="/login" className="hover:text-yellow-300 transition">Login</a></li>
        </ul>
      </nav>

      {/* Dashboard Content */}
      <div className="p-10">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <p className="text-lg">Welcome to your dashboard! 🎉</p>
      </div>
    </div>
  );
}
