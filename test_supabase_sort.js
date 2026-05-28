const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function run() {
  const { data, error } = await supabase.from('classes').select('title, reviews').order('reviews', { ascending: false, nullsFirst: false }).limit(5);
  console.log("Sorted:", data);
}
run();
