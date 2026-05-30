const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log("Deleting classes with placeholder images...");
  const { data, error } = await supabase
    .from('classes')
    .delete()
    .eq('image_url', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2940&auto=format&fit=crop');

  if (error) {
    console.error("Error deleting:", error);
  } else {
    console.log("Deleted successfully!");
  }
}

run();
