"use client"
import { useState } from "react";
import Button from "../../components/global/button";
import InputField from "../../components/global/input-field";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      // For now, just log the form data
      console.log("Login submitted:", form);
      alert("Login successful 😊");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400">
      
      {/* Navbar */}
      <nav className="flex justify-end items-center p-4 text-white">
        <ul className="flex gap-6 text-lg">
          <li><a href="/" className="hover:scale-110 transition-transform">Home</a></li>
          <li><a href="/dashboard" className="hover:scale-110 transition-transform">Dashboard</a></li>
          <li><a href="/login" className="hover:scale-110 transition-transform">Login</a></li>
        </ul>
      </nav>

      {/* Login Form */}
      <div className="flex flex-1 justify-center items-center px-4">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button type="submit" className="mt-2">Login</Button>

        </form>
      </div>
    </div>
  );
}
