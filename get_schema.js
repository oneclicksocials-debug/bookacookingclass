const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function getSchema() {
  const { data, error } = await supabase.rpc('get_schema');
  console.log("Schema:", data, error);

  // Alternatively, just insert a dummy record and see if it fails due to column missing.
  // We can query the information_schema
  
  const { data: cols, error: err } = await supabase.from('classes').select('*').limit(0);
  console.log(cols, err);
}

getSchema();
