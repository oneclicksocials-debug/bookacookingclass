const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper to generate a slug from a title
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

// Files to process
const folderPath = '/Users/salonsh/Desktop/mokey maker/new shit';
const filesToProcess = ['viator.csv', 'viator (1).csv', 'viator (2).csv', 'viator (3).csv'];

async function processFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // If there's no title or URL, skip
        if (!data['_title_vgyoo_388'] || !data['_productCard_vgyoo_359 href']) return;

        // Parse price (e.g. "$28" -> 28)
        let price = null;
        if (data['_moneyView_gkvo7_321']) {
          price = parseFloat(data['_moneyView_gkvo7_321'].replace(/[^0-9.]/g, ''));
        }

        // Parse rating (e.g. "5.0" -> 5.0)
        let rating = null;
        if (data['_rating_txb4a_361']) {
          rating = parseFloat(data['_rating_txb4a_361']);
        }

        // Parse reviews (e.g. "(20,105)" -> 20105)
        let reviews = null;
        if (data['_reviewCount_txb4a_402']) {
          reviews = parseInt(data['_reviewCount_txb4a_402'].replace(/[^0-9]/g, ''), 10);
        }

        // Derive city from URL (e.g. "https://www.viator.com/tours/Chiang-Mai/..." -> "Chiang Mai")
        let city = "Chiang Mai"; // default
        const url = data['_productCard_vgyoo_359 href'];
        const urlParts = url.split('/');
        const tourIndex = urlParts.indexOf('tours');
        if (tourIndex !== -1 && urlParts.length > tourIndex + 1) {
          city = urlParts[tourIndex + 1].replace(/-/g, ' ');
        }

        // Generate slug
        const rawTitle = data['_title_vgyoo_388'];
        const slug = slugify(rawTitle);

        results.push({
          slug: slug,
          city: city,
          title: rawTitle,
          description: data['_sliderDescription_vgyoo_824'] || null,
          price: isNaN(price) ? null : price,
          rating: isNaN(rating) ? null : rating,
          reviews: isNaN(reviews) ? null : reviews,
          duration: data['_featuresCompact_vgyoo_546'] || null,
          image_url: data['_image_1sry4_321 src'] || null,
          affiliate_link: url
        });
      })
      .on('end', async () => {
        console.log(`Parsed ${results.length} valid rows from ${path.basename(filePath)}`);
        
        // Upsert in batches of 50 to avoid payload limits
        const batchSize = 50;
        for (let i = 0; i < results.length; i += batchSize) {
          const batch = results.slice(i, i + batchSize);
          const { data, error } = await supabase
            .from('classes')
            .upsert(batch, { onConflict: 'slug' });
          
          if (error) {
            console.error(`Error inserting batch ${i}:`, error);
          }
        }
        
        resolve();
      })
      .on('error', (err) => reject(err));
  });
}

async function run() {
  console.log("Starting CSV ingestion into Supabase...");
  for (const file of filesToProcess) {
    const fullPath = path.join(folderPath, file);
    if (fs.existsSync(fullPath)) {
      console.log(`Processing ${file}...`);
      await processFile(fullPath);
    } else {
      console.warn(`File not found: ${fullPath}, skipping.`);
    }
  }
  console.log("Ingestion complete!");
}

run();
