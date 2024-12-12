'use client'

import { LogoIcon } from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { resetPassword } from '@/app/(auth)/_lib/auth'
import { ErrorNotification } from '@/components/notification-error'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SuccessNotification } from '@/components/notification-success'
import { ActionState } from '@/lib/definitions'

export function NewPasswordForm ({ token }: {
  token: string
}) {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(resetPassword, {})

  return (
    <div className='w-full max-w-md px-4 md:px-0 grid gap-6'>
      <LogoIcon className='w-9 h-9 mx-auto' />
      <h2 className='text-center'>New Password</h2>
      <form
        className='w-full grid gap-4'
        action={action}
      >
        <input
          name='token'
          type='hidden'
          defaultValue={token}
        />
        <div className={cn(
          'grid space-y-1',
          state?.success && 'hidden'
        )}
        >
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            placeholder='*******'
            type='password'
            disabled={isLoading}
            sizes='sm'
          />
          {state?.errors?.password && state.errors?.password.map((error, index) => (
            <p
              key={index}
              className='text-error text-sm font-medium'
            >
              - {error}
            </p>
          ))}
        </div>
        <Button
          className={cn(
            state?.success && 'hidden'
          )}
          variant='primary'
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Save Password'}
        </Button>
        {state?.message && <ErrorNotification message={state.message} />}
        {state?.success && <SuccessNotification message={state.success} />}
      </form>
      <Link
        className={cn(
          buttonVariants({ variant: 'outline' }),
          (state?.message || state?.success) ? 'flex' : 'hidden'
        )}
        href='/login'
      >
        Go to login
      </Link>
    </div>
  )
}
