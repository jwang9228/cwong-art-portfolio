import Image from 'next/image'
import Fade from './Fade'

interface GalleryImageProps {
  image: any,
  alt: string,
  loadDelay?: number,
  inView?: boolean,
  priority?: boolean
}

export default function GalleryImage({ 
  image, 
  alt, 
  loadDelay = 0,
  inView = false,
  priority = false
}: GalleryImageProps) {
  return (
    <Fade speed='art' delay={loadDelay} inView={inView}>
      <Image
        src={image.secure_url}
        alt={alt}
        width={image.width}
        height={image.height}
        className='w-full h-auto'
        priority={priority}
      />
    </Fade>
  )
}