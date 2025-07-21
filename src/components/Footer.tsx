// src/components/Footer.tsx
'use client';

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
          {/* <a href="/terms" className="text-gray-600 hover:text-gray-900">
            Terms of Service
          </a> */}
          <a href="#" className="text-gray-600 hover:text-gray-900" onClick={getStartedClick}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}