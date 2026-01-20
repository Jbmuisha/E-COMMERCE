"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/component/ProductCard";
import { products } from "@/data/products";

export default function HommeParfum() {
  const [columns, setColumns] = useState(1);

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

  const menProducts = products.filter(product => product.category === 'men');

  return (
    <main className="w-full bg-gray-50 min-h-screen pt-[70px]">
      <section className="max-w-[1400px] mx-auto px-4 py-12">
        <h1 className="text-4xl font-black mb-12">Men's Collection</h1>
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
          }}
        >
          {menProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </main>
  );
}