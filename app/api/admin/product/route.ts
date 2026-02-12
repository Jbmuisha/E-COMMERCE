import { NextResponse } from "next/server";
import connection from "@/app/lib/mongodb";
import Product from "@/app/admin/models/product"; // if file is lowercase

import jwt from "jsonwebtoken";

export const runtime = "nodejs";

// Middleware to verify admin token
function verifyAdmin(request: Request) {
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) throw new Error("Unauthorized");
  if (!process.env.JWT_SECRET) throw new Error("JWT secret not configured");

  const token = auth.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string; role: string };

  if (decoded.role !== "admin") throw new Error("Forbidden");

  return decoded;
}

// GET all products
export async function GET() {
  await connection();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
}

// POST add new product
export async function POST(req: Request) {
  await connection();
  verifyAdmin(req);

  const body = await req.json();
  const { name, image, price, description } = body;

  if (!name || !image || !price) {
    return NextResponse.json({ message: "Name, image, and price required" }, { status: 400 });
  }

  const product = await Product.create({ name, image, price, description });

  return NextResponse.json(product, { status: 201 });
}

// PUT update product
export async function PUT(req: Request) {
  await connection();
  verifyAdmin(req);

  const body = await req.json();
  const { id, name, image, price, description } = body;

  const product = await Product.findByIdAndUpdate(
    id,
    { name, image, price, description },
    { new: true }
  );

  if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json(product);
}

// DELETE product
export async function DELETE(req: Request) {
  await connection();
  verifyAdmin(req);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Product id required" }, { status: 400 });

  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ message: "Product not found" }, { status: 404 });

  return NextResponse.json({ message: "Product deleted" });
}
