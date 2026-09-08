import { cacheLife, cacheTag } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { getBlurPlaceholderUrl } from './cloudinary-image';

// Admin Search API — server only. Image URLs / next/image loader live in cloudinary-image.ts.

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function fetchBlurDataURL(resource: { public_id: string; version?: number | string }): Promise<string | undefined> {
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

export async function getGalleryImages(folderPath: string, maxImages: number = 30) {
  'use cache';
  cacheLife('hours');
  cacheTag('gallery-images', `gallery:${folderPath}`);

  try {
    const { resources } = await cloudinary.search
      .expression(`folder:${folderPath}`)
      .sort_by('public_id', 'asc')
      .max_results(maxImages)
      .execute();

    return await Promise.all(
      resources.map(async (resource: any) => ({
        ...resource,
        blurDataURL: await fetchBlurDataURL(resource),
      }))
    );
  } catch (error) {
    console.error(`Cloudinary Fetch Error [Folder: ${folderPath}]:`, error);
    return [];
  }
}
