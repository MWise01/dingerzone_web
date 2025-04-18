// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Logo from "../../public/assets/images/dingerzone_logo_outline.png";

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Subscriptions', href: '/subscriptions' },
  { name: 'About', href: '/about' },
  { name: 'Latest News', href: '/latest-news' },
];

export default function Header() {
  // For demonstration, "Home" is the current active page.
  // In a production app, you might use Next.js router to determine the current path.
  const [current, setCurrent] = useState('Home');

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Site Title */}
        <div className="flex items-center">
          <Image
                src={Logo}
                width={80}
                height={80}
                alt="Logo"
              />
          <span className="text-white text-4xl font-bold px-8">DingerZone</span>
        </div>
        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-white hover:text-gray-200 ${
                current === item.name ? 'font-bold underline' : 'font-normal'
              }`}
              onClick={() => setCurrent(item.name)}
            >
              {item.name}
            </Link>
          ))}
          {/* Provide Feedback Button */}
          <button className="ml-4 px-4 py-2 bg-white text-blue-600 font-bold rounded-3xl hover:bg-gray-200">
            Provide Feedback
          </button>
        </nav>
      </div>
    </header>
  );
}
