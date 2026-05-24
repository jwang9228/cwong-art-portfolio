import { PORTFOLIO_NAME } from '../lib/constants';
import Fade from './utils/Fade';

export default function Hero() {
	return (
		<Fade
			type='up' as='section'
			className='flex flex-col'
		>
			{PORTFOLIO_NAME}
		</Fade>
	)
}