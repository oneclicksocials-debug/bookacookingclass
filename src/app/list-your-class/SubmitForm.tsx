'use client';

import { useState } from 'react';
import { submitHostApplication } from './actions';

export default function SubmitForm() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setErrorMsg('');
    
    const formData = new FormData(e.currentTarget);
    const result = await submitHostApplication(formData);
    
    setIsPending(false);
    
    if (result.error) {
      setErrorMsg(result.error);
    } else if (result.success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center shadow-lg">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-extrabold text-green-900 mb-2">Application Received!</h3>
        <p className="text-green-700 font-medium">
          Thanks for your interest in hosting! Our team will review your details and reach out to you via email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 relative">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-orange to-yellow-400 rounded-t-3xl"></div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-2">Get Started</h3>
      
      {errorMsg && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium mb-6">
          {errorMsg}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
            placeholder="Chef Gordon"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
            placeholder="gordon@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-1">City *</label>
          <input 
            type="text" 
            id="city" 
            name="city" 
            required 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all"
            placeholder="e.g. Austin, Texas"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-1">Tell us about your class idea</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all resize-none"
            placeholder="I want to teach how to make authentic Texas BBQ..."
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          disabled={isPending}
          className={`w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-brand-orange transition-colors mt-2 shadow-md ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isPending ? 'Sending...' : 'Apply to Host'}
        </button>
      </div>
      <p className="text-xs text-center text-gray-400 font-medium mt-6">
        No commitment required. We'll help you set everything up.
      </p>
    </form>
  );
}
