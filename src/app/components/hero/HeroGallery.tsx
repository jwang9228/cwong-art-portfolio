import { v2 as cloudinary } from 'cloudinary';
import Image from 'next/image';
import Fade from '../utils/Fade';

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
    .sort_by('public_id', 'asc') // Sort by ascending IDs
    .max_results(HERO_GALLERY_MAX_IMAGES)
    .execute();

  return (
    <section className='flex flex-col w-full gap-y-base'>
      {resources.map((art: any, index: number) => (
        <Fade 
          // First image is staggered by parent. Others will trigger on scroll
          inView={index > 0}
          key={art.asset_id} 
          speed='art'
          className='relative w-full h-[30vh]'
        >
          <Image
            src={art.secure_url}
            alt='Gallery Artwork'
            fill
            className='object-contain'
          />
        </Fade>
      ))}
    </section>
  )
}