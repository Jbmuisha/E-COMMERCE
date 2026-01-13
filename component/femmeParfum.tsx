"use client";
import { useState, useEffect } from "react";

export default function WomenParfum() {
    
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth >= 1024) setColumns(4);
            else if (window.innerWidth >= 640) setColumns(2);
            else setColumns(2);
        };
        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);
    const womenProduct = [
        { id: 1, image: "/image/product1.webp", itemDetails: "Chaussures de sport", price: "85.00€" },
        { id: 2, image: "/image/product2.jpeg", itemDetails: "Montre connectée", price: "199.00€" },
        { id: 3, image: "/image/product2.jpg", itemDetails: "Sac à dos", price: "45.00€" },
        { id: 4, image: "/image/product4.webp", itemDetails: "Casque Audio", price: "120.00€" },
        { id: 5, image: "/image/product5.webp", itemDetails: "Clavier RGB", price: "75.00€" },
        { id: 6, image: "/image/product7.png", itemDetails: "Souris Gamer", price: "55.00€" },
        { id: 7, image: "/image/product8.png", itemDetails: "Écran 4K", price: "350.00€" },
        { id: 8, image: "/image/product9.jpg", itemDetails: "Bureau Setup", price: "299.00€" },
    ];
    return (
        <main className="w-full bg-[#ffffff]">
            <section className="max-w-[1400px] mx-auto px-[15px] py-[30px] mt-[40px] mb-[40px]">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    gap: '20px'
                }}>
                    {womenProduct.map((item) => (
                        <div key={item.id} className="flex flex-col border-[1px] border-[#dddddd] rounded-[10px] p-[12px] bg-white">
                            <div className="aspect-square w-full overflow-hidden rounded-[8px] bg-[#f0f0f0]">
                                <img 
                                    src={item.image}
                                    alt={item.itemDetails}
                                    className="w-full h-full object-cover" 
                                />
                            </div>
                            <div className="mt-[10px] flex flex-col flex-grow">
                                <p className="text-[14px] font-semibold text-[#444]">{item.itemDetails}</p>
                                <span className="text-[18px] font-bold my-[5px] text-black">{item.price}</span>
                                <button className="mt-auto w-full bg-black text-white py-[8px] rounded-[5px]">
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
