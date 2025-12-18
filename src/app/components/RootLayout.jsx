'use client';

import Header from './header/Header';
import { useState, useEffect } from 'react';

export default function RootLayout({children}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return;

  return (
    <div className='relative w-screen h-screen overflow-y-auto'>
      <Header />
      <main className='w-full h-full'>
        {children}
      </main>
    </div>
  );
}