'use client';

import { motion, Variants } from 'motion/react';

const PAGE_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
};

export default function PageWrapper(
  { children }: { children: React.ReactNode }
) {
  return (
    <motion.main
      variants={PAGE_VARIANTS} 
      initial='hidden' 
      animate='show'
      className='flex flex-col grow py-2.5'
    >
      {children}
    </motion.main>
  );
}
