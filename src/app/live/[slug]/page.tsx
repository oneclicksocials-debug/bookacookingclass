'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for the MVP - will be replaced with Supabase data
const classData = {
  id: 'class_123',
  title: 'The Perfect Sourdough Starter Masterclass',
  chef: 'Gordon Ramsay',
  date: 'Saturday, June 15, 2026',
  time: '2:00 PM EST',
  duration: '90 Minutes',
  price: 4500, // in cents
  priceDisplay: '$45.00',
  spotsLeft: 12,
  description: "Join me live in my kitchen as we build the perfect sourdough starter from scratch. You will learn the exact hydration ratios, feeding schedules, and troubleshooting techniques I use in my restaurants. Grab your flour, your scale, and let's bake.",
  image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=1200'
};

export default function LiveClassPage({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          classId: classData.id,
          title: classData.title,
          price: classData.price,
          chef: classData.chef,
          slug: params.slug,
          date: classData.date,
          time: classData.time
        }),
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert('Checkout failed to initiate.');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to checkout.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            BookA<span className="text-[#FF5A5F]">Cooking</span>Class
          </Link>
          <div className="text-sm font-medium text-gray-500">Live Checkout</div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-24">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-start relative">
          
          {/* Left Side: Class Details */}
          <div className="md:w-3/5 p-8 md:p-12 border-r border-gray-100">
            <div className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wider mb-6">
              🔴 Live on Zoom
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              {classData.title}
            </h1>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                {classData.chef.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Hosted by</p>
                <p className="font-bold">{classData.chef}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 text-gray-600">
                <span className="text-xl">📅</span>
                <span className="font-medium">{classData.date}</span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="text-xl">⏰</span>
                <span className="font-medium">{classData.time} ({classData.duration})</span>
              </div>
            </div>

            <div className="prose prose-lg text-gray-600 leading-relaxed mb-12">
              <p>{classData.description}</p>
            </div>

            {/* Social Proof / Reviews */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What past students say</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex text-yellow-400 mb-3">★★★★★</div>
                  <p className="text-gray-600 text-sm mb-4">"Absolutely incredible. My starter finally doubled in size after struggling for months! Gordon makes it so easy to understand."</p>
                  <p className="font-bold text-sm text-gray-900">— Sarah M.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex text-yellow-400 mb-3">★★★★★</div>
                  <p className="text-gray-600 text-sm mb-4">"The best $45 I've ever spent. Being able to ask questions live while mixing the dough was a game changer."</p>
                  <p className="font-bold text-sm text-gray-900">— David K.</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-bold text-gray-900 mb-2">Do I need to be a pro chef?</h4>
                  <p className="text-gray-600 text-sm">Not at all! This class is designed for absolute beginners. I will walk you through every single step in real-time.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-bold text-gray-900 mb-2">Will the class be recorded?</h4>
                  <p className="text-gray-600 text-sm">Yes! Everyone who buys a ticket will receive a private link to rewatch the recording forever.</p>
                </div>
                <div className="pb-4">
                  <h4 className="font-bold text-gray-900 mb-2">What ingredients do I need?</h4>
                  <p className="text-gray-600 text-sm">After you secure your spot, you'll instantly get a text with the exact printable grocery list and equipment needed.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Checkout Panel */}
          <div className="md:w-2/5 w-full bg-gray-50 p-8 md:p-12 flex flex-col sticky top-24 z-50 md:h-[calc(100vh-8rem)] md:rounded-r-3xl border-l border-gray-100">
            <div className="flex-grow">
              <img 
                src={classData.image} 
                alt={classData.title} 
                className="w-full h-48 object-cover rounded-2xl mb-8 shadow-md"
              />

              <div className="flex justify-between items-end mb-6">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Ticket Price</p>
                  <p className="text-4xl font-extrabold text-gray-900">{classData.priceDisplay}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#FF5A5F]">{classData.spotsLeft} spots left!</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Interactive Live Zoom Access
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Printable Recipe Card
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Live Q&A with {classData.chef}
                </li>
              </ul>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={loading}
              className={`relative z-[60] w-full py-5 rounded-2xl bg-[#FF5A5F] text-white font-bold text-lg hover:bg-[#E04A50] transition-all shadow-xl shadow-[#FF5A5F]/20 flex justify-center items-center cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Secure Your Spot'
              )}
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400 font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Secured by Stripe
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
