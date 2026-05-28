const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('classes').select('title, reviews, rating').ilike('title', '%Farm to Table%');
  console.log("Farm to Table:", data);
  const { data: d2 } = await supabase.from('classes').select('title, reviews, rating').ilike('title', '%Lanna-Style%');
  console.log("Lanna-Style:", d2);
}
run();
