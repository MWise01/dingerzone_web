export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://jhmyrcpav9.execute-api.us-east-1.amazonaws.com/dev';

const TRIAL_START_PATH = '/api/trial-upload/start';
const TRIAL_COMPLETE_PATH = '/api/trial-upload/complete';
const SHARED_DETAILS_PATH = '/api/shared-video-details';

export const getVideoContentType = (file: File) => {
  if (file.type.startsWith('video/')) return file.type;

  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'mov' || extension === 'qt') return 'video/quicktime';
  if (extension === 'm4v') return 'video/x-m4v';
  if (extension === 'mp4') return 'video/mp4';

  return null;
};

export const isVideoFile = (file: File) => Boolean(getVideoContentType(file));

export interface TrialUploadStartResponse {
  trialId: string;
  videoId: string;
  shareId: string;
  upload: {
    url: string;
    fields: Record<string, string>;
  };
  publicExpiresAt: string;
  modelImprovementConsent: boolean;
  retentionExpiresAt: string | null;
  maxUploadBytes: number;
}

export interface TrialUploadCompleteResponse {
  trialId: string;
  videoId: string;
  shareId: string;
  publicExpiresAt: string;
  sharePath: string;
  status: 'PROCESSING' | string;
}

export interface ScorecardMetric {
  score: number;
  description: string;
}

export interface TrialVideoDetails {
  videoUrl: string;
  skeletonUrl: string | null;
  thumbnailUrl: string | null;
  playerName: string;
  uploadDate: string;
  description: string;
  videoStatus: string | null;
  aiSummary: string | null;
  aiScorecard: Record<string, ScorecardMetric> | null;
  expirationTime: string;
  publicExpiresAt?: string;
  modelImprovementConsent?: boolean | null;
  retentionExpiresAt?: string | null;
}

const parseJsonResponse = async <T>(response: Response): Promise<T> => {
  const payload = await response.json().catch(() => null);
  const parsedPayload =
    payload && typeof payload.body === 'string' ? JSON.parse(payload.body) : payload;

  if (!response.ok) {
    const message =
      parsedPayload?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return parsedPayload as T;
};

export const startTrialUpload = async ({
  file,
  modelImprovementConsent,
  source = 'marketing',
}: {
  file: File;
  modelImprovementConsent: boolean;
  source?: string;
}) => {
  const response = await fetch(TRIAL_START_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contentType: getVideoContentType(file) || 'video/mp4',
      contentLength: file.size,
      modelImprovementConsent,
      source,
    }),
  });

  return parseJsonResponse<TrialUploadStartResponse>(response);
};

export const uploadTrialFile = async ({
  file,
  startResponse,
}: {
  file: File;
  startResponse: TrialUploadStartResponse;
}) => {
  const formData = new FormData();

  Object.entries(startResponse.upload.fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('file', file);

  const response = await fetch(startResponse.upload.url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`S3 upload failed with status ${response.status}`);
  }
};

export const completeTrialUpload = async (trialId: string) => {
  const response = await fetch(TRIAL_COMPLETE_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ trialId }),
  });

  return parseJsonResponse<TrialUploadCompleteResponse>(response);
};

export const fetchTrialVideoDetails = async (shareId: string) => {
  const response = await fetch(SHARED_DETAILS_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shareId }),
  });

  return parseJsonResponse<TrialVideoDetails>(response);
};
