'use client';

import { motion, Variants } from 'motion/react';
import Hero from './Hero';
import Image from 'next/image';
import Fade from './utils/Fade';

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
		<motion.main
			variants={PAGE_VARIANTS} 
			initial='hidden' 
			animate='show'
		>
			<Fade type='in' className='relative w-full h-[35dvh]'>
				<Image
					src='/landing.jpg'
					alt='Portfolio Banner'
					fill
					priority
					className='object-cover object-center'
				/>
			</Fade>

			<div className='layout-px layout-py'>
				<Hero />
			</div>
		</motion.main>
	)
}