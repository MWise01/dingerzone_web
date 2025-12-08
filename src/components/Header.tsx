"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../public/assets/images/dingerzone_logo_outline.png";

const navItems = [
  { name: "Home", href: "/#home-section" },
  { name: "About", href: "/#about-section" },
  { name: "FAQ", href: "/#faq-section" },
  { name: "Getting Started", href: "/getting-started" }, // separate page
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleFeedbackClick = () => {
    window.location.href = "mailto:feedback@dingerzone.ai";
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string,
    closeMenu: boolean
  ) => {
    // Only care about in-page anchors like "/#about-section"
    if (href.startsWith("/#")) {
      const id = href.substring(2); // "/#faq-section" -> "faq-section"

      // CASE 1: Already on home page → smooth scroll
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);

        if (element) {
          const yOffset = -80; // adjust for sticky header height
          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });

          // Update URL hash without a full navigation
          window.history.pushState({}, "", href);
        }

        if (closeMenu) setIsMenuOpen(false);
        return;
      }

      // CASE 2: On a different page (e.g., /getting-started)
      // → let Next.js handle normal navigation to "/#section"
      if (closeMenu) setIsMenuOpen(false);
      return; // do NOT call preventDefault; Link will navigate
    }

    // Non-hash routes like "/getting-started"
    if (closeMenu) setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo and Site Title */}
        <Link href="/" className="flex items-center">
          <Image src={Logo} width={60} height={60} alt="DingerZone Logo" />
          <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold px-4 sm:px-6 md:px-8">
            DingerZone
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white hover:text-gray-200 text-sm lg:text-base font-normal"
              onClick={(e) => handleNavClick(e, item.href, false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="ml-4 px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500"
            onClick={handleFeedbackClick}
          >
            Contact Us
          </button>
          <a href="https://apple.co/3Js2maF" className="ml-4 inline-block">
            <Image
              src="/assets/images/appstore_black.svg"
              alt="Download on the App Store"
              width={120}
              height={40}
              className="hover:opacity-80 transition-opacity"
            />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
            <Link
              key={item.name}
              href={item.href}
              className="text-white hover:text-gray-200 text-lg font-normal"
              onClick={(e) => {
                // For mobile, we also want smooth scroll if already on home
                // and normal navigation otherwise:
                handleNavClick(e, item.href, true);

                // If we're on home and just smooth-scrolled,
                // handleNavClick already closed the menu.
                // If we're navigating to "/", Next will change the page.
              }}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500 text-lg"
            onClick={() => {
              setIsMenuOpen(false);
              handleFeedbackClick();
            }}
          >
            Contact Us
          </button>
          <a href="https://apple.co/3Js2maF" className="inline-block">
            <Image
              src="/assets/images/appstore_black.svg"
              alt="Download on the App Store"
              width={120}
              height={40}
              className="hover:opacity-80 transition-opacity"
            />
          </a>
        </nav>
      )}
    </header>
  );
}

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// // src/components/Header.tsx
// "use client";

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import Logo from "../../public/assets/images/dingerzone_logo_outline.png";

