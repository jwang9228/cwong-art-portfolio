import { getGalleryImages } from '../lib/cloudinary';
import Gallery from '../components/utils/Gallery';

const ILLUSTRATION_GALLERY_PATH = 'cwong-art/illustration';
const ILLUSTRATION_GALLERY_MAX_IMAGES = 50;

export default async function Page() {
  const resources = await getGalleryImages(ILLUSTRATION_GALLERY_PATH, ILLUSTRATION_GALLERY_MAX_IMAGES);

  return (
    <Gallery resources={resources} />
  )
}