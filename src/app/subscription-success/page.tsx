'use client';

import { useEffect, Suspense } from 'react'; // Add Suspense import
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function SubscriptionSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id'); // Optional: Can use to verify session if needed

  useEffect(() => {
    // Optional: If you want to verify the session or log it, make an API call here
    if (sessionId) {
      console.log('Subscription session ID:', sessionId);
      // e.g., fetch('/api/verify-session', { method: 'POST', body: JSON.stringify({ sessionId }) });
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto py-12 px-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Subscription Successful!</h1>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for subscribing to DINGERZONE Pro. Your 30-day free trial has started, and you&apos;ll have unlimited access to premium features.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            If you were subscribing from the app, you can now return to it to see your updated status. Refresh the subscription screen if needed.
          </p>
          <a
            href="dingerzone://subscription-success" // Your app's deep link scheme
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-800"
          >
            Return to DINGERZONE App
          </a>
          <p className="text-sm text-gray-600 mt-4">
            If the button above doesn&apos;t open the app automatically, please manually switch back to the DINGERZONE app on your device.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function SubscriptionSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubscriptionSuccessContent />
    </Suspense>
  );
}

// 'use client';

// import { useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';

// export default function SubscriptionSuccess() {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get('session_id'); // Optional: Can use to verify session if needed

//   useEffect(() => {
//     // Optional: If you want to verify the session or log it, make an API call here
//     if (sessionId) {
//       console.log('Subscription session ID:', sessionId);
//       // e.g., fetch('/api/verify-session', { method: 'POST', body: JSON.stringify({ sessionId }) });
//     }
//   }, [sessionId]);

//   return (
//     <div className="flex flex-col min-h-screen bg-white text-gray-800">
//       <Header />
//       <main className="flex-grow">
//         <section className="container mx-auto py-12 px-6">
//           <h1 className="text-3xl font-bold mb-4 text-gray-800">Subscription Successful!</h1>
//           <p className="text-lg text-gray-700 mb-6">
//             Thank you for subscribing to DINGERZONE Pro. Your 30-day free trial has started, and you'll have unlimited access to premium features.
//           </p>
//           <p className="text-lg text-gray-700 mb-6">
//             If you were subscribing from the app, you can now return to it to see your updated status. Refresh the subscription screen if needed.
//           </p>
//           <a
//             href="dingerzone://subscription-success" // Replace 'dingerzone://' with your actual app deep link scheme (e.g., your-app-scheme://refresh-sub)
//             className="inline-block px-6 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-800"
//           >
//             Return to DINGERZONE App
//           </a>
//           <p className="text-sm text-gray-600 mt-4">
//             If the button above doesn't open the app automatically, please manually switch back to the DINGERZONE app on your device.
//           </p>
//         </section>
//       </main>
//       <Footer />
//     </div>
//   );
// }