import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Logo () {
  return (
    // Put your logo image here!
    <Link
      href='/'
      className='hover:opacity-90'
    >
      <img
        src='/assets/logo-light.svg'
        alt='Company Logo'
        className='h-[18px] md:h-[20px] dark:hidden block'
      />
      <img
        src='/assets/logo-dark.svg'
        alt='Company Logo'
        className='hidden dark:block h-[18px] md:h-[20px]'
      />
    </Link>
  )
}

export function LogoIcon ({ className }: {
  className?: string
}) {
  return (
    // Put your logo icon image here!
    <Link
      href='/'
      className='hover:opacity-90'
    >
      <img
        src='/icon.svg'
        alt='Company Logo Icon'
        className={cn(
          'h-5 dark:hidden block',
          className
        )}
      />
      <img
        src='/icon-dark.svg'
        alt='Company Logo Icon'
        className={cn(
          'h-5 hidden dark:block',
          className
        )}
      />
    </Link>
  )
}
