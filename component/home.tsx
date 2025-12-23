"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section className="pt-[80px] bg-[#0d3b3b]">
      <div className="embla w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">

          {/* ================= SLIDE 1 ================= */}
          <div className="embla__slide flex-[0_0_100%] min-w-0 relative h-[650px] bg-[#176767] overflow-hidden">
  
  {/* 1. BACKGROUND WATERMARK (Subtle White) */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <span 
  style={{ color: 'white' }} 
  className="text-[18vw] font-black uppercase leading-none select-none absolute inset-0 flex items-center justify-center"
>
  FRAGRANCE
</span>

  </div>

  <div className="relative z-10 h-full max-w-[1400px] mx-auto flex items-center px-10">
    
    {/* 2. TEXT BLOCK (Forced White) */}
    <div className="w-full md:w-1/2 space-y-8">
      <div className="space-y-4">
        <p className="!text-emerald-300 font-bold tracking-[0.5em] uppercase text-sm">
          New Arrival 2025
        </p>
        
        {/* We use !text-white to stop any global black text rules */}
        <h1 className="text-7xl md:text-9xl font-serif !text-white leading-[0.9] tracking-tighter">
          Pure <br />
          <span className="italic font-light !text-emerald-50">Essence</span>
        </h1>

        <p className="!text-white/80 text-xl max-w-sm font-light leading-relaxed border-l-2 border-emerald-400/40 pl-6">
          Elevate your presence with a scent that defines luxury. Crafted for the modern connoisseur.
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button className="px-10 py-5 bg-white !text-[#176767] font-bold uppercase text-xs tracking-widest hover:bg-black hover:!text-white transition-all duration-500 shadow-2xl">
          Shop the Collection
        </button>
      </div>
    </div>

    {/* 3. IMAGE POSITIONED TO FAR RIGHT BOTTOM */}
    <div className="absolute right-[20px] top-[10px] h-full w-[40%] z-10 flex items-end justify-end">
    <img
      src="/image/product9.jpg"
      alt="Perfume Bottle"
      className="
        h-[95%] w-auto 
        object-contain 
        object-right-bottom
        drop-shadow-[-40px_0px_80px_rgba(0,0,0,0.4)]
      "
    />
  </div>

  </div>
</div>


          {/* ================= SLIDE 2 ================= */}
          <div className="embla__slide flex-[0_0_100%] min-w-0 bg-[#0f3f3f]">
             <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[600px] items-center px-10">
                <div className="text-white">
                   <h2 className="text-7xl font-serif italic">New Arrivals</h2>
                   <p className="mt-4 text-white/60">Limited Edition Seasonal Scents</p>
                </div>
                <div className="h-full bg-white/5 border-l border-white/10 flex items-center justify-center">
                   <span className="text-white/20 text-9xl font-bold">2025</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
