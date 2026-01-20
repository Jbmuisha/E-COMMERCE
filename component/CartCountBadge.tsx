"use client";

import { useCart } from "@/context/Cart";

export default function CartCountBadge() {
    const { cartCount } = useCart();

    if (cartCount === 0) return null;

    return (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
        </span>
    );
}
