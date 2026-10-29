import Intro from '../../components/blitnet/Intro';
import {
  getCloudinaryOriginalImageUrl,
  getCloudinaryVideoUrl,
} from '../../lib/cloudinary-image';
import {
  BLITNET_INTRO_POSTER_SRC,
  BLITNET_INTRO_VIDEO_SRC,
} from '../../lib/constants';

export default function Blitnet() {
  const videoSrc = `${getCloudinaryVideoUrl(BLITNET_INTRO_VIDEO_SRC)}.webm`;
  const posterSrc = `${getCloudinaryOriginalImageUrl(BLITNET_INTRO_POSTER_SRC)}.png`;

  return (
    <Intro videoSrc={videoSrc} posterSrc={posterSrc}>
      Hello World
    </Intro>
  );
}
