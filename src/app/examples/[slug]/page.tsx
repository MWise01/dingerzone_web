import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ExampleResultView from '../../../components/ExampleResultView';
import ExampleShowcaseHeader from '../../../components/ExampleShowcaseHeader';
import { exampleAnalyses, getExampleAnalysis } from '../../../data/exampleAnalyses';
import { notFound } from 'next/navigation';

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
      <Header />
      <main className="flex-grow">
        <ExampleShowcaseHeader examples={exampleAnalyses} activeExample={example} />

        <div className="container mx-auto px-6 py-8">
          <ExampleResultView example={example} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
