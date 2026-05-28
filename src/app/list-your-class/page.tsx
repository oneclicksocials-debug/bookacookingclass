import SubmitForm from './SubmitForm';

export const metadata = {
  title: 'Host a Cooking Class | BookACookingClass',
  description: 'Share your culinary heritage, earn money on your schedule, and reach thousands of local foodies by hosting a cooking class.',
};

export default function ListYourClassPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col font-sans text-gray-900 selection:bg-brand-orange selection:text-white pt-24">
      {/* NAVBAR (Re-used basic style) */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-orange rounded-full flex items-center justify-center text-white text-sm">🍳</div>
          <span className="font-bold text-xl tracking-tight text-gray-900">bookacookingclass</span>
        </a>
        <div className="hidden md:block">
          <a href="/" className="font-bold text-sm text-gray-700 hover:text-brand-orange transition-colors">Back to Home</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 px-6 lg:px-12 overflow-hidden flex-1">
        {/* Subtle background blob */}
        <div className="absolute top-20 right-0 w-full max-w-2xl h-[500px] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div className="max-w-xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-brand-orange font-bold text-xs uppercase tracking-widest mb-6">
              Become a Host
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Share your <span className="text-brand-orange">culinary heritage.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 font-medium leading-relaxed">
              Join thousands of local chefs and food lovers earning money on their own schedule by hosting cooking classes.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-2xl text-brand-orange">💸</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Earn on your schedule</h3>
                  <p className="text-gray-600 font-medium">You set the prices, the dates, and the class sizes. It's completely up to you.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-2xl text-brand-orange">📣</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">We handle the marketing</h3>
                  <p className="text-gray-600 font-medium">Get your class in front of thousands of local foodies searching for unique experiences.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-2xl text-brand-orange">🛡️</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Seamless payments</h3>
                  <p className="text-gray-600 font-medium">We process payments securely and deposit earnings directly into your bank account.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: The Form */}
          <div className="relative z-10 lg:pl-10">
            <SubmitForm />
          </div>

        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-8 px-6 text-center">
        <p className="text-sm font-bold text-gray-400">© 2026 BookACookingClass.com</p>
      </footer>
    </div>
  );
}
