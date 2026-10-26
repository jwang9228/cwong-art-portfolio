import type { ImageLoaderProps } from 'next/image';

export const CLOUDINARY_LIGHTBOX_MAX_WIDTH = 2560;

export type CloudinaryQuality = 'good' | 'best';

const BEST_PREFIX = 'best:';

export type CloudinaryResource = {
  public_id: string;
  version?: number | string;
  asset_id: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type CloudinaryResourceSrc = Pick<CloudinaryResource, 'public_id' | 'version'>;

function parseCloudinarySrc(src: string): {
  id: string;
  quality: CloudinaryQuality;
} {
  if (src.startsWith(BEST_PREFIX)) {
    return { id: src.slice(BEST_PREFIX.length), quality: 'best' };
  }
  return { id: src, quality: 'good' };
}

function resourceId(resource: CloudinaryResourceSrc | string): string {
  if (typeof resource === 'string') return parseCloudinarySrc(resource).id;

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

/**
 * Builds the tiny, heavily-blurred transform URL used to generate a
 * base64 LQIP (`blurDataURL`) for next/image's blur-up placeholder.
 * Format is pinned to `f_jpg` (rather than `f_auto`) so the resulting
 * bytes are deterministic regardless of the server-side fetch's Accept header.
 */
export function getBlurPlaceholderUrl(resource: CloudinaryResourceSrc): string {
  const id = resourceId(resource);
  const transforms = [
    'f_jpg',
    'c_limit',
    'w_24',
    'e_blur:1000',
    'q_auto:low',
  ].join(',');

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transforms}/v${id}`;
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

/**
 * Builds a Cloudinary video URL.
 * Videos are served as-is without transforms to preserve format and transparency.
 */
export function getCloudinaryVideoUrl(resource: CloudinaryResourceSrc | string): string {
  const id = resourceId(resource);
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/v${id}`;
}

/**
 * Builds a Cloudinary image URL for the original upload.
 * No transforms, so a PNG poster stays a PNG and matches the video's first frame.
 */
export function getCloudinaryOriginalImageUrl(resource: CloudinaryResourceSrc | string): string {
  const id = resourceId(resource);
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v${id}`;
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
