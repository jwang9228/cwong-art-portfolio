import { cacheLife, cacheTag } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResource, CloudinaryResourceSrc, getBlurPlaceholderUrl } from './cloudinary-image';

// Admin Search API — server only. Image URLs / next/image loader live in cloudinary-image.ts.

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/** `{version}/{public_id}` constants → the resource shape blur fetches expect. */
export const parseVersionedCloudinarySrc = (src: string): CloudinaryResourceSrc => {
  const slash = src.indexOf('/');
  if (slash <= 0) return { public_id: src };

  return {
    version: src.slice(0, slash),
    public_id: src.slice(slash + 1),
  };
}

export const fetchBlurDataURL = async (resource: CloudinaryResourceSrc): Promise<string | undefined> => {
  try {
    const response = await fetch(getBlurPlaceholderUrl(resource));
    if (!response.ok) return undefined;

    const buffer = Buffer.from(await response.arrayBuffer());
    return `data:image/jpeg;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(`Blur Placeholder Fetch Error [${resource.public_id}]:`, error);
    return undefined;
  }
}

/** Dimensions + LQIP for a case-study `{version}/{public_id}` constant. */
export type CloudinaryImageMeta = {
  width: number;
  height: number;
  blurDataURL?: string;
};

/**
 * Batch Admin lookup of width/height (plus blur placeholders) for curated
 * constant srcs. Keys match the input `{version}/{public_id}` strings so
 * pages can drive `aspect-ratio` from the resource instead of hand-tuned
 * Tailwind aspect utilities.
 */
export const fetchCloudinaryImageMetaMap = async (
  srcs: readonly string[],
  tag: string,
): Promise<Record<string, CloudinaryImageMeta>> => {
  'use cache';
  cacheLife('hours');
  cacheTag(tag);

  if (srcs.length === 0) return {};

  const parsed = srcs.map((src) => ({
    src,
    ...parseVersionedCloudinarySrc(src),
  }));

  try {
    const { resources } = await cloudinary.api.resources_by_ids(
      parsed.map((entry) => entry.public_id),
    );

    const byPublicId = new Map(
      resources.map((resource) => [resource.public_id, resource]),
    );

    const entries = await Promise.all(
      parsed.map(async ({ src, public_id, version }): Promise<[string, CloudinaryImageMeta] | null> => {
        const resource = byPublicId.get(public_id);
        if (!resource?.width || !resource?.height) {
          console.error(`Cloudinary Meta Missing [${public_id}]`);
          return null;
        }

        const blurDataURL = await fetchBlurDataURL({ public_id, version });
        return [
          src,
          {
            width: resource.width,
            height: resource.height,
            blurDataURL,
          },
        ];
      }),
    );

    return Object.fromEntries(
      entries.filter((entry): entry is [string, CloudinaryImageMeta] => entry != null),
    );
  } catch (error) {
    console.error(`Cloudinary Meta Fetch Error [${tag}]:`, error);
    return {};
  }
}

export const getGalleryImages = async (folderPath: string, maxImages: number = 50): Promise<CloudinaryResource[]> => {
  'use cache';
  cacheLife('hours');
  cacheTag('gallery-images', `gallery:${folderPath}`);

  try {
    const { resources } = await cloudinary.search
      .expression(`folder:"${folderPath}"`)
      .sort_by('public_id', 'asc')
      .with_field('context')
      .max_results(maxImages)
      .execute();

    // Sort by Cloudinary's "Contextual metadata", if set on an asset. 
    // Lower order number = higher priority, shown first
    resources.sort((a, b) => {
      const aOrder = Number(a.context?.order ?? Infinity);
      const bOrder = Number(b.context?.order ?? Infinity);
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.public_id.localeCompare(b.public_id);
    })

    return await Promise.all(
      resources.map(async (resource: CloudinaryResource) => ({
        ...resource,
        blurDataURL: await fetchBlurDataURL(resource),
      }))
    );
  } catch (error) {
    console.error(`Cloudinary Fetch Error [Folder: ${folderPath}]:`, error);
    return [];
  }
}
