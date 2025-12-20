import HeroCarosel from '@/component/home'


export default function Home() {
  const products = [
    { id: 1, image: 'picsum.photos', itemDetails: "Chaussures de sport", price: "85.00€" },
    { id: 2, image: 'picsum.photos', itemDetails: "Montre connectée", price: "199.00€" },
    { id: 3, image: 'picsum.photos', itemDetails: "Sac à dos", price: "45.00€" },
    { id: 4, image: 'picsum.photos', itemDetails: "Casque Audio", price: "120.00€" },
    { id: 5, image: 'picsum.photos', itemDetails: "Clavier RGB", price: "75.00€" },
    { id: 6, image: 'picsum.photos', itemDetails: "Souris Gamer", price: "55.00€" },
    { id: 7, image: 'picsum.photos', itemDetails: "Ecran 4K", price: "350.00€" },
    { id: 8, image: 'picsum.photos', itemDetails: "Bureau Setup", price: "299.00€" }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className='mt-[80px] w-full'>
        <div className='w-full max-w-[1400px] mx-auto mb-[100px]'> 
            <HeroCarosel/>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className='grid grid-cols-4 md:grid-cols-1 gap-[30px]'>
        {products.map((item) => (
  <div key={item.id} className="mega-shadow p-4 bg-white rounded-xl">
    {}
    <div className="relative h-60 w-full mb-4">
      <img 
        src={item.image} 
        alt={item.itemDetails}
        className="object-cover rounded-lg"
      />
    </div>
    
    <div className="space-y-1">
      <h3 className="font-bold text-lg">{item.price}</h3>
      <p className="text-gray-600 text-sm">{item.itemDetails}</p>
    </div>
  </div>
))}

        </div>
      </section>
    </main>
  );
}
