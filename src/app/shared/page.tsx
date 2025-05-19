'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
// import styles from './Shared.module.css';
import styles from '../shared/[shareId]/Shared.module.css'
import Footer from '@/components/Footer';

interface VideoDetails {
  videoUrl: string;
  skeletonUrl: string | null;
  thumbnailUrl: string | null;
  playerName: string;
  uploadDate: string;
  description: string;
  aiSummary: string | null;
  aiScorecard: { [key: string]: { score: number; description: string } } | null;
  expirationTime: string;
}

export default function SharedVideoPage() {
  const params = useParams();
  const shareId = params.shareId as string;
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSkeleton, setIsSkeleton] = useState(false);

  useEffect(() => {
    if (!shareId) return;

    const fetchVideoDetails = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`,
          { shareId },
          { headers: { 'Content-Type': 'application/json' } }
        );
        setVideoDetails(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load video');
      }
    };

    fetchVideoDetails();
  }, [shareId]);

  if (error) {
    return (
      <div className={styles.container}>
        <h1>Error</h1>
        <p>{error}</p>
        <a href="https://www.dingerzone.com" className={styles.cta}>
          Back to DingerZone
        </a>
      </div>
    );
  }

  if (!videoDetails) {
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  const videoSource = isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl;

  return (
    <div className={styles.container}>
      <head>
        <title>DingerZone - Baseball Swing Analysis</title>
        <meta name="description" content="View a shared baseball swing video with AI-powered analysis from DingerZone." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className={styles.header}>
        <Image src="/logo.png" alt="DingerZone Logo" width={150} height={50} className={styles.logo} />
        <h1>Baseball Swing Analysis</h1>
        <p>
          Powered by <a href="https://www.dingerzone.com">DingerZone</a>
        </p>
      </div>
      <div className={styles.metadata}>
        <p><strong>Player:</strong> {videoDetails.playerName || 'Unknown'}</p>
        <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString()}</p>
        <p><strong>Description:</strong> {videoDetails.description}</p>
      </div>
      <div className={styles.toggleContainer}>
        <span>Original</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={isSkeleton}
            onChange={() => setIsSkeleton(!isSkeleton)}
            disabled={!videoDetails.skeletonUrl}
          />
          <span className={styles.slider}></span>
        </label>
        <span>Computer Vision</span>
      </div>
      <div className={styles.videoContainer}>
        <video
          controls
          poster={videoDetails.thumbnailUrl || undefined}
          className={isSkeleton ? styles.skeletonVideo : styles.video}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {videoDetails.aiSummary && (
        <div className={styles.aiFeedback}>
          <h2>AI-Generated Feedback</h2>
          <p>{videoDetails.aiSummary}</p>
        </div>
      )}
      {videoDetails.aiScorecard && (
        <div className={styles.aiScorecard}>
          <h2>Swing Analysis</h2>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Score</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{score}</td>
                  <td>{description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className={styles.ctaContainer}>
        <a href="https://www.dingerzone.com/download" className={styles.cta}>
          Download the DingerZone App
        </a>
        <a href="https://www.dingerzone.com/about" className={styles.cta}>
          Learn More
        </a>
      </div>
      <div className={styles.footer}>
        <p>© 2025 DingerZone. All rights reserved.</p>
        <p>Link expires: {new Date(videoDetails.expirationTime).toLocaleString()}</p>
      </div>
      <Footer/>
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Image from 'next/image';
// import styles from './Shared.module.css';
// import Footer from '@/components/Footer';

// interface VideoDetails {
//   videoUrl: string;
//   skeletonUrl: string | null;
//   thumbnailUrl: string | null;
//   playerName: string;
//   uploadDate: string;
//   description: string;
//   aiSummary: string | null;
//   aiScorecard: { [key: string]: { score: number; description: string } } | null;
//   expirationTime: string;
// }

// export default function SharedVideoPage() {
//   const params = useParams();
//   const shareId = params.shareId as string;
//   const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isSkeleton, setIsSkeleton] = useState(false);

//   useEffect(() => {
//     if (!shareId) return;

//     const fetchVideoDetails = async () => {
//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`,
//           { shareId },
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         setVideoDetails(response.data);
//       } catch (err: any) {
//         setError(err.response?.data?.error || 'Failed to load video');
//       }
//     };

//     fetchVideoDetails();
//   }, [shareId]);

//   if (error) {
//     return (
//       <div className={styles.container}>
//         <h1>Error</h1>
//         <p>{error}</p>
//         <a href="https://www.dingerzone.com" className={styles.cta}>
//           Back to DingerZone
//         </a>
//       </div>
//     );
//   }

//   if (!videoDetails) {
//     return (
//       <div className={styles.container}>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   const videoSource = isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl;

//   return (
//     <div className="flex flex-col min-h-screen">
//         <div className={styles.container}>
//             <head>
//                 <title>DingerZone - Baseball Swing Analysis</title>
//                 <meta name="description" content="View a shared baseball swing video with AI-powered analysis from DingerZone." />
//                 <link rel="icon" href="/favicon.ico" />
//             </head>
//             <div className={styles.header}>
//                 <Image src="/logo.png" alt="DingerZone Logo" width={150} height={50} className={styles.logo} />
//                 <h1>Baseball Swing Analysis</h1>
//                 <p>
//                 Powered by <a href="https://www.dingerzone.com">DingerZone</a>
//                 </p>
//             </div>
//             <div className={styles.metadata}>
//                 <p><strong>Player:</strong> {videoDetails.playerName || 'Unknown'}</p>
//                 <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString()}</p>
//                 <p><strong>Description:</strong> {videoDetails.description}</p>
//             </div>
//             <div className={styles.toggleContainer}>
//                 <span>Original</span>
//                 <label className={styles.switch}>
//                 <input
//                     type="checkbox"
//                     checked={isSkeleton}
//                     onChange={() => setIsSkeleton(!isSkeleton)}
//                     disabled={!videoDetails.skeletonUrl}
//                 />
//                 <span className={styles.slider}></span>
//                 </label>
//                 <span>Computer Vision</span>
//             </div>
//             <div className={styles.videoContainer}>
//                 <video
//                 controls
//                 poster={videoDetails.thumbnailUrl || undefined}
//                 className={isSkeleton ? styles.skeletonVideo : styles.video}
//                 >
//                 <source src={videoSource} type="video/mp4" />
//                 Your browser does not support the video tag.
//                 </video>
//             </div>
//             {videoDetails.aiSummary && (
//                 <div className={styles.aiFeedback}>
//                 <h2>AI-Generated Feedback</h2>
//                 <p>{videoDetails.aiSummary}</p>
//                 </div>
//             )}
//             {videoDetails.aiScorecard && (
//                 <div className={styles.aiScorecard}>
//                 <h2>Swing Analysis</h2>
//                     <table>
//                         <thead>
//                         <tr>
//                             <th>Metric</th>
//                             <th>Score</th>
//                             <th>Description</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
//                             <tr key={key}>
//                             <td>{key}</td>
//                             <td>{score}</td>
//                             <td>{description}</td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//             <div className={styles.ctaContainer}>
//                 <a href="https://www.dingerzone.com/download" className={styles.cta}>
//                 Download the DingerZone App
//                 </a>
//                 <a href="https://www.dingerzone.com/about" className={styles.cta}>
//                 Learn More
//                 </a>
//             </div>
//             <div className={styles.footer}>
//                 <p>© 2025 DingerZone. All rights reserved.</p>
//                 <p>Link expires: {new Date(videoDetails.expirationTime).toLocaleString()}</p>
//             </div>
//         </div>
//         <Footer />
//     </div>
//   );
// }