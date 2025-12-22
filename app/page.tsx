import HeroCarosel from '@/component/home'
import { Heart } from 'lucide-react'; // npm install lucide-react

export default function Home() {
  const products = [
    { id: 1, image: '/image/product1.webp', itemDetails: "Chaussures de sport", price: "85.00€" },
    { id: 2, image: '/image/product2.jpeg', itemDetails: "Montre connectée", price: "199.00€" },
    { id: 3, image: '/image/product2.jpg', itemDetails: "Sac à dos", price: "45.00€" },
    { id: 4, image: '/image/product 4.webp', itemDetails: "Casque Audio", price: "120.00€" },
    { id: 5, image: '/image/product 5.webp', itemDetails: "Clavier RGB", price: "75.00€" },
    { id: 6, image: '/image/product 7.png', itemDetails: "Souris Gamer", price: "55.00€" },
    { id: 7, image: '/image/product8.png', itemDetails: "Ecran 4K", price: "350.00€" },
    { id: 8, image: '/image/product9.jpg', itemDetails: "Bureau Setup", price: "299.00€" }
  ];

  const ParfumMenu=[
    {id: 1,
    display:" ALL PERFUMS",
    FemaleGender:" WOMEN'S ",
    MaleGender: " MALE'S",
    Type_of_parfum: " BATH AND BODY "},
    {
      id:2,
       FilterBotton:""
    }

  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className='mt-[80px] w-full'>
        <div className='w-full max-w-[1400px] mx-auto mb-[100px]'> 
            <HeroCarosel/>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 pb-20 ">
        
      <div className="flex items-center gap-[8px] overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar mb-[60px]" >
      {ParfumMenu.map((item) => (
        item.display && (
          <div key={item.id} className="flex items-center gap-6">
            <button className="whitespace-nowrap text-[11px] font-black tracking-[0.2em] text-gray-400 hover:text-black transition-colors uppercase flex items-center gap-1">
              {item.display}
            </button>
            <button className="whitespace-nowrap text-[11px] font-black tracking-[0.2em] text-gray-400 hover:text-black transition-colors uppercase">
              {item.FemaleGender}
            </button>
            <button className="whitespace-nowrap text-[11px] font-black tracking-[0.2em] text-gray-400 hover:text-black transition-colors uppercase">
              {item.MaleGender}
            </button>
          </div>
        )
      ))}
      </div>
      <hr  className='mb-[70px'/>
        <div className='grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[70px]'>
          {products.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-2xl border border-gray-100"
            >
              {/* Conteneur Image avec bouton Like */}
              <div className="relative h-64 w-full mb-4 overflow-hidden rounded-xl bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.itemDetails}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Icône Like flottante */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                  <Heart size={18} />
                </button>
              </div>
              
              {/* Infos Produits */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-gray-900">{item.price}</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-md uppercase font-bold text-gray-500">Nouveau</span>
                </div>
                <p className="text-gray-500 text-sm font-medium line-clamp-2 min-h-[40px]">
                  {item.itemDetails}
                </p>
                
                {/* Bouton d'action rapide (apparaît au survol) */}
                <button className="w-full mt-4 bg-black text-white py-3 rounded-lg font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>

      </section>
    </main>
  );
}
