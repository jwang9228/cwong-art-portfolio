import type { ImageLoaderProps } from 'next/image';

export const CLOUDINARY_LIGHTBOX_MAX_WIDTH = 2560;

export type CloudinaryQuality = 'good' | 'best';

const BEST_PREFIX = 'best:';

type CloudinaryResourceSrc = {
  public_id: string;
  version?: number | string;
};

function resourceId(resource: CloudinaryResourceSrc | string): string {
  if (typeof resource === 'string') {
    return resource.startsWith(BEST_PREFIX)
      ? resource.slice(BEST_PREFIX.length)
      : resource;
  }

  return resource.version != null
    ? `${resource.version}/${resource.public_id}`
    : resource.public_id;
}

/**
 * Builds the `src` passed to next/image.
 * Tier is encoded in the string (`best:…`) so the shared loaderFile can pick q_auto without Next `quality`.
 */
export function toCloudinarySrc(
  resource: CloudinaryResourceSrc | string,
  quality: CloudinaryQuality = 'good'
): string {
  const id = resourceId(resource);
  return quality === 'best' ? `${BEST_PREFIX}${id}` : id;
}

function parseCloudinarySrc(src: string): {
  id: string;
  quality: CloudinaryQuality;
} {
  if (src.startsWith(BEST_PREFIX)) {
    return { id: src.slice(BEST_PREFIX.length), quality: 'best' };
  }
  return { id: src, quality: 'good' };
}

export function getCloudinaryUrl({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  const { id, quality } = parseCloudinarySrc(src);
  const transforms = [
    'f_auto',
    'c_limit',
    `w_${Math.round(width)}`,
    `q_auto:${quality}`,
  ].join(',');

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/v${id}`;
}

/** Default export required by next.config `images.loaderFile`. */
export default function cloudinaryLoader({
  src,
  width,
}: ImageLoaderProps): string {
  return getCloudinaryUrl({
    src,
    width: Math.min(width, CLOUDINARY_LIGHTBOX_MAX_WIDTH),
  });
}
