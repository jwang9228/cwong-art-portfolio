import { getGalleryImages } from '../lib/cloudinary';
import Gallery from '../components/utils/Gallery';

const CONCEPT_GALLERY_PATH = 'cwong-art/concept';
const CONCEPT_GALLERY_MAX_IMAGES = 50;

export default async function Page() {
  const resources = await getGalleryImages(CONCEPT_GALLERY_PATH, CONCEPT_GALLERY_MAX_IMAGES);

  return (
    <Gallery 
      resources={resources} 
      columnClass='columns-1 tablet:columns-2'
    />
  )
}