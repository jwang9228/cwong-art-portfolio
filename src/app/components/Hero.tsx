import React from 'react';
import { JOB_TITLES, PORTFOLIO_NAME } from '../lib/constants';
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
				layout-px gap-y-base text-center min-h-[80vh]'
		>
			<Fade type='up' as='div'>
				<h1 className='text-4xl text-background 
					font-semibold font-accent drop-shadow-md'
				>
					{PORTFOLIO_NAME}
				</h1>
			</Fade>
			<Fade type='up' as='div' className='flex flex-col tablet:flex-row
				gap-x-4 gap-y-3'
			>
				{JOB_TITLES.map((title, index) => (
					<React.Fragment key={title}>
						<h2 className='text-xs text-background uppercase 
							tracking-[0.2em] drop-shadow-md'
						>
              {title}
            </h2>

						{index < JOB_TITLES.length - 1 && (
              <span className='hidden tablet:inline-block text-xs text-background 
								opacity-90 drop-shadow-md'>
                〡
              </span>
            )}
					</React.Fragment>
				))}
			</Fade>
		</motion.section>
	)
}