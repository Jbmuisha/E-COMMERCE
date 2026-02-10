import { NextResponse } from "next/server";
import connection from "@/app/lib/mongodb";
import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(request: Request) {
  await connection();

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ message: "All fields required" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase();
  const user = await Users.findOne({ email: normalizedEmail }).select("+password");

  if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");

  const token = jwt.sign({ id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  return NextResponse.json({
    token,
    user: { id: user._id.toString(), username: user.username, email: user.email, role: user.role },
  });
}
