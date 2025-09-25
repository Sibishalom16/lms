import { NextResponse } from "next/server";
import connectToDatabase from "../../../utils/mongodb.js"; // utils is outside app, go up 3 levels
import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validation
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!["student", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    

    // Connect to DB
    await connectToDatabase();

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    // Success response
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: { id: newUser._id.toString(), name: newUser.name, email: newUser.email, role: newUser.role },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
