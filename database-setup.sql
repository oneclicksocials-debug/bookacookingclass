-- 1. Create the Cities table
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    state TEXT,
    country TEXT DEFAULT 'USA',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Create the Classes table (for when local hosts claim their pages in Phase 2)
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    host_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    price_usd NUMERIC NOT NULL,
    duration_hours NUMERIC,
    image_url TEXT,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Insert the top 10 starting cities
INSERT INTO public.cities (name, slug, state) VALUES
('Boston', 'boston', 'MA'),
('New York City', 'new-york-city', 'NY'),
('Chicago', 'chicago', 'IL'),
('San Francisco', 'san-francisco', 'CA'),
('Austin', 'austin', 'TX'),
('Seattle', 'seattle', 'WA'),
('Denver', 'denver', 'CO'),
('Miami', 'miami', 'FL'),
('Portland', 'portland', 'OR'),
('Los Angeles', 'los-angeles', 'CA')
ON CONFLICT (slug) DO NOTHING;
