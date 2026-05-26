import { JOB_DESCRIPTION, PORTFOLIO_NAME } from '../lib/constants';
import Fade from './utils/Fade';
import { motion } from 'motion/react';

const HERO_VARIANTS = {
	hidden: {},
	show: {
		transition: {
			delayChildren: 0.2,
			staggerChildren: 0.15
		}
	}
};

export default function Hero() {
	return (
		<motion.section
			variants={HERO_VARIANTS}
			initial='hidden'
			whileInView='show'
		>
			<Fade type='up' as='div'>
				{PORTFOLIO_NAME}
			</Fade>
			<Fade type='up' as='div'>
				{JOB_DESCRIPTION}
			</Fade>
		</motion.section>
	)
}