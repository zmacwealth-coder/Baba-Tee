import { MetadataRoute } from 'next';
import { PRODUCTS, CATEGORIES_CONFIG } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://babateeglobal.com';
  const currentDate = new Date();

  // Core Landing Page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // Category filter routes
  CATEGORIES_CONFIG.forEach((cat) => {
    routes.push({
      url: `${baseUrl}/#${cat.id}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // Individual products
  PRODUCTS.forEach((product) => {
    routes.push({
      url: `${baseUrl}/#product-${product.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  return routes;
}
