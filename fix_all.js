const fs = require('fs');
const files = [
  'src/app/cooking-class/[city]/page.tsx',
  'src/app/page.tsx',
  'src/app/class/[slug]/page.tsx'
];

files.forEach(f => {
  let code = fs.readFileSync(f, 'utf8');
  code = code.replace(/<Link /g, '<a ').replace(/<\/Link>/g, '</a>');
  fs.writeFileSync(f, code);
});

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { error } = await supabase.from('cities').insert([
    { name: 'Chiang Mai', slug: 'chiang-mai', is_active: true }
  ]);
  if (error) console.error("Supabase Error:", error);
  else console.log("Added Chiang Mai to cities.");
}
run();
