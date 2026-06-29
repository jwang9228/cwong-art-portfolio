import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Reusable fetching function
export async function getGalleryImages(folderPath: string, maxImages: number = 30) {
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