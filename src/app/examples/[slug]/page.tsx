import type { Metadata } from 'next';
import Link from 'next/link';
import StructuredData from '../../../components/StructuredData';
import { pageMetadata, siteUrl } from '../../../lib/seo';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ExampleResultView from '../../../components/ExampleResultView';
import ExampleShowcaseHeader from '../../../components/ExampleShowcaseHeader';
import { exampleAnalyses, getExampleAnalysis } from '../../../data/exampleAnalyses';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return exampleAnalyses.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const example = getExampleAnalysis(slug);
  if (!example) notFound();
  return pageMetadata(`${example.title}: Baseball Swing Analysis`, example.discoverySummary, `/examples/${slug}`);
}

export default async function ExampleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = getExampleAnalysis(slug);

  if (!example) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'BreadcrumbList', itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Swing Analysis Examples', item: `${siteUrl}/examples` },
            { '@type': 'ListItem', position: 3, name: example.title, item: `${siteUrl}/examples/${example.slug}` },
          ] },
          { '@type': 'VideoObject', name: `${example.title}: Baseball Swing Video`, description: example.discoverySummary,
            thumbnailUrl: `${siteUrl}${example.thumbnailUrl}`, uploadDate: example.uploadDate,
            contentUrl: `${siteUrl}${example.originalVideoUrl}`, url: `${siteUrl}/examples/${example.slug}` },
        ],
      }} />
      <Header />
      <main className="flex-grow">
        <ExampleShowcaseHeader examples={exampleAnalyses} activeExample={example} />

        <div className="container mx-auto px-6 py-8">
          <section id="analysis-overview" className="mb-8 max-w-3xl space-y-4 text-gray-300">
            <h2 className="text-2xl font-bold text-white">What this swing analysis shows</h2>
            <p>{example.discoverySummary}</p>
            <p>Watch the original swing, then switch to computer-vision playback to see the tracked movement. Compare the mechanics scorecard with the AI feedback and suggested drills below.</p>
            <p>These are AI-generated observations from a curated clip, not a coach-verified assessment. Movement estimates depend on camera angle and video quality. References to improvement in the feedback do not establish progress from a single clip. Review the suggestions with your coach and use drills appropriate to your ability.</p>
            <p><Link href="/examples" className="text-orange-300 underline">Browse all examples</Link> or <Link href="/getting-started" className="text-orange-300 underline">learn how to record your swing</Link>.</p>
          </section>
          <ExampleResultView example={example} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
