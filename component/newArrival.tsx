"use client";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { useTranslation } from "@/context/Translation";

export default function NewArrival() {
    const { t } = useTranslation();
    
    return (
       
       <main className="w-full bg-white mb-[20px] md:mb-[40px] mt-[20px] md:mt-[40px]">
            <section className="max-w-[1400px] mx-auto px-[8px] md:px-[4px] py-[8px] md:py-[12px]">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 fixed top-[144px] left-0 right-0 max-w-[1400px] mx-auto px-[8px] md:px-[4px] bg-white z-30 py-2">{t("common.newArrival")}</h1>
                <div className="pt-[50px] md:pt-[60px]">
                <div className="new-arrival-grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                </div>
            </section>   
        </main>
    );
}