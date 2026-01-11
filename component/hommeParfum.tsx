export default function HommeParfum() {
    const manProducts = [
      { id: 1, image: "/image/product1.webp", itemDetails: "Chaussures de sport", price: "85.00€" },
      { id: 2, image: "/image/product2.jpeg", itemDetails: "Montre connectée", price: "199.00€" },
      { id: 3, image: "/image/product2.jpg", itemDetails: "Sac à dos", price: "45.00€" },
      { id: 4, image: "/image/product4.webp", itemDetails: "Casque Audio", price: "120.00€" },
      { id: 5, image: "/image/product5.webp", itemDetails: "Clavier RGB", price: "75.00€" },
      { id: 6, image: "/image/product7.png", itemDetails: "Souris Gamer", price: "55.00€" },
      { id: 7, image: "/image/product8.png", itemDetails: "Écran 4K", price: "350.00€" },
      { id: 8, image: "/image/product9.jpg", itemDetails: "Bureau Setup", price: "299.00€" },
    ];
  
    return (
      <main className="w-full bg-gray-50 min-h-screen mt-[70px]">
        <section className="max-w-[1400px] mx-auto px-4 py-12">
          <h1 className="text-4xl font-black mb-12">Men Perfumes</h1>
          <div className="grid grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
            {manProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="h-[250px] flex items-center justify-center bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.itemDetails}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-2">{product.itemDetails}</p>
                  <span className="text-lg font-black text-gray-900">{product.price}</span>
                  <button className="mt-4 w-full h-[40px] rounded-xl border border-black text-black font-semibold text-sm hover:bg-black hover:text-white transition">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }
  