'use client';

import { useState } from 'react';
import Image from 'next/image';
import Fade from './Fade';
import {
  CloudinaryResource,
  toCloudinarySrc,
  type CloudinaryQuality,
} from '../../lib/cloudinary-image';

type RevealImageBase = {
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  delay?: number;
  inView?: boolean;
};

type RevealImageIntrinsic = RevealImageBase & {
  fill?: false;
  image: CloudinaryResource;
};

type RevealImageFill = RevealImageBase & {
  fill: true;
  src: string;
  blurDataURL?: string;
  quality?: CloudinaryQuality;
};

export type RevealImageProps = RevealImageIntrinsic | RevealImageFill;

/**
 * Cloudinary image that fades in only after load (optionally when in view).
 * Intrinsic: sizes from the resource (galleries).
 * Fill: sizes from a positioned parent (case-study frames).
 */
export default function RevealImage(props: RevealImageProps) {
  const [loaded, setLoaded] = useState(false);
  const {
    alt,
    sizes,
    priority = false,
    delay = 0,
  } = props;
  // Fill frames default to in-view gating; intrinsic gallery tiles opt in.
  const inView = props.inView ?? props.fill === true;

  if (props.fill) {
    const {
      src,
      className = '',
      blurDataURL,
      quality = 'good',
    } = props;

    return (
      <Fade
        speed='art'
        inView={inView}
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

  const { image, className = 'w-full h-auto' } = props;

  return (
    <Fade speed='art' delay={delay} inView={inView} ready={loaded}>
      <Image
        src={toCloudinarySrc(image)}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={className}
        priority={priority}
        placeholder={image.blurDataURL ? 'blur' : 'empty'}
        blurDataURL={image.blurDataURL}
        onLoad={() => setLoaded(true)}
      />
    </Fade>
  );
}
