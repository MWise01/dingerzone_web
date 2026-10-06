import type { Metadata } from 'next';

export const siteUrl = 'https://www.dingerzone.com';
export const siteDescription = 'DingerZone is an AI-powered baseball swing analysis app for players, parents, and coaches. Upload swing videos, explore feedback, and practice with suggested drills.';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title, description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website', siteName: 'DingerZone', images: [{ url: '/logo.png', alt: 'DingerZone' }] },
    twitter: { card: 'summary', title, description, images: ['/logo.png'] },
  };
}

export const privateMetadata: Metadata = {
  alternates: { canonical: null },
  robots: { index: false, follow: false },
};
