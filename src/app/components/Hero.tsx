import { JOB_DESCRIPTION, PORTFOLIO_NAME } from '../lib/constants';
import Fade from './utils/Fade';
import { motion } from 'motion/react';

const HERO_VARIANTS = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.2
		}
	}
};

export default function Hero() {
	return (
		<motion.section
			variants={HERO_VARIANTS}
			className='flex flex-col justify-center items-center 
				layout-px gap-y-4.5 text-center min-h-[80vh]'
		>
			<Fade type='up' as='div'>
				<h1 className='text-2xl tracking-tight'>
					{PORTFOLIO_NAME}
				</h1>
			</Fade>
			<Fade type='up' as='div'>
				<h2 className='text-xs uppercase leading-loose opacity-90'>
					{JOB_DESCRIPTION}
				</h2>
			</Fade>
		</motion.section>
	)
}