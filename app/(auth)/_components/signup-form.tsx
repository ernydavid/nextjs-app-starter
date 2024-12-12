'use client'

import { LogoIcon } from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useActionState } from 'react'
import { insertUser } from '@/app/(auth)/_lib/auth'
import { SuccessNotification } from '@/components/notification-success'
import { ErrorNotification } from '@/components/notification-error'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ActionState } from '@/lib/definitions'

export function SignUpForm () {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(insertUser, {})

  return (
    <div className='w-full max-w-md px-4 md:px-0 grid gap-6'>
      <LogoIcon className='w-9 h-9 mx-auto' />
      <h2 className='text-center'>Create your account</h2>
      <form
        className='w-full grid gap-4'
        action={action}
      >
        <div className='grid  space-y-1'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            placeholder='Enter your name'
            type='text'
            disabled={isLoading}
            sizes='sm'
          />
          {state?.errors?.name && <p className='text-error text-sm font-medium'>{state.errors?.name}</p>}
        </div>
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
        <div className='grid  space-y-1'>
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
          className='mt-5'
          variant='primary'
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
        {state?.message && <ErrorNotification message={state.message} />}
        {state?.success && <SuccessNotification message={state.success} />}
      </form>
      <div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-muted' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-background text-muted-foreground'>
              Already have an account?
            </span>
          </div>
        </div>
      </div>
      <Link
        className={cn(
          buttonVariants({ variant: 'outline' })
        )}
        href='/login'
      >
        Sign in to existing account
      </Link>
    </div>
  )
}
