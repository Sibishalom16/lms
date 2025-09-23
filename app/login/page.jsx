import Button from "../../components/global/button";



export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400">
      <nav className="flex justify-end items-center p-4 text-white">
        <ul className="flex gap-6 text-lg">
          <li><a href="/" className="hover:scale-110 transition-transform">Home</a></li>
          <li><a href="/dashboard" className="hover:scale-110 transition-transform">Dashboard</a></li>
          <li><a href="/login" className="hover:scale-110 transition-transform">Login</a></li>
        </ul>
      </nav>

      <div className="flex flex-1 justify-center items-center">
        <form className="bg-white p-10 rounded-2xl shadow-2xl w-80 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          <label className="font-semibold text-gray-700">Email</label>
          <input type="email" placeholder="Enter your email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1 shadow-sm transition"/>
          <label className="font-semibold text-gray-700">Password</label>
          <input type="password" placeholder="Enter your password" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-1 shadow-sm transition"/>
          <Button type="submit" className="mt-4">Login</Button>
        </form>
      </div>
    </div>
  );
}
