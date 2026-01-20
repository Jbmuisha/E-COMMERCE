export interface Product {
    id: number;
    image: string;
    itemDetails: string;
    price: string;
    category?: string;
}

export const products: Product[] = [
    // Men's Products
    { id: 1, image: "/image/product1.webp", itemDetails: "Chaussures de sport", price: "85.00€", category: "men" },
    { id: 4, image: "/image/product4.webp", itemDetails: "Casque Audio", price: "120.00€", category: "men" },
    { id: 5, image: "/image/product5.webp", itemDetails: "Clavier RGB", price: "75.00€", category: "men" },
    { id: 6, image: "/image/product7.png", itemDetails: "Souris Gamer", price: "55.00€", category: "men" },
    { id: 7, image: "/image/product8.png", itemDetails: "Écran 4K", price: "350.00€", category: "men" },
    { id: 8, image: "/image/product9.jpg", itemDetails: "Bureau Setup", price: "299.00€", category: "men" },

    // Women's Products
    { id: 2, image: "/image/product2.jpeg", itemDetails: "Montre connectée", price: "199.00€", category: "women" },
    { id: 3, image: "/image/product2.jpg", itemDetails: "Sac à dos", price: "45.00€", category: "women" },
    { id: 9, image: "/image/women1.jpg", itemDetails: "Robe d'été", price: "89.99€", category: "women" },
    { id: 10, image: "/image/women2.jpg", itemDetails: "Chaussures à talons", price: "129.99€", category: "women" },
    { id: 11, image: "/image/women3.jpg", itemDetails: "Sac à main en cuir", price: "159.99€", category: "women" },
    { id: 12, image: "/image/women4.jpg", itemDetails: "Veste en jean", price: "79.99€", category: "women" },
    { id: 13, image: "/image/women5.jpg", itemDetails: "Collier élégant", price: "65.00€", category: "women" },
    { id: 14, image: "/image/women6.jpg", itemDetails: "Écharpe en soie", price: "45.00€", category: "women" },
    { id: 15, image: "/image/women7.jpg", itemDetails: "Lunettes de soleil", price: "95.00€", category: "women" },
    { id: 16, image: "/image/women8.jpg", itemDetails: "Montre bracelet", price: "175.00€", category: "women" }
];
