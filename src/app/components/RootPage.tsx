'use client';
import Hero from './Hero';
import { motion, Variants } from 'motion/react';
import HeaderMenu from './navigation/HeaderMenu';

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
	return (
		<div className='layout-root relative'>
			<div className='absolute inset-0 -z-20
				bg-[url(/landing-mobile.jpg)] laptop:bg-[url(/landing.jpg)]
				bg-cover bg-center' />
			
			<div className='absolute inset-0 -z-10 bg-linear-to-b 
				from-violet-800/55 via-violet-600/40
				to-transparent pointer-events-none' />

			<div className='laptop:hidden'>
				<HeaderMenu transitionColors />
			</div>

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