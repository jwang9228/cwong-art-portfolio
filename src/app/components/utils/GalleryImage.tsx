'use client';

import { useState } from 'react'
import Image from 'next/image'
import Fade from './Fade'
import { toCloudinarySrc } from '../../lib/cloudinary-image'

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
  const [loaded, setLoaded] = useState(false);

  return (
    <Fade speed='art' delay={loadDelay} inView={inView} ready={loaded}>
      <Image
        src={toCloudinarySrc(image)}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className='w-full h-auto'
        priority={priority}
        placeholder={image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={image.blurDataURL}
        onLoad={() => setLoaded(true)}
      />
    </Fade>
  )
}
