import Link from 'next/link';

// In a real app, this data would come from the Supabase database based on the slug.
// For now, we hardcode our first golden product page based on the Viator CSV data.
const mockClassData = {
  name: "Half-Day Thai Cooking Class at Organic Farm in Chiang Mai",
  price: 28.00,
  duration: "6 hours",
  rating: 5.0,
  reviews: 20105,
  image_url: "https://dynamic-media.tacdn.com/media/photo-o/2e/fc/fd/19/caption.jpg?w=800&h=600&s=1",
  viator_link: "https://www.viator.com/tours/Chiang-Mai/Half-Day-Thai-Cooking-Course-at-Smile-Organic-Farm-Cooking-School/d5267-345511P1",
  city: "Chiang Mai",
  highlights: [
    "Free cancellation up to 24 hours before",
    "Visit an organic farm",
    "Make curry paste from scratch",
    "Prepare curry, stir-fry, soup, and spring rolls"
  ],
  description: "Don’t just eat the incredible food in Thailand; with this hands-on half-day experience—you can visit an organic farm and learn how to make local dishes from scratch. Discover expert tips on how to grow herbs and vegetables, and then take part in a cooking class where you can make a variety of dishes—such as curry paste, curry, stir-fry, soup, and spring rolls.",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return {
    title: `${mockClassData.name} | BookACookingClass.com`,
    description: mockClassData.description.substring(0, 160) + '...',
    openGraph: {
      title: `${mockClassData.name}`,
      description: mockClassData.description.substring(0, 160) + '...',
      images: [mockClassData.image_url],
    }
  };
}

export default async function ClassProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  // In the future: const classData = await supabase.from('classes').select('*').eq('slug', resolvedParams.slug).single();
  const classData = mockClassData;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 1. Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-orange">Home</Link>
          <span className="mx-2">›</span>
          <Link href={`/cooking-class/${classData.city.toLowerCase().replace(' ', '-')}`} className="hover:text-brand-orange">
            {classData.city} Cooking Classes
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium truncate">{classData.name}</span>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Details */}
        <div className="w-full lg:w-2/3">
          <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            Best Seller
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {classData.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700 mb-6">
            <span className="flex items-center gap-1 text-yellow-500">
              ⭐ {classData.rating} <span className="text-gray-500 font-normal">({classData.reviews.toLocaleString()} Reviews)</span>
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              🕒 {classData.duration}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              📍 {classData.city}, Thailand
            </span>
          </div>

          <div className="w-full h-80 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-sm border border-gray-100">
            <img src={classData.image_url} alt={classData.name} className="w-full h-full object-cover" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">About this class</h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            {classData.description}
          </p>

          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
          <ul className="space-y-3 mb-10">
            {classData.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-green-500 text-lg">✓</span>
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="w-full lg:w-1/3 relative">
          <div className="sticky top-8 bg-white border border-gray-200 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-6">
              <div>
                <p className="text-sm text-gray-500 font-medium mb-1">Price per person</p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-gray-900">${classData.price}</span>
                  <span className="text-gray-500 font-medium mb-1">USD</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Availability</span>
                <span className="text-green-600 font-medium">Available today</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cancellation</span>
                <span className="text-gray-900 font-medium">Free 24hr cancellation</span>
              </div>
            </div>

            <a 
              href={classData.viator_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-brand-orange text-white text-center font-bold text-lg py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-md"
            >
              Check Availability
            </a>
            <p className="text-xs text-gray-400 text-center mt-3">Secure booking processed by Viator</p>

            {/* The Trojan Horse: Host Acquisition Strategy */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-2">Are you the owner of this cooking school?</p>
              <Link href="/list-your-class" className="text-brand-orange font-medium text-sm hover:underline">
                Claim this profile to save on booking fees ›
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
