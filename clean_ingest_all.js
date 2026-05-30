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

const TRACKING_PARAMS = 'pid=P00303066&mcid=42383';

const VALID_KEYWORDS = [
  'cook', 'culinary', 'chef', 'food', 'taste', 'tasting', 'kitchen', 'bake', 'baking', 'recipe', 
  'market', 'gastronomy', 'tagine', 'tajine', 'couscous', 'pastry', 'wine', 'eat', 'dinner', 
  'lunch', 'breakfast', 'meal', 'pizza', 'pasta', 'sushi', 'tapas', 'paella'
];

function isCookingRelated(title) {
  if (!title) return false;
  const tLower = title.toLowerCase();
  for (const keyword of VALID_KEYWORDS) {
    if (tLower.includes(keyword)) return true;
  }
  return false;
}

async function processFile(filePath, cityName) {
  return new Promise((resolve) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        let title = data['Title'];
        let url = data['URL'];
        let image = data['Image'];

        for (const key of Object.keys(data)) {
          const kLower = key.toLowerCase();
          if (!title && kLower.includes('title')) title = data[key];
          if (!url && kLower.includes('href')) url = data[key];
          if (!image && (kLower.includes('image') || kLower.includes('src') || kLower.includes('img'))) {
            if (data[key] && data[key].startsWith('http')) image = data[key];
          }
        }

        if (!title || !url) return;
        if (!isCookingRelated(title)) return;
        
        // RESTORING PLACEHOLDER IMAGE FOR MISSING ONES
        if (!image) {
           image = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2940&auto=format&fit=crop';
        }

        let price = null;
        const rawPrice = data['_moneyView_gkvo7_321'] || data['Price'];
        if (rawPrice) {
          const matches = rawPrice.match(/[0-9]+(\.[0-9]{2})?/g);
          if (matches) {
            const prices = matches.map(m => parseFloat(m));
            price = Math.min(...prices); 
          }
        }

        let duration = data['_featuresCompact_vgyoo_546'] || data['Duration'] || null;
        if (duration) {
          duration = duration.replace(/free cancellation/ig, '').replace(/likely to sell out/ig, '').trim();
        }

        let rating = null;
        const rawRating = data['_rating_txb4a_361'] || data['Rating'];
        if (rawRating) rating = parseFloat(rawRating);

        let reviews = null;
        const rawReviews = data['_reviewCount_txb4a_402'] || data['Reviews'];
        if (rawReviews) reviews = parseInt(rawReviews.replace(/[^0-9]/g, ''), 10);

        if (!url.startsWith('http')) {
           url = 'https://www.viator.com' + (url.startsWith('/') ? '' : '/') + url;
        }
        url = url.split('?')[0]; 
        const finalUrl = `${url}?${TRACKING_PARAMS}`;

        const slug = slugify(title);
        results.push({
          slug: slug,
          city: cityName,
          title: title,
          description: data['_sliderDescription_vgyoo_824'] || data['Description'] || null,
          price: isNaN(price) ? null : price,
          rating: isNaN(rating) ? null : rating,
          reviews: isNaN(reviews) ? null : reviews,
          duration: duration,
          image_url: image,
          affiliate_link: finalUrl,
        });
      })
      .on('end', () => resolve(results));
  });
}

async function main() {
  console.log("Restoring missing cities...");
  await supabase.from('classes').delete().neq('slug', 'dummy-never-matches');

  const dirPath = '/Users/salonsh/Desktop/mokey maker/new shit/city csv viator/';
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.csv'));
  const allResultsMap = new Map();

  for (const file of files) {
    let cityName = file.replace('.csv', '').trim();
    if (cityName.toLowerCase() === 'viator') cityName = 'Various';
    if (cityName.toLowerCase() === 'auston classes') cityName = 'Austin';

    const cityData = await processFile(path.join(dirPath, file), cityName);
    
    for (const row of cityData) {
      if (!allResultsMap.has(row.slug)) {
        allResultsMap.set(row.slug, row);
      }
    }
  }

  const finalResults = Array.from(allResultsMap.values());
  console.log(`Total perfect classes to insert: ${finalResults.length}`);

  const batchSize = 100;
  for (let i = 0; i < finalResults.length; i += batchSize) {
    const batch = finalResults.slice(i, i + batchSize);
    const { error } = await supabase.from('classes').insert(batch);
    if (error) console.error(`Batch insert error:`, error);
  }

  console.log("Restoration complete!");
}

main();
