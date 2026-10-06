import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { exampleAnalyses } from '../../data/exampleAnalyses';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata('Baseball Swing Analysis Examples', 'Explore baseball swing videos with AI feedback, mechanics scorecards, suggested drills, and computer-vision playback.', '/examples');

export default function ExamplesPage() {
  return <div className="flex min-h-screen flex-col bg-gray-950 text-white">
    <Header />
    <main className="container mx-auto flex-grow px-6 py-12">
      <h1 className="text-3xl font-bold">Baseball Swing Analysis Examples</h1>
      <p className="mt-4 max-w-3xl text-gray-300">Explore three curated swing analyses. Each example includes the original video, computer-vision playback, a mechanics scorecard, and AI feedback with suggested drills.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {exampleAnalyses.map((example) => <article key={example.slug} className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
          <Image src={example.thumbnailUrl!} alt={`${example.title} baseball swing`} width={640} height={360} className="aspect-video w-full object-cover" />
          <div className="p-6">
            <p className="text-sm text-orange-300">{example.audience}</p>
            <h2 className="mt-2 text-xl font-bold"><Link href={`/examples/${example.slug}`} className="hover:underline">{example.title}</Link></h2>
            <p className="mt-3 text-gray-300">{example.discoverySummary}</p>
            <Link href={`/examples/${example.slug}`} className="mt-4 inline-block text-orange-300 underline">View swing analysis</Link>
          </div>
        </article>)}
      </div>
      <p className="mt-8 text-gray-300">Ready to record your own swing? <Link href="/getting-started" className="text-orange-300 underline">Read the getting started guide</Link> or <Link href="/try" className="text-orange-300 underline">try a swing upload</Link>.</p>
    </main>
    <Footer />
  </div>;
}
