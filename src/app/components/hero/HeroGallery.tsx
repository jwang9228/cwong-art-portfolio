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
    <section className='grid grid-cols-1 tablet:grid-cols-2 max-w-6xl mx-auto
      gap-4 tablet:gap-5 laptop:gap-6 pt-6'>
      {resources.map((art: any, index: number) => (
        <Fade 
          key={art.asset_id} 
          speed='art'
          delay={index % 2 !== 0 ? 0.15 : 0}
        >
          <Image
            src={art.secure_url}
            alt='Gallery Artwork'
            width={art.width} 
            height={art.height}
            className='w-full h-auto'
            sizes='100vw'
          />
        </Fade>
      ))}
    </section>
  )
}