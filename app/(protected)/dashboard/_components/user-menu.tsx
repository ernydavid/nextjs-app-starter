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
import { ListCheck, Settings, User2 } from 'lucide-react'
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
          className='w-8 h-8 object-cover object-center'
          src={imageSrc}
          alt='Avatar profile photo'
        />
      </div>
    )
  } else {
    return (
      <div
        className='w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary text-primary-foreground relative cursor-pointer'
      >
        <User2 className='w-4 h-4' />
      </div>
    )
  }
}

const menuRoutes = [
  {
    id: 1,
    href: '/dashboard/settings',
    label: 'Settings',
    icon: <Settings className='w-4 h-4' />
  },
  {
    id: 2,
    href: '/dashboard/orders',
    label: 'Orders',
    icon: <ListCheck className='w-4 h-4' />
  }
]

export function UserMenu ({ user }: {
  user: Promise<UserDTO>
}) {
  const { image } = use(user)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar imageSrc={image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[250px]'
      >
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
          <LogOutButton className='w-full justify-start' />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}
