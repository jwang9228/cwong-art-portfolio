import { IconType } from 'react-icons';
import { AiOutlineMail } from 'react-icons/ai';
import { PiTwitterLogoDuotone, PiInstagramLogoDuotone } from 'react-icons/pi';

export const PORTFOLIO_NAME = 'Courtney Wong';
export const JOB_TITLES = ['Character Design', 'Illustration', 'Concept Art'];

export interface NavItem {
  label: string,
  href: string
}

export const NAV_TABS = [
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

export const SOCIALS = [
  {
    icon: PiTwitterLogoDuotone,
    href: 'https://twitter.com/wongtonsoop'
  },
  { 
    icon: PiInstagramLogoDuotone,
    href: 'https://instagram.com/wongtonsoop'
  },
  {
    icon: AiOutlineMail,
    href: 'mailto:cwongart@gmail.com'
  }
];