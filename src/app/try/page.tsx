'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  startTrialUpload,
  uploadTrialFile,
  completeTrialUpload,
  isVideoFile,
} from '../../lib/trialApi';

const MAX_DURATION_SECONDS = 10;
const FALLBACK_MAX_UPLOAD_BYTES = 75 * 1024 * 1024;

const filmingTips = [
  {
    icon: 'phone',
    title: 'Orientation',
    copy: 'Use portrait mode from a clear side view.',
  },
  {
    icon: 'body',
    title: 'Full Body in Frame',
    copy: 'Fit the hitter and bat from setup through finish.',
  },
  {
    icon: 'timer',
    title: 'Clip Length',
    copy: 'Keep it snappy: 5-10 seconds works best.',
  },
  {
    icon: 'bat',
    title: 'One Swing Per Video',
    copy: 'One swing per clip gives the cleanest analysis.',
  },
  {
    icon: 'fps',
    title: 'Increase Frame Rate',
    copy: 'Use 60 fps if your camera supports it.',
  },
];

const processSteps = [
  ['1', 'Upload', 'Choose one short swing clip.'],
  ['2', 'Analyze', 'AI maps movement and generates feedback.'],
  ['3', 'Review', 'See the overlay, notes, and scorecard.'],
  ['4', 'Share', 'Copy the 24-hour public link.'],
];

const formatBytes = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
};

const TipIcon = ({ type }: { type: string }) => {
  const commonProps = {
    className: 'h-5 w-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (type === 'phone') {
    return (
      <svg {...commonProps}>
        <rect x="8" y="2" width="8" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    );
  }

  if (type === 'body') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v8" />
        <path d="M7 11h10" />
        <path d="M9 21l3-6 3 6" />
      </svg>
    );
  }

  if (type === 'timer') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="13" r="7" />
        <path d="M12 13l3-3" />
        <path d="M9 2h6" />
        <path d="M12 2v4" />
      </svg>
    );
  }

  if (type === 'bat') {
    return (
      <Image
        src="/assets/icons/baseball_batter_silhouette.svg"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 object-contain brightness-0 invert"
      />
    );
  }

  return (
    <Image
      src="/assets/icons/60fpsicon.png"
      alt=""
      width={24}
      height={24}
      className="h-6 w-6 object-contain brightness-0 invert"
    />
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

const getVideoDuration = (file: File) =>
  new Promise<number>((resolve, reject) => {
    const video = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);

    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(video.duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Unable to read video duration.'));
    };
    video.src = objectUrl;
  });

