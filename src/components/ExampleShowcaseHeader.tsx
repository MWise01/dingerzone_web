import Image from 'next/image';
import Link from 'next/link';
import { ExampleAnalysis } from '../data/exampleAnalyses';
import SharePageButton from './SharePageButton';

export default function ExampleShowcaseHeader({
  examples,
  activeExample,
}: {
  examples: ExampleAnalysis[];
  activeExample: ExampleAnalysis;
}) {
  return (
    <section className="border-b border-gray-800 bg-gray-900">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-950">
                Examples
              </span>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">
                DingerZone sample output
              </p>
            </div>
            <h1 className="mt-2 text-3xl font-bold">{activeExample.title}</h1>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:justify-end">
            <Link
              href="/try"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
            >
              Analyze Your Swing
            </Link>
            <SharePageButton title={`DingerZone sample analysis: ${activeExample.title}`} />
          </div>
        </div>

        <div className="mt-5 flex snap-x gap-3 overflow-x-auto pb-2">
          {examples.map((example) => {
            const isActive = example.slug === activeExample.slug;

            return (
              <Link
                key={example.slug}
                href={`/examples/${example.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={`grid min-w-[260px] snap-start grid-cols-[88px_1fr] overflow-hidden rounded-lg border text-left transition-colors sm:min-w-[320px] ${
                  isActive
                    ? 'border-orange-400 bg-orange-500/10'
                    : 'border-gray-800 bg-gray-950 hover:border-blue-500'
                }`}
              >
                <div className="relative min-h-24 bg-black">
                  <Image
                    src={example.thumbnailUrl || '/assets/images/extension_swing_keypoints.png'}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover opacity-85"
                  />
                </div>
                <div className="min-w-0 p-3">
                  <p
                    className={`text-[11px] font-bold uppercase tracking-wide ${
                      isActive ? 'text-orange-300' : 'text-blue-300'
                    }`}
                  >
                    {isActive ? 'Now viewing' : example.eyebrow}
                  </p>
                  <h2 className="mt-1 truncate text-sm font-bold text-white">
                    {example.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400">
                    {example.outcome}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
