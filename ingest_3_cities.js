const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const slugify = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

const folderPath = '/Users/salonsh/Desktop/mokey maker/new shit/city csv viator';
const TRACKING_PARAMS = 'pid=P00303066&mcid=42383';

async function processFile(filePath, fileNameCity) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const rawTitle = data['_title_vgyoo_388'] || data['Title'];
        const rawUrl = data['_productCard_vgyoo_359 href'] || data['URL'];
        
        if (!rawTitle || !rawUrl) return;

        let price = null;
        const rawPrice = data['_moneyView_gkvo7_321'] || data['Price'];
        if (rawPrice) price = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));

        let rating = null;
        const rawRating = data['_rating_txb4a_361'] || data['Rating'];
        if (rawRating) rating = parseFloat(rawRating);

        let reviews = null;
        const rawReviews = data['_reviewCount_txb4a_402'] || data['Reviews'];
        if (rawReviews) reviews = parseInt(rawReviews.replace(/[^0-9]/g, ''), 10);

        let url = rawUrl;
        if (url.includes('?')) url = `${url}&${TRACKING_PARAMS}`;
        else url = `${url}?${TRACKING_PARAMS}`;

        results.push({
          slug: slugify(rawTitle),
          city: fileNameCity,
          title: rawTitle,
          description: data['_sliderDescription_vgyoo_824'] || data['Description'] || null,
          price: isNaN(price) ? null : price,
          rating: isNaN(rating) ? null : rating,
          reviews: isNaN(reviews) ? null : reviews,
          duration: data['_featuresCompact_vgyoo_546'] || data['Duration'] || null,
          image_url: data['_image_1sry4_321 src'] || data['Image'] || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2940&auto=format&fit=crop',
          affiliate_link: url
        });
      })
      .on('end', async () => {
        if (results.length > 0) {
            console.log(`Parsed ${results.length} valid rows from ${path.basename(filePath)}`);
            const batchSize = 50;
            for (let i = 0; i < results.length; i += batchSize) {
              const batch = results.slice(i, i + batchSize);
              await supabase.from('classes').upsert(batch, { onConflict: 'slug' });
            }
        }
        resolve();
      });
  });
}

async function run() {
  const cities = ['Marrakech', 'Bali', 'Athens'];
  for (const city of cities) {
    const file = path.join(folderPath, `${city}.csv`);
    if (fs.existsSync(file)) {
      console.log(`Processing ${city}...`);
      await processFile(file, city);
    } else {
      console.log(`${file} not found.`);
    }
  }
  console.log("Done");
}
run();
