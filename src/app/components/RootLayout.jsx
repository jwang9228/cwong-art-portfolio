'use client';

import Header from './Header';
import FadeContent from './utils/FadeContent';
import { useState, useEffect } from 'react';

export default function RootLayout({children}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <div className='relative w-screen h-screen overflow-y-auto'>
      <FadeContent 
        delay={1500} 
        duration={400} 
        className={`absolute top-0 left-0 right-0 z-50 px-18 py-10
          ${mounted && 'animate-drop-down [animation-delay:1.5s] [animation-duration:1.5s]'}`}
      >
        <Header />
      </FadeContent>
      <main className='w-full h-full'>
        {children}
      </main>
    </div>
  );
}