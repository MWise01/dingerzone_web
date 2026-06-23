'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

const formatBytes = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`;
};

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
          <div className="container mx-auto grid gap-8 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-14">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-300">
                Free swing analysis preview
              </p>
              <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
                Try DingerZone with one swing clip
              </h1>
              <p className="text-lg text-gray-200">
                Upload a short baseball swing video and we will process it with the same AI feedback engine used in the app.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-gray-700 bg-gray-900 p-5 shadow-xl"
            >
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
                <div className="mt-4 rounded-md bg-gray-950 p-3 text-sm text-gray-300">
                  <p className="font-semibold text-white">{file.name}</p>
                  <p>{formatBytes(file.size)}</p>
                  {duration !== null && <p>{duration.toFixed(1)} seconds</p>}
                </div>
              )}

              {previewUrl && (
                <div className="mt-4 overflow-hidden rounded-lg bg-black">
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
                  Allow DingerZone to retain my uploaded swing video to improve swing analysis. If unchecked, your video will be deleted after 30 days. Your public result link expires after 24 hours.
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
          </div>
        </section>

        <section className="container mx-auto grid gap-6 px-6 py-10 md:grid-cols-3">
          {[
            ['Upload', 'Choose a short swing clip from your phone or computer.'],
            ['Process', 'DingerZone tracks the swing and generates computer vision output.'],
            ['Review', 'See the original video, skeleton video, summary, and scorecard.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600">{copy}</p>
            </div>
          ))}
        </section>

        <div className="container mx-auto px-6 pb-10">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to DingerZone
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
