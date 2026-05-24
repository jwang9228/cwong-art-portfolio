/*

import FooterSocials from './components/FooterSocials';
import FadeContent from './components/utils/FadeContent';

export default function Home() {
  return (
    <section className='relative w-full h-full
      bg-[url(/landing-mobile.png)] tablet:bg-[url(/landing.jpg)] 
      bg-cover bg-no-repeat'
    >
      <span
        className='absolute inset-0 bg-linear-to-b 
          from-violet-500/40 via-purple-400/45 to-transparent' 
      />
      <section className='flex flex-col items-center gap-y-3
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10'>
        <h1 className='inline-block overflow-hidden 
          text-4xl laptop:text-8xl text-nowrap font-extrabold'>
          <span className='block animate-wipe [clip-path:inset(0_100%_0_0)]
            [animation-delay:0.8s] [animation-duration:0.4s]'>
            COURTNEY WONG
          </span>
        </h1>
        <h2 className='inline-block overflow-hidden 
          text-xl laptop:text-3xl text-center font-bold tracking-tighter'>
          <span className='block bg-fuchsia-300 px-1.5 animate-wipe [clip-path:inset(0_100%_0_0)]
            [animation-delay:1.2s] [animation-duration:0.4s]'>
            ILLUSTRATION〡CONCEPT ART〡CHARACTER DESIGN
          </span>
        </h2>
      </section>
      <FadeContent 
        delay={1500} 
        duration={400} 
        className='absolute bottom-10 left-18 right-18 z-10'
      >
        <FooterSocials />
      </FadeContent>
    </section>
  );
}

*/