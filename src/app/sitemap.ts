import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bookacookingclass.com'; // We will update this when you connect your custom domain

  // 1. Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/list-your-class`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // 2. Fetch all dynamic cities from Supabase
  const { data: cities } = await supabase
    .from('cities')
    .select('slug');

  const dynamicRoutes = (cities || []).map((city) => ({
    url: `${baseUrl}/in/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
