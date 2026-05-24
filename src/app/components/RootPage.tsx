'use client';
import Hero from './Hero';
import { motion, Variants } from 'motion/react';

const PAGE_STAGGER = 0.2;
const PAGE_DELAY = 0.1;
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
		<div className='layout-root'>
			<main className='grow'>
				<motion.section variants={PAGE_VARIANTS} initial='hidden' animate='show'>
					<Hero />
				</motion.section>
			</main>
		</div>
	)
}