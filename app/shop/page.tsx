"use client";

import HeroCarosel from "@/component/home";
import { useRef, useState, useEffect } from "react";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { Product } from "@/component/ProductCard";
import ProductModel from "@/app/admin/models/product"; // Mongoose model
import { InferSchemaType } from "mongoose";

type ProductType = InferSchemaType<typeof ProductModel.schema>;

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const logos = [
    { id: 1, image: "/image/ajmal.webp" },
    { id: 2, image: "/image/chanel.svg" },
    { id: 3, image: "/image/dior.png" },
    { id: 4, image: "/image/kalvin.png" },
    { id: 5, image: "/image/lafata.webp" },
    { id: 6, image: "/image/blackopium.png" },
    { id: 7, image: "/image/haramain.png" },
    { id: 8, image: "/image/afana.webp" },
  ];

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/product");
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

  if (loading) return <p className="text-center mt-12 text-gray-700">Loading products...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <div className="w-full">
      <section className="w-full">
        <div className="max-w-[1400px] mx-auto px-4 mb-6">
          <HeroCarosel />
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="w-full">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex justify-between items-center border-b pb-1 mb-1">
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-black transition">
              <SlidersHorizontal size={16} />
              Filtrer
            </button>

            <div className="flex gap-2">
              {["ALL PERFUMS", "WOMEN'S", "MEN'S"].map((item) => (
                <button
                  key={item}
                  className="text-[11px] font-black tracking-[0.25em] text-gray-400 hover:text-black transition uppercase px-2 py-1"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="w-full">
        <div className="max-w-[1400px] mx-auto px-4 pb-24">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    _id: product._id.toString(),
                    name: product.name,
                    image: product.image,
                    price: product.price, // number ✅
                    description: product.description,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BRAND SLIDER */}
      <section className="w-full bg-white py-12 overflow-hidden border-y border-gray-100 my-10">
        <div className="relative max-w-[1400px] mx-auto">
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="slide-track-custom flex gap-8">
            {[...logos, ...logos].map((img, index) => (
              <div
                key={index}
                className="flex w-[250px] h-[100px] items-center justify-center px-8 flex-shrink-0"
              >
                <img
                  src={img.image}
                  alt="brand logo"
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECOMMENDED */}
      <section
        className="w-full py-16 overflow-hidden mb-20 mt-20"
        style={{ background: "linear-gradient(180deg, #F6F1EB 0%, #F3ECE5 100%)" }}
      >
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-8">Recommended for you</h2>
          <div className="relative group">
            <div
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-10"
            >
              {[0, 2, 4, 6].map((start) => (
                <div key={start} className="snap-start flex gap-8 min-w-[760px]">
                  {products.slice(start, start + 2).map((item, i) => (
                    <div key={item._id} className={`w-1/2 ${i === 1 ? "mt-16" : ""}`}>
                      <div className="bg-white rounded-[32px] p-8 hover:-translate-y-2 hover:shadow-2xl transition">
                        <ProductCard
                          product={{
                            _id: item._id.toString(),
                            name: item.name,
                            image: item.image,
                            price: item.price,
                            description: item.description,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
