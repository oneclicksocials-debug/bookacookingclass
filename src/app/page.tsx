import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch live cities from Supabase
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .eq('is_active', true)
    .order('name');

  return (
    <>
      <nav>
        <Link href="/" className="nav-logo">
          book<span>a</span>cookingclass.com
        </Link>
        <ul className="nav-links">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#categories">Browse Classes</a></li>
          <li><a href="#for-hosts">List Your Class</a></li>
          <li><a href="#browse" className="nav-cta">Find a Class</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <i className="fas fa-map-marker-alt"></i> Boston & New England
            </div>
            <h1>
              Find your next <em>culinary adventure</em> nearby
            </h1>
            <p className="hero-sub">
              Browse and instantly book cooking classes from local chefs and studios.
              Perfect for date nights, birthdays, team events, or leveling up your kitchen game.
            </p>

            <div className="hero-search">
              <div className="search-input-wrap">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search classes, cuisines, or locations…" />
              </div>
              <button className="search-btn">Search Classes</button>
            </div>
            
            {/* Live Supabase Cities */}
            <div className="hero-tags" style={{ marginTop: '20px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-brand-textMuted)', marginRight: '10px' }}>Popular Cities:</span>
              {cities?.map((city) => (
                <Link key={city.id} href={`/in/${city.slug}`} className="hero-tag" style={{ textDecoration: 'none' }}>
                  📍 {city.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="class-cards-preview">
              <div className="preview-card">
                <div className="card-emoji">🍝</div>
                <div className="card-info">
                  <div className="card-title">Handmade Pasta from Scratch</div>
                  <div className="card-meta">
                    <span className="card-rating">★★★★★</span>
                    <span>4.9 · Boston, MA</span>
                    <span className="badge-new">New</span>
                  </div>
                </div>
                <div className="card-price">$89</div>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">{cities?.length || 0}</div>
                <div className="stat-label">Cities Live</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">50+</div>
                <div className="stat-label">Local Hosts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how" id="how-it-works">
        <div className="section-header">
          <div className="section-tag">Simple Process</div>
          <h2>From discovery to dining table in minutes</h2>
          <p>No back-and-forth. No waiting. Browse, book, and show up hungry.</p>
        </div>

        <div className="steps">
          <div className="step" data-num="1">
            <div className="step-icon"><i className="fas fa-search"></i></div>
            <h3>Browse & Filter</h3>
            <p>Search by cuisine, location, group size, price, or date. Find the perfect class for your skill level and schedule.</p>
          </div>
          <div className="step" data-num="2">
            <div className="step-icon"><i className="fas fa-calendar-check"></i></div>
            <h3>Book Instantly</h3>
            <p>Reserve your spot in seconds with secure online payment. Instant confirmation sent straight to your inbox.</p>
          </div>
          <div className="step" data-num="3">
            <div className="step-icon"><i className="fas fa-utensils"></i></div>
            <h3>Cook & Enjoy</h3>
            <p>Show up, learn from local chefs, eat what you make. Leave with new skills and great memories.</p>
          </div>
        </div>
      </section>

      <section className="categories" id="categories">
        <div className="section-header">
          <div className="section-tag">Explore</div>
          <h2>Every cuisine. Every skill level.</h2>
          <p>From weeknight meals to fine dining techniques — there's a class for every palate.</p>
        </div>

        <div className="cat-grid">
          <div className="cat-card">
            <div className="cat-emoji">🍝</div>
            <div className="cat-name">Italian</div>
            <div className="cat-count">24 classes</div>
          </div>
          <div className="cat-card">
            <div className="cat-emoji">🍣</div>
            <div className="cat-name">Japanese</div>
            <div className="cat-count">18 classes</div>
          </div>
          <div className="cat-card">
            <div className="cat-emoji">🥐</div>
            <div className="cat-name">Baking & Pastry</div>
            <div className="cat-count">22 classes</div>
          </div>
          <div className="cat-card">
            <div className="cat-emoji">🍷</div>
            <div className="cat-name">Wine & Pairing</div>
            <div className="cat-count">11 classes</div>
          </div>
        </div>
      </section>

      <section className="for-hosts" id="for-hosts">
        <div className="hosts-inner">
          <div className="hosts-left">
            <div className="section-tag">For Class Hosts</div>
            <h2>
              Turn your kitchen into a <em style={{ color: 'var(--color-brand-terracotta)', fontStyle: 'italic' }}>revenue stream</em>
            </h2>
            <p>
              Whether you're a professional chef, culinary instructor, or passionate home cook — 
              list your class and reach thousands of local food lovers ready to book.
            </p>
            <div className="host-benefits">
              <div className="benefit-item">
                <div className="benefit-icon"><i className="fas fa-bolt"></i></div>
                <div className="benefit-text">
                  <strong>Get booked in days, not months</strong>
                  <span>Your class goes live within 48 hours of submission.</span>
                </div>
              </div>
            </div>
            <a href="#list" className="btn-primary" style={{ marginTop: '24px' }}>
              <i className="fas fa-plus"></i> List My Cooking Class — Free
            </a>
          </div>

          <div className="hosts-right">
            <div className="pricing-label">Host Pricing</div>
            <div className="pricing-headline">Simple, transparent fees</div>
            <div className="pricing-sub">No monthly subscription. We only make money when you do.</div>

            <div className="plan">
              <div className="plan-top">
                <div className="plan-name">Starter Listing</div>
              </div>
              <div className="plan-price">Free <span>to list</span></div>
              <div className="plan-desc" style={{ marginTop: '8px' }}>15% booking fee per reservation. No upfront cost, no risk.</div>
            </div>
          </div>
        </div>
      </section>

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
