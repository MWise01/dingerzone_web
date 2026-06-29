'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  LiveMetricSample,
  ScorecardMetric,
  TrialVideoDetails,
  fetchTrialVideoDetails,
} from '../../../lib/trialApi';

const POLL_INTERVAL_MS = 10000;

const betaAnalysisNotes = [
  'AI summaries, live swing metrics, and scorecard values are beta outputs and may not capture every detail of the swing.',
  'Use these results as directional coaching context alongside your own review of the video.',
  'Video angle, lighting, occlusion, frame rate, and clip length can affect the computer vision output.',
];

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

const formatDateTime = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const formatMetricLabel = (key: string) =>
  metricLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());

const cleanSummaryFeedback = (summary: string) =>
  summary
    .replace(/^(summaryFeedback|summary feedback)\s*:\s*/i, '')
    .replace(/\n(summaryFeedback|summary feedback)\s*:\s*/gi, '\n')
    .trim();

const clampPercent = (score: number) => Math.min(100, Math.max(0, (score / 5) * 100));

const getAverageScore = (scorecard: Record<string, ScorecardMetric> | null) => {
  if (!scorecard) return null;
  const scores = Object.values(scorecard)
    .map((metric) => Number(metric.score))
    .filter((score) => Number.isFinite(score));

  if (!scores.length) return null;

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
};

const liveMetricDefinitions = [
  {
    key: 'hipRotation',
    label: 'Hip Rotation',
    unit: 'deg',
    description: 'Pelvis turn through load, launch, and contact.',
  },
  {
    key: 'shoulderRotation',
    label: 'Shoulder Rotation',
    unit: 'deg',
    description: 'Torso turn and separation as the swing unfolds.',
  },
  {
    key: 'handSpeed',
    label: 'Hand Speed',
    unit: 'mph',
    description: 'Estimated hand speed moving into the hitting zone.',
  },
  {
    key: 'strideLengthPctHeight',
    label: 'Stride Length',
    unit: '% height',
    description: 'Stride distance normalized to body scale.',
  },
  {
    key: 'centerOfMassShift',
    label: 'Center Mass Shift',
    unit: 'in',
    description: 'Horizontal body-center movement during weight transfer.',
  },
  {
    key: 'leadArmFlexion',
    label: 'Lead Arm Flexion',
    unit: 'deg',
    description: 'Lead elbow angle for connection and extension.',
  },
] as const;

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

const LiveSwingMetrics = ({
  sample,
  currentTime,
  duration,
  hasSamples,
}: {
  sample: LiveMetricSample | null;
  currentTime: number;
  duration: number | null;
  hasSamples: boolean;
}) => {
  const progress =
    duration && duration > 0
      ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
      : 0;

  return (
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
            Synced to playback at a suggested 10 samples per second.
          </p>
        </div>
        <span className="text-sm font-semibold text-orange-300">
          {currentTime.toFixed(1)}s
        </span>
      </div>

      <div className="mt-4 h-1.5 rounded-full bg-gray-800">
        <div
          className="h-1.5 rounded-full bg-blue-500 transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {liveMetricDefinitions.map((metric) => {
          const value = sample?.[metric.key];
          return (
            <div key={metric.key} className="rounded-md border border-gray-800 bg-gray-950 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{metric.label}</h3>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {metric.description}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-bold text-blue-200">
                  {hasSamples ? formatLiveMetricValue(value, metric.unit) : 'Pending'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {!hasSamples && (
        <p className="mt-3 text-xs leading-5 text-gray-500">
          Time-synced metrics are not available for this swing yet. The page is ready to display them once the backend returns a compact metric series.
        </p>
      )}
    </div>
  );
};

const ShareSocialIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 10.6l6.8-4.2" />
    <path d="M8.6 13.4l6.8 4.2" />
  </svg>
);

const RepeatOutlineIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11V9a3 3 0 0 1 3-3h15" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v2a3 3 0 0 1-3 3H3" />
  </svg>
);

