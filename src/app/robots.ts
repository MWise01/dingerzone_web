import type { MetadataRoute } from 'next';
import { siteUrl } from '../lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Result pages remain crawlable so crawlers can read their noindex directive.
  // Training permissions are independent; no GPTBot policy change is made here.
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }, { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
