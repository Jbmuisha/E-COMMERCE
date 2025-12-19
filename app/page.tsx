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
      <section>
        
      </section>
    </main>
  );
}
