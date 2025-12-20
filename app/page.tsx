import HeroCarosel from '@/component/home'

export default function Home() {

  

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* SECTION CARROUSEL */}
      <section className='mt-[80px] w-full'>
        <div className='w-full max-w-[1400px] mx-auto mb-[100px]'> 
            <HeroCarosel/>
        </div>
      </section>

      {/* SECTION PRODUITS AVEC GRID */}
      <section className="max-w-[1400px] mx-auto px-4 pb-20">
        <div className='grid grid-cols-4 md:grid-cols-1 gap-x-29 gap-y-12'>
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="mega-shadow"
            >
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
