"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../../components/global/button";
import InputField from "../../components/global/input-field";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    // Simple validation
    const newErrors = {};
    if (!form.name) newErrors.name = "Name required";
    if (!form.email) newErrors.email = "Email required";
    if (!form.password) newErrors.password = "Password required";
    if (!form.role) newErrors.role = "Role required";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Register user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ general: data.error });
        setLoading(false);
        return;
      }

      setSuccess(data.message);

      // Wait a bit for DB consistency
      await new Promise((r) => setTimeout(r, 500));

      // Auto-login after signup
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (loginRes?.ok) {
        // Fetch session to get user role
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        const role = session?.user?.role;

        router.push(role === "admin" ? "/admin-dashboard" : "/student-dashboard");
      } else {
        setErrors({
          general: "Auto-login failed. Please login manually.",
        });
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Signup</h2>

        <InputField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <label className="text-gray-700 font-medium">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <p className="text-red-500">{errors.role}</p>}

        {errors.general && (
          <p className="text-red-500 text-center">{errors.general}</p>
        )}
        {success && (
          <p className="text-green-500 text-center">{success}</p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
