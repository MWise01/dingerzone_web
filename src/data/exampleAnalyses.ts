import type { ScorecardMetric, TrialVideoDetails } from '../lib/trialApi';

export type ExampleAnalysis = TrialVideoDetails & {
  slug: string;
  title: string;
  eyebrow: string;
  audience: string;
  highlight: string;
  outcome: string;
  assetsPending?: boolean;
  sourceShareId?: string;
  sourceRecord?: {
    userKey: string;
    videoRecordId: string;
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
    highlight: 'Uses an existing shared video record to test the persistent examples flow with real analysis output.',
    outcome: 'Shows rhythm, lower-body timing, torso coordination, live metrics, original video, and computer-vision playback from an existing record.',
    sourceShareId: '2638a3af-a9bd-4473-8c95-36b52228c9bc',
    sourceRecord: {
      userKey: '74c824d8-40f1-70fd-e7b4-33c5bdc19463',
      videoRecordId: '4d709676-430c-4987-b38d-496ef6a5c10a',
    },
    videoUrl: '',
    originalVideoUrl: '/assets/examples/videos/youth-fluid-rhythm-original.mp4',
    skeletonUrl: null,
    thumbnailUrl: '/assets/examples/youth-fluid-rhythm.jpg',
    playerName: 'Youth Slugger',
    uploadDate: '2026-02-16T17:00:42Z',
    description: 'Example analysis loaded from an existing DingerZone swing record.',
    videoStatus: 'Processed',
    aiSummary:
      'Your swing rhythm has become more fluid over time, building better timing.\nLower body initiation could start a touch earlier for more power.\nTorso twist coordination is sometimes off, affecting overall balance.\n\nRecommended drills:\nTee work with pause to refine torso rotation sync.\nSoft toss with emphasis on earlier pelvis drive for added pop.\nBalance drills to improve overall stability and timing.',
    aiScorecard: scorecard({
      handPath: [3.4, 'Moderate efficiency with slight loop or drop.'],
      stride: [3.1, 'Adequate but slightly long or short.'],
      headPosition: [3.9, 'Minimal movement with good tracking.'],
      hipRotation: [3.6, 'Partial rotation with decent power.'],
      shoulderHipHandTiming: [3.5, 'Slight disconnect in timing.'],
      followThrough: [3.8, 'Good extension with a controlled finish.'],
      powerGeneration: [3.7, 'Moderate power that relies on the arms.'],
    }),
    liveMetrics: null,
    expirationTime: '',
    publicExpiresAt: undefined,
    retentionExpiresAt: null,
  },
  {
    slug: 'youth-smooth-timing',
    title: 'Youth Smooth Timing',
    eyebrow: 'Timing and balance',
    audience: 'Players and parents',
    highlight: 'Uses a real shared record to show smoother rhythm, strong posture, and lower-body timing cues.',
    outcome: 'Shows smoother rhythm, strong torso balance, lower-body sync, original video, computer-vision playback, scorecard, and live metrics.',
    sourceShareId: 'c6f53bf1-95ca-4820-aaf7-26160d06c019',
    sourceRecord: {
      userKey: '74c824d8-40f1-70fd-e7b4-33c5bdc19463',
      videoRecordId: 'db494a19-ae61-402b-8077-5573af79896d',
    },
    videoUrl: '',
    originalVideoUrl: '/assets/examples/videos/youth-smooth-timing-original.mp4',
    skeletonUrl: null,
    thumbnailUrl: '/assets/examples/youth-smooth-timing.jpg',
    playerName: 'Youth Slugger',
    uploadDate: '2026-02-11T01:11:49.249Z',
    description: 'Example analysis loaded from an existing DingerZone swing record.',
    videoStatus: 'Processed',
    aiSummary:
      'Your swing rhythm is getting smoother, building better timing.\nLower body initiation could start a touch earlier for more power.\nTorso lean and balance have stayed consistently strong.\n\nRecommended drills:\nTee work with pause to refine lower body sync.\nFence drills to keep the front shoulder closed longer.\nSoft toss with an inside pitch focus to enhance torso rotation.',
    aiScorecard: scorecard({
      handPath: [4.2, 'Efficient path with minimal deviations.'],
      stride: [3.9, 'Good length and direction with minor balance issues.'],
      headPosition: [4.6, 'Minimal movement with good tracking.'],
      hipRotation: [3.4, 'Partial rotation with decent power.'],
      shoulderHipHandTiming: [4.4, 'Good sequence with minor timing issues.'],
      followThrough: [4.8, 'Full extension with a natural finish.'],
      powerGeneration: [4.0, 'Good power with some lower body contribution.'],
    }),
    liveMetrics: null,
    expirationTime: '',
    publicExpiresAt: undefined,
    retentionExpiresAt: null,
  },
  {
    slug: 'youth-power-sync',
    title: 'Youth Power Sync',
    eyebrow: 'Power sequence',
    audience: 'Players and coaches',
    highlight: 'Uses a real shared record to show torso posture, lower-body initiation, and improved swing efficiency.',
    outcome: 'Shows improved posture, hand speed, lower-body timing, original video, computer-vision playback, scorecard, and live metrics.',
    sourceShareId: 'c7a52125-668c-4c2b-a98e-f54ce6afaf13',
    sourceRecord: {
      userKey: '74c824d8-40f1-70fd-e7b4-33c5bdc19463',
      videoRecordId: '651003e5-800f-4c53-95ef-4753978e548b',
    },
    videoUrl: '',
    originalVideoUrl: '/assets/examples/videos/youth-power-sync-original.mp4',
    skeletonUrl: null,
    thumbnailUrl: '/assets/examples/youth-power-sync.jpg',
    playerName: 'Youth Slugger',
    uploadDate: '2026-02-11T15:59:00.158Z',
    description: 'Example analysis loaded from an existing DingerZone swing record.',
    videoStatus: 'Processed',
    aiSummary:
      'Torso lean and posture have become more consistent and powerful.\nLower body initiation could start a touch earlier for more pop.\nHand speed and overall swing efficiency have improved significantly.\n\nRecommended drills:\nTee work with pause to refine torso rotation sync.\nFence drills to keep the front shoulder closed longer.\nWall ball drills to enhance hip and pelvis drive timing.',
    aiScorecard: scorecard({
      handPath: [4.2, 'Efficient path with minimal deviations.'],
      stride: [3.9, 'Good length and direction with minor balance issues.'],
      headPosition: [4.6, 'Minimal movement with good tracking.'],
      hipRotation: [3.4, 'Partial rotation with decent power.'],
      shoulderHipHandTiming: [4.3, 'Good sequence with minor timing issues.'],
      followThrough: [4.5, 'Good extension with a controlled finish.'],
      powerGeneration: [3.8, 'Good power with some lower body contribution.'],
    }),
    liveMetrics: null,
    expirationTime: '',
    publicExpiresAt: undefined,
    retentionExpiresAt: null,
  },
];

export const getExampleAnalysis = (slug: string) =>
  exampleAnalyses.find((example) => example.slug === slug) || null;
