'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ExampleAnalysis } from '../data/exampleAnalyses';
import {
  LiveMetricSample,
  ScorecardMetric,
} from '../lib/trialApi';
import { trackAnalyticsEvent } from '../lib/analytics';

const metricLabels: Record<string, string> = {
  handPath: 'Hand Path',
  stride: 'Stride',
  headPosition: 'Head Position',
  hipRotation: 'Hip Rotation',
  shoulderHipHandTiming: 'Shoulder, Hip, Hand Timing',
  followThrough: 'Follow Through',
  powerGeneration: 'Power Generation',
};

const metricCriteria: Record<string, string> = {
  handPath: 'How efficiently the hands move to the ball, stay connected, and avoid casting or looping away from the swing path.',
  stride: 'How the hitter loads and lands, including balance, timing, direction, and whether the stride supports an athletic launch position.',
  headPosition: 'How steady the head and eyes remain through load, launch, contact, and follow-through.',
  hipRotation: 'How well the hips initiate and rotate through the swing while maintaining control and direction.',
  shoulderHipHandTiming: 'How the lower body, torso, and hands sequence together so energy transfers cleanly into the barrel.',
  followThrough: 'How the hitter finishes the swing with extension, balance, and a complete path through the hitting zone.',
  powerGeneration: 'How effectively the swing creates and transfers force from the ground through the body into the bat.',
};

const liveMetricDefinitions = [
  ['hipRotation', 'Hip Rotation', 'deg', 'Pelvis turn through load, launch, and contact.'],
  ['shoulderRotation', 'Shoulder Rotation', 'deg', 'Torso turn and separation as the swing unfolds.'],
  ['handSpeed', 'Hand Speed', 'mph', 'Estimated hand speed moving into the hitting zone.'],
  ['strideLengthPctHeight', 'Stride Length', '% height', 'Stride distance normalized to body scale.'],
  ['centerOfMassShift', 'Center Mass Shift', 'in', 'Horizontal body-center movement during weight transfer.'],
  ['leadArmFlexion', 'Lead Arm Flexion', 'deg', 'Lead elbow angle for connection and extension.'],
] as const;

const formatMetricLabel = (key: string) =>
  metricLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());

const clampPercent = (score: number) => Math.min(100, Math.max(0, (score / 5) * 100));

