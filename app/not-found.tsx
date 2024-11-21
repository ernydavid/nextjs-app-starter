import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function NotFound () {
  return (
    <div className='min-h-dvh flex flex-col justify-center items-center tracking-tighter'>
      <div>
        <span className='px-4 border-r border-r-muted text-xl font-semibold'>404</span>
        <span className='px-4'>Content not found</span>
      </div>
      <Link
        className={cn(
          buttonVariants({ variant: 'link', size: 'sm' }),
          'mt-5'
        )}
        href='/'
      >
        Go home
      </Link>
    </div>
  )
}
