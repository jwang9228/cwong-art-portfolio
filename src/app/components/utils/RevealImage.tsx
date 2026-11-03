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

const isFillProps = (props: RevealImageProps): props is RevealImageFill => props.fill === true;

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
  const inView = props.inView ?? isFillProps(props);

  const { src, width, height, blurDataURL, className } = isFillProps(props)
    ? {
        src: toCloudinarySrc(props.src, props.quality ?? 'good'),
        width: undefined,
        height: undefined,
        blurDataURL: props.blurDataURL,
        className: props.className ?? '',
      }
    : {
        src: toCloudinarySrc(props.image),
        width: props.image.width,
        height: props.image.height,
        blurDataURL: props.image.blurDataURL,
        className: props.className ?? 'w-full h-auto',
      };

  return (
    <Fade
      speed='art'
      inView={inView}
      delay={delay}
      ready={loaded}
      className={isFillProps(props) ? 'absolute inset-0' : undefined}
    >
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        className={className}
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        onLoad={() => setLoaded(true)}
        {...(isFillProps(props) ? { fill: true } : { width, height })}
      />
    </Fade>
  );
}
