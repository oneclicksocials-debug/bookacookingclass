import Link from 'next/link';

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const rawCity = resolvedParams.city;
  const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace(/-/g, ' ');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 selection:bg-brand-orange selection:text-white font-sans">
      
      {/* AIRBNB-STYLE NAVBAR */}
      <nav className="sticky top-0 z-50 px-6 lg:px-12 py-4 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-sm">🍳</div>
          <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">bookacookingclass</span>
        </Link>
        <div className="flex flex-1 max-w-md mx-6">
            <div className="w-full flex items-center bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer border border-transparent hover:border-gray-300 shadow-sm">
                <span className="text-gray-500 mr-2">🔍</span>
                <span className="text-gray-600 font-medium text-sm flex-1 truncate">{cityName} • Any date • Any class</span>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/list-your-class" className="font-bold text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">Host a class</Link>
        </div>
      </nav>

      {/* EXPEDIA-STYLE FILTER BAR (Decorative) */}
      <div className="bg-white border-b border-gray-200 px-6 lg:px-12 py-3 hidden md:flex items-center gap-4 overflow-x-auto no-scrollbar">
          {['🍝 Pasta', '🍣 Sushi', '🥐 Baking', '🍷 Wine Pairing', '🌮 Mexican', '🔥 Grill', '💑 Date Night', '👨‍👩‍👧 Family Friendly'].map((tag, i) => (
              <div key={i} className="whitespace-nowrap px-4 py-2 rounded-full border border-gray-200 hover:border-black font-semibold text-sm text-gray-700 cursor-pointer transition-colors">
                  {tag}
              </div>
          ))}
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-10">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Top cooking classes in {cityName}
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Over 50+ classes available. Book instantly.</p>
        </div>
        
        {/* THE VIATOR WIDGET PLACEHOLDER */}
        <div className="bg-orange-50 border-2 border-dashed border-brand-orange/40 rounded-3xl p-10 text-center mb-10">
          <h3 className="text-brand-orange font-bold text-lg mb-2">[ Viator Booking Widget Placeholder ]</h3>
          <p className="text-sm text-gray-600 font-medium max-w-xl mx-auto">
            Once Viator approves your account, you will paste the live booking widget code here to seamlessly capture bookings for {cityName}.
          </p>
        </div>

        {/* Class Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Example Class Card 1 */}
          <a href="https://www.getyourguide.com?partner_id=UO3Q6U2&cmp=share_to_earn" target="_blank" rel="noopener noreferrer" className="group flex flex-col cursor-pointer">
            <div className="aspect-[4/3] w-full bg-gray-200 rounded-2xl mb-3 overflow-hidden relative border border-gray-200">
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1">
                    <span className="text-brand-orange">★</span> 4.98
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-7xl bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                    🍝
                </div>
            </div>
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:underline">{cityName}: Handmade Pasta Masterclass</h3>
            </div>
            <p className="text-gray-500 text-sm mt-1">Hosted by Chef Mario</p>
            <p className="text-gray-500 text-sm">3 hours • Equipment included</p>
            <div className="mt-2 font-medium">
                <span className="font-bold text-gray-900">From $89</span> <span className="font-normal text-gray-500">/ person</span>
            </div>
          </a>

          {/* Example Class Card 2 */}
          <a href="https://www.getyourguide.com?partner_id=UO3Q6U2&cmp=share_to_earn" target="_blank" rel="noopener noreferrer" className="group flex flex-col cursor-pointer">
            <div className="aspect-[4/3] w-full bg-gray-200 rounded-2xl mb-3 overflow-hidden relative border border-gray-200">
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1">
                    <span className="text-brand-orange">★</span> 4.85
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-7xl bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                    🍣
                </div>
            </div>
            <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:underline">Sushi Rolling & Sake Tasting</h3>
            </div>
            <p className="text-gray-500 text-sm mt-1">Hosted by Kenji</p>
            <p className="text-gray-500 text-sm">2.5 hours • Drinks included</p>
            <div className="mt-2 font-medium">
                <span className="font-bold text-gray-900">From $110</span> <span className="font-normal text-gray-500">/ person</span>
            </div>
          </a>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 px-6 lg:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-gray-900">bookacookingclass</span>
          </div>
          <div className="text-sm font-medium text-gray-500">
            © 2026 BookACookingClass.com · Terms · Privacy
          </div>
        </div>
      </footer>
    </div>
  );
}
