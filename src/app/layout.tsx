import { Rethink_Sans, Philosopher, JetBrains_Mono } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import PageWrapper from './components/utils/PageWrapper';
import PageHeader from './components/navigation/PageHeader';
import Footer from './components/navigation/Footer';
import './globals.css';

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink-sans'
});

const philosopher = Philosopher({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-philosopher'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
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
      className={`${rethinkSans.variable} ${philosopher.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel='preconnect' href='https://res.cloudinary.com' crossOrigin='anonymous' />
        <link rel='dns-prefetch' href='https://res.cloudinary.com' />
      </head>
      <body className='layout-root font-base antialiased'>
        <PageHeader />

        <PageWrapper>
          {children}
        </PageWrapper>

        <Footer />
      </body>
    </html>
  );
}
