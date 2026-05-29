import { EMAIL, JOB_TITLES } from '../lib/constants';
import { motion } from 'motion/react';
import Fade from './utils/Fade';
import Link from 'next/link';

const HERO_VARIANTS = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.15
		}
	}
};

export default function Hero() {
	return (
		<motion.section
			variants={HERO_VARIANTS}
			className='flex flex-col items-center gap-y-xl text-center'
		>
			<div className='flex flex-col items-center gap-y-base'>
        {JOB_TITLES.map(title => (
          <Fade key={title}>
            <h1 className='text-xl uppercase tracking-[0.2em] font-bold'>
              {title}
            </h1>
          </Fade>
        ))}
      </div>

			<Fade>
				<Link
					href={`mailto:${EMAIL}`}
					target='_blank'
					rel='noopener noreferrer'
					className='w-fit px-4 py-sm text-sm text-background bg-primary
						font-medium tracking-widest'
				>
					{EMAIL}
				</Link>
			</Fade>
		</motion.section>
	)
}