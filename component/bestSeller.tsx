"use client";
import { Repeat } from "lucide-react";
import { useState,useEffect } from "react"
export default function BestSeller() {

    const bestProducts = [
        { id: 1, image: "/image/product1.webp", itemDetails: "Chaussures de sport", price: "85.00€" },
        { id: 2, image: "/image/product2.jpeg", itemDetails: "Montre connectée", price: "199.00€" },
        { id: 3, image: "/image/product2.jpg", itemDetails: "Sac à dos", price: "45.00€" },
        { id: 4, image: "/image/product4.webp", itemDetails: "Casque Audio", price: "120.00€" },
        { id: 5, image: "/image/product5.webp", itemDetails: "Clavier RGB", price: "75.00€" },
        { id: 6, image: "/image/product7.png", itemDetails: "Souris Gamer", price: "55.00€" },
        { id: 7, image: "/image/product8.png", itemDetails: "Écran 4K", price: "350.00€" },
        { id: 8, image: "/image/product9.jpg", itemDetails: "Bureau Setup", price: "299.00€" },
      ];
    const [columns ,setColumns]=useState(1);
    useEffect(()=>{
        const updateAllColumn = ()=>{
            if(window.innerWidth >= 1240) setColumns(4)
            else  setColumns(2);
        };
        updateAllColumn();
        window.addEventListener("resize",updateAllColumn);
        return()=>window.removeEventListener("resize",updateAllColumn);

    })
    return(

        <main className="w-full bg-gray-500 mb-[40px] mt-[40px]">
            <section className="max-w-[1400px] max-auto px-[15px] py-[30px]">
                <div
                 style={{
                    display:'grid',
                    gridTemplateColumns :`repeat(${columns}, minmax(0, 1fr))`,
                    gap:'20px'
                 }}>
                    
                {bestProducts.map((bestsellProduct)=>
                 <div className="flex flex-col border-[1px] rounded-[10px] p-[12px] bg-white">
                      <div key={bestsellProduct.id}  className="w-full overflow-hidden rounded-[8px] bg-[#f0f0f0]" >
                        <img src={bestsellProduct.image} 
                         alt={bestsellProduct.itemDetails}
                         className="w-full h-full object-cover"
                        />
                 </div>
                    <div className="mt-[10px] flex flex-col flex-grow">
                        <p className="text-[14px] font-semibold text-[#444]">{bestsellProduct.itemDetails}</p>
                        <span className="text-[18px] font-bold my-[5px] text-black">{bestsellProduct.price}</span>
                        <button className="mt-auto w-full bg-black text-white py-[8px] rounded-[5px]"> ajouter</button>

                    </div>
                    </div>

                 
                    )}

                </div>

            </section>
        </main>
    )
}