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

async function processNewMarrakech() {
  const filePath = '/Users/salonsh/Desktop/mokey maker/new shit/city csv viator/Marrakech.csv';
  const results = [];
  
  await new Promise((resolve) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        const title = data['_title_vgyoo_388'] || data['Title'];
        let url = data['_productCard_vgyoo_359 href'] || data['URL'];
        
        if (!title || !url) return;

        // Skip pure ATV/Massage that have no cooking relation
        const tLower = title.toLowerCase();
        const isCookingRelated = tLower.includes('cook') || tLower.includes('culinary') || tLower.includes('chef') || tLower.includes('food') || tLower.includes('taste') || tLower.includes('tasting') || tLower.includes('kitchen') || tLower.includes('bake') || tLower.includes('baking') || tLower.includes('recipe') || tLower.includes('market') || tLower.includes('gastronomy') || tLower.includes('tagine') || tLower.includes('tajine') || tLower.includes('couscous');
        
        if (!isCookingRelated) return;

        let price = null;
        const rawPrice = data['_moneyView_gkvo7_321'] || data['Price'];
        if (rawPrice) price = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));

        let rating = null;
        const rawRating = data['_rating_txb4a_361'] || data['Rating'];
        if (rawRating) rating = parseFloat(rawRating);

        let reviews = null;
        const rawReviews = data['_reviewCount_txb4a_402'] || data['Reviews'];
        if (rawReviews) reviews = parseInt(rawReviews.replace(/[^0-9]/g, ''), 10);

        const image = data['_image_1sry4_321 src'] || data['Image'] || 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2940&auto=format&fit=crop';
        
        if (!url.startsWith('http')) {
           url = 'https://www.viator.com' + (url.startsWith('/') ? '' : '/') + url;
        }
        url = url.split('?')[0]; 
        const finalUrl = `${url}?${TRACKING_PARAMS}`;

        results.push({
          slug: slugify(title),
          city: 'Marrakech',
          title: title,
          description: data['_sliderDescription_vgyoo_824'] || data['Description'] || null,
          price: isNaN(price) ? null : price,
          rating: isNaN(rating) ? null : rating,
          reviews: isNaN(reviews) ? null : reviews,
          duration: data['_featuresCompact_vgyoo_546'] || data['Duration'] || null,
          image_url: image,
          affiliate_link: finalUrl
        });
      })
      .on('end', resolve);
  });

  console.log(`Parsed ${results.length} valid cooking-related rows from new Marrakech.csv`);

  const batchSize = 50;
  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);
    const { error } = await supabase.from('classes').upsert(batch, { onConflict: 'slug' });
    if (error) console.error("Batch error:", error);
  }
  
  console.log("Successfully ingested new Marrakech data!");
}

processNewMarrakech();