const getAverageScore = (scorecard: Record<string, ScorecardMetric> | null) => {
  if (!scorecard) return null;
  const scores = Object.values(scorecard)
    .map((metric) => Number(metric.score))
    .filter((score) => Number.isFinite(score));

  if (!scores.length) return null;

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

const findNearestMetricSample = (
  samples: LiveMetricSample[] | null | undefined,
  currentTime: number
) => {
  if (!samples?.length) return null;

  return samples.reduce((nearest, sample) =>
    Math.abs(sample.t - currentTime) < Math.abs(nearest.t - currentTime)
      ? sample
      : nearest
  );
};

const formatLiveMetricValue = (
  value: number | null | undefined,
  unit: string
) => {
  if (!Number.isFinite(value)) return 'Pending';
  const numericValue = Number(value);
  const precision = unit === 'mph' || unit === 'in' ? 1 : 0;
  return `${numericValue.toFixed(precision)} ${unit}`;
};

export default function ExampleResultView({ example }: { example: ExampleAnalysis }) {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [activeInfoKey, setActiveInfoKey] = useState<string | null>(null);
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const details = example;

  const scoreEntries = useMemo(
    () => Object.entries(details.aiScorecard || {}),
    [details.aiScorecard]
  );
  const averageScore = getAverageScore(details.aiScorecard || null);
  const hasSkeleton = Boolean(details.skeletonUrl);
  const originalVideoUrl = example.originalVideoUrl || details.originalVideoUrl || details.videoUrl;
  const activeVideoUrl = showSkeleton && details.skeletonUrl ? details.skeletonUrl : originalVideoUrl;
  const activeVideoType = activeVideoUrl ? 'video/mp4' : undefined;
  const shouldRenderVideo = Boolean(activeVideoUrl) && !example.assetsPending;
  const activeMetricSample = findNearestMetricSample(details.liveMetrics, videoTime);
  const hasLiveMetricSamples = Boolean(details.liveMetrics?.length);
  const progress =
    videoDuration && videoDuration > 0
      ? Math.min(100, Math.max(0, (videoTime / videoDuration) * 100))
      : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <div className="mb-4 rounded-lg border border-gray-800 bg-gray-900 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-xl font-bold">{example.title}</h2>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden text-sm text-gray-300 sm:inline">Original</span>
              <button
                type="button"
                onClick={() => {
                  setVideoError(null);
                  trackAnalyticsEvent('video_mode_toggle', {
                    location: 'example_result',
                    example: example.slug,
                    mode: showSkeleton ? 'original' : 'computer_vision',
                  });
                  setShowSkeleton((current) => !current);
                }}
                disabled={!hasSkeleton}
                className={`relative h-7 w-12 rounded-full transition-colors ${
                  showSkeleton && hasSkeleton ? 'bg-blue-600' : 'bg-gray-700'
                } disabled:cursor-not-allowed disabled:opacity-50`}
                aria-label="Toggle computer vision video"
              >
                <span
                  className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                    showSkeleton && hasSkeleton ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="hidden text-sm text-gray-300 sm:inline">Computer Vision</span>
              <span className="text-xs font-semibold text-gray-300 sm:hidden">
                {showSkeleton && hasSkeleton ? 'Computer Vision' : 'Original'}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-black">
          {shouldRenderVideo ? (
            <video
              key={activeVideoUrl}
              controls
              preload="metadata"
              poster={details.thumbnailUrl || undefined}
              playsInline
              className="aspect-video w-full object-contain"
              onLoadedMetadata={(event) => {
                setVideoDuration(event.currentTarget.duration || null);
                setVideoTime(event.currentTarget.currentTime || 0);
              }}
              onPlay={() => {
                trackAnalyticsEvent('video_play', {
                  location: 'example_result',
                  example: example.slug,
                  mode: showSkeleton && hasSkeleton ? 'computer_vision' : 'original',
                });
              }}
              onTimeUpdate={(event) => {
                setVideoTime(event.currentTarget.currentTime || 0);
              }}
              onError={() => {
                trackAnalyticsEvent('video_error', {
                  location: 'example_result',
                  example: example.slug,
                  mode: showSkeleton && hasSkeleton ? 'computer_vision' : 'original',
                });
                setVideoError(
                  showSkeleton
                    ? 'Computer vision video is not playable yet. Try switching back to Original, then retry in a moment.'
                    : 'Original video is not playable yet. Try switching to Computer Vision, then retry in a moment.'
                );
              }}
            >
              <source src={activeVideoUrl} type={activeVideoType} />
            </video>
          ) : (
            <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gray-900 text-gray-200">
              {details.thumbnailUrl && (
                <Image
                  src={details.thumbnailUrl}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover opacity-45"
                />
              )}
              <div className="relative z-10 max-w-md px-6 text-center">
                <p className="text-lg font-bold">
                  Marketing clip asset pending
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Playback will be enabled once the approved original and computer-vision clips are attached.
                </p>
              </div>
            </div>
          )}
        </div>

        {videoError && (
          <div className="mt-4 rounded-lg border border-yellow-700 bg-yellow-950 p-4 text-sm text-yellow-100">
            <p>{videoError}</p>
          </div>
        )}

        <div className="mt-4 rounded-lg border border-gray-800 bg-gray-900 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold">Live Swing Metrics</h2>
                <span className="rounded-full border border-orange-400/50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300">
                  Beta
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-400">
                Synced to playback in the same result format visitors see after uploading.
              </p>
            </div>
            <span className="text-sm font-semibold text-orange-300">
              {videoTime.toFixed(1)}s
            </span>
          </div>

          <div className="mt-4 h-1.5 rounded-full bg-gray-800">
            <div
              className="h-1.5 rounded-full bg-blue-500 transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {liveMetricDefinitions.map(([key, label, unit, description]) => {
              const value = activeMetricSample?.[key];
              return (
                <div key={key} className="rounded-md border border-gray-800 bg-gray-950 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white">{label}</h3>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-blue-200">
                      {hasLiveMetricSamples ? formatLiveMetricValue(value, unit) : 'Pending'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Overall</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-orange-300">
                Beta score
              </p>
            </div>
            <span className="text-lg font-bold text-orange-300">
              {averageScore ? `${averageScore.toFixed(1)}/5.0` : 'Pending'}
            </span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
            {averageScore && (
              <div className="relative h-2" style={{ width: `${clampPercent(averageScore)}%` }}>
                <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow" />
              </div>
            )}
          </div>
        </div>

        {details.aiSummary && (
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold">Summary Feedback</h2>
              <span className="rounded-full border border-orange-400/50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300">
                Beta AI
              </span>
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-300">
              {details.aiSummary}
            </p>
          </div>
        )}

        {scoreEntries.map(([key, metric]) => (
          <div key={key} className="rounded-lg border border-gray-800 bg-gray-900 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex items-center gap-2">
                <h3 className="font-bold">{formatMetricLabel(key)}</h3>
                <span className="rounded-full border border-gray-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-300">
                  Beta
                </span>
                <button
                  type="button"
                  className="group flex h-5 w-5 items-center justify-center rounded-full border border-gray-500 text-xs font-bold text-gray-300 transition-colors hover:border-blue-300 hover:text-blue-200"
                  aria-label={`${formatMetricLabel(key)} criteria`}
                  aria-expanded={activeInfoKey === key}
                  onClick={() => setActiveInfoKey((current) => (current === key ? null : key))}
                  onBlur={() => setActiveInfoKey(null)}
                >
                  i
                  <span
                    className={`pointer-events-none absolute left-0 top-7 z-20 w-72 rounded-md border border-gray-700 bg-gray-950 p-3 text-left text-xs font-normal leading-5 text-gray-200 shadow-xl ${
                      activeInfoKey === key ? 'block' : 'hidden group-hover:block group-focus:block'
                    }`}
                  >
                    {metricCriteria[key] || 'How strongly this part of the swing supports a repeatable, balanced, and powerful move.'}
                  </span>
                </button>
              </div>
              <span className="text-sm font-semibold text-gray-200">
                {Number(metric.score).toFixed(1)}/5.0
              </span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
              <div
                className="relative h-2"
                style={{ width: `${clampPercent(Number(metric.score))}%` }}
              >
                <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow" />
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-400">{metric.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
