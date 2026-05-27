import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const rawCity = resolvedParams.city;
  const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace(/-/g, ' ');

  return {
    title: `Top Cooking Classes in ${cityName} | Book Instantly`,
    description: `Find the best cooking classes, culinary workshops, and food experiences in ${cityName}. Compare reviews, prices, and book instantly.`,
  };
}

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
        
        <div className="bg-orange-50 border-2 border-dashed border-brand-orange/40 rounded-3xl p-10 text-center mb-10">
          <h3 className="text-brand-orange font-bold text-lg mb-2">Partner Dashboard Setup</h3>
          <p className="text-sm text-gray-600 font-medium max-w-xl mx-auto">
            These cards now dynamically generate Viator Affiliate Links using your exact Partner ID (P00303066). Every time a user clicks one of these cards in any city, you earn a commission on the booking!
          </p>
        </div>

        {/* Dynamic Viator Affiliate Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          {/* Primary Viator Search Card */}
          <a href={`https://www.viator.com/searchResults/all?text=cooking+class+${encodeURIComponent(cityName)}&pid=P00303066&mcid=42383&medium=link`} target="_blank" rel="noopener noreferrer" className="group flex flex-col cursor-pointer bg-white rounded-2xl p-4 border border-gray-200 hover:border-brand-orange hover:shadow-xl transition-all">
            <div className="aspect-[4/3] w-full bg-orange-50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-bold uppercase tracking-wider z-10 flex items-center gap-1 text-gray-700">
                    Top Rated
                </div>
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    👨‍🍳
                </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-brand-orange transition-colors">
              Browse All Cooking Classes in {cityName}
            </h3>
            <p className="text-gray-500 text-sm mt-2 mb-4 leading-relaxed">
              Explore the highest-rated culinary experiences, local market tours, and private chef workshops in {cityName} on Viator.
            </p>
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-brand-orange">View options</span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* Specific Niche Viator Search Card */}
          <a href={`https://www.viator.com/searchResults/all?text=pasta+making+class+${encodeURIComponent(cityName)}&pid=P00303066&mcid=42383&medium=link`} target="_blank" rel="noopener noreferrer" className="group flex flex-col cursor-pointer bg-white rounded-2xl p-4 border border-gray-200 hover:border-brand-orange hover:shadow-xl transition-all">
            <div className="aspect-[4/3] w-full bg-orange-50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    🍝
                </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-brand-orange transition-colors">
              Pasta Making & Italian Cuisine
            </h3>
            <p className="text-gray-500 text-sm mt-2 mb-4 leading-relaxed">
              Learn to make fresh pasta from scratch with expert local chefs in {cityName}.
            </p>
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-brand-orange">View options</span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* Specific Niche Viator Search Card */}
          <a href={`https://www.viator.com/searchResults/all?text=sushi+making+class+${encodeURIComponent(cityName)}&pid=P00303066&mcid=42383&medium=link`} target="_blank" rel="noopener noreferrer" className="group flex flex-col cursor-pointer bg-white rounded-2xl p-4 border border-gray-200 hover:border-brand-orange hover:shadow-xl transition-all">
            <div className="aspect-[4/3] w-full bg-orange-50 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center">
                <div className="text-7xl group-hover:scale-110 transition-transform duration-500">
                    🍣
                </div>
            </div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-brand-orange transition-colors">
              Sushi Rolling & Japanese Cuisine
            </h3>
            <p className="text-gray-500 text-sm mt-2 mb-4 leading-relaxed">
              Master the art of sushi making and Japanese culinary techniques.
            </p>
            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="font-bold text-brand-orange">View options</span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
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
