const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log("Fetching all classes...");
  const { data: classes, error } = await supabase.from('classes').select('id, title, affiliate_link');
  if (error) throw error;

  console.log(`Found ${classes.length} classes.`);

  const cookingKeywords = ['cook', 'culinary', 'food', 'taste', 'tasting', 'chef', 'recipe', 'kitchen', 'bake', 'eat', 'dine', 'dining', 'market', 'gastronomy', 'tajine', 'tagine', 'couscous', 'pastry'];
  const excludeKeywords = ['quad', 'atv', 'massage', 'spa', 'hammam', 'jet ski'];

  let toDelete = [];
  let toUpdate = [];

  for (const cls of classes) {
    const titleLower = cls.title.toLowerCase();
    
    let hasCookingWord = cookingKeywords.some(kw => titleLower.includes(kw));
    let hasExcludeWord = excludeKeywords.some(kw => titleLower.includes(kw));

    if (!hasCookingWord || hasExcludeWord) {
      toDelete.push(cls.id);
    } else {
      // Need to fix the link
      // Use Viator search URL format
      const encodedTitle = encodeURIComponent(cls.title);
      const fixedLink = `https://www.viator.com/searchResults/all?text=${encodedTitle}&pid=P00303066&mcid=42383`;
      toUpdate.push({ id: cls.id, affiliate_link: fixedLink });
    }
  }

  console.log(`Identified ${toDelete.length} non-cooking/spam classes to delete.`);
  console.log(`Identified ${toUpdate.length} classes to update their affiliate link.`);

  // Delete in batches
  if (toDelete.length > 0) {
    for (let i = 0; i < toDelete.length; i += 100) {
      const batch = toDelete.slice(i, i + 100);
      await supabase.from('classes').delete().in('id', batch);
    }
    console.log("Deleted spam classes.");
  }

  // Update in batches
  if (toUpdate.length > 0) {
      // Supabase upsert doesn't do bulk partial updates easily, so we can iterate or use upsert if we fetch all fields.
      // Actually, since we only have id and affiliate_link, it's safer to update individually or in small batches
      let count = 0;
      for (const update of toUpdate) {
         await supabase.from('classes').update({ affiliate_link: update.affiliate_link }).eq('id', update.id);
         count++;
         if (count % 500 === 0) console.log(`Updated ${count} links...`);
      }
      console.log("Updated all affiliate links.");
  }

  console.log("Done!");
}

run().catch(console.error);
