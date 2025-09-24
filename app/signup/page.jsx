"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/layout/navbar";
import InputField from "../../components/global/input-field";
import Button from "../../components/global/button";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
      } else {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => router.push("/signin"), 2000);
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-pink-500 flex flex-col text-white">
      <Navbar />

      <section className="flex flex-1 justify-center items-center">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg text-white">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>

          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-center mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <label className="block">
              Role
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border px-2 py-2 rounded mt-1 text-black"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SignupPage;
