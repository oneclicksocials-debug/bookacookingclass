import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const rawCity = resolvedParams.city;
  const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace(/-/g, ' ');

  // For Chiang Mai specifically, we use exact meta tags. We can make this dynamic later.
  if (rawCity === 'chiang-mai') {
    return {
      title: "Book a Cooking Class in Chiang Mai, Thailand (2026) — Top Classes & Prices",
      description: "Find and book the best cooking classes in Chiang Mai. Learn to make authentic Thai curry, Pad Thai, and Khao Soi from local chefs. Prices from $30. Instant booking.",
      alternates: {
        canonical: "https://bookacookingclass.com/cooking-class/chiang-mai"
      },
      openGraph: {
        title: "Book a Cooking Class in Chiang Mai — BookACookingClass.com",
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
  const rawCity = resolvedParams.city;
  const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace(/-/g, ' ');

  // Fetch classes dynamically from Supabase
  const { data: classes } = await supabase
    .from('classes')
    .select('*')
    .ilike('city', `%${resolvedParams.city.replace(/-/g, ' ')}%`)
    .order('reviews', { ascending: false, nullsFirst: false }); // Sort by most reviews

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a cooking class in Chiang Mai cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cooking classes in Chiang Mai typically range from $30 to $65 per person. Budget options start around $25–$30. Premium classes with organic farm visits run $45–$65. Private classes cost $80–$120."
        }
      },
      {
        "@type": "Question",
        "name": "Are Chiang Mai cooking classes good for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. All classes welcome complete beginners. Instructors guide you step by step through every technique."
        }
      },
      {
        "@type": "Question",
        "name": "Do Chiang Mai cooking classes include hotel pickup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — almost all cooking classes in Chiang Mai include free hotel pickup and drop-off within the city center."
        }
      }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Best Cooking Classes in Chiang Mai",
    "url": "https://bookacookingclass.com/cooking-class/chiang-mai",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Thai Farm Cooking School",
        "url": "https://www.viator.com/searchResults/all?text=Thai+Farm+Cooking+School+Chiang+Mai&pid=P00303066&mcid=42383&medium=link"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Mama Noi Thai Cookery School",
        "url": "https://www.getyourguide.com/s?q=Mama+Noi+Chiang+Mai&partner_id=YOUR_PARTNER_ID" // Placeholder for GYG
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Small Group Thai Cooking Class",
        "url": "https://www.airbnb.com/s/Chiang-Mai/experiences?query=cooking" // Placeholder for Airbnb
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
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
            Book a Cooking Class in {cityName}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Learn authentic cooking from local chefs — market tours, organic farms, and hands-on technique from $30/person. {cityName} is a culinary capital where food culture runs deeper than any restaurant menu.
          </p>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Grid of Classes */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Cooking Classes in {cityName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {!classes || classes.length === 0 ? (
              <p className="text-gray-600">No classes found in {cityName} yet.</p>
            ) : (
              classes.map((cls) => (
              <div key={cls.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
                {/* Image Area */}
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
                
                {/* Content Area */}
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
            )))}
          </div>

          {/* 6. What You'll Learn */}
          <h2 className="text-2xl font-bold mb-6">What You'll Learn in a {cityName} Cooking Class</h2>
          <ul className="grid sm:grid-cols-2 gap-4 mb-12">
            {[
              "How to make authentic Thai curry paste from scratch using a stone mortar and pestle",
              "The difference between Northern Thai cuisine (Khao Soi, Larb) and Central Thai dishes",
              "How to balance the four fundamental Thai flavors: sour, sweet, salty, and spicy",
              "Proper wok technique — heat control, oil timing, and the 'wok hei' technique",
              "How to shop a Thai morning market — identifying fresh herbs, chilies, and aromatics",
              "How to make mango sticky rice and traditional Thai desserts from scratch"
            ].map((item, i) => (
              <li key={i} className="flex gap-3 text-gray-700 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-brand-orange font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* 5. Why Chiang Mai Section */}
          <h2 className="text-2xl font-bold mb-6">Why Take a Cooking Class in {cityName}?</h2>
          <div className="prose prose-lg text-gray-700 mb-12">
            <p className="mb-4">
              Chiang Mai sits in Northern Thailand where the cuisine tells a story of ancient Lanna Kingdom influence, local hill tribes, and Burmese crossover. The food here is distinct from Bangkok — earthier, more herbal, less sweet. Dishes like Khao Soi (a coconut curry noodle soup unique to the north) and Nam Prik Ong (a pork and tomato chili dip) are things you simply cannot learn anywhere else in the world.
            </p>
            <p>
              What makes Chiang Mai cooking classes special is the access. Most classes start with a guided tour of a wet market where your chef walks you through stalls of lemongrass, galangal, kaffir lime leaves, and fresh chilies — explaining why each ingredient matters. You then cook in open-air farm kitchens or local homes, surrounded by rice paddies. It's not just a class. It's a full cultural experience that happens to make you a better cook.
            </p>
          </div>

          {/* 7. Best Time to Visit (Season Table) */}
          <h2 className="text-2xl font-bold mb-6">Best Time for a Cooking Class in {cityName}</h2>
          <p className="text-gray-700 mb-4">Chiang Mai cooking classes run year-round, but the experience varies by season.</p>
          <div className="overflow-x-auto mb-12">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-y border-gray-200">
                  <th className="py-3 px-4 font-bold text-gray-900">Season</th>
                  <th className="py-3 px-4 font-bold text-gray-900">Months</th>
                  <th className="py-3 px-4 font-bold text-gray-900">Notes</th>
                  <th className="py-3 px-4 font-bold text-gray-900">Badge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-4 font-medium">Cool & Dry</td>
                  <td className="py-3 px-4 text-gray-600">Nov–Feb</td>
                  <td className="py-3 px-4 text-gray-600">Perfect weather, peak tourist season, book 1 week ahead</td>
                  <td className="py-3 px-4"><span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 w-max">⭐ Best</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Hot</td>
                  <td className="py-3 px-4 text-gray-600">Mar–May</td>
                  <td className="py-3 px-4 text-gray-600">Very hot outdoors, indoor/AC classes preferable</td>
                  <td className="py-3 px-4 text-gray-400">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Rainy</td>
                  <td className="py-3 px-4 text-gray-600">Jun–Oct</td>
                  <td className="py-3 px-4 text-gray-600">Fewer tourists, lower prices, lush farm scenery</td>
                  <td className="py-3 px-4"><span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full w-max inline-block">Good value</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 8. FAQ Section */}
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-12">
            {[
              {
                q: `How much does a cooking class in ${cityName} cost?`,
                a: "Cooking classes in Chiang Mai typically range from $30 to $65 per person for a half or full-day class. Budget options start around $25–$30 and include 3–4 dishes. Premium classes with organic farm visits, market tours, and 5+ dishes run $45–$65. Private classes for couples cost $80–$120. Prices are among the most affordable in the world for the quality of experience offered."
              },
              {
                q: `Are ${cityName} cooking classes suitable for beginners?`,
                a: "Absolutely. Every cooking class in Chiang Mai is designed for all skill levels including complete beginners. Instructors guide you step by step through every technique. Many travelers say the class was their favorite experience in Thailand regardless of their cooking background."
              },
              {
                q: `Do ${cityName} cooking classes include pickup?`,
                a: "Yes — almost all cooking classes in Chiang Mai include free hotel pickup and drop-off within the city center. When booking, confirm your hotel is in the pickup zone. Most classes depart between 8:00–9:00 AM for morning sessions."
              },
              {
                q: "How far in advance should I book?",
                a: "During peak season (November–February) book at least 3–7 days ahead — the best classes fill up fast. During low season (June–October) 1–2 days ahead is usually fine. Same-day bookings are sometimes available but not guaranteed."
              },
              {
                q: `Can I book a private cooking class in ${cityName}?`,
                a: "Yes. Most schools offer private classes for couples, families, or small groups. Private sessions let you customize the menu, go at your own pace, and get one-on-one instruction. Expect to pay $80–$150 per person for a private class. Contact the host directly through the booking platform to arrange."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-80 flex flex-col gap-8">
          
          {/* 3. Quick Facts Box */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-28 shadow-sm">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Quick Facts</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-gray-500">Country</span><span className="font-medium">Thailand</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Cuisine</span><span className="font-medium">Northern Thai</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Avg Price</span><span className="font-medium">$30–$65 / person</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Length</span><span className="font-medium">3–6 hours</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Best For</span><span className="font-medium">Travelers, foodies</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Language</span><span className="font-medium">English</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Best Season</span><span className="font-medium">Nov–Feb</span></li>
              <li className="flex justify-between"><span className="text-gray-500">Pickup</span><span className="font-medium text-green-600">Yes</span></li>
            </ul>
          </div>

          {/* 9. Nearby Cities Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-4">Nearby Cities</h3>
            <div className="flex flex-col gap-3">
              {['Bangkok', 'Phuket', 'Pai', 'Koh Samui', 'Chiang Rai'].map((city) => (
                <a key={city} href={`/cooking-class/${city.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-brand-orange hover:underline">
                  Cooking Classes in {city}
                </a>
              ))}
            </div>
          </div>

          {/* 10. Host CTA Box */}
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
            {/* Decorative background element */}
            <div className="absolute -bottom-10 -right-10 text-9xl opacity-10">🍳</div>
          </div>

        </div>
      </div>

      {/* 11. Bottom CTA Banner */}
      <div className="bg-brand-orange/10 border-y border-brand-orange/20 py-16 px-6 text-center mt-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to cook in {cityName}?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Browse all available classes, compare prices, and book your spot in seconds.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="#top-classes" className="bg-brand-orange text-white font-bold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors shadow-md">
            Browse {cityName} Classes
          </a>
          <a href="/browse" className="bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-gray-50 border border-gray-200 transition-colors shadow-sm">
            View All Destinations
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-gray-900">bookacookingclass</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="/cooking-class/bangkok" className="hover:text-gray-900">Bangkok</a>
            <a href="/cooking-class/bali" className="hover:text-gray-900">Bali</a>
            <a href="/cooking-class/vietnam" className="hover:text-gray-900">Vietnam</a>
          </div>
        </div>
        
        {/* 12. Affiliate Disclosure */}
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-100 text-xs text-gray-400 text-center md:text-left">
          Disclosure: Some links on this page are affiliate links. We earn a small commission when you book through them at no extra cost to you.
          <br/>
          © 2026 BookACookingClass.com · Terms · Privacy
        </div>
      </footer>
    </div>
  );
}
