import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const { data: classData } = await supabase
    .from('classes')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!classData) {
    return {
      title: 'Class Not Found | BookACookingClass.com',
    };
  }

  return {
    title: `${classData.title} | BookACookingClass.com`,
    description: classData.description ? classData.description.substring(0, 160) + '...' : `Book ${classData.title} in ${classData.city}`,
    openGraph: {
      title: classData.title,
      description: classData.description ? classData.description.substring(0, 160) + '...' : `Book ${classData.title} in ${classData.city}`,
      images: classData.image_url ? [classData.image_url] : [],
    }
  };
}

export default async function ClassProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const { data: classData } = await supabase
    .from('classes')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!classData) {
    notFound();
  }

  // Parse highlights from duration/features if we wanted to, but for now we'll just have generic ones
  const highlights = [
    "Free cancellation up to 24 hours before",
    "Local host and guide",
    "All ingredients provided",
    "Taste your creations"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 1. Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-orange">Home</Link>
          <span className="mx-2">›</span>
          <a href={`/cooking-class/${(classData.city || 'chiang-mai').toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-brand-orange">
            {classData.city || 'City'} Cooking Classes
          </a>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium truncate">{classData.title}</span>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Details */}
        <div className="w-full lg:w-2/3">
          {classData.reviews && classData.reviews > 1000 ? (
            <div className="inline-block bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
              Best Seller
            </div>
          ) : null}
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {classData.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700 mb-6">
            <span className="flex items-center gap-1 text-yellow-500">
              ⭐ {classData.rating || 'New'} 
              {classData.reviews ? <span className="text-gray-500 font-normal">({classData.reviews.toLocaleString('en-US')} Reviews)</span> : <span className="text-gray-500 font-normal">(0 Reviews)</span>}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              🕒 {classData.duration || 'Flexible'}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              📍 {classData.city || 'Location TBA'}
            </span>
          </div>

          <div className="w-full h-80 sm:h-96 md:h-[500px] rounded-3xl overflow-hidden mb-10 shadow-sm border border-gray-100">
            <img src={classData.image_url || 'https://via.placeholder.com/800x600'} alt={classData.title} className="w-full h-full object-cover" />
          </div>

          {classData.description && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this class</h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg whitespace-pre-line">
                {classData.description}
              </p>
            </>
          )}

          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
          <ul className="space-y-3 mb-10">
            {highlights.map((highlight, idx) => (
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
                  <span className="text-3xl font-extrabold text-gray-900">${classData.price || 'N/A'}</span>
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
              href={classData.affiliate_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-brand-orange text-white text-center font-bold text-lg py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-md"
            >
              Check Availability
            </a>
            <p className="text-xs text-gray-400 text-center mt-3">Secure booking processed by Viator</p>
          </div>
        </div>

      </div>
    </div>
  );
}
