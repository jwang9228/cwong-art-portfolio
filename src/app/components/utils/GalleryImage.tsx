import Image from 'next/image'
import Fade from './Fade'
import {
  CLOUDINARY_GRID_QUALITY,
  toCloudinarySrc
} from '../../lib/cloudinary-image'

interface GalleryImageProps {
  image: any,
  alt: string,
  sizes: string,
  loadDelay?: number,
  inView?: boolean,
  priority?: boolean
}

export default function GalleryImage({ 
  image, 
  alt, 
  sizes,
  loadDelay = 0,
  inView = false,
  priority = false
}: GalleryImageProps) {
  return (
    <Fade speed='art' delay={loadDelay} inView={inView}>
      <Image
        src={toCloudinarySrc(image)}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        quality={CLOUDINARY_GRID_QUALITY}
        className='w-full h-auto'
        priority={priority}
      />
    </Fade>
  )
}