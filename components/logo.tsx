import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Logo () {
  return (
    // Put your logo image here!
    <Link
      href='/'
      className='hover:opacity-90'
    >
      <div className='h-5 dark:hidden flex items-center gap-2'>
        <img
          src='/icon-light.svg'
          alt='Company Logo Icon'
          className='w-5 h-5'
        />
        <span className='font-bold tracking-tighter'>STARTER</span>
      </div>
      <div className='h-5 hidden dark:flex items-center gap-2'>
        <img
          src='/icon-dark.svg'
          alt='Company Logo Icon'
          className='w-5 h-5'
        />
        <span className='font-bold tracking-tighter'>E.START</span>
      </div>
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
        src='/icon-light.svg'
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
