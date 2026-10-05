import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://babateeglobal.com/sitemap.xml',
    host: 'https://babateeglobal.com',
  };
}
