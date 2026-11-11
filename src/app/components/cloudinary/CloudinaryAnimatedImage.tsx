import { getCloudinaryImageUrl } from '../../lib/cloudinary-image';

interface CloudinaryAnimatedImageProps {
  /** Cloudinary `{version}/{public_id}` for an uploaded animated WebP (GIF→WebP). */
  src: string;
  alt: string;
  className?: string;
}

/**
 * Cloudinary animated WebP sprite loop. Assets should be encoded with infinite
 * loop (`ffmpeg … -loop 0`). Uses a plain `<img>` so animation + alpha survive
 * (next/image would flatten them).
 */
export default function CloudinaryAnimatedImage({
  src,
  alt,
  className,
}: CloudinaryAnimatedImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- animated WebP must skip next/image
    <img
      src={getCloudinaryImageUrl(src, 'webp')}
      alt={alt}
      loading='lazy'
      decoding='async'
      className={className}
    />
  );
}
