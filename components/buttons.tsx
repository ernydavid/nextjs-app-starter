'use client'

import { Button } from '@/components/ui/button'
import { logout } from '../app/(auth)/_lib/auth'
import { LogOut } from 'lucide-react'

export function LogOutButton ({ className, variant = 'default' }: {
  className?: string
  variant?: 'link' | 'default' | 'primary' | 'secondary' | 'success' | 'destructive' | 'outline' | null | undefined
}) {
  return (
    <Button
      variant={variant}
      className={className}
      size='sm'
      onClick={async () => {
        await logout()
      }}
    >
      <LogOut className='w-4 h-4' /> Log Out
    </Button>
  )
}