export default function TrialResultPage() {
  const params = useParams();
  const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
  const [details, setDetails] = useState<TrialVideoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [activeInfoKey, setActiveInfoKey] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared' | 'error'>('idle');
  const [videoTime, setVideoTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!shareId) {
      setError('Missing trial result identifier.');
      return;
    }

    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const loadDetails = async () => {
      try {
        const nextDetails = await fetchTrialVideoDetails(shareId);
        if (!isMounted) return;

        setDetails(nextDetails);
        setLastUpdated(new Date());
        setError(null);

        const isReady =
          nextDetails.videoStatus === 'Processed' &&
          Boolean(nextDetails.skeletonUrl) &&
          Boolean(nextDetails.thumbnailUrl) &&
          Boolean(nextDetails.aiSummary);

        if (!isReady) {
          timeoutId = setTimeout(loadDetails, POLL_INTERVAL_MS);
        }
      } catch (detailsError) {
        if (!isMounted) return;
        setError(
          detailsError instanceof Error
            ? detailsError.message
            : 'Unable to load this trial result.'
        );
      }
    };

    loadDetails();

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [shareId]);

  const scoreEntries = useMemo(
    () => Object.entries(details?.aiScorecard || {}),
    [details?.aiScorecard]
  );
  const averageScore = getAverageScore(details?.aiScorecard || null);
  const isProcessed = details?.videoStatus === 'Processed';
  const hasSkeleton = Boolean(details?.skeletonUrl);
  const activeVideoUrl = showSkeleton && details?.skeletonUrl ? details.skeletonUrl : details?.videoUrl;
  const activeVideoType = showSkeleton && details?.skeletonUrl ? 'video/mp4' : undefined;
  const summaryFeedback = details?.aiSummary ? cleanSummaryFeedback(details.aiSummary) : null;
  const liveMetrics = details?.liveMetrics || null;
  const activeMetricSample = findNearestMetricSample(liveMetrics, videoTime);
  const hasLiveMetricSamples = Boolean(liveMetrics?.length);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    setShareStatus('idle');

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'DingerZone Swing Analysis',
          text: 'Check out this DingerZone swing analysis preview.',
          url: shareUrl,
        });
        setShareStatus('shared');
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareStatus('copied');
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('copied');
      } catch {
        setShareStatus('error');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      <Header />
      <main className="flex-grow">
        <section className="border-b border-gray-800 bg-gray-900">
          <div className="container mx-auto flex flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-950">
                  Beta
                </span>
                <p className="text-sm font-semibold uppercase tracking-wide text-orange-300">
                  DingerZone trial result
                </p>
              </div>
              <h1 className="mt-1 text-3xl font-bold">Swing Analysis</h1>
              <p className="mt-2 text-sm text-gray-300">
                {details?.publicExpiresAt || details?.expirationTime
                  ? `Public link expires ${formatDateTime(details.publicExpiresAt || details.expirationTime)}.`
                  : 'Processing usually takes a few minutes.'}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {details && (
                <div className="flex flex-col items-stretch gap-2 sm:items-end">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-400 bg-blue-600 px-6 py-3 font-bold text-white transition-colors hover:bg-blue-700"
                  >
                    <ShareSocialIcon />
                    Share
                  </button>
                  {shareStatus !== 'idle' && (
                    <p className="text-xs text-gray-300">
                      {shareStatus === 'copied' && 'Link copied to clipboard.'}
                      {shareStatus === 'shared' && 'Share sheet opened.'}
                      {shareStatus === 'error' && 'Unable to copy link from this browser.'}
                    </p>
                  )}
                </div>
              )}

              <Link
                href="/try"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700"
              >
                <RepeatOutlineIcon />
                Analyze Another Swing
              </Link>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-8">
          {error && !details && (
            <div className="rounded-lg border border-red-800 bg-red-950 p-5 text-red-100">
              <h2 className="mb-2 text-xl font-bold">Result unavailable</h2>
              <p>{error}</p>
            </div>
          )}

          {!details && !error && (
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
              <div className="h-5 w-44 animate-pulse rounded bg-gray-700" />
              <div className="mt-4 aspect-video w-full animate-pulse rounded-lg bg-gray-800" />
            </div>
          )}

          {details && (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section>
                <div className="mb-4 rounded-lg border border-orange-400/40 bg-orange-500/10 p-4 text-sm leading-6 text-orange-50">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-bold text-orange-200">Beta analysis notice</h2>
                      <p className="mt-1">
                        DingerZone is still tuning this AI analysis and swing metric calculation system. Treat the feedback as helpful direction, not a final evaluation.
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-orange-300/50 px-3 py-1 text-center text-xs font-semibold uppercase tracking-wide text-orange-200 sm:self-center">
                      In development
                    </span>
                  </div>
                </div>

                <div className="mb-4 rounded-lg border border-gray-800 bg-gray-900 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-xl font-bold">DingerZone Slugger</h2>
                      <p className="text-sm text-gray-400">
                        Uploaded {formatDateTime(details.uploadDate) || 'recently'}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                      <span className="hidden text-sm text-gray-300 sm:inline">Original</span>
                      <button
                        type="button"
                        onClick={() => {
                          setVideoError(null);
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
                  {activeVideoUrl ? (
                    <video
                      ref={videoRef}
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
                      onTimeUpdate={(event) => {
                        setVideoTime(event.currentTarget.currentTime || 0);
                      }}
                      onError={(event) => {
                        const mediaError = event.currentTarget.error;
                        console.error('Video playback error', {
                          mode: showSkeleton ? 'skeleton' : 'original',
                          code: mediaError?.code,
                          message: mediaError?.message,
                          url: activeVideoUrl,
                        });
                        setVideoError(
                          showSkeleton
                            ? 'Computer vision video is not playable yet. Try switching back to Original, then retry in a moment.'
                            : 'Original video is not playable yet. Try refreshing this result in a moment.'
                        );
                      }}
                    >
                      <source src={activeVideoUrl} type={activeVideoType} />
                    </video>
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-gray-900 text-gray-400">
                      Video is preparing...
                    </div>
                  )}
                </div>

                {videoError && (
                  <div className="mt-4 rounded-lg border border-yellow-700 bg-yellow-950 p-4 text-sm text-yellow-100">
                    <p>{videoError}</p>
                  </div>
                )}

                <LiveSwingMetrics
                  sample={activeMetricSample}
                  currentTime={videoTime}
                  duration={videoDuration}
                  hasSamples={hasLiveMetricSamples}
                />

                {!isProcessed && (
                  <div className="mt-4 rounded-lg border border-blue-800 bg-blue-950 p-4 text-blue-100">
                    <h2 className="font-bold">Analysis in progress</h2>
                    <p className="mt-1 text-sm">
                      We are checking for the processed video, thumbnail, and AI feedback every 10 seconds.
                      {lastUpdated ? ` Last checked ${formatDateTime(lastUpdated.toISOString())}.` : ''}
                    </p>
                  </div>
                )}
              </section>

              <section className="space-y-4">
                <div className="rounded-lg border border-blue-800 bg-blue-950 p-5 text-blue-100">
                  <h2 className="text-lg font-bold">How to read beta analysis</h2>
                  <div className="mt-3 space-y-2">
                    {betaAnalysisNotes.map((note) => (
                      <p key={note} className="text-sm leading-6 text-blue-100">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>

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
                      <div
                        className="relative h-2"
                        style={{ width: `${clampPercent(averageScore)}%` }}
                      >
                        <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow" />
                      </div>
                    )}
                  </div>
                </div>

                {summaryFeedback && (
                  <div className="rounded-lg border border-gray-800 bg-gray-900 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold">Summary Feedback</h2>
                      <span className="rounded-full border border-orange-400/50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300">
                        Beta AI
                      </span>
                    </div>
                    <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-300">
                      {summaryFeedback}
                    </p>
                  </div>
                )}

                {scoreEntries.length > 0 ? (
                  <div className="space-y-3">
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
                              onClick={() =>
                                setActiveInfoKey((current) => (current === key ? null : key))
                              }
                              onBlur={() => setActiveInfoKey(null)}
                            >
                              i
                              <span
                                className={`pointer-events-none absolute left-0 top-7 z-20 w-72 rounded-md border border-gray-700 bg-gray-950 p-3 text-left text-xs font-normal leading-5 text-gray-200 shadow-xl ${
                                  activeInfoKey === key
                                    ? 'block'
                                    : 'hidden group-hover:block group-focus:block'
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
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 text-gray-300">
                    Scorecard is still processing.
                  </div>
                )}

                {details.retentionExpiresAt && (
                  <p className="text-xs text-gray-500">
                    You opted out of model-improvement retention. Stored trial content is scheduled for deletion after {formatDateTime(details.retentionExpiresAt)}.
                  </p>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
