import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import SearchBar from '@/components/SearchBar';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .eq('is_active', true)
    .order('name');

  const { data: topTokyo } = await supabase.from('classes').select('*').ilike('city', '%tokyo%').order('reviews', { ascending: false, nullsFirst: false }).limit(3);
  const { data: topRome } = await supabase.from('classes').select('*').ilike('city', '%rome%').order('reviews', { ascending: false, nullsFirst: false }).limit(3);
  const { data: topParis } = await supabase.from('classes').select('*').ilike('city', '%paris%').order('reviews', { ascending: false, nullsFirst: false }).limit(3);

  const renderClassCard = (cls: any) => (
    <div key={cls.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group h-full">
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-900 z-10 shadow-sm">
          From ${cls.price || 30}
        </div>
        <img 
          src={cls.image_url || 'https://via.placeholder.com/400x300'} 
          alt={cls.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
          {cls.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-auto mb-4">
          <span className="flex items-center gap-1 font-medium">
            <span className="text-yellow-500 font-bold">⭐ {cls.rating || '5.0'}</span>
            <span>({cls.reviews ? cls.reviews.toLocaleString('en-US') : 0})</span>
          </span>
          <span className="flex items-center gap-1">
            🕒 {cls.duration || 'Flexible'}
          </span>
        </div>
        <a href={`/class/${cls.slug}`} className="block mt-auto text-center w-full bg-[#1A233A] text-white py-3 rounded-xl font-bold hover:bg-[#253251] transition-colors shadow-md">
            View Details
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-orange selection:text-white font-sans">
      
      {/* AIRBNB-STYLE NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-sm">🍳</div>
          <span className="font-bold text-xl tracking-tight text-gray-900">bookacookingclass</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-600">
          <li><a href="#how-it-works" className="hover:text-black transition-colors">How it works</a></li>
          <li><a href="#for-hosts" className="hover:text-black transition-colors">List your class</a></li>
          <li>
            <a href="#browse" className="bg-brand-orange text-white px-5 py-2.5 rounded-full font-bold hover:bg-brand-orangeDark transition-all">
              Explore classes
            </a>
          </li>
        </ul>
      </nav>

      {/* EXPEDIA/AIRBNB HYBRID HERO */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-12 bg-gray-50 flex items-center justify-center min-h-[80vh] overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center w-full">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
            Find the perfect <span className="text-brand-orange">cooking class</span> near you.
          </h1>
          <p className="text-xl text-gray-600 mb-12 font-medium max-w-2xl mx-auto">
            Learn from expert chefs, master new recipes, and enjoy unforgettable culinary experiences.
          </p>

          <SearchBar />
          
          <div className="mt-12">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide block mb-4 md:inline-block md:mb-0 md:mr-4">Top Destinations:</span>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {cities?.slice(0, 10).map((city) => (
                <a key={city.id} href={`/cooking-class/${city.slug}`} className="px-5 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:border-brand-orange hover:text-brand-orange hover:shadow-md transition-all">
                  {city.name}
                </a>
              ))}
              
              <div className="relative group inline-block z-[100]">
                <button className="px-5 py-2 rounded-full bg-gray-100 border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-200 transition-all flex items-center gap-2">
                  More Cities <span className="text-xs">▼</span>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white border border-gray-200 shadow-2xl rounded-2xl p-4 hidden group-hover:block transition-all">
                   <div className="max-h-72 overflow-y-auto grid grid-cols-2 gap-x-4 gap-y-3 p-1">
                     {cities?.slice(10).map((city) => (
                       <a key={city.id} href={`/cooking-class/${city.slug}`} className="text-sm text-gray-600 hover:text-brand-orange hover:font-bold truncate">
                         {city.name}
                       </a>
                     ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP CLASSES SHOWCASE */}
      <section className="py-16 px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Trending Cooking Classes</h2>
          
          <div className="space-y-16">
            {/* Tokyo Showcase */}
            {topTokyo && topTokyo.length > 0 && (
              <div>
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Most Popular in Tokyo 🇯🇵</h3>
                  <a href="/cooking-class/tokyo" className="text-brand-orange font-bold hover:underline flex items-center gap-1">See all <span className="text-xl">›</span></a>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {topTokyo.map(renderClassCard)}
                </div>
              </div>
            )}

            {/* Rome Showcase */}
            {topRome && topRome.length > 0 && (
              <div>
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Most Popular in Rome 🇮🇹</h3>
                  <a href="/cooking-class/rome" className="text-brand-orange font-bold hover:underline flex items-center gap-1">See all <span className="text-xl">›</span></a>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {topRome.map(renderClassCard)}
                </div>
              </div>
            )}

            {/* Paris Showcase */}
            {topParis && topParis.length > 0 && (
              <div>
                <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Most Popular in Paris 🇫🇷</h3>
                  <a href="/cooking-class/paris" className="text-brand-orange font-bold hover:underline flex items-center gap-1">See all <span className="text-xl">›</span></a>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {topParis.map(renderClassCard)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* AIRBNB STYLE CATEGORIES */}
      <section className="py-20 px-6 lg:px-12 bg-white" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: '🔍', title: '1. Find a class', desc: 'Browse hundreds of unique cooking experiences in your city.' },
              { icon: '📅', title: '2. Book instantly', desc: 'Choose your date and secure your spot with zero hassle.' },
              { icon: '👨‍🍳', title: '3. Cook & Eat', desc: 'Learn from local pros, eat what you make, and have fun.' }
            ].map((step, i) => (
              <div key={i} className="flex flex-col">
                <div className="text-5xl mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MASTERCLASS STYLE HOST SECTION (LIGHT MODE) */}
      <section className="py-24 px-6 lg:px-12 bg-gray-50 text-gray-900" id="for-hosts">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
              Share your <span className="text-brand-orange">craft.</span>
            </h2>
            <p className="text-xl text-gray-600 font-medium mb-10 leading-relaxed max-w-md">
              Are you a cooking creator? Turn your recipe followers into a revenue stream by hosting live Zoom cooking classes.
            </p>
            <ul className="space-y-6 mb-10">
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">✓</div>
                Teach your signature dish live
              </li>
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">✓</div>
                We handle payments and Zoom links
              </li>
              <li className="flex items-center gap-4 text-lg font-medium text-gray-800">
                <div className="w-8 h-8 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center">✓</div>
                Stop relying on brand deals
              </li>
            </ul>
            <Link href="/creators" className="inline-block bg-brand-orange text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand-orange/30">
              Start Hosting Today
            </Link>
          </div>
          <div className="relative">
            <img 
              src="/hero-cooking.png" 
              alt="Creator teaching a live cooking class from their kitchen" 
              className="rounded-3xl shadow-2xl object-cover w-full aspect-square opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-orange rounded-full flex items-center justify-center text-white text-xs">🍳</div>
            <span className="font-bold text-lg tracking-tight text-gray-900">bookacookingclass.com</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">About</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Support</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
          </div>
          <div className="text-sm font-medium text-gray-400">© 2026 BookACookingClass.com</div>
        </div>
      </footer>
    </div>
  );
}
