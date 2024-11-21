import { buttonVariants } from '@/components/ui/button'
import { existingSession } from '@/lib/sessions'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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

export async function NavLinks () {
  const session = await existingSession()
  return (
    <div className='flex items-center gap-2'>
      {!session
        ? (
            routes.map((item, index) => (
              <Link
                key={item.id}
                className={cn(
                  buttonVariants({ variant: index === routes.length - 1 ? 'default' : 'link', size: 'sm' })
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            ))
          )
        : (
          <Link
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' })
            )}
            href='/dashboard'
          >
            Enter to Dashboard
          </Link>
          )}
    </div>
  )
}
