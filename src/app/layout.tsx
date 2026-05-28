import { Rethink_Sans, Philosopher } from 'next/font/google';
import './globals.css';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink-sans'
});

const philosopher = Philosopher({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-philosopher'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Courtney Wong',
    default: 'Courtney Wong | Concept Artist'
  },
  description: 'Art portfolio of Courtney Wong.'
}

export const viewport: Viewport = {
  width: 'device-width', 
  initialScale: 1,
};

export default function Layout({ children } : { children: ReactNode }) {
  return (
    <html 
      lang='en' 
      className={`${rethinkSans.variable} ${philosopher.variable}`}
    >
      <body className='font-base antialiased'>
        {children}
      </body>
    </html>
  );
}
