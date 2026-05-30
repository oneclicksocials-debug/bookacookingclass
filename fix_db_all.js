const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log("Fetching and processing all classes...");
  
  const cookingKeywords = ['cook', 'culinary', 'food', 'taste', 'tasting', 'chef', 'recipe', 'kitchen', 'bake', 'eat', 'dine', 'dining', 'market', 'gastronomy', 'tajine', 'tagine', 'couscous', 'pastry'];
  const excludeKeywords = ['quad', 'atv', 'massage', 'spa', 'hammam', 'jet ski', 'sunset dinner show', 'dinner show'];

  let totalDeleted = 0;
  let totalUpdated = 0;
  
  let hasMore = true;
  let start = 0;
  const limit = 1000;

  while (hasMore) {
    const { data: classes, error } = await supabase
      .from('classes')
      .select('id, title, affiliate_link')
      .range(start, start + limit - 1);
      
    if (error) throw error;
    if (!classes || classes.length === 0) {
      hasMore = false;
      break;
    }

    console.log(`Processing batch ${start} to ${start + limit - 1}...`);
    
    let toDelete = [];
    let toUpdate = [];

    for (const cls of classes) {
      const titleLower = cls.title.toLowerCase();
      
      let hasCookingWord = cookingKeywords.some(kw => titleLower.includes(kw));
      let hasExcludeWord = excludeKeywords.some(kw => titleLower.includes(kw));

      // Check if it's already updated to prevent redundant updates
      const isAlreadyUpdated = cls.affiliate_link && cls.affiliate_link.includes('searchResults/all');

      if (!hasCookingWord || hasExcludeWord) {
        toDelete.push(cls.id);
      } else if (!isAlreadyUpdated) {
        const encodedTitle = encodeURIComponent(cls.title);
        const fixedLink = `https://www.viator.com/searchResults/all?text=${encodedTitle}&pid=P00303066&mcid=42383`;
        toUpdate.push({ id: cls.id, affiliate_link: fixedLink });
      }
    }

    if (toDelete.length > 0) {
      for (let i = 0; i < toDelete.length; i += 100) {
        const batch = toDelete.slice(i, i + 100);
        await supabase.from('classes').delete().in('id', batch);
      }
      totalDeleted += toDelete.length;
    }

    if (toUpdate.length > 0) {
      for (const update of toUpdate) {
         await supabase.from('classes').update({ affiliate_link: update.affiliate_link }).eq('id', update.id);
         totalUpdated++;
      }
    }
    
    start += limit;
  }

  console.log(`Done! Deleted ${totalDeleted} spam classes. Updated ${totalUpdated} broken links.`);
}

run().catch(console.error);
