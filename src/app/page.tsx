// src/app/page.tsx
"use client";

import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'Player' | 'Parent' | 'Coach'>('Player');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const tabs: ('Player' | 'Parent' | 'Coach')[] = ['Player', 'Parent', 'Coach'];

  const getStatedClick = () => {
    window.location.href = `mailto:feedback@dingerzone.ai?subject=${encodeURIComponent('DingerZone Subscription')}`;
  };

  // Handle scrolling to section based on URL hash
  useEffect(() => {
    const hash = window.location.hash; // e.g., #about-section
    if (hash) {
      const sectionId = hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []); // Run once on mount

  type BenefitType = {
    Player: string[];
    Parent: string[];
    Coach: string[];
  };

  const benefits: BenefitType = {
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

  const faqs = [
    {
      question: 'How does DingerZone help improve my swing?',
      answer: 'Our AI analyzes your swing videos, providing instant feedback on technique and recommending personalized drills from our YouTube catalog, helping you train smarter from home.',
    },
    {
      question: 'Can I record videos anywhere, or do I need special equipment?',
      answer: 'Record anywhere using your smartphone—no expensive hardware or facility visits required. Just upload your swing, and our AI does the rest.',
    },
    {
      question: 'How do I share my videos with my coach?',
      answer: 'Easily share clips via our secure permission workflow. Grant access to your coach, who can review your swings and provide feedback in one place.',
    },
    {
      question: 'Is DingerZone suitable for families with multiple players?',
      answer: 'Yes! Our family plan lets you manage multiple players under one account, saving time and money while tracking everyone’s progress.',
    },
    {
      question: 'What kind of feedback does the AI provide?',
      answer: 'The AI identifies key swing mechanics (e.g., stance, hip rotation) and suggests specific improvements, paired with drill videos to help you practice effectively.',
    },
    {
      question: 'Can coaches manage multiple players’ swings?',
      answer: 'Absolutely. Coaches get a centralized dashboard to review all their players’ videos, access AI insights, and assign drills, streamlining team training.',
    },
    {
      question: 'Is my video data secure?',
      answer: 'We prioritize privacy with secure storage on AWS and a permission-based sharing system, ensuring only authorized users (e.g., coaches, parents) access your clips.',
    },
    {
      question: 'Do I need a subscription to use DingerZone?',
      answer: 'Start with our free plan for basic features. Upgrade to a family or coach plan for premium features like unlimited uploads and advanced analytics.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <Header />

      {/* Hero Section */}
      <section id="home-section" className="relative overflow-hidden h-[500px]">
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
              backgroundPosition: '35%',
              width: '150%',
              height: '150%',
              right: '-10%',
              top: '-10%',
              transform: 'rotate(5deg)',
              filter: 'hue-rotate(340deg) saturate(1.5)',
            }}
          />

          {/* Header Text Overlay */}
          <div className="absolute z-30 right-0 inset-y-0 w-2/3 flex flex-col justify-center items-end pr-24">
            <div className="text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
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
      <section id="benefits-section" className="container mx-auto flex flex-col lg:flex-row py-12 px-6 bg-white">
        <div className="lg:w-1/2 relative h-[400px] flex items-center justify-center">
          <Image
            src="/assets/images/allhits_screen_3d.png"
            alt="Summary Swings Screenshot"
            width={200}
            height={400}
            className="absolute rounded z-50 -translate-x-24 md:-translate-x-48"
          />
          <Image
            src="/assets/images/scorecard_3d.png"
            alt="Scorecard Screenshot"
            width={200}
            height={400}
            className="absolute rounded z-40 -translate-x-12 md:-translate-x-24"
          />
          <Image
            src="/assets/images/trainscreen_3d.png"
            alt="Training Content Screenshot"
            width={185}
            height={370}
            className="absolute rounded z-10 translate-x-24 md:translate-x-48"
          />
          <Image
            src="/assets/images/playercard_3d.png"
            alt="Player Baseball Card"
            width={190}
            height={380}
            className="absolute rounded z-20 translate-x-12 md:translate-x-24"
          />
          <Image
            src="/assets/images/teamscreen_3d.png"
            alt="Team Summary Screenshot"
            width={200}
            height={400}
            className="absolute rounded z-30"
          />
        </div>

        <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Hits for the whole LineUp: <br /> Players, Parents, and Coaches</h2>
          <div className="flex space-x-4 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="mr-2">
                  {tab === 'Player' && (
                    <Image
                      src="/assets/icons/baseball_batter_silhouette.svg"
                      alt="Player Icon"
                      width={20}
                      height={20}
                      className={`w-5 h-5 ${activeTab === tab ? 'filter brightness-0 invert' : ''}`}
                    />
                  )}
                  {tab === 'Parent' && (
                    <Image
                      src="/assets/icons/parent-svgrepo-com.svg"
                      alt="Parent Icon"
                      width={20}
                      height={20}
                      className={`w-5 h-5 ${activeTab === tab ? 'filter brightness-0 invert' : ''}`}
                    />
                  )}
                  {tab === 'Coach' && (
                    <Image
                      src="/assets/icons/whistle-svgrepo-com.svg"
                      alt="Coach Icon"
                      width={20}
                      height={20}
                      className={`w-5 h-5 ${activeTab === tab ? 'filter brightness-0 invert' : ''}`}
                    />
                  )}
                </span>
                {tab}
              </button>
            ))}
          </div>
          <ul className="list-disc pl-5 space-y-4 text-lg text-gray-700">
            {benefits[activeTab].map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
          <div className="mt-6">
            <a
              className="inline-block px-6 py-3 bg-gray-600 text-white rounded-3xl hover:bg-gray-800"
            >
              Download on the App Store (Coming Soon)
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="container mx-auto py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About DingerZone</h2>
        <p className="text-lg text-gray-700 mb-6">
          DingerZone empowers players, parents, and coaches with AI-driven swing analysis, letting you record anywhere, get instant feedback, and connect with your team. No expensive hardware or facilities required—just your phone and passion for the game.
        </p>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              Make swing improvement accessible to every player, from backyard to big leagues.
            </p>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-2">Why Choose Us</h3>
            <p className="text-gray-600">
              User-controlled videos, AI insights, and seamless coach/parent collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="container mx-auto py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-700 mb-6">
          Got questions? We’ve got answers about how DingerZone works for players, parents, and coaches.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50"
                aria-expanded={openFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <span className="text-2xl">
                  {openFaq === index ? '−' : '+'}
                </span>
              </button>
              {openFaq === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 py-4 text-gray-600 bg-gray-50"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-section" className="container mx-auto py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-6">
          Have questions or feedback? Reach out to our team, and we’ll get back to you soon.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Email Us</h3>
          <p className="text-gray-600 mb-4">
            Get in touch. Email us @:{' '}
            <a
              href="mailto:feedback@dingerzone.ai"
              className="text-blue-600 hover:underline"
            >
              feedback@dingerzone.ai
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}