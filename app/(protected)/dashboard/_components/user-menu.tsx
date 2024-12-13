'use client'

import { LogOutButton } from '@/components/buttons'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'

import { UserDTO } from '@/lib/definitions'
import { LayoutDashboard, ListCheck, Settings, User2 } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

function Avatar ({ imageSrc }: {
  imageSrc: string | null
}) {
  if (imageSrc) {
    return (
      <div
        className='w-8 h-8 rounded-full overflow-hidden relative cursor-pointer'
      >
        <img
          className='w-8 h-8 object-cover object-center pointer-events-none select-none'
          src={imageSrc}
          alt='Avatar profile photo'
        />
      </div>
    )
  } else {
    return (
      <div
        className='w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-900 text-primary-foreground relative cursor-pointer pointer-events-none select-none'
      >
        <User2 className='w-4 h-4' />
      </div>
    )
  }
}

const menuRoutes = [
  {
    id: 1,
    href: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className='w-4 h-4' />
  },
  {
    id: 2,
    href: '/dashboard/orders',
    label: 'Orders',
    icon: <ListCheck className='w-4 h-4' />
  },
  {
    id: 3,
    href: '/dashboard/settings',
    label: 'Settings',
    icon: <Settings className='w-4 h-4' />
  }
]

export function UserMenu ({ user }: {
  user: Promise<UserDTO>
}) {
  const { image, name, email } = use(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar imageSrc={image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[250px] mt-2'
      >
        <DropdownMenuItem className='pointer-events-none'>
          <div className='flex flex-col py-2'>
            <span className='text-foreground font-medium'>{name}</span>
            <span>{email}</span>
          </div>
        </DropdownMenuItem>
        {menuRoutes.map((item) => (
          <DropdownMenuItem
            className='h-10'
            key={item.id}
            asChild
          >
            <Link
              href={item.href}
            >{item.icon}{item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='h-10'
          asChild
        >
          <LogOutButton variant='secondary' className='w-full justify-start' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
