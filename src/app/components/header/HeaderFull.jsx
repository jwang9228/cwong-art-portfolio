import Link from 'next/link';

export default function HeaderFull({
  headerSections, activeTab, setActiveTab
}) {
  console.log(activeTab);
  return (
    <header className='flex w-full justify-between 
      items-center text-3xl font-semibold'>
      <Link href={'/'} onClick={() => setActiveTab('')}>
        Courtney Wong
      </Link>
      <nav className='flex gap-x-10'>
        {headerSections.map(headerSection =>
          <Link 
            key={headerSection.name} 
            href={headerSection.href}
            onClick={() => setActiveTab(headerSection.name)}
            className={`group transition`}
          >
            {headerSection.name}
            <span className={`block h-0.75 mt-1
              bg-light transition-all duration-450
              ${activeTab.toLowerCase() === headerSection.name.toLowerCase()
                ? 'max-w-full'
                : 'max-w-0 group-hover:max-w-full'
              }`}
            />
          </Link>
        )}
      </nav>
    </header>
  )
}