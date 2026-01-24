"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "EN" | "FR" | "ES" | "AR";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

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

    "contact.title": "Contact Us",
    "contact.description": "Welcome to our world of exquisite fragrances. Contact us to explore our exclusive perfume collection, place orders online, or receive personalized recommendations to find the perfect scent. Our team is always ready to assist you with any questions about our products, shipping, or gift options.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.customerSupport.title": "Customer Support",
    "contact.customerSupport.description": "Our perfume experts are available 24/7 to help you choose your perfect fragrance or assist with your order.",
    "contact.feedback.title": "Feedback",
    "contact.feedback.description": "We value your feedback to improve our fragrance collection and your shopping experience.",
    "contact.mediaInquiries.title": "Media Inquiries",
    "contact.form.title": "Get in Touch",
    "contact.form.subtitle": "You can reach us anytime",
    "contact.form.firstNamePlaceholder": "First name",
    "contact.form.lastNamePlaceholder": "Last name",
    "contact.form.emailPlaceholder": "Your email",
    "contact.form.phonePlaceholder": "Phone number",
    "contact.form.helpPlaceholder": "How can we help?",
    "contact.form.submitButton": "Submit",
    "contact.form.agreementText": "By contacting us, you agree to our Terms of Service and Privacy Policy",

    "faq.title": "Frequently Asked Questions",
    "faq.shippingTime.question": "What is the shipping time for your perfumes?",
    "faq.shippingTime.answer": "Standard shipping usually takes 3–5 business days. Express shipping is available for 1–2 business days.",
    "faq.returns.question": "Can I return or exchange a perfume?",
    "faq.returns.answer": "Yes, you can return or exchange unopened perfumes within 14 days of delivery. For opened perfumes, please contact customer support.",
    "faq.recommendations.question": "Do you provide fragrance recommendations?",
    "faq.recommendations.answer": "Absolutely! Contact our experts via email or the form, and they’ll help you find the perfect scent based on your preferences.",
    "faq.authenticity.question": "Are your perfumes authentic?",
    "faq.authenticity.answer": "Yes, all perfumes are 100% authentic and sourced directly from the official brands.",
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
    
    "product.viewDetails": "Voir les Détails",
    "product.addToCart": "Ajouter au Panier",

    "about.title": "À Propos",
    "about.who": "Qui sommes-nous ?",
    "about.essence.title": "Notre Essence",
    "about.essence.text":
      "Nous sommes une maison de parfumerie dédiée à l’élégance et à l’émotion. Chaque fragrance est pensée comme une véritable signature, mêlant savoir-faire artisanal, innovation et matières nobles pour sublimer chaque instant. À travers notre plateforme, nous offrons à chacun la possibilité de découvrir et de commander nos créations en toute simplicité, où que vous soyez.",
    "about.button": "Découvrir nos parfums",

    "contact.title": "Contactez-nous",
    "contact.description": "Bienvenue dans notre monde de fragrances exquises. Contactez-nous pour explorer notre collection exclusive de parfums, passer des commandes en ligne, ou recevoir des recommandations personnalisées pour trouver le parfum parfait. Notre équipe est toujours prête à vous aider pour toute question concernant nos produits, l'expédition ou les options de cadeaux.",
    "contact.email": "E-mail",
    "contact.phone": "Téléphone",
    "contact.customerSupport.title": "Support Client",
    "contact.customerSupport.description": "Nos experts en parfumerie sont disponibles 24h/24 et 7j/7 pour vous aider à choisir votre parfum idéal ou à vous assister avec votre commande.",
    "contact.feedback.title": "Commentaires",
    "contact.feedback.description": "Nous apprécions vos commentaires pour améliorer notre collection de parfums et votre expérience d'achat.",
    "contact.mediaInquiries.title": "Demandes Médias",
    "contact.form.title": "Prenez contact",
    "contact.form.subtitle": "Vous pouvez nous joindre à tout moment",
    "contact.form.firstNamePlaceholder": "Prénom",
    "contact.form.lastNamePlaceholder": "Nom de famille",
    "contact.form.emailPlaceholder": "Votre e-mail",
    "contact.form.phonePlaceholder": "Numéro de téléphone",
    "contact.form.helpPlaceholder": "Comment pouvons-nous vous aider ?",
    "contact.form.submitButton": "Envoyer",
    "contact.form.agreementText": "En nous contactant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité",

    "faq.title": "Questions Fréquemment Posées",
    "faq.shippingTime.question": "Quel est le délai de livraison de vos parfums ?",
    "faq.shippingTime.answer": "La livraison standard prend généralement 3 à 5 jours ouvrables. La livraison express est disponible en 1 à 2 jours ouvrables.",
    "faq.returns.question": "Puis-je retourner ou échanger un parfum ?",
    "faq.returns.answer": "Oui, vous pouvez retourner ou échanger les parfums non ouverts dans les 14 jours suivant la livraison. Pour les parfums ouverts, veuillez contacter le support client.",
    "faq.recommendations.question": "Proposez-vous des recommandations de parfums ?",
    "faq.recommendations.answer": "Absolument ! Contactez nos experts par e-mail ou via le formulaire, et ils vous aideront à trouver le parfum parfait en fonction de vos préférences.",
    "faq.authenticity.question": "Vos parfums sont-ils authentiques ?",
    "faq.authenticity.answer": "Oui, tous les parfums sont 100% authentiques et proviennent directement des marques officielles.",
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
    "common.allPerfumes": "TODOS LOS PARFUMES",
    "common.womens": "MUJER",
    "common.mens": "HOMBRE",
    
    "cart.title": "Carrito de Compras",
    "cart.empty": "Tu carrito está vacío",
    "cart.total": "Total",
    "cart.checkout": "Finalizar Compra",
    "cart.remove": "Eliminar",
    
    "product.viewDetails": "Ver Detalles",
    "product.addToCart": "Añadir al Carrito",

    "contact.title": "Contáctanos",
    "contact.description": "Bienvenido a nuestro mundo de fragancias exquisitas. Contáctanos para explorar nuestra exclusiva colección de perfumes, realizar pedidos en línea o recibir recomendaciones personalizadas para encontrar el aroma perfecto. Nuestro equipo está siempre listo para ayudarte con cualquier pregunta sobre nuestros productos, envíos u opciones de regalo.",
    "contact.email": "Correo electrónico",
    "contact.phone": "Teléfono",
    "contact.customerSupport.title": "Soporte al Cliente",
    "contact.customerSupport.description": "Nuestros expertos en perfumes están disponibles 24/7 para ayudarte a elegir tu fragancia perfecta o asistirte con tu pedido.",
    "contact.feedback.title": "Comentarios",
    "contact.feedback.description": "Valoramos tus comentarios para mejorar nuestra colección de fragancias y tu experiencia de compra.",
    "contact.mediaInquiries.title": "Consultas de Medios",
    "contact.form.title": "Ponte en Contacto",
    "contact.form.subtitle": "Puedes contactarnos en cualquier momento",
    "contact.form.firstNamePlaceholder": "Nombre",
    "contact.form.lastNamePlaceholder": "Apellido",
    "contact.form.emailPlaceholder": "Tu correo electrónico",
    "contact.form.phonePlaceholder": "Número de teléfono",
    "contact.form.helpPlaceholder": "¿Cómo podemos ayudarte?",
    "contact.form.submitButton": "Enviar",
    "contact.form.agreementText": "Al contactarnos, aceptas nuestros Términos de Servicio y Política de Privacidad",

    "faq.title": "Preguntas Frecuentes",
    "faq.shippingTime.question": "¿Cuál es el tiempo de envío de sus perfumes?",
    "faq.shippingTime.answer": "El envío estándar suele tardar de 3 a 5 días hábiles. El envío exprés está disponible de 1 a 2 días hábiles.",
    "faq.returns.question": "¿Puedo devolver o cambiar un perfume?",
    "faq.returns.answer": "Sí, puedes devolver o cambiar perfumes sin abrir dentro de los 14 días posteriores a la entrega. Para perfumes abiertos, comunícate con el servicio de atención al cliente.",
    "faq.recommendations.question": "¿Ofrecen recomendaciones de fragancias?",
    "faq.recommendations.answer": "¡Por supuesto! Contacta a nuestros expertos por correo electrónico o mediante el formulario, y te ayudarán a encontrar el aroma perfecto según tus preferencias.",
    "faq.authenticity.question": "¿Son auténticos sus perfumes?",
    "faq.authenticity.answer": "Sí, todos los perfumes son 100% auténticos y provienen directamente de las marcas oficiales.",
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

    "contact.title": "اتصل بنا",
    "contact.description": "مرحبًا بكم في عالمنا من العطور الفاخرة. اتصل بنا لاستكشاف مجموعتنا الحصرية من العطور، أو لتقديم طلبات عبر الإنترنت، أو لتلقي توصيات مخصصة للعثور على العطر المثالي. فريقنا مستعد دائمًا لمساعدتك في أي أسئلة حول منتجاتنا، الشحن، أو خيارات الهدايا.",
    "contact.email": "البريد الإلكتروني",
    "contact.phone": "الهاتف",
    "contact.customerSupport.title": "دعم العملاء",
    "contact.customerSupport.description": "خبراء العطور لدينا متاحون على مدار الساعة طوال أيام الأسبوع لمساعدتك في اختيار عطرك المثالي أو مساعدتك في طلبك.",
    "contact.feedback.title": "الملاحظات",
    "contact.feedback.description": "نحن نقدر ملاحظاتك لتحسين مجموعتنا من العطور وتجربة التسوق الخاصة بك.",
    "contact.mediaInquiries.title": "استفسارات وسائل الإعلام",
    "contact.form.title": "تواصل معنا",
    "contact.form.subtitle": "يمكنك التواصل معنا في أي وقت",
    "contact.form.firstNamePlaceholder": "الاسم الأول",
    "contact.form.lastNamePlaceholder": "الاسم الأخير",
    "contact.form.emailPlaceholder": "بريدك الإلكتروني",
    "contact.form.phonePlaceholder": "رقم الهاتف",
    "contact.form.helpPlaceholder": "كيف يمكننا مساعدتك؟",
    "contact.form.submitButton": "إرسال",
    "contact.form.agreementText": "عن طريق الاتصال بنا، فإنك توافق على شروط الخدمة وسياسة الخصوصية لدينا",

    "faq.title": "الأسئلة الشائعة",
    "faq.shippingTime.question": "ما هو وقت شحن عطوركم؟",
    "faq.shippingTime.answer": "يستغرق الشحن العادي عادة من 3 إلى 5 أيام عمل. الشحن السريع متاح من 1 إلى 2 يوم عمل.",
    "faq.returns.question": "هل يمكنني إرجاع أو استبدال عطر؟",
    "faq.returns.answer": "نعم، يمكنك إرجاع أو استبدال العطور غير المفتوحة في غضون 14 يومًا من التسليم. بالنسبة للعطور المفتوحة، يرجى الاتصال بدعم العملاء.",
    "faq.recommendations.question": "هل تقدمون توصيات للعطور؟",
    "faq.recommendations.answer": "بالتأكيد! اتصل بخبرائنا عبر البريد الإلكتروني أو النموذج، وسوف يساعدونك في العثور على العطر المثالي بناءً على تفضيلاتك.",
    "faq.authenticity.question": "هل عطوركم أصلية؟",
    "faq.authenticity.answer": "نعم، جميع العطور أصلية 100% ويتم الحصول عليها مباشرة من العلامات التجارية الرسمية.",
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
