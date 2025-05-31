// /src/app/shared/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios, {AxiosError} from 'axios';
import Image from 'next/image';
import styles from './Shared.module.css';

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
  const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSkeleton, setIsSkeleton] = useState(false);

  // useEffect(() => {
  //   if (!shareId) {
  //     console.error('No shareId provided in URL');
  //     setError('Invalid share link');
  //     return;
  //   }

  //   const fetchVideoDetails = async () => {
  //     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`;
  //     const requestBody = { shareId };
  //     console.log('Preparing API request:', {
  //       url: apiUrl,
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: requestBody,
  //     });

  //     try {
  //       const response = await axios.post(apiUrl, requestBody, {
  //         headers: { 'Content-Type': 'application/json' },
  //       });
  //       console.log('API response:', {
  //         status: response.status,
  //         data: response.data,
  //       });
  //       setVideoDetails(response.data);
  //     } catch (err: any) {
  //       console.error('API error:', {
  //         status: err.response?.status,
  //         data: err.response?.data,
  //         message: err.message,
  //         config: {
  //           url: err.config?.url,
  //           method: err.config?.method,
  //           headers: err.config?.headers,
  //           data: err.config?.data,
  //         },
  //       });
  //       setError(err.response?.data?.error || 'Failed to load video');
  //     }
  //   };

  //   fetchVideoDetails();
  // }, [shareId]);

  useEffect(() => {
  if (!shareId) {
    console.error('No shareId provided in URL');
    setError('Invalid share link');
    return;
  }

  const fetchVideoDetails = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`;
    const requestBody = { shareId };
    console.log('Preparing API request:', {
      url: apiUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('API response:', {
        status: response.status,
        data: response.data,
      });
      setVideoDetails(response.data);
    } catch (err: AxiosError) {
      console.error('API error:', {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
        config: {
          url: err.config?.url,
          method: err.config?.method,
          headers: err.config?.headers,
          data: err.config?.data,
        },
      });
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
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image src="/logo.png" alt="DingerZone Logo" width={150} height={50} />
      </header>
      <main className={styles.main}>
        <h1>{`${videoDetails.playerName}'s Swing Analysis`}</h1>
        <div className={styles.videoContainer}>
          <video
            src={isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl}
            controls
            poster={videoDetails.thumbnailUrl || undefined}
            className={styles.video}
          />
          {videoDetails.skeletonUrl && (
            <button
              onClick={() => setIsSkeleton(!isSkeleton)}
              className={styles.toggleButton}
            >
              {isSkeleton ? 'Show Original Video' : 'Show Skeleton Overlay'}
            </button>
          )}
        </div>
        <div className={styles.metadata}>
          <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {videoDetails.description}</p>
          {videoDetails.aiSummary && (
            <div className={styles.aiFeedback}>
              <h2>AI Feedback</h2>
              <p>{videoDetails.aiSummary}</p>
            </div>
          )}
          {videoDetails.aiScorecard && (
            <div className={styles.scorecard}>
              <h2>AI Scorecard</h2>
              <ul>
                {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {score}/5 - {description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Powered by DingerZone - <a href="https://www.dingerzone.com">Join Now</a></p>
      </footer>
    </div>
  );
}


// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios, { AxiosError } from 'axios'; // Import AxiosError
// import Image from 'next/image';
// // import styles from './Shared.module.css';
// // import styles from '../shared/[shareId]/Shared.module.css'
// import styles from '../[shareId]/Shared.module.css'
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

//   // useEffect(() => {
//   //   if (!shareId) return;

//   //   const fetchVideoDetails = async () => {
//   //     try {
//   //       const response = await axios.post(
//   //         `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`,
//   //         { shareId },
//   //         { headers: { 'Content-Type': 'application/json' } }
//   //       );
//   //       setVideoDetails(response.data);
//   //     } catch (err: unknown) {
//   //       // Type guard to check if err is an AxiosError
//   //       if (err instanceof AxiosError) {
//   //         setError(
//   //           (err.response?.data as { error?: string })?.error || 'Failed to load video'
//   //         );
//   //       } else {
//   //         // Handle non-Axios errors
//   //         setError('An unexpected error occurred');
//   //       }
//   //     }
//   //   };

//   //   fetchVideoDetails();
//   // }, [shareId]);
//   useEffect(() => {
//   if (!shareId) return;

//   const fetchVideoDetails = async () => {
//     try {
//       console.log('Fetching video details for shareId:', shareId);
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`,
//         { shareId },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       console.log('API response:', response.data);
//       setVideoDetails(response.data);
//     } catch (err: any) {
//       console.error('API error:', err.response?.data || err.message);
//       setError(err.response?.data?.error || 'Failed to load video');
//     }
//   };

//   fetchVideoDetails();
// }, [shareId]);

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
//     <div className={styles.container}>
//       <head>
//         <title>DingerZone - Baseball Swing Analysis</title>
//         <meta name="description" content="View a shared baseball swing video with AI-powered analysis from DingerZone." />
//         <link rel="icon" href="/favicon.ico" />
//       </head>
//       <div className={styles.header}>
//         <Image src="/logo.png" alt="DingerZone Logo" width={150} height={50} className={styles.logo} />
//         <h1>Baseball Swing Analysis</h1>
//         <p>
//           Powered by <a href="https://www.dingerzone.com">DingerZone</a>
//         </p>
//       </div>
//       <div className={styles.metadata}>
//         <p><strong>Player:</strong> {videoDetails.playerName || 'Unknown'}</p>
//         <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString()}</p>
//         <p><strong>Description:</strong> {videoDetails.description}</p>
//       </div>
//       <div className={styles.toggleContainer}>
//         <span>Original</span>
//         <label className={styles.switch}>
//           <input
//             type="checkbox"
//             checked={isSkeleton}
//             onChange={() => setIsSkeleton(!isSkeleton)}
//             disabled={!videoDetails.skeletonUrl}
//           />
//           <span className={styles.slider}></span>
//         </label>
//         <span>Computer Vision</span>
//       </div>
//       <div className={styles.videoContainer}>
//         <video
//           controls
//           poster={videoDetails.thumbnailUrl || undefined}
//           className={isSkeleton ? styles.skeletonVideo : styles.video}
//         >
//           <source src={videoSource} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </div>
//       {videoDetails.aiSummary && (
//         <div className={styles.aiFeedback}>
//           <h2>AI-Generated Feedback</h2>
//           <p>{videoDetails.aiSummary}</p>
//         </div>
//       )}
//       {videoDetails.aiScorecard && (
//         <div className={styles.aiScorecard}>
//           <h2>Swing Analysis</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Metric</th>
//                 <th>Score</th>
//                 <th>Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
//                 <tr key={key}>
//                   <td>{key}</td>
//                   <td>{score}</td>
//                   <td>{description}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <div className={styles.ctaContainer}>
//         <a href="https://www.dingerzone.com/download" className={styles.cta}>
//           Download the DingerZone App
//         </a>
//         <a href="https://www.dingerzone.com/about" className={styles.cta}>
//           Learn More
//         </a>
//       </div>
//       <div className={styles.footer}>
//         <p>© 2025 DingerZone. All rights reserved.</p>
//         <p>Link expires: {new Date(videoDetails.expirationTime).toLocaleString()}</p>
//       </div>
//       <Footer/>
//     </div>
//   );
// }

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