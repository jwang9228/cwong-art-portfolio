'use client';

import { EMAIL, JOB_TITLES } from '../../lib/constants';
import { motion } from 'motion/react';
import Fade from '../utils/Fade';
import Link from 'next/link';
import Banner from './Banner';

const HERO_VARIANTS = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.15
		}
	}
};

export default function Hero({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Banner />
			
			<motion.section
				variants={HERO_VARIANTS}
				className='flex flex-col items-center gap-y-12
					text-center layout-px layout-py'
			>
				<div className='flex flex-col items-center gap-y-6 tablet:gap-y-8'>
					{JOB_TITLES.map(title => (
						<Fade key={title}>
							<h1 className='text-xl tablet:text-2xl uppercase 
								tracking-[0.2em] font-bold'
							>
								{title}
							</h1>
						</Fade>
					))}
				</div>

				<Fade className='transition-transform hover:scale-105'>
					<Link
						href={`mailto:${EMAIL}`}
						target='_blank'
						rel='noopener noreferrer'
						className='w-fit px-4 py-2.5 text-sm tablet:text-base
						 text-background bg-primary font-medium tracking-widest'
					>
						{EMAIL}
					</Link>
				</Fade>

				{children}
			</motion.section>
		</>
	)
}