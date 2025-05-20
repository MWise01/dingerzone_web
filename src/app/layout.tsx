// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'DingerZone - Backyard to Big Leagues',
  description: 'Record, get AI tips, and show off to coaches with DingerZone.',
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Previously functioning version - before incorporating shared links
    // <html lang="en">
    //   <body>{children}</body>
    // </html>
    <html lang="en">
      <head>
        <title>DingerZone</title>
        <meta name="description" content="Baseball swing analysis powered by AI" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
