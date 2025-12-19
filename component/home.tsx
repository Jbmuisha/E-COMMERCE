"use client"; // <--- DOIT ÊTRE LA LIGNE 1 ABSOLUE

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function Hero() {

    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
  
    return (
      <div className="embla" ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div className="embla__container" style={{ display: 'flex' }}>
          <div className="embla__slide" style={{ flex: '0 0 100%', minWidth: 0 }}>
            <img src="/parfum1.jpg" alt="Parfum 1" />
          </div>
          <div className="embla__slide" style={{ flex: '0 0 100%', minWidth: 0 }}>
            <img src="/parfum2.jpg" alt="Parfum 2" />
          </div>
        </div>
      </div>
    );
}
