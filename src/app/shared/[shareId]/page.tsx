'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Switch from 'react-switch';

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

interface SwingScores {
  handPath: { score: number; description: string };
  stride: { score: number; description: string };
  headPosition: { score: number; description: string };
  hipRotation: { score: number; description: string };
  shoulderHipHandTiming: { score: number; description: string };
  followThrough: { score: number; description: string };
  powerGeneration: { score: number; description: string };
}

export default function SharedVideoPage() {
  const params = useParams();
  const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [scorecard, setScorecard] = useState<SwingScores | null>(null);

  useEffect(() => {
    if (!shareId) {
      console.error('No shareId provided in URL');
      setError('Invalid share link');
      return;
    }

    const fetchVideoDetails = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`
        : null;
      if (!apiUrl) {
        console.error('Environment error: NEXT_PUBLIC_API_URL is not defined');
        setError('Configuration error: API URL not set. Please check environment variables.');
        return;
      }

      const requestBody = { shareId };
      try {
        const response = await axios.post(apiUrl, requestBody, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
          withCredentials: false,
        });

        let data: VideoDetails;
        if (response.data && typeof response.data.body === 'string') {
          data = JSON.parse(response.data.body);
        } else if (response.data && typeof response.data === 'object') {
          data = response.data as VideoDetails;
        } else {
          throw new Error('Invalid API response format');
        }
        setVideoDetails(data);
        if (data.aiScorecard) {
          const parsedScorecard = JSON.parse(JSON.stringify(data.aiScorecard)) as SwingScores;
          setScorecard(parsedScorecard);
        }
      } catch (err: unknown) {
        console.error('Error fetching video details:', err);
        setError('Failed to load video. Please try again later.');
      }
    };

    fetchVideoDetails();
  }, [shareId]);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header />
        <main className="container mx-auto py-12 px-6 flex-grow text-white">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-6">{error}</p>
          <a
            href="https://www.dingerzone.com"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-800"
          >
            Back to DingerZone
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  if (!videoDetails) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Header />
        <main className="container mx-auto py-12 px-6 flex-grow text-white">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const initialScores: SwingScores = {
    handPath: { score: 3.0, description: "AI score not generated" },
    stride: { score: 3.0, description: "AI score not generated" },
    headPosition: { score: 3.0, description: "AI score not generated" },
    hipRotation: { score: 3.0, description: "AI score not generated" },
    shoulderHipHandTiming: { score: 3.0, description: "AI score not generated" },
    followThrough: { score: 3.0, description: "AI score not generated" },
    powerGeneration: { score: 3.0, description: "AI score not generated" },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-6 px-4">
          {/* User Info */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center">
            <Image
              src="/assets/images/Baseball.png"
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{videoDetails.playerName || 'Unknown Player'}</h2>
              {/* <p className="text-sm text-gray-400">Age: 14, Date Uploaded: {new Date(videoDetails.uploadDate).toLocaleDateString()}</p> */}
              <p className="text-sm text-gray-400">Date Uploaded: {new Date(videoDetails.uploadDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Video and Details Side by Side */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Video Section */}
            <div className="md:w-1/2">
              <p className="text-sm mb-2">Playing video 1 of 1</p>
              <div className="flex items-center mb-4">
                <span className="text-sm mr-2">Original</span>
                <Switch
                  onChange={() => setIsSkeleton(!isSkeleton)}
                  checked={isSkeleton}
                  onColor="#5782F1"
                  offColor="#767577"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  height={20}
                  width={40}
                  handleDiameter={20}
                />
                <span className="text-sm ml-2">Computer Vision</span>
              </div>
              <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <video
                  src={isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl}
                  controls
                  poster={videoDetails.thumbnailUrl || undefined}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error('Video playback error:', e);
                    setError('Failed to play video. The video URL may be invalid or expired.');
                  }}
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-1/2">
              {/* Summary Feedback */}
              {videoDetails.aiSummary && (
                <div className="bg-gray-800 p-4 rounded-lg mt-4">
                  <h3 className="text-lg font-semibold">Summary Feedback</h3>
                  <p className="text-sm text-gray-400 mt-2">{videoDetails.aiSummary}</p>
                </div>
              )}

              {/* AI Swing Breakdown */}
              {videoDetails.description && (
                <div className="bg-gray-800 p-4 rounded-lg mt-4">
                  <h3 className="text-lg font-semibold">AI Swing Breakdown</h3>
                  <p className="text-sm text-gray-400 mt-2">{videoDetails.description}</p>
                </div>
              )}
              
              {/* Overall Score Slider */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-sm mr-2">Overall</span>
                  <div className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full relative">
                    <div
                      className="absolute h-4 w-4 bg-white rounded-full"
                      style={{ left: `${(scorecard ? scorecard.powerGeneration.score : 3.0) * 20}%`, top: '-6px' }}
                    ></div>
                  </div>
                  <span className="text-sm ml-2">{(scorecard ? scorecard.powerGeneration.score : 3.0).toFixed(1)}/5.0</span>
                </div>
              </div>

              {/* Scorecard */}
              {(scorecard || initialScores) && (
                <div className="space-y-4">
                  {Object.entries(scorecard || initialScores).map(([key, { score, description }]) => (
                    <div key={key} className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                      <div className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full relative mt-2">
                        <div
                          className="absolute h-4 w-4 bg-white rounded-full"
                          style={{ left: `${score * 20}%`, top: '-6px' }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2">{description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Image from 'next/image';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';

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
//   const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
//   const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isSkeleton, setIsSkeleton] = useState(false);

//   useEffect(() => {
//     if (!shareId) {
//       console.error('No shareId provided in URL');
//       setError('Invalid share link');
//       return;
//     }

//     const fetchVideoDetails = async () => {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL
//         ? `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`
//         : null;
//       if (!apiUrl) {
//         console.error('Environment error: NEXT_PUBLIC_API_URL is not defined');
//         setError('Configuration error: API URL not set. Please check environment variables.');
//         return;
//       }

//       const requestBody = { shareId };
//       console.log('Preparing API request:', {
//         url: apiUrl,
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestBody,
//       });

//       try {
//         const response = await axios.post(apiUrl, requestBody, {
//           headers: { 'Content-Type': 'application/json' },
//           timeout: 10000,
//           withCredentials: false,
//         });

//         console.log('API response:', {
//           status: response.status,
//           data: response.data,
//         });

//         let data: VideoDetails;
//         if (response.data && typeof response.data.body === 'string') {
//           data = JSON.parse(response.data.body);
//         } else if (response.data && typeof response.data === 'object') {
//           data = response.data as VideoDetails;
//         } else {
//           throw new Error('Invalid API response format');
//         }
//         setVideoDetails(data);
//       } catch (err: unknown) {
//         console.error('Raw error object:', err);

//         if (axios.isAxiosError(err)) {
//           console.error('Axios error details:', {
//             name: err.name ?? 'No name',
//             message: err.message ?? 'No message',
//             code: err.code ?? 'No code',
//             status: err.response?.status ?? 'No status',
//             statusText: err.response?.statusText ?? 'No status text',
//             data: err.response?.data ?? 'No data',
//             headers: err.response?.headers ?? 'No response headers',
//             request: err.request ? {
//               method: err.request.method ?? 'No method',
//               url: err.request.url ?? 'No URL',
//               headers: err.request.headers ?? 'No request headers',
//             } : 'No request object',
//             config: err.config ? {
//               url: err.config.url ?? 'No URL',
//               method: err.config.method ?? 'No method',
//               headers: err.config.headers ?? 'No headers',
//               data: err.config.data ?? 'No data',
//               timeout: err.config.timeout ?? 'No timeout',
//             } : 'No config',
//           });

//           let errorMessage = 'Failed to load video. Please try again later.';
//           if (err.code === 'ERR_NETWORK') {
//             errorMessage = 'Unable to reach the server. Please check your network or try again later.';
//           } else if (err.response?.data?.error) {
//             errorMessage = err.response.data.error;
//           } else if (err.message) {
//             errorMessage = err.message;
//           }
//           setError(errorMessage);
//         } else {
//           console.error('Non-Axios error:', {
//             error: err instanceof Error ? {
//               name: err.name,
//               message: err.message,
//               stack: err.stack,
//             } : 'Unknown error type',
//           });
//           setError('An unexpected error occurred');
//         }
//       }
//     };

//     fetchVideoDetails();
//   }, [shareId]);

//   if (error) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-100">
//         <Header />
//         <main className="container mx-auto py-12 px-6 flex-grow">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">Error</h1>
//           <p className="text-lg text-gray-600 mb-6">{error}</p>
//           <a
//             href="https://www.dingerzone.com"
//             className="inline-block px-6 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-800"
//           >
//             Back to DingerZone
//           </a>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   if (!videoDetails) {
//     return (
//       <div className="flex flex-col min-h-screen bg-gray-100">
//         <Header />
//         <main className="container mx-auto py-12 px-6 flex-grow">
//           <p className="text-lg text-gray-600">Loading...</p>
//         </main>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         {/* Hero-like Section with Dark Background */}
//         <section className="relative overflow-hidden bg-[#1A1A2E] py-12">
//           <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
//           <div className="container mx-auto px-6 relative z-20">
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
//               {`${videoDetails.playerName || 'Unknown Player'}'s Swing Analysis`}
//             </h1>
//             <div className="flex flex-col lg:flex-row gap-8">
//               <div className="lg:w-2/3">
//                 <div className="relative w-full aspect-video bg-gray-800 rounded-lg overflow-hidden">
//                   <video
//                     src={isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl}
//                     controls
//                     poster={videoDetails.thumbnailUrl || undefined}
//                     className="w-full h-full object-contain"
//                     onError={(e) => {
//                       console.error('Video playback error:', e);
//                       setError('Failed to play video. The video URL may be invalid or expired.');
//                     }}
//                   />
//                 </div>
//                 {videoDetails.skeletonUrl && (
//                   <button
//                     onClick={() => setIsSkeleton(!isSkeleton)}
//                     className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-800 transition-colors"
//                   >
//                     {isSkeleton ? 'Show Original Video' : 'Show Skeleton Overlay'}
//                   </button>
//                 )}
//               </div>
//               <div className="lg:w-1/3 text-white">
//                 <h2 className="text-2xl font-semibold mb-4">Details</h2>
//                 <p className="mb-2">
//                   <strong>Uploaded:</strong>{' '}
//                   {new Date(videoDetails.uploadDate).toLocaleDateString() || 'Invalid Date'}
//                 </p>
//                 <p className="mb-4">
//                   <strong>Description:</strong>{' '}
//                   {videoDetails.description || 'No description available'}
//                 </p>
//                 {videoDetails.aiSummary && (
//                   <div className="mb-6">
//                     <h3 className="text-xl font-semibold mb-2">AI Feedback</h3>
//                     <p>{videoDetails.aiSummary}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Scorecard Section */}
//         {videoDetails.aiScorecard && (
//           <section className="container mx-auto py-12 px-6 bg-white">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6">AI Scorecard</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
//                 <div key={key} className="bg-gray-100 p-6 rounded-lg shadow-md">
//                   <h3 className="text-xl font-semibold text-gray-800 mb-2">{key}</h3>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Score:</strong> {score}/5
//                   </p>
//                   <p className="text-gray-600">{description}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}
//       </main>
//       <Footer />
//     </div>
//   );
// }

////////////////////////// FUNCTIONING SHARED PAGE BELOW as of 7/3/2025 //////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Image from 'next/image';
// import styles from './Shared.module.css';

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
//   const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
//   const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isSkeleton, setIsSkeleton] = useState(false);

//   useEffect(() => {
//     if (!shareId) {
//       console.error('No shareId provided in URL');
//       setError('Invalid share link');
//       return;
//     }

//     const fetchVideoDetails = async () => {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL
//         ? `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`
//         : null;
//       if (!apiUrl) {
//         console.error('Environment error: NEXT_PUBLIC_API_URL is not defined');
//         setError('Configuration error: API URL not set. Please check environment variables.');
//         return;
//       }

//       const requestBody = { shareId };
//       console.log('Preparing API request:', {
//         url: apiUrl,
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestBody,
//       });

//       try {
//         const response = await axios.post(apiUrl, requestBody, {
//           headers: { 'Content-Type': 'application/json' },
//           timeout: 10000,
//           withCredentials: false,
//         });

//         console.log('API response:', {
//           status: response.status,
//           data: response.data,
//         });

//         // Parse the nested body correctly
//         let data: VideoDetails;
//         if (response.data && typeof response.data.body === 'string') {
//           data = JSON.parse(response.data.body);
//         } else if (response.data && typeof response.data === 'object') {
//           data = response.data as VideoDetails; // Fallback if body is already an object
//         } else {
//           throw new Error('Invalid API response format');
//         }
//         setVideoDetails(data);
//       } catch (err: unknown) {
//         console.error('Raw error object:', err);

//         if (axios.isAxiosError(err)) {
//           console.error('Axios error details:', {
//             name: err.name ?? 'No name',
//             message: err.message ?? 'No message',
//             code: err.code ?? 'No code',
//             status: err.response?.status ?? 'No status',
//             statusText: err.response?.statusText ?? 'No status text',
//             data: err.response?.data ?? 'No data',
//             headers: err.response?.headers ?? 'No response headers',
//             request: err.request ? {
//               method: err.request.method ?? 'No method',
//               url: err.request.url ?? 'No URL',
//               headers: err.request.headers ?? 'No request headers',
//             } : 'No request object',
//             config: err.config ? {
//               url: err.config.url ?? 'No URL',
//               method: err.config.method ?? 'No method',
//               headers: err.config.headers ?? 'No headers',
//               data: err.config.data ?? 'No data',
//               timeout: err.config.timeout ?? 'No timeout',
//             } : 'No config',
//           });

//           let errorMessage = 'Failed to load video. Please try again later.';
//           if (err.code === 'ERR_NETWORK') {
//             errorMessage = 'Unable to reach the server. Please check your network or try again later.';
//           } else if (err.response?.data?.error) {
//             errorMessage = err.response.data.error;
//           } else if (err.message) {
//             errorMessage = err.message;
//           }
//           setError(errorMessage);
//         } else {
//           console.error('Non-Axios error:', {
//             error: err instanceof Error ? {
//               name: err.name,
//               message: err.message,
//               stack: err.stack,
//             } : 'Unknown error type',
//           });
//           setError('An unexpected error occurred');
//         }
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
//     return <div className={styles.container}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <Image
//           src="/logo.png"
//           alt="DingerZone Logo"
//           width={150}
//           height={50}
//           priority={true}
//           style={{ width: 'auto', height: 'auto' }}
//         />
//       </header>
//       <main className={styles.main}>
//         <h1>{`${videoDetails.playerName || 'Unknown Player'}'s Swing Analysis`}</h1>
//         <div className={styles.videoContainer}>
//           <video
//             src={isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl}
//             controls
//             poster={videoDetails.thumbnailUrl || undefined}
//             className={styles.video}
//             onError={(e) => {
//               console.error('Video playback error:', e);
//               setError('Failed to play video. The video URL may be invalid or expired.');
//             }}
//           />
//           {videoDetails.skeletonUrl && (
//             <button
//               onClick={() => setIsSkeleton(!isSkeleton)}
//               className={styles.toggleButton}
//             >
//               {isSkeleton ? 'Show Original Video' : 'Show Skeleton Overlay'}
//             </button>
//           )}
//         </div>
//         <div className={styles.metadata}>
//           <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString() || 'Invalid Date'}</p>
//           <p><strong>Description:</strong> {videoDetails.description || 'No description available'}</p>
//           {videoDetails.aiSummary && (
//             <div className={styles.aiFeedback}>
//               <h2>AI Feedback</h2>
//               <p>{videoDetails.aiSummary}</p>
//             </div>
//           )}
//           {videoDetails.aiScorecard && (
//             <div className={styles.scorecard}>
//               <h2>AI Scorecard</h2>
//               <ul>
//                 {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
//                   <li key={key}>
//                     <strong>{key}:</strong> {score}/5 - {description}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <p>Powered by DingerZone - <a href="https://www.dingerzone.com">Join Now</a></p>
//       </footer>
//     </div>
//   );
// }

////////////////////////// FUNCTIONING SHARED PAGE ABOVE //////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Image from 'next/image';
// import styles from './Shared.module.css';

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
//   const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
//   const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isSkeleton, setIsSkeleton] = useState(false);

//   useEffect(() => {
//     if (!shareId) {
//       console.error('No shareId provided in URL');
//       setError('Invalid share link');
//       return;
//     }

//     const fetchVideoDetails = async () => {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL
//         ? `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`
//         : null;
//       if (!apiUrl) {
//         console.error('Environment error: NEXT_PUBLIC_API_URL is not defined');
//         setError('Configuration error: API URL not set. Please check environment variables.');
//         return;
//       }

//       const requestBody = { shareId };
//       console.log('Preparing API request:', {
//         url: apiUrl,
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestBody,
//       });

//       try {
//         const response = await axios.post(apiUrl, requestBody, {
//           headers: { 'Content-Type': 'application/json' },
//           timeout: 10000,
//           withCredentials: false,
//         });

//         console.log('API response:', {
//           status: response.status,
//           data: response.data,
//         });

//         // Parse the nested body
//         const data = typeof response.data === 'string' ? JSON.parse(response.data.body) : response.data;
//         setVideoDetails(data);
//       } catch (err: unknown) {
//         console.error('Raw error object:', err);

//         if (axios.isAxiosError(err)) {
//           console.error('Axios error details:', {
//             name: err.name ?? 'No name',
//             message: err.message ?? 'No message',
//             code: err.code ?? 'No code',
//             status: err.response?.status ?? 'No status',
//             statusText: err.response?.statusText ?? 'No status text',
//             data: err.response?.data ?? 'No data',
//             headers: err.response?.headers ?? 'No response headers',
//             request: err.request ? {
//               method: err.request.method ?? 'No method',
//               url: err.request.url ?? 'No URL',
//               headers: err.request.headers ?? 'No request headers',
//             } : 'No request object',
//             config: err.config ? {
//               url: err.config.url ?? 'No URL',
//               method: err.config.method ?? 'No method',
//               headers: err.config.headers ?? 'No headers',
//               data: err.config.data ?? 'No data',
//               timeout: err.config.timeout ?? 'No timeout',
//             } : 'No config',
//           });

//           let errorMessage = 'Failed to load video. Please try again later.';
//           if (err.code === 'ERR_NETWORK') {
//             errorMessage = 'Unable to reach the server. Please check your network or try again later.';
//           } else if (err.response?.data?.error) {
//             errorMessage = err.response.data.error;
//           } else if (err.message) {
//             errorMessage = err.message;
//           }
//           setError(errorMessage);
//         } else {
//           console.error('Non-Axios error:', {
//             error: err instanceof Error ? {
//               name: err.name,
//               message: err.message,
//               stack: err.stack,
//             } : 'Unknown error type',
//           });
//           setError('An unexpected error occurred');
//         }
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
//     return <div className={styles.container}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <Image
//           src="/logo.png"
//           alt="DingerZone Logo"
//           width={150}
//           height={50}
//           priority={true} // Fix LCP warning
//           style={{ width: 'auto', height: 'auto' }} // Fix aspect ratio warning
//         />
//       </header>
//       <main className={styles.main}>
//         <h1>{`${videoDetails.playerName || 'Unknown Player'}'s Swing Analysis`}</h1>
//         <div className={styles.videoContainer}>
//           <video
//             src={isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl}
//             controls
//             poster={videoDetails.thumbnailUrl || undefined}
//             className={styles.video}
//             onError={(e) => {
//               console.error('Video playback error:', e);
//               setError('Failed to play video. The video URL may be invalid or expired.');
//             }}
//           />
//           {videoDetails.skeletonUrl && (
//             <button
//               onClick={() => setIsSkeleton(!isSkeleton)}
//               className={styles.toggleButton}
//             >
//               {isSkeleton ? 'Show Original Video' : 'Show Skeleton Overlay'}
//             </button>
//           )}
//         </div>
//         <div className={styles.metadata}>
//           <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString() || 'Invalid Date'}</p>
//           <p><strong>Description:</strong> {videoDetails.description || 'No description available'}</p>
//           {videoDetails.aiSummary && (
//             <div className={styles.aiFeedback}>
//               <h2>AI Feedback</h2>
//               <p>{videoDetails.aiSummary}</p>
//             </div>
//           )}
//           {videoDetails.aiScorecard && (
//             <div className={styles.scorecard}>
//               <h2>AI Scorecard</h2>
//               <ul>
//                 {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
//                   <li key={key}>
//                     <strong>{key}:</strong> {score}/5 - {description}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <p>Powered by DingerZone - <a href="https://www.dingerzone.com">Join Now</a></p>
//       </footer>
//     </div>
//   );
// }

// // // /src/app/shared/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios from 'axios';
// import Image from 'next/image';
// import styles from './Shared.module.css';

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
//   const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
//   const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isSkeleton, setIsSkeleton] = useState(false);

//   useEffect(() => {
//     if (!shareId) {
//       console.error('No shareId provided in URL');
//       setError('Invalid share link');
//       return;
//     }

//     const fetchVideoDetails = async () => {
//       // Validate API URL
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL
//         ? `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`
//         : null;
//       if (!apiUrl) {
//         console.error('Environment error: NEXT_PUBLIC_API_URL is not defined');
//         setError('Configuration error: API URL not set. Please check environment variables.');
//         return;
//       }

//       const requestBody = { shareId };
//       console.log('Preparing API request:', {
//         url: apiUrl,
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestBody,
//       });

//       try {
//         const response = await axios.post(apiUrl, requestBody, {
//           headers: { 'Content-Type': 'application/json' },
//           timeout: 10000, // 10-second timeout
//           // Enable withCredentials for CORS if needed
//           withCredentials: false,
//         });
//         console.log('API response:', {
//           status: response.status,
//           data: response.data,
//         });
//         setVideoDetails(response.data);
//       } catch (err: unknown) {
//         console.error('Raw error object:', err);

//         if (axios.isAxiosError(err)) {
//           console.error('Axios error details:', {
//             name: err.name ?? 'No name',
//             message: err.message ?? 'No message',
//             code: err.code ?? 'No code',
//             status: err.response?.status ?? 'No status',
//             statusText: err.response?.statusText ?? 'No status text',
//             data: err.response?.data ?? 'No data',
//             headers: err.response?.headers ?? 'No response headers',
//             request: err.request ? {
//               method: err.request.method ?? 'No method',
//               url: err.request.url ?? 'No URL',
//               headers: err.request.headers ?? 'No request headers',
//             } : 'No request object',
//             config: err.config ? {
//               url: err.config.url ?? 'No URL',
//               method: err.config.method ?? 'No method',
//               headers: err.config.headers ?? 'No headers',
//               data: err.config.data ?? 'No data',
//               timeout: err.config.timeout ?? 'No timeout',
//             } : 'No config',
//           });

//           let errorMessage = 'Failed to load video';
//           if (err.code === 'ERR_NETWORK') {
//             errorMessage = 'Network error: Unable to reach the server. This may be due to CORS issues, an incorrect API URL, or server downtime. Please check the console for details and verify CORS settings on the API server.';
//           } else if (err.response?.data?.error) {
//             errorMessage = err.response.data.error;
//           } else if (err.message) {
//             errorMessage = err.message;
//           }
//           setError(errorMessage);
//         } else {
//           console.error('Non-Axios error:', {
//             error: err instanceof Error ? {
//               name: err.name,
//               message: err.message,
//               stack: err.stack,
//             } : 'Unknown error type',
//           });
//           setError('An unexpected error occurred');
//         }
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
//     return <div className={styles.container}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <Image src="/logo.png" alt="DingerZone Logo" width={150} height={50} />
//       </header>
//       <main className={styles.main}>
//         <h1>{`${videoDetails.playerName}'s Swing Analysis`}</h1>
//         <div className={styles.videoContainer}>
//           <video
//             src={isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl}
//             controls
//             poster={videoDetails.thumbnailUrl || undefined}
//             className={styles.video}
//             onError={(e) => {
//               console.error('Video playback error:', e);
//               setError('Failed to play video. The video URL may be invalid or expired.');
//             }}
//           />
//           {videoDetails.skeletonUrl && (
//             <button
//               onClick={() => setIsSkeleton(!isSkeleton)}
//               className={styles.toggleButton}
//             >
//               {isSkeleton ? 'Show Original Video' : 'Show Skeleton Overlay'}
//             </button>
//           )}
//         </div>
//         <div className={styles.metadata}>
//           <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString()}</p>
//           <p><strong>Description:</strong> {videoDetails.description}</p>
//           {videoDetails.aiSummary && (
//             <div className={styles.aiFeedback}>
//               <h2>AI Feedback</h2>
//               <p>{videoDetails.aiSummary}</p>
//             </div>
//           )}
//           {videoDetails.aiScorecard && (
//             <div className={styles.scorecard}>
//               <h2>AI Scorecard</h2>
//               <ul>
//                 {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
//                   <li key={key}>
//                     <strong>{key}:</strong> {score}/5 - {description}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <p>Powered by DingerZone - <a href="https://www.dingerzone.com">Join Now</a></p>
//       </footer>
//     </div>
//   );
// }


// // /src/app/shared/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import axios, {AxiosError} from 'axios';
// import Image from 'next/image';
// import styles from './Shared.module.css';

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
//   const shareId = Array.isArray(params.shareId) ? params.shareId[0] : params.shareId;
//   const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isSkeleton, setIsSkeleton] = useState(false);

//   // useEffect(() => {
//   //   if (!shareId) {
//   //     console.error('No shareId provided in URL');
//   //     setError('Invalid share link');
//   //     return;
//   //   }

//   //   const fetchVideoDetails = async () => {
//   //     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`;
//   //     const requestBody = { shareId };
//   //     console.log('Preparing API request:', {
//   //       url: apiUrl,
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: requestBody,
//   //     });

//   //     try {
//   //       const response = await axios.post(apiUrl, requestBody, {
//   //         headers: { 'Content-Type': 'application/json' },
//   //       });
//   //       console.log('API response:', {
//   //         status: response.status,
//   //         data: response.data,
//   //       });
//   //       setVideoDetails(response.data);
//   //     } catch (err: any) {
//   //       console.error('API error:', {
//   //         status: err.response?.status,
//   //         data: err.response?.data,
//   //         message: err.message,
//   //         config: {
//   //           url: err.config?.url,
//   //           method: err.config?.method,
//   //           headers: err.config?.headers,
//   //           data: err.config?.data,
//   //         },
//   //       });
//   //       setError(err.response?.data?.error || 'Failed to load video');
//   //     }
//   //   };

//   //   fetchVideoDetails();
//   // }, [shareId]);

//   // useEffect(() => {
//   //   if (!shareId) {
//   //     console.error('No shareId provided in URL');
//   //     setError('Invalid share link');
//   //     return;
//   //   }

//   //   const fetchVideoDetails = async () => {
//   //     const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`;
//   //     const requestBody = { shareId };
//   //     console.log('Preparing API request:', {
//   //       url: apiUrl,
//   //       method: 'POST',
//   //       headers: { 'Content-Type': 'application/json' },
//   //       body: requestBody,
//   //     });

//   //     try {
//   //       const response = await axios.post(apiUrl, requestBody, {
//   //         headers: { 'Content-Type': 'application/json' },
//   //       });
//   //       console.log('API response:', {
//   //         status: response.status,
//   //         data: response.data,
//   //       });
//   //       setVideoDetails(response.data);
//   //     } catch (err: unknown) {
//   //       // Check if the error is an AxiosError
//   //       if (axios.isAxiosError(err)) {
//   //         console.error('API error:', {
//   //           status: err.response?.status,
//   //           data: err.response?.data,
//   //           message: err.message,
//   //           config: {
//   //             url: err.config?.url,
//   //             method: err.config?.method,
//   //             headers: err.config?.headers,
//   //             data: err.config?.data,
//   //           },
//   //         });
//   //         setError(err.response?.data?.error || 'Failed to load video');
//   //       } else {
//   //         // Handle non-Axios errors
//   //         console.error('Unexpected error:', err);
//   //         setError('An unexpected error occurred');
//   //       }
//   //     }
//   //   };

//   //   fetchVideoDetails();
//   // }, [shareId]);

//   useEffect(() => {
//     if (!shareId) {
//       console.error('No shareId provided in URL');
//       setError('Invalid share link');
//       return;
//     }

//     const fetchVideoDetails = async () => {
//       // Validate API URL
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL
//         ? `${process.env.NEXT_PUBLIC_API_URL}/get-shared-video-details`
//         : null;
//       if (!apiUrl) {
//         console.error('Environment error: NEXT_PUBLIC_API_URL is not defined');
//         setError('Configuration error: API URL not set');
//         return;
//       }

//       const requestBody = { shareId };
//       console.log('Preparing API request:', {
//         url: apiUrl,
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: requestBody,
//       });

//       try {
//         const response = await axios.post(apiUrl, requestBody, {
//           headers: { 'Content-Type': 'application/json' },
//           timeout: 10000, // 10-second timeout
//         });
//         console.log('API response:', {
//           status: response.status,
//           data: response.data,
//         });
//         setVideoDetails(response.data);
//       } catch (err: unknown) {
//         // Log the raw error object first
//         console.error('Raw error object:', err);

//         if (axios.isAxiosError(err)) {
//           // Log all available error details
//           console.error('Axios error details:', {
//             name: err.name ?? 'No name',
//             message: err.message ?? 'No message',
//             code: err.code ?? 'No code',
//             status: err.response?.status ?? 'No status',
//             statusText: err.response?.statusText ?? 'No status text',
//             data: err.response?.data ?? 'No data',
//             headers: err.response?.headers ?? 'No response headers',
//             request: err.request ? {
//               method: err.request.method ?? 'No method',
//               url: err.request.url ?? 'No URL',
//               headers: err.request.headers ?? 'No request headers',
//             } : 'No request object',
//             config: err.config ? {
//               url: err.config.url ?? 'No URL',
//               method: err.config.method ?? 'No method',
//               headers: err.config.headers ?? 'No headers',
//               data: err.config.data ?? 'No data',
//               timeout: err.config.timeout ?? 'No timeout',
//             } : 'No config',
//           });

//           // Set a user-friendly error message
//           const errorMessage =
//             err.response?.data?.error ||
//             err.message ||
//             'Failed to load video';
//           setError(errorMessage);
//         } else {
//           // Handle non-Axios errors
//           console.error('Non-Axios error:', {
//             error: err instanceof Error ? {
//               name: err.name,
//               message: err.message,
//               stack: err.stack,
//             } : 'Unknown error type',
//           });
//           setError('An unexpected error occurred');
//         }
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
//     return <div className={styles.container}>Loading...</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <Image src="/logo.png" alt="DingerZone Logo" width={150} height={50} />
//       </header>
//       <main className={styles.main}>
//         <h1>{`${videoDetails.playerName}'s Swing Analysis`}</h1>
//         <div className={styles.videoContainer}>
//           <video
//             src={isSkeleton && videoDetails.skeletonUrl ? videoDetails.skeletonUrl : videoDetails.videoUrl}
//             controls
//             poster={videoDetails.thumbnailUrl || undefined}
//             className={styles.video}
//           />
//           {videoDetails.skeletonUrl && (
//             <button
//               onClick={() => setIsSkeleton(!isSkeleton)}
//               className={styles.toggleButton}
//             >
//               {isSkeleton ? 'Show Original Video' : 'Show Skeleton Overlay'}
//             </button>
//           )}
//         </div>
//         <div className={styles.metadata}>
//           <p><strong>Uploaded:</strong> {new Date(videoDetails.uploadDate).toLocaleDateString()}</p>
//           <p><strong>Description:</strong> {videoDetails.description}</p>
//           {videoDetails.aiSummary && (
//             <div className={styles.aiFeedback}>
//               <h2>AI Feedback</h2>
//               <p>{videoDetails.aiSummary}</p>
//             </div>
//           )}
//           {videoDetails.aiScorecard && (
//             <div className={styles.scorecard}>
//               <h2>AI Scorecard</h2>
//               <ul>
//                 {Object.entries(videoDetails.aiScorecard).map(([key, { score, description }]) => (
//                   <li key={key}>
//                     <strong>{key}:</strong> {score}/5 - {description}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <p>Powered by DingerZone - <a href="https://www.dingerzone.com">Join Now</a></p>
//       </footer>
//     </div>
//   );
// }


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