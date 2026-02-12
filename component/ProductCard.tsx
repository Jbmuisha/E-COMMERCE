"use client";

import { Heart } from "lucide-react";
import { useCart } from "@/context/Cart";

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category?: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Provide defaults so TS is happy
    const cartItem = {
      id: product._id,                 // ✅ required
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category || "Uncategorized", // ✅ default string
      description: product.description || "",        // ✅ default string
    };

    addToCart(cartItem);

    if (onAddToCart) onAddToCart(product);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-[280px] bg-[#FAFAFA] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-[75%] object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <button className="absolute top-[20px] right-[20px] p-[2px] rounded-full bg-transparent shadow hover:text-red-500 hover:bg-red-100 transition border-none">
          <Heart size={25} />
        </button>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-2">{product.name}</p>
        <span className="text-xl font-black text-gray-900">
          {product.price.toFixed(2)}€
        </span>
        <button
          onClick={handleAddToCart}
          className="mt-6 w-full h-[46px] rounded-xl border border-black text-black text-sm font-semibold tracking-wide bg-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
