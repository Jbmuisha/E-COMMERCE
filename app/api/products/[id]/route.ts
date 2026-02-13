import { NextResponse } from "next/server";
import connection from "@/app/lib/mongodb";
import Product from "@/app/admin/models/product";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    await connection();
    const { id } = params;
    if (!id) return NextResponse.json({ message: "Product id required" }, { status: 400 });

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ message: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (err: any) {
    return NextResponse.json({ message: err.message || "Server error" }, { status: 500 });
  }
}
