const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const newCities = [
  'Nashville', 'Houston', 'San Diego', 'Atlanta', 'Las Vegas', 
  'Orlando', 'Dallas', 'New Orleans', 'San Antonio', 'Rome', 
  'Myrtle Beach', 'Philadelphia', 'Paris', 'Phoenix', 'London', 
  'Tampa', 'Florence', 'Oahu', 'Key West', 'Maui', 
  'Barcelona', 'Lisbon', 'Washington DC', 'Colorado', 'Arizona', 'Florida'
];

async function run() {
  let inserted = 0;
  for (const cityName of newCities) {
    const slug = cityName.toLowerCase().replace(/\s+/g, '-');
    
    // Check if exists
    const { data: existing } = await supabase.from('cities').select('id').eq('slug', slug);
    if (existing && existing.length > 0) {
      console.log(`Skipping ${cityName}, already exists.`);
      continue;
    }

    const { error } = await supabase.from('cities').insert({
      name: cityName,
      slug: slug,
      country: '',
      is_active: true
    });
    
    if (error) {
      console.error(`Failed to insert ${cityName}:`, error);
    } else {
      console.log(`Inserted ${cityName}`);
      inserted++;
    }
  }
  console.log(`Done! Inserted ${inserted} new cities.`);
}

run();
