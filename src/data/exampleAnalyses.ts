import type { ScorecardMetric, TrialVideoDetails } from '../lib/trialApi';
import {
  youthFluidRhythmLiveMetrics,
  youthPowerSyncLiveMetrics,
  youthSmoothTimingLiveMetrics,
} from './exampleLiveMetrics';

export type ExampleAnalysis = TrialVideoDetails & {
  slug: string;
  title: string;
  eyebrow: string;
  audience: string;
  highlight: string;
  outcome: string;
  assetsPending?: boolean;
  analysisRun?: {
    videoRecordId: string;
    executionName: string;
    finishedAt: string;
    keypointRecordCount: number;
    skeletonObjectName: string;
  };
};

const scorecard = (
  scores: Record<string, [number, string]>
): Record<string, ScorecardMetric> =>
  Object.fromEntries(
    Object.entries(scores).map(([key, [score, description]]) => [
      key,
      { score, description },
    ])
  );

export const exampleAnalyses: ExampleAnalysis[] = [
  {
    slug: 'youth-fluid-rhythm',
    title: 'Youth Fluid Rhythm',
    eyebrow: 'Real record test',
    audience: 'Players and parents',
    highlight: 'Uses a curated example clip with real analysis output from the July 2026 rerun.',
    outcome: 'Shows rhythm, lower-body timing, torso coordination, original video, and computer-vision playback from example-specific assets.',
    analysisRun: {
      videoRecordId: '4d709676-430c-4987-b38d-496ef6a5c10a',
      executionName: 'rerun-4d709676-20260717',
      finishedAt: '2026-07-17T13:57:28Z',
      keypointRecordCount: 202,
      skeletonObjectName: '4d709676-430c-4987-b38d-496ef6a5c10a_skeleton.mp4',
    },
    videoUrl: '',
    originalVideoUrl: '/assets/examples/videos/youth-fluid-rhythm-original.mp4',
    skeletonUrl: '/assets/examples/videos/youth-fluid-rhythm-skeleton.mp4',
    thumbnailUrl: '/assets/examples/youth-fluid-rhythm.jpg',
    playerName: 'Youth Slugger',
    uploadDate: '2026-02-16T17:00:42Z',
    description: 'Curated example analysis generated from the July 2026 backend rerun.',
    videoStatus: 'Processed',
    aiSummary:
      'Torso twist coordination has become more efficient.\nLower body initiation could start a touch earlier for more pop.\nCore engagement remains strong throughout the swing.\n\nRecommended drills:\nTee work with pause to refine torso rotation sync.\nFence drills to keep the front shoulder closed longer.\nHeel taps to enhance lower body timing and explosiveness.',
    aiScorecard: scorecard({
      handPath: [3.7, 'Significant loop or drop in path.'],
      stride: [4.2, 'Good length and direction, minor balance issues.'],
      headPosition: [4.5, 'Minimal movement, good tracking.'],
      hipRotation: [3.9, 'Moderate power, relies on arms.'],
      shoulderHipHandTiming: [4.1, 'Good sequence, minor timing issues.'],
      followThrough: [4.6, 'Good extension, controlled finish.'],
      powerGeneration: [3.8, 'Moderate power, relies on arms.'],
    }),
    liveMetrics: youthFluidRhythmLiveMetrics,
    expirationTime: '',
    publicExpiresAt: undefined,
    retentionExpiresAt: null,
  },
  {
    slug: 'youth-smooth-timing',
    title: 'Youth Smooth Timing',
    eyebrow: 'Timing and balance',
    audience: 'Players and parents',
    highlight: 'Uses a curated example clip to show smoother rhythm, strong posture, and lower-body timing cues.',
    outcome: 'Shows smoother rhythm, strong torso balance, lower-body sync, original video, computer-vision playback, and scorecard.',
    analysisRun: {
      videoRecordId: 'db494a19-ae61-402b-8077-5573af79896d',
      executionName: 'rerun-db494a19-20260717',
      finishedAt: '2026-07-17T13:55:59Z',
      keypointRecordCount: 101,
      skeletonObjectName: 'db494a19-ae61-402b-8077-5573af79896d_skeleton.mp4',
    },
    videoUrl: '',
    originalVideoUrl: '/assets/examples/videos/youth-smooth-timing-original.mp4',
    skeletonUrl: '/assets/examples/videos/youth-smooth-timing-skeleton.mp4',
    thumbnailUrl: '/assets/examples/youth-smooth-timing.jpg',
    playerName: 'Youth Slugger',
    uploadDate: '2026-02-11T01:11:49.249Z',
    description: 'Curated example analysis generated from the July 2026 backend rerun.',
    videoStatus: 'Processed',
    aiSummary:
      'Torso rotation and lower body sync have become more efficient.\nBat speed and hand path control have shown noticeable improvement.\nCore engagement could be more consistent for added power.\n\nRecommended drills:\nTee work with pause to refine torso rotation sync.\nSoft toss drills to focus on quieting the upper body.\nMedicine ball throws to enhance core power and timing.',
    aiScorecard: scorecard({
      handPath: [3.7, 'Significant loop or drop in path.'],
      stride: [4.2, 'Good length and direction, minor balance issues.'],
      headPosition: [4.1, 'Minimal movement, good tracking.'],
      hipRotation: [3.5, 'Partial rotation, decent power.'],
      shoulderHipHandTiming: [4.3, 'Good sequence, minor timing issues.'],
      followThrough: [4.6, 'Good extension, controlled finish.'],
      powerGeneration: [3.9, 'Good power, some lower body.'],
    }),
    liveMetrics: youthSmoothTimingLiveMetrics,
    expirationTime: '',
    publicExpiresAt: undefined,
    retentionExpiresAt: null,
  },
  {
    slug: 'youth-power-sync',
    title: 'Youth Power Sync',
    eyebrow: 'Power sequence',
    audience: 'Players and coaches',
    highlight: 'Uses a curated example clip to show torso posture, lower-body initiation, and improved swing efficiency.',
    outcome: 'Shows improved posture, hand speed, lower-body timing, original video, computer-vision playback, and scorecard.',
    analysisRun: {
      videoRecordId: '651003e5-800f-4c53-95ef-4753978e548b',
      executionName: 'rerun-651003e5-20260717',
      finishedAt: '2026-07-17T13:57:03Z',
      keypointRecordCount: 170,
      skeletonObjectName: '651003e5-800f-4c53-95ef-4753978e548b_skeleton.mp4',
    },
    videoUrl: '',
    originalVideoUrl: '/assets/examples/videos/youth-power-sync-original.mp4',
    skeletonUrl: '/assets/examples/videos/youth-power-sync-skeleton.mp4',
    thumbnailUrl: '/assets/examples/youth-power-sync.jpg',
    playerName: 'Youth Slugger',
    uploadDate: '2026-02-11T15:59:00.158Z',
    description: 'Curated example analysis generated from the July 2026 backend rerun.',
    videoStatus: 'Processed',
    aiSummary:
      'Lower body initiation has improved, generating more power.\nTorso twist coordination remains a strong point, contributing to solid contact.\nPelvis drive timing could be slightly more aggressive for added pop.\n\nRecommended drills:\nTee work with pause to refine torso rotation sync.\nSoft toss with emphasis on explosive hip firing for better lower body engagement.\nFence drills to keep the front shoulder closed longer and enhance overall timing.',
    aiScorecard: scorecard({
      handPath: [3.2, 'Significant loop or drop in path.'],
      stride: [3.9, 'Good length and direction, minor balance issues.'],
      headPosition: [4.1, 'Minimal movement, good tracking.'],
      hipRotation: [3.8, 'Moderate power, relies on arms.'],
      shoulderHipHandTiming: [4.3, 'Efficient path with minimal deviations.'],
      followThrough: [4.4, 'Good extension, controlled finish.'],
      powerGeneration: [3.9, 'Good power, some lower body.'],
    }),
    liveMetrics: youthPowerSyncLiveMetrics,
    expirationTime: '',
    publicExpiresAt: undefined,
    retentionExpiresAt: null,
  },
];

export const getExampleAnalysis = (slug: string) =>
  exampleAnalyses.find((example) => example.slug === slug) || null;
