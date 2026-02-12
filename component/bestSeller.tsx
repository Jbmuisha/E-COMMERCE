"use client";
import { useState, useEffect } from "react";
import ProductCard, { Product as ProductType } from "@/component/ProductCard";

export default function BestSeller() {
  const [columns, setColumns] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Adjust grid columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1280) setColumns(4);
      else if (window.innerWidth >= 768) setColumns(3);
      else if (window.innerWidth >= 640) setColumns(2);
      else setColumns(1);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Fetch best seller products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?bestSeller=true"); // you can mark best sellers in DB
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: ProductType[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error loading products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center mt-12 text-gray-700">Loading products...</p>;
  if (error)
    return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <main className="w-full bg-gray-50 mb-10 mt-10">
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No best sellers found.</p>
        ) : (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
