import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ExampleResultView from '../../components/ExampleResultView';
import ExampleShowcaseHeader from '../../components/ExampleShowcaseHeader';
import { exampleAnalyses } from '../../data/exampleAnalyses';

export default function ExamplesPage() {
  const example = exampleAnalyses[0];

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
