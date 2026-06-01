'use client';

import { motion, Variants } from 'motion/react';

const PAGE_STAGGER = 0.2;
const PAGE_DELAY = 0.2;
const PAGE_VARIANTS: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: PAGE_STAGGER,
			delayChildren: PAGE_DELAY
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
    >
      {children}
    </motion.main>
  );
}