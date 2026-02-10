import { NextResponse } from "next/server";
import connection from "@/app/lib/mongodb";
import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await connection();

    const body = await request.json();
    const { username, email, password } = body;

   
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
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

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await Users.create({
      Username: username,
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
