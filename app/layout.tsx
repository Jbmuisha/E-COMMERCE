"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF, faXTwitter } from "@fortawesome/free-brands-svg-icons";


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="fr">
      <body className="antialiased bg-gray-50">
        
      <header
  className={`fixed top-0 left-0 w-full h-[100px] flex justify-center items-center bg-white transition-shadow duration-300 z-50`}
  style={{
    boxShadow: scrolled ? "rgba(0, 0, 0, 0.15) 0px 5px 15px" : "none",
  }}
>
  <div className="max-w-[1400px] w-full mx-auto px-[24px] flex items-center justify-between">

    {/* Logo */}
    <div className="flex items-center">
      <img src="/image/parfum copie 2.png" alt="Logo" className="w-[120px] h-auto"/>
    </div>

  
    <nav className="hidden md:flex items-center gap-[32px] font-bold text-[12px] tracking-[0.15em] uppercase text-gray-500">

      <Link href="/" className="hover:text-black transition">Home</Link>

      
      <div className="relative group">
        <button className="flex items-center gap-[4px] hover:text-black transition">
          Product
          <span className="text-[10px]">▼</span>
        </button>

        <div className="absolute top-[100%] left-0 w-[480px] bg-white shadow-lg rounded-[12px] p-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
          <div className="grid grid-cols-2 gap-[16px]">

            <div>
              <h5 className="font-black text-[10px] mb-[8px]">Women</h5>
              <ul className="space-y-[8px]">
                <li><Link href="/product/women/perfumes" className="hover:text-black transition">Perfumes</Link></li>
                <li><Link href="/product/women/gifts" className="hover:text-black transition">Gift Sets</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-black text-[10px] mb-[8px]">Men</h5>
              <ul className="space-y-[8px]">
                <li><Link href="/product/men/perfumes" className="hover:text-black transition">Perfumes</Link></li>
                <li><Link href="/product/men/gifts" className="hover:text-black transition">Gift Sets</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <Link href="/about" className="hover:text-black transition">About Us</Link>
      <Link href="/contact" className="hover:text-black transition">Contact</Link>

    </nav>

    
    <div className="flex items-center gap-[24px]">

     
      <div className="relative">
        <FontAwesomeIcon
          icon={faUser}
          className="w-[20px] h-[20px] cursor-pointer hover:text-gray-600 transition"
        />
      </div>

     
      <div className="relative">
        <FontAwesomeIcon
          icon={faCartShopping}
          className="w-[20px] h-[20px] cursor-pointer hover:text-gray-600 transition"
        />
        <span className="absolute -top-[4px] -right-0 bg-red-500 text-white text-[10px] font-bold px-[4px] py-[1px] rounded-full">
          3
        </span>
      </div>

     
      <select className="bg-transparent font-bold text-[10px] outline-none cursor-pointer">
        <option>FR</option>
        <option>EN</option>
      </select>

    </div>

  </div>
</header>


       
        <main className="pt-[100px]">{children}</main>
<footer className="bg-[#F6F1EB] border-t border-gray-100">


  <div className="max-w-[1400px] mx-auto px-[16px] py-[96px]">

    {/* Top */}
    <div className="grid grid-cols-4 md:grid-cols-4 gap-[64px] mb-[32px]">

      {/* Brand */}
      <div>
        <img
          src="/image/parfum copie 2.png"
          alt="Brand logo"
          className="w-[120px] mb-[24px]"
        />
        <p className="text-sm text-gray-500 max-w-[320px] leading-relaxed mb-[16px]">
          Curated fragrances crafted for modern elegance and timeless identity.
        </p>

        {/* Social Media */}
        <div className="flex gap-[16px]">
          <a
            href="#"
            className="w-[36px] h-[36px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition"
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="#"
            className="w-[36px] h-[36px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition"
            aria-label="Facebook"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            href="#"
            className="w-[36px] h-[36px] rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition"
            aria-label="X / Twitter"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
        </div>
      </div>

      {/* Shop */}
      <div>
        <h4 className="text-xs font-bold tracking-[0.25em] uppercase mb-[24px]">
          Shop
        </h4>
        <ul className="space-y-[12px] text-sm text-gray-500 list-none">
          <li><a className="hover:text-black transition">All Perfumes</a></li>
          <li><a className="hover:text-black transition">Women</a></li>
          <li><a className="hover:text-black transition">Men</a></li>
          <li><a className="hover:text-black transition">New Arrivals</a></li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-xs font-bold tracking-[0.25em] uppercase mb-[24px]">
          Support
        </h4>
        <ul className="space-y-[12px] text-sm text-gray-500 list-none">
          <li><a className="hover:text-black transition">Contact</a></li>
          <li><a className="hover:text-black transition">Shipping & Returns</a></li>
          <li><a className="hover:text-black transition">FAQ</a></li>
        </ul>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-xs font-bold tracking-[0.25em] uppercase mb-[24px]">
          Legal
        </h4>
        <ul className="space-y-[12px] text-sm text-gray-500 list-none">
          <li><a className="hover:text-black transition">Privacy Policy</a></li>
          <li><a className="hover:text-black transition">Terms & Conditions</a></li>
          <li><a className="hover:text-black transition">Cookies</a></li>
        </ul>
      </div>

    </div>

    {/* Bottom */}
 <div className="border-t border-gray-100 pt-[32px] flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
      <p>© {new Date().getFullYear()} JBOY. All rights reserved.</p>

      
      <div className="flex gap-[16px] mt-[16px] md:mt-[0] items-center">
  <img
    src="/image/visa.png"
    alt="Visa"
    className="h-[40px] w-auto"
  />
  <img
    src="/image/mastercard.png"
    alt="Mastercard"
    className="h-[40px] w-auto"
  />
  <img
    src="/image/paypal.webp"
    alt="PayPal"
    className="h-[40px] w-auto"
  /><img
  src="/image/vodacom.png"
  alt="mpsa"
  className="h-[40px] w-auto"
  />
 <img
    src="/image/aiterl.webp"
    alt="Airtel-money"
    className="h-[40px] w-auto"
  />
 </div>
 </div>
 </div>
</footer>

      </body>
    </html>
  );
}
