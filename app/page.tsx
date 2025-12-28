import HeroCarosel from "@/component/home";
import { Heart, SlidersHorizontal  } from "lucide-react";

export default function Home() {
  const products = [
    {
      id: 1,
      image: "/image/product1.webp",
      itemDetails: "Chaussures de sport",
      price: "85.00€",
    },
    {
      id: 2,
      image: "/image/product2.jpeg",
      itemDetails: "Montre connectée",
      price: "199.00€",
    },
    {
      id: 3,
      image: "/image/product2.jpg",
      itemDetails: "Sac à dos",
      price: "45.00€",
    },
    {
      id: 4,
      image: "/image/product 4.webp",
      itemDetails: "Casque Audio",
      price: "120.00€",
    },
    {
      id: 5,
      image: "/image/product 5.webp",
      itemDetails: "Clavier RGB",
      price: "75.00€",
    },
    {
      id: 6,
      image: "/image/product 7.png",
      itemDetails: "Souris Gamer",
      price: "55.00€",
    },
    {
      id: 7,
      image: "/image/product8.png",
      itemDetails: "Écran 4K",
      price: "350.00€",
    },
    {
      id: 8,
      image: "/image/product9.jpg",
      itemDetails: "Bureau Setup",
      price: "299.00€",
    },
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

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="w-full mt-[80px]">
        <div className="w-full max-w-[1400px] mx-auto px-4 mb-24">
          <HeroCarosel />
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="w-full">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="flex justify-between items-center border-b pb-6 mb-10">
            {/* Left */}
            <button className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition  bg-transparent border-none">
              <SlidersHorizontal size={16} />
              Filtrer
            </button>

            {/* Right */}
            <div className="flex gap-8">
              {["ALL PERFUMS", "WOMEN'S", "MEN'S"].map((item) => (
                <button
                  key={item}
                  className="text-[11px] font-black tracking-[0.25em] text-gray-400 hover:text-black transition uppercase mr-[30px] px-[6px] py-[7px] border-none"

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
        
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[70px]">
            {products.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
             
                <div className="relative h-[280px] bg-[#FAFAFA] flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.itemDetails}
                    className="max-h-[75%] object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                
                  <button className="absolute top-[20px] right-[20px] p-[2px] rounded-full bg-transparent shadow hover:text-red-500  hover:bg-red transition border-none">
                     <Heart size={25} />
                  </button>
                </div>

               
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">
                    {item.itemDetails}
                  </p>

                  <span
                    className="text-xl 
                  font-black text-gray-900"
                  >
                    {item.price}
                  </span>
                  <button
                    className="
    mt-6
    w-full
    h-[46px]
    rounded-xl
    border
    border-black
    text-black
    text-sm
    font-semibold
    tracking-wide
    bg-transparent
    opacity-0
    group-hover:opacity-100
    transition-all
    duration-300
    hover:bg-black-500
    hover:text-white
  "
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* ================= BRAND SLIDER ================= */}
     {/* ================= BRAND SLIDER ================= */}
     <section className="w-full bg-white py-12 overflow-hidden border-y border-gray-100">
        <div className="relative max-w-[1400px] mx-auto">
          
        
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

         
          <div className="slide-track-custom">
          
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


    </main>
  );
}
