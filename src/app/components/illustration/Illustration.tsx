import { getGalleryImages } from '../../lib/cloudinary';
import IllustrationGallery from './IllustrationGallery';

const ILLUSTRATION_GALLERY_PATH = 'cwong-art/illustration';
const ILLUSTRATION_GALLERY_MAX_IMAGES = 50;

export default async function Illustration() {
  const resources = await getGalleryImages(ILLUSTRATION_GALLERY_PATH, ILLUSTRATION_GALLERY_MAX_IMAGES);

  return (
    <IllustrationGallery resources={resources} />
  )
}