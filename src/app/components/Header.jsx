import Link from 'next/link';

export default function Header() {
  // TODO: if a certain header is clicked, it should be underlined and no animation
  const headerSections = [
    {
      name: 'Illustration',
      href: '/illustration'
    },
    {
      name: 'Concept',
      href: '/'
    },
    {
      name: 'Professional Work',
      href: '/'
    },
    {
      name: 'About',
      href: '/'
    }
  ];

  return (
    <header className='flex w-full justify-between 
      items-center text-3xl font-semibold'>
      <Link href={'/'}>
        Courtney Wong
      </Link>
      <section className='flex gap-x-10'>
        {headerSections.map(headerSection =>
          <Link key={headerSection.name} href={headerSection.href}
            className={`group transition`}
          >
            {headerSection.name}
            <span className={`block h-0.75 mt-1
              bg-light transition-all duration-450
              max-w-0 group-hover:max-w-full`} 
            />
          </Link>
        )}
      </section>
    </header>
  )
}