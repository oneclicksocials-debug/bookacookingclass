const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data: classes, error: fetchError } = await supabase.from('classes').select('id, affiliate_link');
  
  if (fetchError) {
    console.error('Error fetching:', fetchError);
    return;
  }

  let updatedCount = 0;

  for (const c of classes) {
    if (c.affiliate_link && !c.affiliate_link.includes('pid=')) {
      // Check if URL already has query parameters
      const separator = c.affiliate_link.includes('?') ? '&' : '?';
      const newLink = `${c.affiliate_link}${separator}pid=P00303066&mcid=42383&medium=link`;
      
      const { error: updateError } = await supabase
        .from('classes')
        .update({ affiliate_link: newLink })
        .eq('id', c.id);
        
      if (updateError) {
        console.error(`Failed to update class ${c.id}:`, updateError);
      } else {
        updatedCount++;
      }
    }
  }
  
  console.log(`Successfully updated ${updatedCount} classes with tracking IDs.`);
}

run();
