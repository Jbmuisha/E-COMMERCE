"use client";

import { useTranslation } from "@/context/Translation";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="py-[60px] space-y-[80px]">
      {/* Hero */}
      <section className="relative h-[150px] w-full overflow-hidden flex items-center justify-center px-4">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/image/abou.jpg')", opacity: "0.6" }}
        />
        <div className="relative z-10 text-center">
          <h1
            style={{ color: "rgba(247, 231, 206, 255)" }}
            className="group relative text-[10vw] font-black uppercase leading-none tracking-tighter cursor-pointer"
          >
            {t("about.title")}
            <span className="absolute -bottom-2 left-0 w-0 h-[8px] bg-red-600 transition-all duration-500 group-hover:w-full"></span>
          </h1>
        </div>
      </section>

      {/* About details */}
      <section className="aboutdetail max-w-[1400px] mx-auto px-6 mt-5 mb-20">
        <div className="title mb-5">
          <span className="group relative inline-block uppercase tracking-widest text-sm text-red-600 font-semibold cursor-pointer">
            {t("about.who")}
            <span className="myunderline"></span>
          </span>
        </div>

        <div className="myfullgrid grid grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[450px]">
            <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/image/about3.jpeg"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Perfume main"
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/image/abo2.jpg"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Perfume detail"
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/image/abu1.jpg"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                alt="Perfume lifestyle"
              />
            </div>
          </div>

          {/* Text */}
          <div className="mytext flex flex-col justify-center space-y-6 max-w-lg">
            <div className="w-16 h-[2px] bg-red-600"></div>

            <h2 className="about-title">
              {t("about.essence.title")}
            </h2>

            <p className="about-text">
              {t("about.essence.text")}
            </p>

            <button className="aboubnt self-start px-[10px] py-[10px] text-white uppercase tracking-widest text-sm transition-all mt-[20px]">
              {t("about.button")}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
