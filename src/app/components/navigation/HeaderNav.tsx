import { motion, Variants } from 'motion/react';
import { NAV_TABS } from '../../lib/constants';
import Link from 'next/link';
import Fade from '../utils/Fade';

const OVERLAY_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delayChildren: 0.1, 
      staggerChildren: 0.1 
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export default function HeaderNav() {
  return (
   <motion.div
      variants={OVERLAY_VARIANTS}
      initial='hidden'
      animate='show'
      exit='exit'
      className='flex flex-col justify-center items-center 
        fixed inset-0 z-40 bg-black/5 backdrop-blur-md gap-y-10'
    >
      {NAV_TABS.map(tab => (
        <Fade key={tab.href}>
          <Link
            href={tab.href}
            className='text-2xl text-primary tracking-wide hover:text-accent 
              transition-colors duration-300 font-medium'
          >
            {tab.label}
          </Link>
        </Fade>
      ))}
    </motion.div>
  )
}