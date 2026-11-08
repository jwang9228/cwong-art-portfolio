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
export const BLITMAP_LANDING_IMAGE_SRC = '1784625992/blitmap_hero';
export const BLITMAP_ISSUE_5_COVERS = [
  {
    src: '1791516464/issue5_front',
    alt: 'Blitmap Issue 5 Front Cover',
  },
  {
    src: '1791516254/issue5_back',
    alt: 'Blitmap Issue 5 Back Cover',
  },
] as const;
export const BLITMAP_THUMBNAILS = [
  {
    src: '1785275194/blitmap_covers',
    alt: 'Blitmap Thumbnail 1',
  },
  {
    src: '1784618657/Blitmap_thumbnail',
    alt: 'Blitmap Thumbnail 2'
  },
  {
    src: '1785275189/blitmap_stand',
    alt: 'Blitmap Thumbnail 3',
  },
] as const;
export const BLITMAP_PROCESS_WORK_CHARACTERS_SRC = '1785445843/blitmap_comic_process'
export const BLITMAP_PROCESS_WORK_SKETCHES = [
  {
    src: '1791517328/blitmap_process_sketch_1',
    alt: 'Blitmap Process Work Sketch 1'
  },
  {
    src: '1785445845/blitmap_process_sketch_2',
    alt: 'Blitmap Process Work Sketch 2'
  }
] as const;
export const BLITMAP_PROCESS_WORK_COVERS = [
  {
    src: '1784934929/blitmap_process_cover_1',
    alt: 'Blitmap Process Work Cover 1'
  }, 
  {
    src: '1785445847/blitmap_process_cover_2',
    alt: 'Blitmap Process Work Cover 2'
  },
  {
    src: '1785446783/blitmap_process_cover_3',
    alt: 'Blitmap Process Work Cover 3'
  }
] as const;

/* Blitnet project */
export const BLITNET_INTRO_VIDEO_SRC = '1793079594/sup_door_open';
export const BLITNET_INTRO_POSTER_SRC = '1792735117/sup_door_open_poster';

export const BLITNET_ENVIRONMENTS = [
  {
    src: '1784704944/NightPurple_Interior_Underground_Parallax_Foreground',
    alt: 'Blit.net dark underground environment',
  },
  {
    src: '1784698134/GreenSwamp_Interior_Underground_Parallax',
    alt: 'Blit.net light swamp environment',
  },
] as const;

export const BLITNET_RIFFBIT_ANIMS = [
  { src: '1794012028/RiffBit_animation_idle' },
  { src: '1794012034/RiffBit_animation_walk' },
  { src: '1794012031/RiffBit_animation_jumping' }
]

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
    thumbnail: '1784688569/Blitnet_thumbnail',
    label: 'SUP / Blit.net',
    href: '/work/blitnet'
  },
  {
    thumbnail: '1784618657/Blitmap_thumbnail',
    label: 'SUP / Blitmap',
    href: '/work/blitmap'
  },
  {
    thumbnail: '1784618622/GenshinTarot',
    label: 'Genshin Tarot',
    href: '/work/genshin-tarot'
  }
];