import { AnimatePresence, motion } from 'motion/react';
import { NAV_TABS, SOCIALS } from '../../lib/constants';
import Fade from '../utils/Fade';
import Link from 'next/link';

const DRAWER_VARIANTS = {
  hidden: {},
	show: {
		transition: {
      delayChildren: 0.25,
			staggerChildren: 0.1
		}
	}
}

interface NavigationDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function NavigationDrawer({ isOpen, setIsOpen }: NavigationDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim when drawer is open. Clicking outside the drawer triggers close */}
          <motion.div
            key='drawer-scrim'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition= {{ duration: 0.3 }}
            className='fixed inset-0 z-40 bg-primary/50 pointer-events-auto'
            onClick={() => setIsOpen(false)}
          />

          {/* Sliding drawer, right to left */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className='fixed top-0 right-0 bottom-0 w-4/5 tablet:w-1/2 z-50 
              bg-background shadow-2xl'
          >
            <motion.section 
              variants={DRAWER_VARIANTS}
              initial='hidden'
              animate='show'
              className='flex flex-col justify-between 
                h-full px-10 pt-24 pb-10'
            >
              <div className='flex flex-col gap-y-12'>
                {NAV_TABS.map(nav => (
                  <Fade key={nav.href}>
                    <Link
                      href={nav.href}
                      onClick={() => setIsOpen(false)}
                      className='text-lg font-normal uppercase tracking-widest text-primary
                       hover:text-accent transition-colors duration-300'
                    >
                      {nav.label}
                    </Link>
                  </Fade> 
                ))}
              </div>
              
              <Fade className='flex justify-start items-center gap-x-xl'>
                {SOCIALS.map(social => {
                  const Icon = social.icon

                  return (
                    <Link
                      key={social.href}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon size={32} className='text-primary hover:text-accent
                        transition-colors duration-300' />
                    </Link>
                  )
                })}
              </Fade>
            </motion.section>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}