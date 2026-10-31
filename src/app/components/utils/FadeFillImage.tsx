'use client';

import { useState } from 'react';
import Image from 'next/image';
import Fade from './Fade';
import { toCloudinarySrc, type CloudinaryQuality } from '../../lib/cloudinary-image';

interface FadeFillImageProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  blurDataURL?: string;
  quality?: CloudinaryQuality;
  priority?: boolean;
  delay?: number;
}

/**
 * Fill image that fades in only after load (and when in view) —
 * keeps cold-load reveals tied to real pixels, not intersection timing.
 */
export default function FadeFillImage({
  src,
  alt,
  sizes,
  className = '',
  blurDataURL,
  quality = 'good',
  priority = false,
  delay = 0,
}: FadeFillImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Fade
      speed='art'
      inView
      delay={delay}
      ready={loaded}
      className='absolute inset-0'
    >
      <Image
        src={toCloudinarySrc(src, quality)}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        {...(priority ? { priority: true } : {})}
        {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
        onLoad={() => setLoaded(true)}
      />
    </Fade>
  );
}
