import type { ImageLoaderProps } from 'next/image';

export const CLOUDINARY_GRID_QUALITY = 80;
export const CLOUDINARY_LIGHTBOX_QUALITY = 85;
export const CLOUDINARY_LIGHTBOX_MAX_WIDTH = 2560;

type CloudinaryResourceSrc = {
  public_id: string;
  version?: number | string;
};

export function toCloudinarySrc(resource: CloudinaryResourceSrc): string {
  return resource.version != null
    ? `${resource.version}/${resource.public_id}`
    : resource.public_id;
}

export function getCloudinaryUrl({
  src,
  width,
  quality = CLOUDINARY_GRID_QUALITY,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const transforms = [
    'f_auto',
    'c_limit',
    `w_${Math.round(width)}`,
    `q_${quality}`,
  ].join(',');

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/v${src}`;
}

/** Default export required by next.config `images.loaderFile`. */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  return getCloudinaryUrl({
    src,
    width: Math.min(width, CLOUDINARY_LIGHTBOX_MAX_WIDTH),
    quality: quality ?? CLOUDINARY_GRID_QUALITY,
  });
}
