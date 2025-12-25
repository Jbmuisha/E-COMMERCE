"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Radius } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


export default function Hero() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section className="pt-[80px] ">
      <div className="embla w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">

        
          <div 
  className="embla__slide flex-[0_0_100%] min-w-0 relative h-[500px] overflow-hidden"
  style={{ 
 
    background: 'linear-gradient(135deg, rgba(10, 20, 45, 1) 0%, rgba(20, 35, 75, 1) 50%, rgba(5, 10, 25, 1) 100%)' 
  }}
>
  
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    <span 
      style={{ 
        color: 'rgba(247, 231, 206, 0.05)', 
        whiteSpace: 'nowrap' 
      }} 
      className="text-[15vw] font-black uppercase leading-none select-none tracking-tighter"
    >
      PRESTIGE
    </span>
  </div>

  
  <div 
    className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[140px] mb-[20px]"
    style={{ background: 'rgba(247, 231, 206, 0.12)' }} 
  />

  <div className="relative z-20 h-full max-w-[1400px] mx-auto flex items-center px-10">
    
  <div className="w-full md:w-1/2 space-y-10 px-[20px] md:pl-[60px] relative z-30">
  
 
  <div className="space-y-4 animate-in fade-in slide-in-from-left duration-1000 mt-[40px]">
    <div className="flex items-center gap-[4px] mb-[20px]">
      <span className="w-12 h-[1px]" style={{ backgroundColor: 'rgba(247, 231, 206, 0.4)' }}></span>
      <p className="font-bold tracking-[0.6em] uppercase text-xs md:text-sm" 
         style={{ color: 'rgba(247, 231, 206, 0.9)' }}>
        Édition Limitée 2025
      </p>
    </div>
    
   
    <h1 className="text-[70px] md:text-[130px] font-serif leading-[0.8] tracking-[-0.04em] !text-white flex flex-col">

  <span className="font-black uppercase tracking-normal">
    Velvet
  </span>
  

  <span className="font-extralight italic opacity-90 ml-[40px] md:ml-[80px] text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7CE] via-white to-[#F7E7CE]">
    Orchid
  </span>
  </h1>
</div>

 
  <div className="relative mt-[40px] group max-w-[500px]">
 
  <div 
    className="absolute left-0 top-[50%] translate-y-[-50%] w-[2px] h-[60px] transition-all duration-700 group-hover:h-full" 
    style={{ backgroundColor: 'rgba(247, 231, 206, 0.6)' }}
  ></div>

  <p 
    className="text-[20px] font-light leading-[1.6] pl-[35px] tracking-[0.02em] italic" 
    style={{ 
      color: 'rgba(255, 255, 255, 0.8)',
    }}
  >
    "Une signature olfactive audacieuse. Conçue pour captiver les sens et laisser une empreinte indélébile dans les mémoires."
  </p>
</div>



  <div className="flex gap-[6px] pt-[6px] items-center">
    <button className="group relative overflow-hidden px-[12px] py-[5px] bg-[#F7E7CE] text-[#0A142D] font-bold uppercase text-xs tracking-[0.2em] transition-all duration-500 hover:pr-[16px] active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-none border rounded-[18px]"
       >
      <span className="relative z-10">Découvrir l'univers</span>
      <span className="absolute right-[4px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
        →
      </span>
    </button>
    
  
    <button className="text-white/50 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors border-none border-white/20 pb-[1px] px-[12px] py-[5px] rounded-[18px]">
      Voir les notes
    </button>
  </div>

</div>

    
    <div className="absolute right-[0px] bottom-[0px] h-full w-[45%] z-10 flex items-end justify-end overflow-visible">
      <img
        src="/image/product10.png"
        alt="Luxury Perfume"
        className="
          h-[92%] w-auto 
          object-contain 
          object-right-bottom
          drop-shadow-[-50px_20px_100px_rgba(0,0,0,0.8)]
          transition-transform duration-1000 hover:scale-105
        "
      />
    </div>

  </div>
</div>
<div 
  className="embla__slide flex-[0_0_100%] min-w-0 relative h-[500px] overflow-hidden"
  style={{
    background: 'linear-gradient(135deg, rgba(5, 20, 60, 1) 0%, rgba(25, 80, 120, 1) 50%, rgba(10, 25, 50, 1) 100%)',

  }}
>

 
  <div className="absolute inset-0 pointer-events-none z-10">
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F7E7CE]/12 blur-[140px]"></div>
    <div className="absolute w-[150px] h-[150px] rounded-full bg-white/10 blur-[60px] top-[10px] left-[16px] animate-bounce-slow"></div>
    <div className="absolute w-[100px] h-[100px] rounded-full bg-white/5 blur-[40px] bottom-[20px] right-[28px] animate-spin-slow"></div>
  </div>

  <div className="relative z-20 h-full max-w-[1400px] mx-auto flex items-center px-[10px]">
   
    <div className="w-1/2 flex items-center justify-start h-full">
  <img 
    src="/image/product10.png" 
    alt="Luxury" 
    className="h-full w-auto object-contain drop-shadow-[-50px_20px_100px_rgba(0,0,0,0.8)] transition-transform duration-1000 hover:scale-105"
  />
</div>


    <div className="w-1/2 flex flex-col items-start justify-center space-y-[24px] pl-[40px]">
      <h1 className="text-[80px] md:text-[120px] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#F7E7CE] via-white to-[#F7E7CE] animate-fade-in-down">
        EXPENSIVE SMILE
      </h1>
      <p className="text-[20px] md:text-[24px] text-white/80 italic animate-fade-in-up" 
      style={{color:'white'}}>
  “Une signature olfactive audacieuse pour captiver les sens, éveiller l’émotion et laisser une empreinte inoubliable dans chaque souvenir. Inspiré par l’élégance intemporelle, ce parfum révèle une harmonie parfaite entre audace et sophistication.”
</p>

      <div className="flex gap-[24px] mt-[16px]">
        <button className="px-[24px] py-[12px] bg-[#F7E7CE] text-[#0A142D] font-bold uppercase tracking-[0.2em] rounded-[18px] shadow-lg hover:scale-105 transition-transform animate-fade-in-up">
          faire vos commande
        </button>
        
      </div>

   
      <div className="flex gap-[16px] mt-[24px] text-white animate-fade-in-up">
  <a href="#" className="hover:text-[#F7E7CE] decoration-none" style={{ color:'white'}}>
    <FontAwesomeIcon icon={faFacebookF} size="lg" />
  </a>
  <a href="#" className="hover:text-[#F7E7CE] decoration-none " style={{ color:'white'}}>
    <FontAwesomeIcon icon={faInstagram} size="lg" />
  </a>
  <a href="#" className="hover:text-[#F7E7CE] decoration-none"style={{ color:'white'}}>
    <FontAwesomeIcon icon={faTwitter} size="lg" />
  </a>
  <a href="#" className="hover:text-[#F7E7CE] decoration-none"style={{ color:'white'}}>
    <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
  </a>
</div>

    </div>
  </div>
</div>

</div>
</div>
</section>
  );
}
