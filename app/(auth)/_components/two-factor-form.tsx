'use client'

import { LogoIcon } from '@/components/logo'
import { Button, buttonVariants } from '@/components/ui/button'
import { useActionState } from 'react'
import { validateTwoFactor } from '@/app/(auth)/_lib/auth'
import { ErrorNotification } from '@/components/notification-error'
import { SuccessNotification } from '@/components/notification-success'
import { ActionState } from '@/lib/definitions'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { Loader2 } from 'lucide-react'

export function TwoFactorForm ({ twoFactorId }: {
  twoFactorId: string
}) {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(validateTwoFactor, {})

  return (
    <div className='w-full max-w-md px-4 md:px-0 grid gap-6'>
      <LogoIcon className='w-9 h-9 mx-auto' />
      <h2 className='text-center'>Two Factor Authentication</h2>
      <form
        className='w-full grid gap-4'
        action={action}
      >
        <input
          type='hidden'
          name='id'
          defaultValue={twoFactorId}
        />
        <div className='grid space-y-1 place-content-center'>
          <p className='text-center text-muted-foreground'>Enter you two factor code</p>
          <InputOTP
            className='mx-auto'
            disabled={isLoading}
            id='twoFactorCode'
            name='twoFactorCode'
            maxLength={6}
            required
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {state?.errors?.twoFactorCode && <p className='text-error text-sm font-medium'>{state.errors?.twoFactorCode}</p>}
        </div>
        <Button
          variant='primary'
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : 'Verify'}
        </Button>
        {state?.message && <ErrorNotification message={state.message} />}
        {state?.success && <SuccessNotification message={state.success} />}
      </form>
      <Link
        className={cn(
          buttonVariants({ variant: 'outline' })
        )}
        href='/login'
      >
        Back to login
      </Link>
    </div>
  )
}
