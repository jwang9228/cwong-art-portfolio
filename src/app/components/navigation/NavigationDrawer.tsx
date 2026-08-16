import { AnimatePresence, motion } from 'motion/react';
import { NAV_TABS, SOCIALS } from '../../lib/constants';
import Fade from '../utils/Fade';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();

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
            className='fixed top-0 right-0 bottom-0 w-4/5 tablet:w-5/12 z-50 
              bg-background shadow-2xl'
          >
            <motion.section 
              variants={DRAWER_VARIANTS}
              initial='hidden'
              animate='show'
              className='flex flex-col justify-between 
                h-full px-10 pt-24 tablet:pt-28 pb-10 tablet:pb-12'
            >
              <div className='flex flex-col gap-y-12'>
                {NAV_TABS.map(nav => (
                  <Fade key={nav.href}>
                    <Link
                      href={nav.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-normal uppercase tracking-widest text-primary
                        ${(pathname.startsWith(nav.href) || pathname === '/') 
                          ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                        }
                       hover:text-accent transition-all duration-300`}
                    >
                      {nav.label}
                    </Link>
                  </Fade> 
                ))}
              </div>
              
              <Fade className='flex justify-start items-center gap-x-12 tablet:gap-x-13'>
                {SOCIALS.map(social => {
                  const Icon = social.icon

                  return (
                    <Link
                      key={social.href}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon className='text-primary hover:text-accent
                        transition-colors duration-300 size-8 tablet:size-9' />
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