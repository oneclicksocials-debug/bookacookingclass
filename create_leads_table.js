const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.rpc('run_sql', { sql: `
    CREATE TABLE IF NOT EXISTS host_leads (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      city TEXT NOT NULL,
      message TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  ` });
  
  if (error) {
    // Fallback if rpc is not allowed: Just create a table using rest? No, we can't create tables via REST.
    console.error("RPC failed, we might need to rely on the user to run SQL manually, or we can just send an email/mock it.", error);
  } else {
    console.log("Table created!");
  }
}
run();
