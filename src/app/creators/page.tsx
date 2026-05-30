'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreatorsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    handle: '',
    specialty: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/mojbrqbj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Creator Application: ' + formData.name
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('There was a problem submitting your application. Please try again.');
      }
    } catch (error) {
      alert('There was a problem submitting your application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#FF5A5F]/20">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            BookA<span className="text-[#FF5A5F]">Cooking</span>Class
          </Link>
          <a href="#apply" className="px-6 py-2.5 rounded-full bg-[#FF5A5F] text-white font-medium hover:bg-[#E04A50] transition-colors">
            Apply Now
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5A5F]/10 text-[#FF5A5F] text-sm font-semibold mb-8 border border-[#FF5A5F]/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A5F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5A5F]"></span>
              </span>
              Now accepting cooking creators
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-gray-900">
              Turn your recipe followers into a <br className="hidden md:block" />
              <span className="text-[#FF5A5F]">
                6-figure cooking class.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Teach your signature dish live on Zoom. We handle the gorgeous landing page, ticketing, payments, and calendar invites. Stop relying on brand deals and start owning your cooking class empire.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#apply" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF5A5F] text-white font-bold text-lg hover:bg-[#E04A50] transition-colors shadow-lg shadow-[#FF5A5F]/30 text-center">
                Host Your First Class
              </a>
              <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-100 text-gray-900 font-bold text-lg hover:bg-gray-200 transition-colors border border-gray-200 text-center">
                See How It Works
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#FF5A5F]/10 rounded-3xl transform rotate-3 -z-10"></div>
            <img 
              src="/hero-cooking.png" 
              alt="Creator teaching a live cooking class from their kitchen" 
              className="rounded-2xl shadow-2xl border border-gray-100 object-cover w-full h-[500px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                 <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               </div>
               <div>
                 <p className="text-sm text-gray-500 font-medium">Ticket Sold</p>
                 <p className="text-lg font-bold text-gray-900">+$45.00</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Zero tech headaches.</h2>
            <p className="text-gray-600 text-lg">We built the exact platform we wished we had.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#FF5A5F]/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#FF5A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">1. Share Your Custom Link</h3>
              <p className="text-gray-600 leading-relaxed">
                We build you a gorgeous, conversion-optimized checkout page. Just put the link in your bio.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">2. We Collect Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Our Stripe integration handles the ticketing. The moment a customer pays, we automatically send them a private Zoom link.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">3. You Teach (Live on Zoom)</h3>
              <p className="text-gray-600 leading-relaxed">
                You just show up in your kitchen and teach. We can even turn the recording into an evergreen course you sell 24/7.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="apply" className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Claim Your Invite</h2>
            <p className="text-gray-600 mb-8">We are currently hand-selecting the first batch of cooking creators. Drop your details below and we'll reach out.</p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Application Received!</h3>
                <p className="text-green-600">We'll review your profile and be in touch shortly to set up your first class.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F] transition-all text-gray-900"
                      placeholder="Gordon"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Email</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F] transition-all text-gray-900"
                      placeholder="gordon@kitchen.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Social Media Handle or Link</label>
                  <input 
                    type="text" 
                    required
                    value={formData.handle}
                    onChange={(e) => setFormData({...formData, handle: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F] transition-all text-gray-900"
                    placeholder="@gordonramsay or LinkedIn URL"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">What is your cooking specialty?</label>
                  <input 
                    type="text" 
                    required
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF5A5F] focus:ring-1 focus:ring-[#FF5A5F] transition-all text-gray-900"
                    placeholder="e.g. Sourdough Bread, Neapolitan Pizza, Sushi"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#FF5A5F] text-white font-bold text-lg hover:bg-[#E04A50] transition-colors mt-4 shadow-lg shadow-[#FF5A5F]/20"
                >
                  Apply for Early Access
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
