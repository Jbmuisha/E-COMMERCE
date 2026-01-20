"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/component/ProductCard";
import { products } from "@/data/products";

export default function WomenParfum() {
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

    const womenProducts = products.filter(product => product.category === 'women');

    return (
        <main className="w-full bg-white">
            <section className="max-w-[1400px] mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">Women's Collection</h1>
                <div
                    className="grid gap-6"
                    style={{
                        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
                    }}
                >
                    {womenProducts.map((product) => (
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