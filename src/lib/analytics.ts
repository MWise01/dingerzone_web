'use client';

import { track } from '@vercel/analytics';

type AnalyticsProperties = Record<string, string | number | boolean>;

export const trackAnalyticsEvent = (
  name: string,
  properties: AnalyticsProperties = {}
) => {
  try {
    track(name, properties);
  } catch {
    // Analytics should never interrupt core site interactions.
  }
};
