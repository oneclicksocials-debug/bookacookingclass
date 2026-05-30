const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const TRACKING_PARAMS = 'pid=P00303066&mcid=42383';

async function restoreLinks() {
  const folderPath = '/Users/salonsh/Desktop/mokey maker/new shit/city csv viator';
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.csv'));

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const results = [];
    
    await new Promise((resolve) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          const title = data['_title_vgyoo_388'] || data['Title'];
          let url = data['_productCard_vgyoo_359 href'] || data['URL'];
          
          if (title && url && url.trim() !== '') {
            // Restore exact original URL and just append tracking properly
            if (!url.startsWith('http')) {
               url = 'https://www.viator.com' + (url.startsWith('/') ? '' : '/') + url;
            }
            // Strip any existing tracking just in case
            url = url.split('?')[0]; 
            const finalUrl = `${url}?${TRACKING_PARAMS}`;
            
            results.push({ title, finalUrl });
          }
        })
        .on('end', resolve);
    });

    console.log(`Found ${results.length} URLs to restore in ${file}`);

    // Update the database in chunks
    const batchSize = 10;
    for (let i = 0; i < results.length; i += batchSize) {
       const batch = results.slice(i, i + batchSize);
       await Promise.all(batch.map(item => {
         return supabase
           .from('classes')
           .update({ affiliate_link: item.finalUrl })
           .eq('title', item.title);
       }));
    }
  }
  console.log("Finished restoring all links!");
}

restoreLinks();
