import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { cityContents } from '@/content/cities';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const rawCity = resolvedParams.city.toLowerCase();
  const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace(/-/g, ' ');

  const customContent = cityContents[rawCity];

  if (customContent) {
    return {
      title: customContent.heroTitle,
      description: customContent.heroDescription.substring(0, 160) + "...",
      alternates: {
        canonical: `https://bookacookingclass.com/cooking-class/${rawCity}`
      }
    };
  }

  return {
    title: `Top Cooking Classes in ${cityName} | Book Instantly`,
    description: `Find the best cooking classes, culinary workshops, and food experiences in ${cityName}. Compare reviews, prices, and book instantly.`,
    alternates: {
      canonical: `https://bookacookingclass.com/cooking-class/${rawCity}`
    }
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const rawCity = resolvedParams.city.toLowerCase();
  const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace(/-/g, ' ');

  const customContent = cityContents[rawCity];

  // Fetch classes dynamically from Supabase
  const { data: classes } = await supabase
    .from('classes')
    .select('*')
    .ilike('city', `%${resolvedParams.city.replace(/-/g, ' ')}%`)
    .order('reviews', { ascending: false, nullsFirst: false });

  // Generate FAQ schema
  const faqs = customContent?.faqs || [
    {
      q: `How much does a cooking class in ${cityName} cost?`,
      a: `Cooking classes in ${cityName} typically range from $30 to $65 per person for a half or full-day class.`
    },
    {
      q: `Are ${cityName} cooking classes suitable for beginners?`,
      a: "Yes. All classes welcome complete beginners."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f: any) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const renderClassCard = (cls: any) => (
    <div key={cls.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div className="relative h-48 w-full overflow-hidden">
        {cls.reviews && cls.reviews > 500 && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-900 z-10">
            Bestseller
          </div>
        )}
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
        <a href={`/class/${cls.slug}`} className="block mt-4 text-center w-full bg-[#1A233A] text-white py-3 rounded-xl font-bold hover:bg-[#253251] transition-colors shadow-md">
            View Details
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 px-6 lg:px-12 py-4 bg-white/90 backdrop-blur-md border-b border-gray-200 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-sm">🍳</div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">bookacookingclass</span>
        </a>
        <div className="flex flex-1 max-w-md mx-6">
            <div className="w-full flex items-center bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors cursor-pointer border border-transparent hover:border-gray-300 shadow-sm">
                <span className="text-gray-500 mr-2">🔍</span>
                <span className="text-gray-600 font-medium text-sm flex-1 truncate">{cityName} • Any date • Any class</span>
            </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="/list-your-class" className="font-bold text-sm text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition-colors">Host a class</a>
        </div>
      </nav>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500 flex gap-2">
          <a href="/" className="hover:text-brand-orange">Home</a>
          <span>›</span>
          <span className="text-gray-900 font-medium">{cityName} Cooking Classes</span>
        </div>
      </div>
      
      <div className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {customContent?.heroTitle || `Book a Cooking Class in ${cityName}`}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl whitespace-pre-wrap">
            {customContent?.heroDescription || `Learn authentic cooking from local chefs — market tours, organic farms, and hands-on technique from $30/person. ${cityName} is a culinary capital where food culture runs deeper than any restaurant menu.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        <div className="w-full lg:w-3/4">
          
          {/* CUSTOM VIBE GUIDES */}
          {customContent?.vibes && (
            <div className="mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">The {cityName} Vibe Guide</h2>
              <div className="grid gap-6">
                {customContent.vibes.map((vibe: any, i: number) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{vibe.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{vibe.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM TOP PICKS (Matches specific classes) */}
          {customContent?.topPicks && classes && (
            <div className="mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{customContent.topPicksTitle}</h2>
              <p className="text-xl text-gray-600 mb-6">{customContent.topPicksSubtitle}</p>
              <div className="grid grid-cols-1 gap-6">
                {customContent.topPicks.map((pick: any, i: number) => {
                  // Find the matching class from Supabase
                  const matchedClass = classes.find((c: any) => c.title.toLowerCase().includes(pick.searchQuery.toLowerCase()));
                  return (
                    <div key={i} className="bg-brand-orange/5 border border-brand-orange/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center hover:shadow-lg transition-all">
                       <div className="flex-1">
                          <div className="inline-block bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                            {pick.badge}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{pick.title}</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">{pick.description}</p>
                          <div className="flex items-center gap-4 text-sm font-bold text-gray-600 mb-4">
                            <span>💰 {pick.price}</span>
                            <span>⭐ {pick.rating}</span>
                          </div>
                          {matchedClass ? (
                            <a href={`/class/${matchedClass.slug}`} className="inline-block bg-brand-orange text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-md">
                              View Dates & Book
                            </a>
                          ) : (
                            <button disabled className="inline-block bg-gray-300 text-gray-500 px-6 py-3 rounded-xl font-bold cursor-not-allowed">
                              Class Currently Unavailable
                            </button>
                          )}
                       </div>
                       {matchedClass && matchedClass.image_url && (
                         <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden shrink-0">
                           <img src={matchedClass.image_url} alt={pick.title} className="w-full h-full object-cover"/>
                         </div>
                       )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ALL CLASSES (Grouped or Default) */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">All {cityName} Cooking Classes</h2>
          
          {customContent?.classCategories ? (
            <div className="space-y-12 mb-12">
              {customContent.classCategories.map((cat: any, i: number) => {
                const categoryClasses = classes?.filter((c: any) => 
                  cat.searchKeywords.some((kw: string) => c.title.toLowerCase().includes(kw.toLowerCase()) || c.description?.toLowerCase().includes(kw.toLowerCase()))
                );

                if (!categoryClasses || categoryClasses.length === 0) return null;

                return (
                  <div key={i}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{cat.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {categoryClasses.map(renderClassCard)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {!classes || classes.length === 0 ? (
                <p className="text-gray-600">No classes found in {cityName} yet.</p>
              ) : (
                classes.map(renderClassCard)
              )}
            </div>
          )}


          {/* FAQ Section */}
          <h2 className="text-3xl font-extrabold mb-6 mt-16">Frequently Asked Questions</h2>
          <div className="space-y-4 mb-12">
            {faqs.map((faq: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-80 flex flex-col gap-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-28 shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Quick Facts</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-gray-500">Destination</span><span className="font-medium">{cityName}</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Avg Price</span><span className="font-medium">$30–$80 / person</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Length</span><span className="font-medium">3–6 hours</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Language</span><span className="font-medium">English</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Instant Book</span><span className="font-medium text-green-600">Yes</span></li>
            </ul>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-2">Teach cooking in {cityName}?</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                List your class free. We handle discovery, payments, and marketing. You cook, we handle the rest.
              </p>
              <a href="/list-your-class" className="inline-block bg-white text-gray-900 font-bold px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors">
                List My Class — Free
              </a>
            </div>
            <div className="absolute -bottom-10 -right-10 text-9xl opacity-10">🍳</div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-12 px-6 lg:px-12 mt-auto border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-gray-900">bookacookingclass</span>
          </div>
          <div className="text-xs text-gray-400 text-center md:text-left">
            Disclosure: Some links on this page are affiliate links. We earn a small commission when you book through them at no extra cost to you.
            <br/>© 2026 BookACookingClass.com · Terms · Privacy
          </div>
        </div>
      </footer>
    </div>
  );
}
