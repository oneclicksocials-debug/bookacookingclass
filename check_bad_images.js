const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const defaultImage = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2940&auto=format&fit=crop';
  
  const { data: classes, error } = await supabase
    .from('classes')
    .select('city')
    .eq('image_url', defaultImage);
    
  if (error) {
    console.error(error);
    return;
  }
  
  const badCities = [...new Set(classes.map(c => c.city))].sort();
  console.log("Cities with missing images (Needs Re-scraping):");
  badCities.forEach(city => console.log(`- ${city}`));
  console.log(`\nTotal cities to redo: ${badCities.length}`);
}

run();
