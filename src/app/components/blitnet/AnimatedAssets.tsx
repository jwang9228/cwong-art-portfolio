import CloudinaryAnimatedImage from '../cloudinary/CloudinaryAnimatedImage';
import Fade from '../utils/Fade';
import {
  BLITNET_CICI_IDLE,
  BLITNET_DOOR_OPEN_CLOSE,
  BLITNET_PROP_CHECKPOINT,
  BLITNET_PROP_COIN,
  BLITNET_PROP_FIREBALL,
  BLITNET_PROP_LAMPPOSTS,
  BLITNET_RIFFBIT_ANIMS,
  BLITNET_SUP_DOOR_IDLE,
} from '../../lib/constants';

/**
 * Animated WebP sprite loops for Blit.net props and characters, grouped into
 * a lamppost/prop cluster and a riffbit/door row.
 */
export default function AnimatedAssets() {
  return (
    <div className='flex flex-col whiteboard-grid gap-y-12 py-6 my-2'>
      <Fade
        speed='art'
        inView
        className='flex gap-x-2 tablet:max-w-lg laptop:max-w-2xl'
      >
        <div className='flex flex-1 justify-evenly items-center'>
          {BLITNET_PROP_LAMPPOSTS.map(({ src, alt }) => (
            <CloudinaryAnimatedImage
              key={src}
              src={src}
              alt={alt}
              className='h-48 laptop:h-56'
            />
          ))}
        </div>
        <div className='flex flex-1 flex-col justify-between
          laptop:flex-row laptop:items-center laptop:justify-evenly laptop:gap-x-8'>
          <div className='flex justify-evenly items-center laptop:contents'>
            <CloudinaryAnimatedImage
              src={BLITNET_PROP_COIN.src}
              alt={BLITNET_PROP_COIN.alt}
              className='h-18 laptop:h-26'
            />
            <CloudinaryAnimatedImage
              src={BLITNET_PROP_CHECKPOINT.src}
              alt={BLITNET_PROP_CHECKPOINT.alt}
              className='h-24 laptop:h-30'
            />
          </div>
          <CloudinaryAnimatedImage
            src={BLITNET_PROP_FIREBALL.src}
            alt={BLITNET_PROP_FIREBALL.alt}
            className='h-18 laptop:h-26'
          />
        </div>
      </Fade>
      <div className='flex flex-col tablet:flex-row 
        tablet:justify-around tablet:items-center gap-y-12 laptop:max-w-5xl'
      >
        <Fade
          speed='art'
          inView
          className='flex justify-evenly items-center tablet:gap-x-4 laptop:gap-x-8'
        >
          {BLITNET_RIFFBIT_ANIMS.map(({ src, alt }) => (
            <CloudinaryAnimatedImage
              key={src}
              src={src}
              alt={alt}
              className='h-32 laptop:h-38'
            />
          ))}
        </Fade>
        <Fade
          speed='art'
          inView
          className='flex justify-evenly items-center tablet:gap-x-4 laptop:gap-x-8'
        >
          <CloudinaryAnimatedImage
            src={BLITNET_DOOR_OPEN_CLOSE.src}
            alt={BLITNET_DOOR_OPEN_CLOSE.alt}
            className='h-28 tablet:h-30 laptop:h-38'
          />
          <CloudinaryAnimatedImage
            src={BLITNET_SUP_DOOR_IDLE.src}
            alt={BLITNET_SUP_DOOR_IDLE.alt}
            className='h-30 tablet:h-32 laptop:h-40'
          />
          <CloudinaryAnimatedImage
            src={BLITNET_CICI_IDLE.src}
            alt={BLITNET_CICI_IDLE.alt}
            className='h-28 tablet:h-30 laptop:h-38'
          />
        </Fade>
      </div>
    </div>
  );
}
