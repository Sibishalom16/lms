import Link from "next/link";
import Button from "../components/global/button";
import CourseCard from "../components/CourseCard";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-end items-center p-4">
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
          </li>
          <li>
            <Link href="/admin-dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
          </li>
          <li>
            <Link href="/signin" className="hover:text-yellow-300 transition">Login</Link>
          </li>
          <li>
            <Link href="/signup" className="hover:text-yellow-300 transition">Sign Up</Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to LMS</h1>
        <p className="text-lg mb-6">Your learning starts here 🚀</p>
        <Button>Get Started</Button>
      </section>

      {/* Courses */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Popular Courses
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <CourseCard
            title="React for Beginners"
            description="Learn the basics of React and build interactive UIs."
          />
          <CourseCard
            title="Next.js Mastery"
            description="Dive into Next.js and explore server-side rendering and more."
          />
          <CourseCard
            title="Tailwind CSS Crash Course"
            description="Style your apps quickly with Tailwind CSS utilities."
          />
        </div>
      </section>
    </div>
  );
}
