import { NextResponse } from "next/server";
import connection from "@/app/lib/mongodb";
import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await connection();

    const body = await request.json();
    const { username, email, password } = body;

   
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

 
    const exists = await Users.findOne({ email: normalizedEmail });
    if (exists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await Users.create({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user", // change manually in DB if admin
    });

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "User created successfully",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
