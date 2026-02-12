"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/component/ProductCard";
import ProductModel from "@/app/admin/models/product"; // Mongoose model

// Define TypeScript type based on your schema
export interface ProductType {
  _id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
  category?: string;
  createdAt?: string;
}

export default function HommeParfum() {
  const [columns, setColumns] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Dynamically adjust columns based on screen width
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1280) setColumns(4);
      else if (window.innerWidth >= 1024) setColumns(3);
      else if (window.innerWidth >= 640) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: ProductType[] = await res.json(); // Use the type here
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error loading products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const menProducts = products.filter((product) => product.category === "men");

  if (loading)
    return <p className="text-center mt-12 text-gray-700">Loading products...</p>;
  if (error)
    return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <main className="w-full bg-gray-50 min-h-screen pt-[70px]">
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h1 className="text-4xl font-black mb-12">Men's Collection</h1>

        {menProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {menProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