// const navItems = [
//   { name: 'Home', sectionId: 'home-section' },
//   { name: 'About', sectionId: 'about-section' },
//   { name: 'FAQ', sectionId: 'faq-section' },
// ];

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleFeedbackClick = () => {
//     window.location.href = 'mailto:feedback@dingerzone.ai';
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
//       <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//         {/* Logo and Site Title */}
//         <Link href="/" className="flex items-center">
//           <Image
//             src={Logo}
//             width={60}
//             height={60}
//             alt="DingerZone Logo"
//           />
//           <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold px-4 sm:px-6 md:px-8">
//             DingerZone
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={`/#${item.sectionId}`}
//               className="text-white hover:text-gray-200 text-sm lg:text-base font-normal"
//               onClick={() => setIsMenuOpen(false)} // Close mobile menu if open
//             >
//               {item.name}
//             </Link>
//           ))}
//           <button
//             className="ml-4 px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500"
//             onClick={handleFeedbackClick}
//           >
//             Contact Us
//           </button>
//           <a
//             href="https://apple.co/3Js2maF"
//             className="ml-4 inline-block"
//           >
//             <Image
//               src="/assets/images/appstore_black.svg"
//               alt="Download on the App Store"
//               width={120}
//               height={40}
//               className="hover:opacity-80 transition-opacity"
//             />
//           </a>
//         </nav>

//         {/* Mobile Hamburger Button */}
//         <button
//           className="md:hidden text-white focus:outline-none"
//           onClick={toggleMenu}
//           aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//           aria-expanded={isMenuOpen}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {isMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Navigation Drawer */}
//       {isMenuOpen && (
//         <nav className="md:hidden bg-blue-600 px-4 py-6 flex flex-col space-y-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               href={`/#${item.sectionId}`}
//               className="text-white hover:text-gray-200 text-lg font-normal"
//               onClick={() => setIsMenuOpen(false)} // Close menu on click
//             >
//               {item.name}
//             </Link>
//           ))}
//           <button
//             className="px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500 text-lg"
//             onClick={handleFeedbackClick}
//           >
//             Contact Us
//           </button>
//           <a
//             href="https://apple.co/3Js2maF"
//             className="inline-block"
//           >
//             <Image
//               src="/assets/images/appstore_black.svg"
//               alt="Download on the App Store"
//               width={120}
//               height={40}
//               className="hover:opacity-80 transition-opacity"
//             />
//           </a>
//         </nav>
//       )}
//     </header>
//   );
// }

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// // src/components/Header.tsx
// "use client";

// // import Link from 'next/link';
// import { useState } from 'react';
// import Image from 'next/image';
// import Logo from "../../public/assets/images/dingerzone_logo_outline.png";

// // const navItems = [
// //   { name: 'Home', href: '/' },
// //   { name: 'Subscriptions', href: '/subscriptions' },
// //   { name: 'About', href: '/about' },
// //   { name: 'Latest News', href: '/latest-news' },
// // ];

// const navItems = [
//   { name: 'Home', sectionId: 'home-section' },
//   // { name: 'Subscriptions', sectionId: 'subscriptions-section' },
//   { name: 'About', sectionId: 'about-section' },
//   { name: 'FAQ', sectionId: 'faq-section' },
//   // { name: 'Latest News', sectionId: 'latest-news-section' },
// ];

// export default function Header() {
//   // For demonstration, "Home" is the current active page.
//   // In a production app, you might use Next.js router to determine the current path.
//   const [current, setCurrent] = useState('Home');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleScroll = (sectionId: string, name: string) => {
//     const element = document.getElementById(sectionId);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//       setCurrent(name);
//     }
//   };

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleFeedbackClick = () => {
//     window.location.href = 'mailto:feedback@dingerzone.ai';
//   };

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
//       {/* <div className="container mx-auto px-6 py-4 flex items-center justify-between"> */}
//       <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//         {/* Logo and Site Title */}
//         <div className="flex items-center">
//           <Image
//                 src={Logo}
//                 width={60}
//                 height={60}
//                 alt="DingerZone Logo"
//                 // className="sm:w-[80px] sm:h-[80px]"
//               />
//           {/* <span className="text-white text-4xl font-bold px-8">DingerZone</span> */}
//           <span className="text-white text-2xl sm:text-3xl md:text-4xl font-bold px-4 sm:px-6 md:px-8">
//             DingerZone
//           </span>
//         </div>
//         {/* Navigation */}
//         {/* <nav className="flex items-center space-x-6"> */}
//         <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
//           {navItems.map((item) => (
//             // <Link
//             //   key={item.name}
//             //   href={item.href}
//             //   className={`text-white hover:text-gray-200 ${
//             //     current === item.name ? 'font-bold underline' : 'font-normal'
//             //   }`}
//             //   onClick={() => setCurrent(item.name)}
//             // >
//             //   {item.name}
//             // </Link>

//             <button
//               key={item.name}
//               onClick={() => handleScroll(item.sectionId, item.name)}
//               className={`text-white hover:text-gray-200 text-sm lg:text-base ${
//                 current === item.name ? 'font-bold underline' : 'font-normal'
//               }`}
//             >
//               {item.name}
//             </button>
//           ))}
//           {/* Provide Feedback Button */}
//           <button className="ml-4 px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500" onClick={handleFeedbackClick}>
//             Contact Us
//           </button>
//         </nav>
//         {/* Mobile Hamburger Button */}
//         <button
//           className="md:hidden text-white focus:outline-none"
//           onClick={toggleMenu}
//           aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
//           aria-expanded={isMenuOpen}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             {isMenuOpen ? (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             ) : (
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             )}
//           </svg>
//         </button>
//       </div>
//       {/* Mobile Navigation Drawer */}
//       {isMenuOpen && (
//         <nav className="md:hidden bg-blue-600 px-4 py-6 flex flex-col space-y-4">
//           {navItems.map((item) => (
//             <button
//               key={item.name}
//               onClick={() => handleScroll(item.sectionId, item.name)}
//               className={`text-white hover:text-gray-200 text-lg ${
//                 current === item.name ? 'font-bold underline' : 'font-normal'
//               }`}
//             >
//               {item.name}
//             </button>
//           ))}
//           <button className="px-4 py-1 bg-orange-600 text-white font-bold rounded-3xl hover:bg-gray-500 text-lg">
//             Contact Us
//           </button>
//         </nav>
//       )}
//     </header>
//   );
// }
