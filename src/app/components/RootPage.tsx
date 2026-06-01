import Hero from './hero/Hero';
import HeroGallery from './hero/HeroGallery';
import PageWrapper from './utils/PageWrapper';

export default function RootPage() {
	return (
		<PageWrapper>
			<Hero>
				<HeroGallery />
			</Hero>
		</PageWrapper>
	)
}