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

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-orange selection:text-white font-sans">
      
      {/* AIRBNB-STYLE NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-sm">🍳</div>
          <span className="font-bold text-xl tracking-tight text-gray-900">bookacookingclass</span>
        </Link>
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
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide mr-2">Top Cities:</span>
            {cities?.map((city) => (
              <Link key={city.id} href={`/cooking-class/${city.slug}`} className="px-5 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:border-brand-orange hover:text-brand-orange hover:shadow-md transition-all">
                {city.name}
              </Link>
            ))}
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

      {/* MASTERCLASS STYLE HOST SECTION (DARK MODE) */}
      <section className="py-24 px-6 lg:px-12 bg-[#0F0F0F] text-white" id="for-hosts">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight">
              Share your <span className="text-brand-orange">craft.</span>
            </h2>
            <p className="text-xl text-gray-400 font-medium mb-10 leading-relaxed max-w-md">
              Are you a chef or culinary expert? Turn your passion into a revenue stream by hosting local cooking classes.
            </p>
            <ul className="space-y-6 mb-10">
              <li className="flex items-center gap-4 text-lg font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center">✓</div>
                Reach thousands of local foodies
              </li>
              <li className="flex items-center gap-4 text-lg font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center">✓</div>
                Free to list, transparent fees
              </li>
              <li className="flex items-center gap-4 text-lg font-medium">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center">✓</div>
                Get booked instantly
              </li>
            </ul>
            <a href="#list" className="inline-block bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Start Hosting Today
            </a>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-tr from-brand-orange to-brand-orangeDark rounded-3xl overflow-hidden p-8 flex flex-col justify-between shadow-2xl">
              <div className="text-white/80 font-bold uppercase tracking-widest text-sm">Host Dashboard</div>
              <div>
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-3xl font-extrabold mb-2">Grow your business</h3>
                <p className="text-white/90 font-medium">Manage bookings, communicate with guests, and get paid automatically.</p>
              </div>
            </div>
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
