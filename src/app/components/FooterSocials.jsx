import Link from 'next/link';
import { AiOutlineMail } from 'react-icons/ai';
import { PiTwitterLogoDuotone, PiInstagramLogoDuotone } from 'react-icons/pi';

export default function FooterSocials() {
  const socials = [
    {
      icon: <PiTwitterLogoDuotone className='size-9' fill='#f4a8ff' />,
      href: 'https://twitter.com/wongtonsoop'
    },
    { 
      icon: <PiInstagramLogoDuotone className='size-9' fill='#f4a8ff' />,
      href: 'https://instagram.com/wongtonsoop'
    },
    {
      icon: <AiOutlineMail className='size-9' fill='#f4a8ff' />,
      href: 'mailto:cwongart@gmail.com'
    }
  ];

  return (
    <footer className='flex justify-center items-center
      gap-x-10 text-fuchsia-300'> 
      {socials.map(social => 
        <Link 
          href={social.href} 
          key={social.href} 
          target='_blank' rel='noopener noreferrer'
        >
          {social.icon}
        </Link>
      )}
    </footer>
  )
}