"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description?: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Error loading products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <section className="w-full">
      <div className="w-full max-w-[1400px] mx-auto px-4 pb-24">
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-16">
          {products.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-[280px] bg-[#FAFAFA] flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-[75%] object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute top-5 right-5 p-2 rounded-full bg-transparent shadow hover:text-red-500 hover:bg-red transition border-none">
                  <Heart size={25} />
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{item.name}</p>
                <span className="text-xl font-black text-gray-900">{item.price.toFixed(2)}€</span>
                <button className="mt-6 w-full h-[46px] rounded-xl border border-black text-black text-sm font-semibold tracking-wide bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
