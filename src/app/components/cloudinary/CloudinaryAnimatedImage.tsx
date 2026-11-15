import { getCloudinaryImageUrl } from '../../lib/cloudinary-image';

interface CloudinaryAnimatedImageProps {
  /** Cloudinary `{version}/{public_id}` for an uploaded animated WebP (GIF→WebP). */
  src: string;
  alt: string;
  className?: string;
}

/** Shared base class for every animated sprite loop. */
const BASE_CLASS_NAME = 'w-auto object-contain [image-rendering:pixelated]';

/**
 * Cloudinary animated WebP sprite loop. Uses a plain `<img>`, next/image flattens
 */
export default function CloudinaryAnimatedImage({
  src,
  alt,
  className,
}: CloudinaryAnimatedImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- animated WebP must skip next/image
    <img
      src={getCloudinaryImageUrl(src)}
      alt={alt}
      loading='lazy'
      decoding='async'
      className={`${BASE_CLASS_NAME} ${className ?? ''}`.trim()}
    />
  );
}
