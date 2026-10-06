import LandingPage from '../components/LandingPage';
import StructuredData from '../components/StructuredData';
import { pageMetadata, siteDescription, siteUrl } from '../lib/seo';

export const metadata = pageMetadata('AI Baseball Swing Analysis', siteDescription, '/');

export default function HomePage() {
  return <><StructuredData data={{
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'DingerZone', url: siteUrl, logo: `${siteUrl}/logo.png` },
      { '@type': 'SoftwareApplication', name: 'DingerZone', url: siteUrl, description: siteDescription, applicationCategory: 'SportsApplication', operatingSystem: 'iOS', publisher: { '@id': `${siteUrl}/#organization` } },
    ],
  }} /><LandingPage /></>;
}
