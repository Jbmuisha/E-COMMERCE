// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import connection from "@/app/lib/mongodb";
import Users from "@/app/admin/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

function verifyAdmin(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) throw new Error("Unauthorized");
  if (!process.env.JWT_SECRET) throw new Error("JWT secret not configured");

  const token = auth.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; role: string };
  if (decoded.role !== "admin") throw new Error("Forbidden");

  return decoded;
}

export async function GET(request: Request) {
  await connection();
  verifyAdmin(request);
  const users = await Users.find().select("-password");
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  await connection();
  verifyAdmin(request);
  const { username, email, password, role } = await request.json();
  if (!username || !email || !password || !role)
    return NextResponse.json({ message: "All fields required" }, { status: 400 });

  const exists = await Users.findOne({ email: email.toLowerCase() });
  if (exists) return NextResponse.json({ message: "Email exists" }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await Users.create({ username, email: email.toLowerCase(), password: hashed, role });

  return NextResponse.json({ id: user._id, username: user.username, email: user.email, role: user.role }, { status: 201 });
}

export async function PUT(request: Request) {
  await connection();
  verifyAdmin(request);
  const { id, role } = await request.json();
  const user = await Users.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
  return NextResponse.json(user);
}
