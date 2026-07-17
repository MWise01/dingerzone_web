'use client';

import { useState } from 'react';
import { trackAnalyticsEvent } from '../lib/analytics';

const ShareIcon = () => (
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

export default function SharePageButton({
  title = 'DingerZone sample analysis',
  text = 'Check out this DingerZone swing analysis example.',
}: {
  title?: string;
  text?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'shared' | 'error'>('idle');

  const handleShare = async () => {
    const url = window.location.href;
    setStatus('idle');
    trackAnalyticsEvent('share_click', { location: 'example_page' });

    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        setStatus('shared');
        trackAnalyticsEvent('share_success', {
          location: 'example_page',
          method: 'native',
        });
        return;
      }

      await navigator.clipboard.writeText(url);
      setStatus('copied');
      trackAnalyticsEvent('share_success', {
        location: 'example_page',
        method: 'clipboard',
      });
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        setStatus('copied');
        trackAnalyticsEvent('share_success', {
          location: 'example_page',
          method: 'clipboard_fallback',
        });
      } catch {
        setStatus('error');
        trackAnalyticsEvent('share_error', { location: 'example_page' });
      }
    }
  };

  return (
    <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:items-end">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-300 px-6 py-3 font-bold text-blue-100 transition-colors hover:bg-blue-500/10"
      >
        <ShareIcon />
        Share
      </button>
      {status !== 'idle' && (
        <p className="text-xs text-gray-300">
          {status === 'copied' && 'Link copied to clipboard.'}
          {status === 'shared' && 'Share sheet opened.'}
          {status === 'error' && 'Unable to copy link from this browser.'}
        </p>
      )}
    </div>
  );
}
