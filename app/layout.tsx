"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";

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
          className={`fixed top-0 left-0 w-full h-[100px] flex justify-center items-center bg-white transition-shadow duration-300`}
          style={{
            boxShadow: scrolled
              ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
              : "none",
            zIndex: 9999,
            backgroundColor: "white"
          }}
        >
          <div className="max-w-[1400px] w-full mx-auto px-4 flex items-center justify-between mr-[20px]">
            <div className="text-2xl font-black tracking-tighter">
              <img src="/image/parfum copie 2.png" alt="" className="w-[100px]"/>
            </div>

            <nav className=" md:flex space-x-8 font-bold text-[11px] tracking-[0.2em] uppercase text-gray-400">
              <Link href="/page.tsx" className="hover:text-black transition">
                Home
              </Link>
              <Link href="/product" className="hover:text-black transition">
                Product
              </Link>
              <Link href="/about" className="hover:text-black transition">
                About Us
              </Link>
              <Link href="" className="hover:text-black transition">
              Contact us
              </Link>
            </nav>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-4 h-4 cursor-pointer hover:text-gray-400"
                />
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-4 h-4 cursor-pointer hover:text-gray-400"
                />
              </div>
              <select className="bg-transparent font-bold text-[10px] outline-none cursor-pointer">
                <option>FR</option>
                <option>EN</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="pt-[100px]">{children}</main>

        {/* Footer */}
        <footer className="bg-white py-10 text-center text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          &copy; 2025 jboy — All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}
