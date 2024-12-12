import { Logo } from '@/components/logo'
import Link from 'next/link'

// insert your dashboard routes
const dashboardRoutes = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    id: 2,
    label: 'My orders',
    href: '/dashboard/orders'
  },
  {
    id: 3,
    label: 'Wishlist',
    href: '/dashboard/wishlist'
  }
]

export function AsideBar () {
  return (
    <div className='w-full md:max-w-[200px] lg:max-w-[260px] border-r border-r-muted hidden md:flex flex-col px-4 py-5'>
      <Logo />
      <div className='flex-grow flex flex-col gap-2 mt-20'>
        <nav className='w-full flex flex-col gap-2'>
          {dashboardRoutes.map((item) => (
            <Link
              className='hover:text-muted-foreground'
              key={item.id}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          className='hover:text-muted-foreground'
          href='/dashboard/settings'
        >
          Settings
        </Link>
      </div>
    </div>
  )
}
