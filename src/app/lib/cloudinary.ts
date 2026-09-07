import { cacheLife, cacheTag } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';

// Admin Search API — server only. Image URLs / next/image loader live in cloudinary-image.ts.

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

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

    return resources;
  } catch (error) {
    console.error(`Cloudinary Fetch Error [Folder: ${folderPath}]:`, error);
    return [];
  }
}
