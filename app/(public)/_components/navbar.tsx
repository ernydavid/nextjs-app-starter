import { Logo } from '@/components/logo'
import { NavLinks } from './nav-links'
import { Suspense } from 'react'

export function Navbar () {
  return (
    <header className='w-full flex justify-center items-center gap-2 fixed top-0 left-0 border-b border-b-muted'>
      <div className='w-full h-16 px-4 flex justify-between items-center gap-3'>
        <Logo />
        <Suspense fallback={<p>Cargando...</p>}>
          <NavLinks />
        </Suspense>
      </div>
    </header>
  )
}
