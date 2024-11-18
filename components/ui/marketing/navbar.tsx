import { Logo } from '@/components/ui/marketing/logo'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const routes = [
  {
    id: 1,
    label: 'Pricing',
    href: '/pricing'
  },
  {
    id: 2,
    label: 'Sign Up',
    href: '/signup'
  }
]

export function Navbar () {
  return (
    <header className='w-full flex justify-center items-center gap-2 fixed top-0 left-0 border-b border-b-muted'>
      <div className='w-full max-w-7xl h-16 px-4 flex justify-between items-center gap-3'>
        <Logo />
        <div className='flex items-center gap-4'>
          {routes.map((item, index) => (
            <Link
              key={item.id}
              className={cn(
                buttonVariants({ variant: index === routes.length - 1 ? 'default' : 'link' })
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
