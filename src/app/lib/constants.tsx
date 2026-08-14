import { IconType } from 'react-icons';
import { GoMail } from 'react-icons/go';
import { PiTwitterLogo, PiInstagramLogo } from 'react-icons/pi';

export const PORTFOLIO_NAME = 'Courtney Wong';
export const EMAIL = 'cwongart@gmail.com';
export const JOB_TITLES = ['Character Design', 'Illustration', 'Concept Art'];
export const COPYRIGHT = `\u00A9 ${new Date().getFullYear()} ${PORTFOLIO_NAME}`;

export const LANDING_IMAGE_URL = 'https://res.cloudinary.com/cwong-art-portfolio/image/upload/v1780127439/landing.jpg';

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
    thumbnail: 'https://res.cloudinary.com/cwong-art-portfolio/image/upload/v1784618657/IMG_2647_kh91i0.jpg',
    label: 'Blit.map Comic',
    href: '/blitmap'
  },
  {
    thumbnail: 'https://res.cloudinary.com/cwong-art-portfolio/image/upload/v1784618622/GenshinTarot_labzsu.jpg',
    label: 'Genshin Tarot',
    href: '/genshin-tarot'
  },
  {
    thumbnail: 'https://res.cloudinary.com/cwong-art-portfolio/image/upload/v1784688569/Blitnet_thumbnail_ir3vst.png',
    label: 'BLIT.NET',
    href: '/blitnet'
  }
];