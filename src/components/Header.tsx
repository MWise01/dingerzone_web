// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Logo from "../../public/assets/images/dingerzone_logo_outline.png";

// const navItems = [
//   { name: 'Home', href: '/' },
//   { name: 'Subscriptions', href: '/subscriptions' },
//   { name: 'About', href: '/about' },
//   { name: 'Latest News', href: '/latest-news' },
// ];

const navItems = [
  { name: 'Home', sectionId: 'home-section' },
  { name: 'Subscriptions', sectionId: 'subscriptions-section' },
  { name: 'About', sectionId: 'about-section' },
  { name: 'FAQ', sectionId: 'faq-section' },
  // { name: 'Latest News', sectionId: 'latest-news-section' },
];

export default function Header() {
  // For demonstration, "Home" is the current active page.
  // In a production app, you might use Next.js router to determine the current path.
  const [current, setCurrent] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (sectionId, name) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrent(name);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFeedbackClick = () => {
    window.location.href = 'mailto:feedback@dingerzone.ai';
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      {/* <div className="container mx-auto px-6 py-4 flex items-center justify-between"> */}
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo and Site Title */}
        <div className="flex items-center">
          <Image
                src={Logo}
                width={60}
                height={60}
                alt="DingerZone Logo"
                // className="sm:w-[80px] sm:h-[80px]"
              />
          {/* <span className="text-white text-4xl font-bold px-8">DingerZone</span> */}
          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold px-4 sm:px-6 md:px-8">
            DingerZone
          </span>
        </div>
        {/* Navigation */}
        {/* <nav className="flex items-center space-x-6"> */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            // <Link
            //   key={item.name}
            //   href={item.href}
            //   className={`text-white hover:text-gray-200 ${
            //     current === item.name ? 'font-bold underline' : 'font-normal'
            //   }`}
            //   onClick={() => setCurrent(item.name)}
            // >
            //   {item.name}
            // </Link>

            <button
              key={item.name}
              onClick={() => handleScroll(item.sectionId, item.name)}
              className={`text-white hover:text-gray-200 text-sm lg:text-base ${
                current === item.name ? 'font-bold underline' : 'font-normal'
              }`}
            >
              {item.name}
            </button>
          ))}
          {/* Provide Feedback Button */}
          <button className="ml-4 px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500" onClick={handleFeedbackClick}>
            Contact Us
          </button>
        </nav>
        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-600 px-4 py-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleScroll(item.sectionId, item.name)}
              className={`text-white hover:text-gray-200 text-lg ${
                current === item.name ? 'font-bold underline' : 'font-normal'
              }`}
            >
              {item.name}
            </button>
          ))}
          <button className="px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500 text-lg">
            Contact Us
          </button>
        </nav>
      )}
    </header>
  );
}
