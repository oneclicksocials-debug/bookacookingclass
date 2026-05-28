const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function processFile(filename) {
  return new Promise((resolve) => {
    const results = [];
    fs.createReadStream(path.join(__dirname, '..', filename))
      .pipe(csv())
      .on('data', (data) => {
        let affiliateLink = data['_productCard_vgyoo_359 href'] || null;
        if (!affiliateLink) return;

        let slugMatch = affiliateLink.match(/\/tours\/[^/]+\/[^/]+\/([^/]+)/);
        if (!slugMatch) return;
        let slug = slugMatch[1];

        let rating = data['_rating_txb4a_361'] ? parseFloat(data['_rating_txb4a_361']) : null;
        if (isNaN(rating)) rating = null;

        let reviews = null;
        if (data['_reviewCount_txb4a_402']) {
          reviews = parseInt(data['_reviewCount_txb4a_402'].replace(/[^0-9]/g, ''), 10);
        }
        if (isNaN(reviews)) reviews = null;

        if (rating !== null || reviews !== null) {
          results.push({ slug, rating, reviews });
        }
      })
      .on('end', async () => {
        for (const item of results) {
          const { error } = await supabase
            .from('classes')
            .update({ rating: item.rating, reviews: item.reviews })
            .eq('slug', item.slug);
          if (error) console.error("Error updating", item.slug, error);
        }
        resolve();
      });
  });
}

async function run() {
  const files = ['viator.csv', 'viator (1).csv', 'viator (2).csv'];
  for (const file of files) {
    if (fs.existsSync(path.join(__dirname, '..', file))) {
      await processFile(file);
    }
  }
  console.log("Patch complete!");
}

run();
