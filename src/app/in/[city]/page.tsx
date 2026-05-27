import Link from 'next/link';

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const resolvedParams = await params;
  const rawCity = resolvedParams.city;
  const cityName = rawCity.charAt(0).toUpperCase() + rawCity.slice(1).replace(/-/g, ' ');

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">
          book<span>a</span>cookingclass.com
        </Link>
        <div className="nav-right">
          <Link href="/browse">Browse All Cities</Link>
          <Link href="/list-your-class" className="nav-cta">List Your Class</Link>
        </div>
      </nav>

      <div className="breadcrumb">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>{cityName}</span>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <i className="fas fa-map-marker-alt"></i>
            {cityName}, USA
          </div>
          <h1>Book a Cooking Class in <em>{cityName}</em></h1>
          <p className="hero-desc">
            Whether you're a traveler looking for an authentic culinary experience or a local wanting to master new recipes, we've gathered the best classes available in {cityName}.
          </p>
        </div>
      </section>

      <div className="page-body">
        <main className="main-content">
          <h2>Available Cooking Classes in {cityName}</h2>
          
          {/* THE VIATOR WIDGET PLACEHOLDER */}
          <div style={{ padding: '24px', background: 'var(--color-brand-cream)', border: '2px dashed var(--color-brand-terracotta)', borderRadius: '12px', textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ color: 'var(--color-brand-terracotta)', marginBottom: '8px' }}>[ Viator Widget Placeholder ]</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-brand-textMuted)' }}>
              Once Viator approves your account, paste the live booking widget code here to double conversions!
            </p>
          </div>

          <p style={{ marginBottom: '24px' }}>
            Below are the top-rated cooking experiences currently available in {cityName}. We earn a small referral commission at no extra cost to you.
          </p>

          <div className="class-cards">
            {/* GetYourGuide Fallback / Permanent Links */}
            <a className="class-card fade-in visible" href="https://www.getyourguide.com?partner_id=UO3Q6U2&cmp=share_to_earn" target="_blank" rel="noopener noreferrer">
              <div className="card-icon">🍝</div>
              <div className="card-body">
                <div className="card-platform">via GetYourGuide</div>
                <div className="card-title">Handmade Pasta from Scratch</div>
                <div className="card-meta">
                  <span><i className="fas fa-clock"></i> 3 Hours</span>
                  <span><i className="fas fa-tag"></i> From $89/person</span>
                </div>
                <div className="card-cta">Book on GetYourGuide <i className="fas fa-arrow-right"></i></div>
              </div>
            </a>
          </div>
        </main>
      </div>

      <footer>
        <div className="footer-inner">
          <Link href="/" className="footer-logo">
            book<span>a</span>cookingclass.com
          </Link>
          <div className="footer-links">
            <a href="#">Browse Classes</a>
            <a href="#">List a Class</a>
            <a href="#">About</a>
            <a href="#">Terms</a>
          </div>
          <div className="footer-copy">© 2026 BookACookingClass.com</div>
        </div>
      </footer>
    </>
  );
}
