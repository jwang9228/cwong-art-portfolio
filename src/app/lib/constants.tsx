import { IconType } from 'react-icons';
import { GoMail } from 'react-icons/go';
import { PiTwitterLogo, PiInstagramLogo } from 'react-icons/pi';

/* Header / Footer metadata */
export const PORTFOLIO_NAME = 'Courtney Wong';
export const EMAIL = 'cwongart@gmail.com';
export const JOB_TITLES = ['Character Design', 'Illustration', 'Concept Art'];
export const COPYRIGHT = `\u00A9 ${new Date().getFullYear()} ${PORTFOLIO_NAME}`;

// Cloudinary loader src: `{version}/{public_id}` (see cloudinary-image.ts)
export const LANDING_IMAGE_SRC = '1780127439/landing';

/* Blitmap project */
export const BLITMAP_LANDING_IMAGE_SRC = '1784625992/thumbnail_blitmap1_buwba4';
export const BLITMAP_ISSUE_5_COVERS = [
  {
    src: '1791516464/cropped-comic_nobg_zlnlfe',
    alt: 'Blitmap Issue 5 Front Cover',
  },
  {
    src: '1791516254/croppedcover_nobg2_egzxm5',
    alt: 'Blitmap Issue 5 Back Cover',
  },
] as const;
export const BLITMAP_THUMBNAILS = [
  {
    src: '1785275194/IMG_2555_1_ygisyf',
    alt: 'Blitmap Thumbnail 1',
  },
  {
    src: '1784618657/IMG_2647_kh91i0',
    alt: 'Blitmap Thumbnail 2'
  },
  {
    src: '1785275189/IMG_2616_s8owkp',
    alt: 'Blitmap Thumbnail 3',
  },
] as const;
export const BLITMAP_PROCESS_WORK_CHARACTERS_SRC = '1785445843/comic_process2_xvkw9u'
export const BLITMAP_PROCESS_WORK_SKETCHES = [
  {
    src: '1791517328/3.25.24_Blitmap_Cover5_Nigel4_nqikkz',
    alt: 'Blitmap Process Work Sketch 1'
  },
  {
    src: '1785445845/comic_process1_n28mhn',
    alt: 'Blitmap Process Work Sketch 2'
  }
] as const;
export const BLITMAP_PROCESS_WORK_COVERS = [
  {
    src: '1784934929/figma1_yo9m6h',
    alt: 'Blitmap Process Work Cover 1'
  }, 
  {
    src: '1785445847/comic_process3_ianjxy',
    alt: 'Blitmap Process Work Cover 2'
  },
  {
    src: '1785446783/comic_process4_wwoe77',
    alt: 'Blitmap Process Work Cover 3'
  }
] as const;

/* Blitnet project */
export const BLITNET_INTRO_VIDEO_SRC = '1792735119/sup_door_open_trimmed_usmcp3';
export const BLITNET_INTRO_POSTER_SRC = '1792735117/sup_door_open_poster_e3lhys';

/* Navigation tabs */
export interface NavItem {
  label: string,
  href: string
}

export const NAV_TABS: NavItem[] = [
  {
    label: 'Professional Work',
    href: '/work'
  },
  {
    label: 'Illustration',
    href: '/illustration'
  },
  {
    label: 'Concept',
    href: '/concept'
  },
  {
    label: 'About',
    href: '/about'
  }
];

export interface SocialItem {
  icon: IconType,
  href: string
}

export const SOCIALS: SocialItem[] = [
  {
    icon: PiTwitterLogo,
    href: 'https://twitter.com/wongtonsoop'
  },
  { 
    icon: PiInstagramLogo,
    href: 'https://instagram.com/wongtonsoop'
  },
  {
    icon: GoMail,
    href: `mailto:${EMAIL}`
  }
];

export interface ProjectItem {
  thumbnail: string,
  label: string,
  href: string
}

export const PROJECTS: ProjectItem[] = [
  {
    thumbnail: '1784688569/Blitnet_thumbnail_ir3vst',
    label: 'SUP / Blit.net',
    href: '/work/blitnet'
  },
  {
    thumbnail: '1784618657/IMG_2647_kh91i0',
    label: 'SUP / Blitmap',
    href: '/work/blitmap'
  },
  {
    thumbnail: '1784618622/GenshinTarot_labzsu',
    label: 'Genshin Tarot',
    href: '/work/genshin-tarot'
  }
];