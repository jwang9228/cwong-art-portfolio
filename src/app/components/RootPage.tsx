'use client';
import Hero from './Hero';
import Header from './navigation/Header';
import { motion, Variants, AnimatePresence, isObject } from 'motion/react';
import { useState } from 'react';
import HeaderNav from './navigation/HeaderNav';

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

export default function RootPage() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className='layout-root relative'>
			<div className='absolute inset-0 -z-20
				bg-[url(/landing-mobile.jpg)] bg-cover bg-center' />
			
			<div className='absolute inset-0 -z-10 bg-linear-to-b 
				from-violet-800/55 via-violet-600/40
				to-transparent pointer-events-none' />

			<AnimatePresence>
        {isMenuOpen && (
          <HeaderNav />
        )}
      </AnimatePresence>

			<Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

			<main className='grow relative z-10'>
				<motion.section 
					variants={PAGE_VARIANTS} 
					initial='hidden' 
					animate='show'
				>
					<Hero />
				</motion.section>
			</main>
		</div>
	)
}