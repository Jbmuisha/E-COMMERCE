"use client";
import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping, faSearch, faBars, faGlobe, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebookF, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { CartProvider, useCart } from "@/context/Cart";
import { TranslationProvider, useTranslation } from "@/context/Translation";
import Cart from "@/component/Cart";
import "@/component/cart-button.css";
import "@/component/ui-buttons.css";


// Composant Bouton Recherche
function SearchButton() {
  return (
    <button
      className="search-button"
      aria-label="Rechercher"
      title="Rechercher"
    >
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </button>
  );
}


function LangButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();

  const languages = [
    { code: 'EN' as const, name: 'English' },
    { code: 'FR' as const, name: 'Français' },
    { code: 'ES' as const, name: 'Español' },
    { code: 'AR' as const, name: 'العربية' },
  ];

  return (
    <div className="relative">
      <button
        className="lang-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("nav.changeLanguage")}
        title={t("nav.changeLanguage")}
      >
        <FontAwesomeIcon icon={faGlobe} className="lang-icon" />
        <span className="lang-badge">{language}</span>
      </button>

      <div className={`lang-dropdown ${isOpen ? 'open' : ''}`}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={language === lang.code ? 'active' : ''}
            onClick={() => {
              setLanguage(lang.code);
              setIsOpen(false);
            }}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}

