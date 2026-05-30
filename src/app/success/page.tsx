'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const slug = searchParams.get('slug');

  // In a real app, you would fetch the specific Zoom/WhatsApp links for this 'slug'
  // using a secure server component or API route (to prevent scraping).
  // For the MVP, we hardcode mock details.
  
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900">
        You're in! 🎉
      </h1>
      
      <p className="text-xl text-gray-600 font-medium mb-10 leading-relaxed">
        Your payment was successful and your receipt has been emailed to you. Here are your private access links for the class.
      </p>

      <div className="space-y-6 text-left">
        {/* Calendar Box */}
        <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h3 className="font-bold text-blue-900 text-lg mb-1">Mark Your Calendar</h3>
            <p className="text-blue-700">Saturday, June 15 at 2:00 PM EST. The secure Zoom link is inside the invite.</p>
          </div>
          <a href="#" className="w-full md:w-auto px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors text-center shadow-lg shadow-blue-600/20 whitespace-nowrap">
            Add to Calendar
          </a>
        </div>

        {/* SMS Hack Box */}
        <div className="p-6 bg-green-50 border border-green-100 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h3 className="font-bold text-green-900 text-lg mb-1">Get The Grocery List 📱</h3>
            <p className="text-green-700">Text us right now to get the printable grocery list sent to your phone.</p>
          </div>
          <a 
            href="sms:+1234567890?body=Hey!%20I%20just%20bought%20a%20ticket%20to%20the%20sourdough%20class.%20Send%20me%20the%20grocery%20list!" 
            className="w-full md:w-auto px-8 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-colors text-center shadow-lg shadow-[#25D366]/20 whitespace-nowrap"
          >
            Text Us
          </a>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium transition-colors">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans py-12 md:py-24 px-6">
      <Suspense fallback={<div className="text-center p-12">Loading your tickets...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
