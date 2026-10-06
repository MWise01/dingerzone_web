import type { MetadataRoute } from 'next';
import { exampleAnalyses } from '../data/exampleAnalyses';
import { siteUrl } from '../lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/examples', '/try', '/getting-started', '/support', '/privacy', '/terms',
    ...exampleAnalyses.map((example) => `/examples/${example.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
