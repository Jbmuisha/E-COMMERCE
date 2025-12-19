"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function Hero() {
    // Essaye de mettre loop: false temporairement pour voir si la répétition s'arrête
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  
    return (
      <div className="embla w-full overflow-hidden bg-gray-100" ref={emblaRef}>
        <div className="embla__container flex">
          
          {/* Slide 1 */}
          <div className="embla__slide flex-[0_0_100%] min-w-0 h-[300px] flex items-center justify-center bg-blue-200">
             <h1 className='text-6xl font-bold'> 1 </h1>
          </div>

          {/* Slide 2 */}
          <div className="embla__slide flex-[0_0_100%] min-w-0 h-[300px] flex items-center justify-center bg-red-200">
            <h2 className='text-6xl font-bold'> 2 </h2>
          </div>

        </div>
      </div>
    );
}
