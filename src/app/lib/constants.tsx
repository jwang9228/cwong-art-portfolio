import { IconType } from 'react-icons';
import { GoMail } from 'react-icons/go';
import { PiTwitterLogo, PiInstagramLogo } from 'react-icons/pi';

/* Header / Footer metadata */
export const PORTFOLIO_NAME = 'Courtney Wong';
export const EMAIL = 'cwongart@gmail.com';
export const JOB_TITLES = ['Character Design', 'Illustration', 'Concept Art'];
export const COPYRIGHT = `\u00A9 ${new Date().getFullYear()} ${PORTFOLIO_NAME}`;

/* Landing */
export const LANDING_IMAGE_SRC = '1794550035/landing';

/* Blitmap project */
export const BLITMAP_LANDING_IMAGE_SRC = '1794794270/blitmap_hero';
export const BLITMAP_ISSUE_5_COVERS = [
  {
    src: '1794794264/issue5_cover_front',
    alt: 'Blitmap Issue 5 Front Cover',
  },
  {
    src: '1794794265/issue5_cover_back',
    alt: 'Blitmap Issue 5 Back Cover',
  },
] as const;
export const BLITMAP_THUMBNAILS = [
  {
    src: '1794794267/blitmap_covers_side',
    alt: 'Blitmap Thumbnail 1',
  },
  {
    src: '1794794259/blitmap_covers_close',
    alt: 'Blitmap Thumbnail 2'
  },
  {
    src: '1794794268/blitmap_covers_stand',
    alt: 'Blitmap Thumbnail 3',
  },
] as const;
export const BLITMAP_PROCESS_WORK_CHARACTERS_SRC = '1794794272/blitmap_character_process'
export const BLITMAP_PROCESS_WORK_SKETCHES = [
  {
    src: '1794794259/blitmap_cover_sketch1',
    alt: 'Blitmap Process Work Sketch 1'
  },
  {
    src: '1794794260/blitmap_cover_sketch2',
    alt: 'Blitmap Process Work Sketch 2'
  }
] as const;
export const BLITMAP_PROCESS_WORK_COVERS = [
  {
    src: '1794794266/blitmap_process_cover1',
    alt: 'Blitmap Process Work Cover 1'
  }, 
  {
    src: '1794794262/blitmap_process_cover2',
    alt: 'Blitmap Process Work Cover 2'
  },
  {
    src: '1794794263/blitmap_process_cover3',
    alt: 'Blitmap Process Work Cover 3'
  }
] as const;

/* Blitnet project */
export const BLITNET_INTRO_VIDEO_SRC = '1793079594/sup_door_open';
export const BLITNET_INTRO_POSTER_SRC = '1794697191/sup_door_open_poster';

export const BLITNET_ENVIRONMENTS = [
  {
    src: '1794693481/NightPurple_Interior_Underground_Parallax',
    alt: 'Blit.net dark underground environment',
  },
  {
    src: '1794693480/GreenSwamp_Interior_Underground_Parallax',
    alt: 'Blit.net light swamp environment',
  },
] as const;

export const BLITNET_RIFFBIT_ANIMS = [
  { src: '1794366689/RiffBit_animation_idle', alt: 'RiffBit character idle animation' },
  { src: '1794366695/RiffBit_animation_walk', alt: 'RiffBit character walk animation' },
  { src: '1794366692/RiffBit_animation_jump', alt: 'RiffBit character jump animation' },
] as const;

export const BLITNET_PROP_LAMPPOSTS = [
  { src: '1794365539/lamppost1', alt: 'Blit.net lamppost animation 1' },
  { src: '1794365537/lamppost2', alt: 'Blit.net lamppost animation 2' },
] as const;

export const BLITNET_PROP_COIN = {
  src: '1794363582/coin',
  alt: 'Blit.net collectible coin animation',
} as const;

export const BLITNET_PROP_CHECKPOINT = {
  src: '1794363579/checkpoint',
  alt: 'Blit.net checkpoint flag animation',
} as const;

export const BLITNET_PROP_FIREBALL = {
  src: '1794362994/fireball',
  alt: 'Blit.net fireball animation',
} as const;

export const BLITNET_SUP_DOOR_IDLE = {
  src: '1794551805/sup_door_idle',
  alt: 'Blit.net SUP door idle animation'
} as const;

export const BLITNET_CICI_IDLE = {
  src: '1794551802/cici_idle',
  alt: 'Blit.net Character Cici idle animation'
} as const;

export const BLITNET_DOOR_OPEN_CLOSE = {
  src: '1794644200/door_open_close',
  alt: 'Blit.net Door open close animation'
} as const;

/* Genshin Tarot project */
export const GENSHIN_TAROT_BOX_HERO = {
  src: '1795328616/GenshinTarot_box_hero',
  alt: 'Genshin Tarot game box hero image'
} as const;

export const GENSHIN_TAROT_RAZOR_DESK = {
  src: '1795240288/GenshinTarot_razor_desk',
  alt: 'Genshin Tarot Razor cards desk arrangement'
} as const;

export const GENSHIN_TAROT_RAZOR_CARD = {
  src: '1795327338/GenshinTarot_razor_card',
  alt: 'Genshin Tarot Razor card'
} as const;

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
    thumbnail: '1794697194/Blitnet_thumbnail',
    label: 'SUP / Blit.net',
    href: '/work/blitnet'
  },
  {
    thumbnail: '1784618657/Blitmap_thumbnail',
    label: 'SUP / Blitmap',
    href: '/work/blitmap'
  },
  {
    thumbnail: '1795330079/GenshinTarot_thumbnail',
    label: 'Genshin Tarot',
    href: '/work/genshin-tarot'
  }
];