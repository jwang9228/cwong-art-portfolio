import { v2 as cloudinary } from 'cloudinary';
import Image from 'next/image';

// Cloudinary server authentication
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const HERO_GALLERY_PATH = 'cwong-art/landing/gallery';
const HERO_GALLERY_MAX_IMAGES = 30;

export default async function HeroGallery() {
  const { resources } = await cloudinary.search
    .expression(`folder:${HERO_GALLERY_PATH}`)
    .sort_by('created_at', 'desc') // Sort by newest entries first
    .max_results(HERO_GALLERY_MAX_IMAGES)
    .execute();

  return (
    <section className='flex flex-col w-full gap-y-9 tablet:gap-y-xl'>
      {resources.map((art: any) => (
        <div key={art.asset_id} className='relative w-full h-[30vh]'>
          <Image
            src={art.secure_url}
            alt='Gallery Artwork'
            fill
            className='object-contain'
          />
        </div>
      ))}
    </section>
  )
}