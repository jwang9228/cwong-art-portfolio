import FadeContent from './utils/FadeContent';
import FooterSocials from './FooterSocials';

export default function Home() {
  return (
    <>
      <span
        className='absolute inset-0 bg-linear-to-b 
        from-violet-500/40 via-purple-400/45 to-transparent' />
      <section className='flex flex-col items-center gap-y-3 m-auto z-10'>
        <h1 className='inline-block overflow-hidden text-8xl font-extrabold'>
          <section className='block animate-wipe [clip-path:inset(0_100%_0_0)]
            [animation-delay:0.8s] [animation-duration:0.4s]'>
            COURTNEY WONG
          </section>
        </h1>
        <h2 className='inline-block overflow-hidden text-3xl font-bold tracking-tighter'>
          <section className='block bg-fuchsia-300 px-1.5 animate-wipe [clip-path:inset(0_100%_0_0)]
            [animation-delay:1.2s] [animation-duration:0.4s]'>
            ILLUSTRATION〡CONCEPT ART〡CHARACTER DESIGN
          </section>
        </h2>
      </section>
      <FadeContent delay={1500} duration={400} className='mt-auto z-10'>
        <FooterSocials />
      </FadeContent>
    </>
  )
}