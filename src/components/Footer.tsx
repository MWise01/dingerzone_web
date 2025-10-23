// src/components/Footer.tsx
'use client';

import Image from "next/image";

export default function Footer() {
  const getStartedClick = () => {
    window.location.href = `mailto:feedback@dingerzone.ai?subject=${encodeURIComponent('DingerZone Subscription')}`;
  };

  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600">© DingerZone 2025</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/privacy" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </a>
          <a href="/terms" className="text-gray-600 hover:text-gray-900">
            Terms of Service
          </a>
          <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" className="text-gray-600 hover:text-gray-900">
            EULA
          </a>
          <a
            href="https://apple.co/3Js2maF"
            className="inline-block"
          >
            <Image
              src="/assets/images/appstore_black.svg"
              alt="Download on the App Store"
              width={120}
              height={40}
              className="hover:opacity-80 transition-opacity"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}