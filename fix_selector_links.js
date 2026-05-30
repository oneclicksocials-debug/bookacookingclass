const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: classes, error } = await supabase.from('classes').select('id, affiliate_link').like('affiliate_link', '%selector.viator.com%');
  if (error) {
    console.error(error);
    return;
  }
  
  console.log(`Found ${classes.length} classes with selector.viator.com links.`);
  let updated = 0;
  for (const c of classes) {
    const newLink = c.affiliate_link.replace('selector.viator.com', 'www.viator.com');
    await supabase.from('classes').update({ affiliate_link: newLink }).eq('id', c.id);
    updated++;
  }
  console.log(`Updated ${updated} links to www.viator.com!`);
}

run();
