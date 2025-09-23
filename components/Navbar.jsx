export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold tracking-wide">LMS</h1>
      <ul className="flex gap-6">
        <li>
          <a href="/" className="hover:text-yellow-300 transition">Home</a>
        </li>
        <li>
          <a href="/dashboard" className="hover:text-yellow-300 transition">Dashboard</a>
        </li>
        <li>
          <a href="/login" className="hover:text-yellow-300 transition">Login</a>
        </li>
      </ul>
    </nav>
  );
}
