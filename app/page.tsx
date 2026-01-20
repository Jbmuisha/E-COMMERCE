"use client";
import HeroCarosel from "@/component/home";
import { useRef } from "react";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/component/ProductCard";

export default function Home() {
  const products = [
    { id: 1, image: "/image/product1.webp", itemDetails: "Chaussures de sport", price: "85.00€" },
    { id: 2, image: "/image/product2.jpeg", itemDetails: "Montre connectée", price: "199.00€" },
    { id: 3, image: "/image/product2.jpg", itemDetails: "Sac à dos", price: "45.00€" },
    { id: 4, image: "/image/product4.webp", itemDetails: "Casque Audio", price: "120.00€" },
    { id: 5, image: "/image/product5.webp", itemDetails: "Clavier RGB", price: "75.00€" },
    { id: 6, image: "/image/product7.png", itemDetails: "Souris Gamer", price: "55.00€" },
    { id: 7, image: "/image/product8.png", itemDetails: "Écran 4K", price: "350.00€" },
    { id: 8, image: "/image/product9.jpg", itemDetails: "Bureau Setup", price: "299.00€" },
  ];

  const logos = [
    { id: 1, image: "/image/ajmal .webp" },
    { id: 2, image: "/image/chanel.svg" },
    { id: 3, image: "/image/dior.png" },
    { id: 4, image: "/image/kalvin.png" },
    { id: 5, image: "/image/lafata.webp" },
    { id: 6, image: "/image/blackopium.png" },
    { id: 7, image: "/image/haramain.png" },
    { id: 8, image: "/image/afana.webp" }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="w-full mt-[80px]">
        <div className="w-full max-w-[1400px] mx-auto px-[4] mb-[24]">
          <HeroCarosel />
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="w-full">
        <div className="w-full max-w-[1400px] mx-auto px-[4]">
          <div className="flex justify-between items-center border-b pb-6 mb-[10]">
            <button className="flex items-center gap-[2] text-sm font-semibold text-gray-600 hover:text-black transition bg-transparent border-none">
              <SlidersHorizontal size={16} />
              Filtrer
            </button>
            <div className="flex gap-[8]">
              {["ALL PERFUMS", "WOMEN'S", "MEN'S"].map((item) => (
                <button
                  key={item}
                  className="text-[11px] font-black tracking-[0.25em] text-gray-400 hover:text-black transition uppercase px-[2] py-[1] border-none"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4 pb-24">
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 gap-[30px] mt-[70px]">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRAND SLIDER ================= */}
      <section className="w-full bg-white py-[12] overflow-hidden border-y border-gray-100 my-[10]">
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
                  className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section
        className="w-full py-[16] overflow-hidden mb-[40px] mt-[20px]"
        style={{ background: "linear-gradient(180deg, #F6F1EB 0%, #F3ECE5 100%)" }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4">

          <div className="mb-16 max-w-xl mb-[20px] mt-[20px]">

            <h2 className="text-3xl md:text-4xl font-black"> Recommanded for you </h2>
          </div>


          <div className="relative w-full group overflow-hidden">

            <div
              ref={carouselRef}
              className="flex gap-[10] overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-10 mb-[20px]"
            >
              {[0, 2, 4, 6].map((startIndex) => (
                <div
                  key={startIndex}
                  className="snap-start flex gap-[8px] min-w-[760px] flex-shrink-0"
                >
                  {products.slice(startIndex, startIndex + 2).map((item, index) => (
                    <div
                      key={item.id}
                      className={`w-1/2 ${index === 1 ? "mt-16" : ""}`}
                    >
                      <div className="bg-white rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full">
                        <ProductCard product={item} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>


            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-[4px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>


            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-[4px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </section>
      <section className="w-full py-[32] bg-white">
        <div className="max-w-[1400px] mx-auto px-[4] grid grid-cols-2 md:grid-cols-2 gap-[20] items-center">


          <div className="h-[520px] rounded-[32px] bg-gradient-to-br from-[#EFE9E3] to-[#E5DED7] flex items-center justify-center">
            <span className="text-6xl font-black text-gray-300">ESSENCE</span>
          </div>


          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-gray-400 mb-[4]">
              Featured Selection
            </p>
            <h3 className="text-4xl font-black mb-[6]">
              Timeless Fragrance
            </h3>
            <p className="text-gray-500 mb-[8] max-w-md">
              A refined scent crafted for everyday elegance.
            </p>
            <p className="text-3xl font-black mb-[8]">199.00€</p>

            <button className="h-[48px] px-[10] rounded-xl border border-black font-semibold hover:bg-black hover:text-white transition">
              Discover
            </button>
          </div>

        </div>
      </section>


    </main>
  );
}
