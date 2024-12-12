'use client'

import { LogoIcon } from '@/components/logo'
import { usePathname } from 'next/navigation'

export function BreadCrumb () {
  const pathname = usePathname().split('/')
  const currentPath = pathname[pathname.length - 1]

  const activeTab = currentPath.charAt(0).toUpperCase() + currentPath.slice(1, currentPath.length)

  return (
    <div className='flex items-center gap-2'>
      <div className='flex md:hidden'>
        <LogoIcon className='w-7 h-7' />
      </div>
      <span className='md:hidden flex'>/</span>
      <span className='font-medium text-sm md:text-base'>{activeTab}</span>
    </div>
  )
}
