'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [city, setCity] = useState('');
  const [cuisine, setCuisine] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) {
        // Default to a fallback or shake the input (for simplicity, we'll just focus the input)
        document.getElementById('location-input')?.focus();
        return;
    }
    
    // Convert "New York City" to "new-york-city"
    const slug = city.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // For now we just route to the city page. We could pass cuisine as a query param later.
    router.push(`/in/${slug}`);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-2xl border border-gray-200 max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
      <div className="flex-1 flex items-center px-6 py-4">
        <span className="text-2xl mr-4">📍</span>
        <div className="text-left w-full">
          <label htmlFor="location-input" className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-1 block">Location</label>
          <input 
            id="location-input"
            type="text" 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Where do you want to cook?" 
            className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium text-lg" 
            required
          />
        </div>
      </div>
      <div className="hidden md:block w-px bg-gray-200 my-4"></div>
      <div className="flex-1 flex items-center px-6 py-4">
        <span className="text-2xl mr-4">🍝</span>
        <div className="text-left w-full">
          <label htmlFor="cuisine-input" className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-1 block">Cuisine</label>
          <input 
            id="cuisine-input"
            type="text" 
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Pasta, Sushi, Pastry..." 
            className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium text-lg" 
          />
        </div>
      </div>
      <button type="submit" className="bg-brand-orange text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-orangeDark transition-colors flex items-center justify-center gap-2 m-1">
        <span>🔍</span> Search
      </button>
    </form>
  );
}
