// src/app/layout.tsx
import "./globals.css";
import type { ReactNode } from 'react';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
