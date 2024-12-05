'use client'

import { LogoIcon } from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { ActionState, forgotPassword } from '@/app/(auth)/_lib/auth'
import { ErrorNotification } from '@/components/notification-error'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SuccessNotification } from '@/components/notification-success'

export function ForgotPasswordForm () {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(forgotPassword, {})

  return (
    <div className='w-full max-w-md px-4 md:px-0 grid gap-6'>
      <LogoIcon className='w-9 h-9 mx-auto' />
      <h2 className='text-center'>Recover your password</h2>
      <form
        className='w-full grid gap-4'
        action={action}
      >
        <div className='grid  space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            placeholder='Enter your email'
            type='email'
            disabled={isLoading}
            sizes='sm'
          />
          {state?.errors?.email && <p className='text-error text-sm font-medium'>{state.errors?.email}</p>}
        </div>
        <Button
          variant='primary'
          disabled={isLoading}
        >
          {isLoading ? 'Validating...' : 'Recover Password'}
        </Button>
        {state?.message && <ErrorNotification message={state.message} />}
        {state?.success && <SuccessNotification message={state.success} />}
      </form>
      <Link
        className={cn(
          buttonVariants({ variant: 'link' })
        )}
        href='/login'
      >
        Back to login
      </Link>
    </div>
  )
}
