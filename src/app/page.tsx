// src/app/page.tsx
"use client";

import Header from '../components/Header';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <Header />

      {/* Hero Section */}
      <section className="relative">
        <div
          className="w-full h-[500px] bg-cover bg-center"
          style={{ backgroundImage: "url('/path-to-your-hero-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col lg:flex-row py-12 px-6 flex-grow">
        <div className="lg:w-1/2 flex flex-col space-y-4">
          <img
            src="/path-to-screenshot1.jpg"
            alt="App Screenshot 1"
            className="rounded shadow-md"
          />
          <img
            src="/path-to-screenshot2.jpg"
            alt="App Screenshot 2"
            className="rounded shadow-md"
          />
        </div>
        <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4">Why You'll Love Our App</h2>
          <ul className="list-disc space-y-2 text-lg text-gray-700">
            <li>Seamless user experience and intuitive design</li>
            <li>Real-time notifications and updates</li>
            <li>Manage your content easily on the go</li>
            <li>Optimized for both mobile and desktop usage</li>
          </ul>
          <div className="mt-6">
            <a
              href="https://apps.apple.com/your-app-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download on the App Store
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600">&copy; DingerZone 2025</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
