// src/app/head.tsx
export default function Head() {
    return (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"  // Changed from "true" to "anonymous"
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" 
          rel="stylesheet" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add other meta tags as needed */}
      </>
    );
  }
  