export default function TrialUploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [durationWarning, setDurationWarning] = useState<string | null>(null);
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [step, setStep] = useState<'idle' | 'starting' | 'uploading' | 'completing'>('idle');
  const [maxUploadBytes, setMaxUploadBytes] = useState(FALLBACK_MAX_UPLOAD_BYTES);
  const [tryPageShareStatus, setTryPageShareStatus] = useState<
    'idle' | 'copied' | 'shared' | 'error'
  >('idle');

  const previewUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setDuration(null);
    setDurationWarning(null);
    setError(null);

    if (!selectedFile) return;

    if (!isVideoFile(selectedFile)) {
      setError('Please choose a video file.');
      return;
    }

    if (selectedFile.size > maxUploadBytes) {
      setError(`Please choose a video under ${formatBytes(maxUploadBytes)}.`);
      return;
    }

    try {
      const videoDuration = await getVideoDuration(selectedFile);
      setDuration(videoDuration);
      if (videoDuration > MAX_DURATION_SECONDS) {
        setDurationWarning(
          `This clip is ${videoDuration.toFixed(1)} seconds. Short clips under ${MAX_DURATION_SECONDS} seconds process best.`
        );
      }
    } catch {
      setDurationWarning('We could not verify the clip length, but you can still try the upload.');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || isUploading) return;

    if (!isVideoFile(file)) {
      setError('Please choose a video file.');
      return;
    }

    if (file.size > maxUploadBytes) {
      setError(`Please choose a video under ${formatBytes(maxUploadBytes)}.`);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      setStep('starting');
      const startResponse = await startTrialUpload({
        file,
        modelImprovementConsent: consent,
      });
      setMaxUploadBytes(startResponse.maxUploadBytes || FALLBACK_MAX_UPLOAD_BYTES);

      setStep('uploading');
      await uploadTrialFile({ file, startResponse });

      setStep('completing');
      const completeResponse = await completeTrialUpload(startResponse.trialId);

      router.push(`/try/${completeResponse.shareId}`);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : 'Upload failed. Please try again.'
      );
      setStep('idle');
      setIsUploading(false);
    }
  };

  const handleShareTryPage = async () => {
    const shareUrl = `${window.location.origin}/try`;
    setTryPageShareStatus('idle');

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Try DingerZone Swing Analysis',
          text: 'Upload one swing and get an AI-powered DingerZone preview.',
          url: shareUrl,
        });
        setTryPageShareStatus('shared');
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setTryPageShareStatus('copied');
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setTryPageShareStatus('copied');
      } catch {
        setTryPageShareStatus('error');
      }
    }
  };

  const uploadButtonLabel = {
    idle: 'Upload Swing',
    starting: 'Preparing Upload...',
    uploading: 'Uploading Video...',
    completing: 'Starting Analysis...',
  }[step];

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow">
        <section className="bg-gray-950 text-white">
          <div className="container mx-auto grid gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.75fr)] lg:items-start lg:py-10 xl:gap-10">
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-orange-300">
                Free swing analysis preview
              </p>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
                Get AI feedback you can share.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-200">
                Try DingerZone with a short baseball swing clip. We process it into a computer-vision overlay, coaching-style feedback, and a scorecard-style breakdown.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-gray-700 bg-gray-900 p-5 shadow-xl lg:col-start-2 lg:row-span-3 lg:row-start-1"
            >
              <div className="mb-5">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-2xl font-bold">Try it now</h2>
                  <button
                    type="button"
                    onClick={handleShareTryPage}
                    disabled={isUploading}
                    className="group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-400/60 bg-blue-600/20 text-blue-100 transition-colors hover:bg-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Share try page"
                    title="Share try page"
                  >
                    <ShareSocialIcon />
                    <span className="pointer-events-none absolute right-0 top-11 z-20 rounded-md border border-gray-700 bg-gray-950 px-2 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      Share
                    </span>
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Your preview link expires after 24 hours.{' '}
                  <a href="#upload-tips" className="font-semibold text-blue-300 hover:text-blue-200">
                    View upload tips
                  </a>
                </p>
                {tryPageShareStatus !== 'idle' && (
                  <p className="mt-2 text-xs text-gray-400">
                    {tryPageShareStatus === 'copied' && 'Try page link copied.'}
                    {tryPageShareStatus === 'shared' && 'Share sheet opened.'}
                    {tryPageShareStatus === 'error' && 'Unable to copy link from this browser.'}
                  </p>
                )}
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-200">
                  Swing video
                </span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="block w-full rounded-md border border-gray-600 bg-gray-950 px-3 py-3 text-sm text-gray-100 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
                />
              </label>

              {file && (
                <div className="mt-3 rounded-md bg-gray-950 p-3 text-sm text-gray-300">
                  <p className="font-semibold text-white">{file.name}</p>
                  <p>{formatBytes(file.size)}</p>
                  {duration !== null && <p>{duration.toFixed(1)} seconds</p>}
                </div>
              )}

              {previewUrl && (
                <div className="mt-3 overflow-hidden rounded-lg bg-black">
                  <video
                    src={previewUrl}
                    controls
                    muted
                    playsInline
                    className="aspect-video w-full object-contain"
                  />
                </div>
              )}

              {durationWarning && (
                <p className="mt-3 rounded-md bg-yellow-100 px-3 py-2 text-sm text-yellow-900">
                  {durationWarning}
                </p>
              )}

              <label className="mt-5 flex gap-3 rounded-md border border-gray-700 bg-gray-950 p-3 text-sm text-gray-200">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  disabled={isUploading}
                  className="mt-1 h-4 w-4 accent-blue-600"
                />
                <span>
                  Help improve DingerZone swing feedback by allowing us to use this video to train and tune swing analysis. If unchecked, your video will be deleted after 30 days.
                </span>
              </label>

              {error && (
                <p className="mt-4 rounded-md bg-red-100 px-3 py-2 text-sm text-red-800">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!file || isUploading}
                className="mt-5 w-full rounded-md bg-orange-600 px-5 py-3 font-bold text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-600"
              >
                {uploadButtonLabel}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                For best results, use one side-view clip under {MAX_DURATION_SECONDS} seconds.
              </p>
            </form>

            <div className="grid gap-3 sm:grid-cols-4 lg:col-start-1 lg:row-start-2">
              {processSteps.map(([number, title, copy]) => (
                <div key={title} className="border-l border-gray-700 pl-4">
                  <p className="text-xs font-black uppercase tracking-wide text-orange-300">
                    {number}
                  </p>
                  <h2 className="mt-1 text-sm font-bold">{title}</h2>
                  <p className="mt-1 text-sm leading-5 text-gray-400">{copy}</p>
                </div>
              ))}
            </div>

            <div id="upload-tips" className="rounded-lg border border-gray-800 bg-gray-900/80 p-5 shadow-xl lg:col-start-1 lg:row-start-3">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">Upload Tips</h2>
                  <p className="mt-1 text-sm text-gray-400">
                    A clean clip helps the AI read body position, timing, and finish.
                  </p>
                </div>
                <Link
                  href="/getting-started#getting-started"
                  className="shrink-0 text-sm font-semibold text-blue-300 hover:text-blue-200"
                >
                  More tips
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {filmingTips.map((tip) => (
                  <div key={tip.title} className="flex gap-3 rounded-md border border-gray-800 bg-gray-950/80 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <TipIcon type={tip.icon} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{tip.title}</h3>
                      <p className="mt-1 text-sm leading-5 text-gray-400">{tip.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to DingerZone
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
