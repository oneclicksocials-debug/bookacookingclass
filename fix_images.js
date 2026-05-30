const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixImages() {
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
          const image = data['_image_1sry4_321 src'] || data['Image'];
          if (title && image && image.trim() !== '') {
            results.push({ title, image });
          }
        })
        .on('end', resolve);
    });

    console.log(`Found ${results.length} valid images in ${file}`);

    // Update the database in chunks
    for (const item of results) {
       await supabase
         .from('classes')
         .update({ image_url: item.image })
         .eq('title', item.title)
         .like('image_url', '%unsplash%'); // Only overwrite if it's currently the unsplash placeholder
    }
  }
  console.log("Finished fixing all images!");
}

fixImages();
