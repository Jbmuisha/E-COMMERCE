"use client";
import { Heart } from "lucide-react";
import { useCart } from "@/context/Cart";

interface Product {
    id: number;
    image: string;
    itemDetails: string;
    price: string;
    category?: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart?: () => void;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToCart({
            id: product.id.toString(),
            name: product.itemDetails,
            price: parseFloat(product.price.replace('€', '')),
            image: product.image,
            category: product.category || 'Uncategorized'
        });
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative h-[280px] bg-[#FAFAFA] flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.itemDetails}
                    className="max-h-[75%] object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute top-[20px] right-[20px] p-[2px] rounded-full bg-transparent shadow hover:text-red-500 hover:bg-red-100 transition border-none">
                    <Heart size={25} />
                </button>
            </div>
            <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{product.itemDetails}</p>
                <span className="text-xl font-black text-gray-900">{product.price}</span>
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