interface RootLayoutProps {
  children: ReactNode;
}
function LayoutContentInner({ children }: RootLayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const { language, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  return (
    <body className="antialiased bg-gray-50">
          <Cart />

          <header className={`header-container fixed top-0 left-0 w-full h-[100px] flex justify-center items-center bg-white transition-all duration-300 z-50`}>
            <div className="sub-header fixed top-[100px] left-0 w-full h-[44px] bg-[#E5E7EB] border-b border-gray-200 z-40">
              <div className="sub-header-inner max-w-[1400px] mx-auto px-[24px] h-full flex items-center gap-[28px] decoration-none">
                <div className="all-menu relative group cursor-pointer">
                  <div className="flex items-center gap-[6px] font-bold uppercase text-[12px] tracking-wide hover:text-black transition">
                    <FontAwesomeIcon icon={faBars} className="w-[14px] h-[14px]" />
                    {t("nav.all")}
                  </div>

                  <div className="mega-menu absolute top-[100%] left-[0] w-[1500px] bg-white shadow-lg rounded-[12px] p-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    {/* Mega Menu Content */}
                  </div>
                </div>

                <Link href="/newArrival" className="sub-link no-underline text-black">
                  {t("nav.new")}
                </Link>
                <Link href="/femme" className="sub-link no-underline text-black">
                  {t("nav.women")}
                </Link>
                <Link href="/homme" className="sub-link no-underline text-black">
                  {t("nav.men")}
                </Link>
                <Link href="/" className="sub-link no-underline text-black">
                  {t("nav.giftSets")}
                </Link>
                <Link href="/bestSeller" className="sub-link no-underline text-black">
                  {t("nav.bestSellers")}
                </Link>
                <Link href="/offers" className="sub-link no-underline text-black hover:text-red-600 transition">
                  {t("nav.offers")}
                </Link>


              </div>
            </div>
            <div
              style={{
                boxShadow: scrolled ? "rgba(0, 0, 0, 0.08) 0px 4px 12px" : "none",
                backdropFilter: scrolled ? 'blur(8px)' : 'none',
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'white',
                height: scrolled ? '80px' : '100px',
              }}>
              <div className="header-inner max-w-[1400px] w-full mx-auto px-6 lg:px-8 flex items-center justify-between">
                <div className="logo flex items-center transition-transform duration-300 hover:scale-105">
                  <img
                    src="/image/parfum copie 2.png"
                    alt="Logo"
                    className="w-[120px] h-auto transition-all duration-300"
                    style={{
                      transform: scrolled ? 'scale(0.9)' : 'scale(1)'
                    }}
                  />
                </div>
                <div className="search-wrapper">
                  <div className="search-input-wrapper">
                    <input
                      type="text"
                      placeholder={t("nav.search")}
                      className="search-input"
                    />
                    <FontAwesomeIcon icon={faSearch} className="search-icon-right" />
                  </div>
                </div>




                <nav className="desktop-menu hidden md:flex items-center gap-[32px] font-bold text-[12px] tracking-[0.15em] uppercase text-gray-500">
                  <Link href="/" className="hover:text-black transition">
                    {t("nav.home")}
                  </Link>
                  <Link href="/about" className="hover:text-black transition">
                    {t("nav.about")}
                  </Link>
                  <Link href="/contact" className="hover:text-black transition">
                    {t("nav.contact")}
                  </Link>


                </nav>



                <div className="flex items-center gap-4 sm:gap-6">
                  <LangButton />

                  <Link href="/account" className="icon-btn" title="Account">
                    <FontAwesomeIcon icon={faUser} />
                  </Link>

                  <CartButton />

                  <Link
                    href="/"
                    aria-label="Menu"
                    className="icon-btn hidden"
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </Link>

                </div>
              </div>
            </div>
          </header>



          <main className="pt-[100px]">{children}</main>

          <footer className="bg-[#F6F1EB] border-gray-100">
            <div className="max-w-[1400px] mx-auto px-[16px] py-[96px]">
              <div className="grid grid-cols-4 md:grid-cols-4 gap-[64px] mb-[32px]">
                <div>
                  <img
                    src="/image/parfum copie 2.png"
                    alt="Brand logo"
                    className="w-[120px] mb-[24px]"
                  />
                  <p className="text-sm text-gray-500 max-w-[320px] leading-relaxed mb-[16px]">
                    Curated fragrances crafted for modern elegance and timeless identity.
                  </p>

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

                <div>
                  <h4 className="text-xs font-bold tracking-[0.25em] uppercase mb-[24px]">
                    Shop
                  </h4>
                  <ul className="space-y-[12px] text-sm text-gray-500 list-none">
                    <li>
                      <a className="hover:text-black transition">All Perfumes</a>
                    </li>
                    <li>
                      <a className="hover:text-black transition">Women</a>
                    </li>
                    <li>
                      <a className="hover:text-black transition">Men</a>
                    </li>
                    <li>
                      <a className="hover:text-black transition">New Arrivals</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-[0.25em] uppercase mb-[24px]">
                    Support
                  </h4>
                  <ul className="space-y-[12px] text-sm text-gray-500 list-none">
                    <li>
                      <a className="hover:text-black transition">Contact</a>
                    </li>
                    <li>
                      <Link href="/shipp_and_return" className="hover:text-black transition">
                        Shipping & Returns
                      </Link>
                    </li>
                    <li>
                      <a className="hover:text-black transition">FAQ</a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold tracking-[0.25em] uppercase mb-[24px]">
                    Legal
                  </h4>
                  <ul className="space-y-[12px] text-sm text-gray-500 list-none">
                    <li>
                      <a className="hover:text-black transition">Privacy Policy</a>
                    </li>
                    <li>
                      <a className="hover:text-black transition">Terms & Conditions</a>
                    </li>
                    <li>
                      <a className="hover:text-black transition">Cookies</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-[32px] flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} JBOY. All rights reserved.</p>

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
                  />
                  <img
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
  );
}

function LayoutContent({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <TranslationProvider>
        <CartProvider>
          <LayoutContentInner>{children}</LayoutContentInner>
        </CartProvider>
      </TranslationProvider>
    </html>
  );
}

// Cart Button Component
function CartButton() {
  const { toggleCart, cartCount } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="cart-button"
      aria-label={`Shopping Cart (${cartCount} items)`}
    >
      <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />

      {cartCount > 0 && (
        <span className="cart-badge">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </button>
  );
}

export default LayoutContent;