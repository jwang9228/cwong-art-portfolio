import { IconType } from 'react-icons';
import { GoMail } from 'react-icons/go';
import { PiTwitterLogo, PiInstagramLogo } from 'react-icons/pi';

export const PORTFOLIO_NAME = 'Courtney Wong';
export const EMAIL = 'cwongart@gmail.com';
export const JOB_TITLES = ['Character Design', 'Illustration', 'Concept Art'];
export const COPYRIGHT = `\u00A9 ${new Date().getFullYear()} ${PORTFOLIO_NAME}`;

// Cloudinary loader src: `{version}/{public_id}` (see cloudinary-image.ts)
export const LANDING_IMAGE_SRC = '1780127439/landing';
export const BLITMAP_LANDING_IMAGE_SRC = '1784625992/thumbnail_blitmap1_buwba4';

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
    label: 'BLIT.NET',
    href: '/work/blitnet'
  },
  {
    thumbnail: '1784618657/IMG_2647_kh91i0',
    label: 'Blit.map Comic',
    href: '/work/blitmap'
  },
  {
    thumbnail: '1784618622/GenshinTarot_labzsu',
    label: 'Genshin Tarot',
    href: '/work/genshin-tarot'
  }
];