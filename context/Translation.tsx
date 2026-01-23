"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "EN" | "FR" | "ES" | "AR";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Fichiers de traduction
const translations: Record<Language, Record<string, string>> = {
  EN: {
  
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.new": "New",
    "nav.women": "Women",
    "nav.men": "Men",
    "nav.giftSets": "Gift Sets",
    "nav.bestSellers": "Best Sellers",
    "nav.offers": "Offers",
    "nav.all": "All",
    "nav.search": "Search...",
    "nav.changeLanguage": "Change Language",
    
   
    "common.addToCart": "Add to Cart",
    "common.newArrival": "New Arrival",
    "common.filter": "Filter",
    "common.allPerfumes": "ALL PERFUMES",
    "common.womens": "WOMEN'S",
    "common.mens": "MEN'S",
   
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",
    
   
    "product.viewDetails": "View Details",
    "product.addToCart": "Add to Cart",

    
"about.title": "About Us",
"about.who": "Who are we?",
"about.essence.title": "Our Essence",
"about.essence.text":
  "We are a perfume house dedicated to elegance and emotion. Each fragrance is designed as a true signature, combining craftsmanship, innovation, and noble ingredients to elevate every moment. Through our platform, we allow everyone to discover and order our creations with ease, wherever they are.",
"about.button": "Discover our perfumes",

  },
  FR: {
   
    "nav.home": "Accueil",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.new": "Nouveau",
    "nav.women": "Femme",
    "nav.men": "Homme",
    "nav.giftSets": "Coffrets Cadeaux",
    "nav.bestSellers": "Meilleures Ventes",
    "nav.offers": "Offres",
    "nav.all": "Tout",
    "nav.search": "Rechercher...",
    "nav.changeLanguage": "Changer de langue",
    

    "common.addToCart": "Ajouter au Panier",
    "common.newArrival": "Nouveautés",
    "common.filter": "Filtrer",
    "common.allPerfumes": "TOUS LES PARFUMS",
    "common.womens": "FEMME",
    "common.mens": "HOMME",
    

    "cart.title": "Panier",
    "cart.empty": "Votre panier est vide",
    "cart.total": "Total",
    "cart.checkout": "Commander",
    "cart.remove": "Retirer",
    
    // Product
    "product.viewDetails": "Voir les Détails",
    "product.addToCart": "Ajouter au Panier",

  //about
    "about.title": "À Propos",
"about.who": "Qui sommes-nous ?",
"about.essence.title": "Notre Essence",
"about.essence.text":
  "Nous sommes une maison de parfumerie dédiée à l’élégance et à l’émotion. Chaque fragrance est pensée comme une véritable signature, mêlant savoir-faire artisanal, innovation et matières nobles pour sublimer chaque instant. À travers notre plateforme, nous offrons à chacun la possibilité de découvrir et de commander nos créations en toute simplicité, où que vous soyez.",
"about.button": "Découvrir nos parfums",

  },
  ES: {

    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.contact": "Contacto",
    "nav.new": "Nuevo",
    "nav.women": "Mujer",
    "nav.men": "Hombre",
    "nav.giftSets": "Sets de Regalo",
    "nav.bestSellers": "Más Vendidos",
    "nav.offers": "Ofertas",
    "nav.all": "Todo",
    "nav.search": "Buscar...",
    "nav.changeLanguage": "Cambiar idioma",
    

    "common.addToCart": "Añadir al Carrito",
    "common.newArrival": "Novedades",
    "common.filter": "Filtrar",
    "common.allPerfumes": "TODOS LOS PERFUMES",
    "common.womens": "MUJER",
    "common.mens": "HOMBRE",
    
    
    "cart.title": "Carrito de Compras",
    "cart.empty": "Tu carrito está vacío",
    "cart.total": "Total",
    "cart.checkout": "Finalizar Compra",
    "cart.remove": "Eliminar",
    
    
    "product.viewDetails": "Ver Detalles",
    "product.addToCart": "Añadir al Carrito",
  },
  AR: {
   
    "nav.home": "الرئيسية",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.new": "جديد",
    "nav.women": "نساء",
    "nav.men": "رجال",
    "nav.giftSets": "مجموعات الهدايا",
    "nav.bestSellers": "الأكثر مبيعاً",
    "nav.offers": "العروض",
    "nav.all": "الكل",
    "nav.search": "بحث...",
    "nav.changeLanguage": "تغيير اللغة",
    

    "common.addToCart": "أضف إلى السلة",
    "common.newArrival": "وصل حديثاً",
    "common.filter": "تصفية",
    "common.allPerfumes": "جميع العطور",
    "common.womens": "نساء",
    "common.mens": "رجال",
    
   
    "cart.title": "سلة التسوق",
    "cart.empty": "سلة التسوق فارغة",
    "cart.total": "المجموع",
    "cart.checkout": "الدفع",
    "cart.remove": "إزالة",
    
   
    "product.viewDetails": "عرض التفاصيل",
    "product.addToCart": "أضف إلى السلة",
  },
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");
  const [mounted, setMounted] = useState(false);

 
  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language;
      if (savedLang && ["EN", "FR", "ES", "AR"].includes(savedLang)) {
        setLanguageState(savedLang);
        document.documentElement.lang = savedLang.toLowerCase();
      } else {
        document.documentElement.lang = "en";
      }
    }
  }, []);

  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      document.documentElement.lang = lang.toLowerCase();
    }
  };

  
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}

