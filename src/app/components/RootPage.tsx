import Hero from './hero/Hero';
import Image from 'next/image';
import Fade from './utils/Fade';
import { motion, Variants } from 'motion/react';
import { LANDING_IMAGE_URL } from '../lib/constants';
import HeroGallery from './hero/HeroGallery';
import PageWrapper from './utils/PageWrapper';

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
		<PageWrapper>
			<Fade type='in' className='relative w-full h-[35dvh]'>
				<Image
					src={LANDING_IMAGE_URL}
					alt='Portfolio Banner'
					fill
					priority
					className='object-cover object-center'
				/>
			</Fade>

			<div className='layout-px layout-py'>
				<Hero>
					<HeroGallery />
				</Hero>
			</div>
		</PageWrapper>
	)
}