import { NextResponse } from "next/server";
import Users from "@/app/admin/models/Users";
import connection from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

/* ------------------ helpers ------------------ */

function verifyAdmin(request: Request) {
  const auth = request.headers.get("authorization");

  if (!auth) {
    throw new Error("Unauthorized");
  }

  const token = auth.split(" ")[1];
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  if (decoded.role !== "Admin") {
    throw new Error("Forbidden");
  }

  return decoded;
}

/* ------------------ GET /api/users ------------------ */
export async function GET(request: Request) {
  try {
    await connection();
    verifyAdmin(request);

    const users = await Users.find().select("-password");

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

/* ------------------ POST /api/users ------------------ */
export async function POST(request: Request) {
  try {
    await connection();
    verifyAdmin(request);

    const { username, email, password, role } = await request.json();

    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const exists = await Users.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 401 }
    );
  }
}

/* ------------------ PUT /api/users ------------------ */
export async function PUT(request: Request) {
  try {
    await connection();
    verifyAdmin(request);

    const { id, username, email, role } = await request.json();

    const user = await Users.findByIdAndUpdate(
      id,
      { username, email, role },
      { new: true }
    ).select("-password");

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 401 }
    );
  }
}
