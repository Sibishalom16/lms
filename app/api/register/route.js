import { NextResponse } from 'next/server';

let users = []; // mock in-memory array

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // Validation
    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!['student', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role selected' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    // Check duplicate
    if (users.find(user => user.email === email)) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // NOTE: Not hashed in mock
      name,
      role,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    console.log("✅ User registered:", newUser);

    return NextResponse.json(
      { message: "User registered successfully", user: { id: newUser.id, email, name, role } },
      { status: 201 }
    );

  } catch (err) {
    console.error("❌ Registration error:", err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
