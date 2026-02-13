import { NextResponse } from "next/server";
import connection from "@/app/lib/mongodb";
import Product from "@/app/admin/models/product"; // if file is lowercase

import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

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

// POST add new product with image upload (multipart/form-data)
export async function POST(req: Request) {
  await connection();
  verifyAdmin(req);

  // Parse multipart form data
  const form = await req.formData();
  const name = form.get("name");
  const price = form.get("price");
  const description = form.get("description");
  const image = form.get("image") as unknown as File | null;

  if (!name || !price) {
    return NextResponse.json({ message: "Name and price are required" }, { status: 400 });
  }

  let imageUrl: string | undefined;

  if (image && typeof image === "object") {
    
    const mime = (image as any).type as string | undefined;
    const size = (image as any).size as number | undefined;

    if (mime && !mime.startsWith("image/")) {
      return NextResponse.json({ message: "Only image uploads are allowed" }, { status: 400 });
    }
    if (size && size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "Image too large (max 5MB)" }, { status: 400 });
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const originalName = (image as any).name || `upload-${Date.now()}`;
    const safeName = String(originalName).replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filename = `${Date.now()}-${safeName}`;
    const filepath = path.join(uploadsDir, filename);

    await fs.writeFile(filepath, buffer);

    // Public URL under Next.js /public
    imageUrl = `/uploads/${filename}`;
  }

  if (!imageUrl) {
    return NextResponse.json({ message: "Product image is required" }, { status: 400 });
  }

  const product = await Product.create({
    name: String(name),
    image: imageUrl,
    price: Number(price),
    description: description ? String(description) : undefined,
  });

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
