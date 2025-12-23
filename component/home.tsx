"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  );

  return (
    <section className="pt-[100px]"> {/* 👈 compense le header */}
      <div
        className="embla w-full overflow-hidden bg-gray-500"
        ref={emblaRef}
      >
        <div className="embla__container flex">

          {/* Slide 1 */}
          <div className=" embla__slide empla_side1 flex-[0_0_100%] min-w-0 h-[500px] flex items-center justify-center bg-blue-200">
            <div className=" ">
              {/* ici je veux de text */}

            </div>
            <div className="">
              {/* ici aura l'image a droite*/}

            </div>
          </div>

          {/* Slide 2 */}
          <div className="embla__slide flex-[0_0_100%] min-w-0 h-[500px] flex items-center justify-center bg-red-200">
            <h2 className="text-6xl font-bold">2</h2>
          </div>

        </div>
      </div>
    </section>
  );
}
