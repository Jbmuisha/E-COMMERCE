"use client";
import { Heart } from "lucide-react";
export default function () {
  const product = [
    { id: 1, image: "/image/product1.webp", itemDetails: "Chaussures de sport", price: "85.00€" },
    { id: 2, image: "/image/product2.jpeg", itemDetails: "Montre connectée", price: "199.00€" },
    { id: 3, image: "/image/product2.jpg", itemDetails: "Sac à dos", price: "45.00€" },
    { id: 4, image: "/image/product 4.webp", itemDetails: "Casque Audio", price: "120.00€" },
    { id: 5, image: "/image/product 5.webp", itemDetails: "Clavier RGB", price: "75.00€" },
    { id: 6, image: "/image/product 7.png", itemDetails: "Souris Gamer", price: "55.00€" },
    { id: 7, image: "/image/product8.png", itemDetails: "Écran 4K", price: "350.00€" },
    { id: 8, image: "/image/product9.jpg", itemDetails: "Bureau Setup", price: "299.00€" },
  ]
  return (
    <section className="w-full">
      <div className="w-full max-w-[1400px] mx-auto px-[4] pb-24">
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 gap-[30px] mt-[70px]">
          {product.map((item) => (
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
                <button className="absolute top-[20px] right-[20px] p-[2px] rounded-full bg-transparent shadow hover:text-red-500 hover:bg-red transition border-none">
                  <Heart size={25} />
                </button>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{item.itemDetails}</p>
                <span className="text-xl font-black text-gray-900">{item.price}</span>
                <button className="mt-6 w-full h-[46px] rounded-xl border border-black text-black text-sm font-semibold tracking-wide bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black-500 hover:text-white">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  )
}