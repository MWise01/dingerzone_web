// src/app/page.tsx
"use client";

import Header from '../components/Header';
// import batter from '../../public/assets/images/extension_swing_keypoints.png';
import React, { useState, Image } from 'react';

export default function LandingPage() {

  const [activeTab, setActiveTab] = React.useState('Player');

  const benefits = {
    Player: [
      'Record your swing anywhere, anytime—no fancy gear needed.',
      'Get instant AI tips to level up your swing, plus drills you can actually do.',
      'Share epic clips with your coach or build a highlight reel to flex.',
      'Track your progress and see how much better you’re getting.',
    ],
    Parent: [
      'Manage all your kids’ swings in one family plan—save time and money.',
      'Easy video uploads from home, no trips to pricey facilities.',
      'Connect coaches to your players’ clips with simple permissions.',
      'Watch your kids improve with AI feedback and tailored drills.',
    ],
    Coach: [
      'Review all your players’ swings in one place, no more scattered videos.',
      'Use AI insights to give precise feedback and assign the right drills.',
      'Save time with easy access to player progress and video history.',
      'Stay connected with players and parents through secure sharing.',
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-visible h-[500px]">
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundColor: '#1A1A2E' }}
        >
          <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
          
          <div 
            className="absolute z-20"
            style={{
              backgroundImage: "url('/assets/images/extension_swing_keypoints.png')",
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              // backgroundPosition: 'left',
              backgroundPosition: '35%',
              width: '150%',
              height: '150%',
              right: '-10%',
              top: '-10%',
              transform: 'rotate(5deg)',
              filter: 'hue-rotate(340deg) saturate(1.5)', // Change hue and saturation
            }}
          />

          {/* Header Text Overlay */}
          <div className="absolute z-30 right-0 inset-y-0 w-2/3 flex flex-col justify-center items-end pr-24">
            <div className="text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
              {/* Crush Your Swing! */}
                Backyard to Big Leagues
              </h1>
              <p className="text-xl md:text-4xl text-white font-medium drop-shadow-lg">
                Record, Get AI Tips,<br /> 
                and Show Off to Coaches
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto flex flex-col lg:flex-row py-12 px-6 flex-grow relative z-30 bg-white">
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
        {/* <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Why You'll Love Our App</h2>
          <div className="flex space-x-4 mb-6">
            {['Player', 'Parent', 'Coach'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  activeTab === tab
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="mr-2">
                  {tab === 'Player' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20l9-2V6l-9 2V20zM3 18V6l9 2v12l-9-2z" />
                    </svg>
                  )}
                  {tab === 'Parent' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-7 8c0-2.21 1.79-4 4-4h6c2.21 0 4 1.79 4 4H5z" />
                    </svg>
                  )}
                  {tab === 'Coach' && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </span>
                {tab}
              </button>
            ))}
          </div>
          <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700">
            {benefits[activeTab].map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
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
        </div> */}
        <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Hits for the whole LineUp: <br /> Players, Parents, and Coaches</h2>
          <div className="flex space-x-4 mb-6">
            {['Player', 'Parent', 'Coach'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                // className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                //   activeTab === tab
                //     ? 'text-white'
                //     : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                // }`}
                // style={activeTab === tab ? { backgroundColor: '#1A1A2E' } : {}}
              >
                <span className="mr-2">
                  {tab === 'Player' && (
                    <img
                      src="/assets/icons/baseball_batter_silhouette.svg"
                      alt="Player Icon"
                      width={20}
                      height={20}
                      // className="w-5 h-5"
                      className={`w-5 h-5 ${activeTab === tab ? 'filter brightness-0 invert' : ''}`}
                    />
                  )}
                  {tab === 'Parent' && (
                    <img
                      src="/assets/icons/parent-svgrepo-com.svg"
                      alt="Parent Icon"
                      width={20}
                      height={20}
                      // className="w-5 h-5"
                      className={`w-5 h-5 ${activeTab === tab ? 'filter brightness-0 invert' : ''}`}
                    />
                  )}
                  {tab === 'Coach' && (
                    <img
                      src="/assets/icons/whistle-svgrepo-com.svg"
                      alt="Coach Icon"
                      width={20}
                      height={20}
                      // className="w-5 h-5"
                      className={`w-5 h-5 ${activeTab === tab ? 'filter brightness-0 invert' : ''}`}
                    />
                  )}
                </span>
                {tab}
              </button>
            ))}
          </div>
          <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700">
            {benefits[activeTab].map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <div className="mt-6">
            <a
              href="https://apps.apple.com/your-app-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-3xl hover:bg-green-700"
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
