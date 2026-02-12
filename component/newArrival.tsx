"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductModel from "@/app/admin/models/product";
import { InferSchemaType } from "mongoose";
import { useTranslation } from "@/context/Translation";

type ProductType = InferSchemaType<typeof ProductModel.schema>;

export default function NewArrival() {
  const { t } = useTranslation();
  const [columns, setColumns] = useState(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Adjust columns based on screen size
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

  // Fetch new arrival products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?newArrival=true");
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
    <main className="w-full bg-white mb-10 mt-10">
      <section className="max-w-[1400px] mx-auto px-4 py-8">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6">
          {t("common.newArrival")}
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No new arrivals found.</p>
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
