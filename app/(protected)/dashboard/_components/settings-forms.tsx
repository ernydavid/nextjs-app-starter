'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useActionState, useState } from 'react'
import { Check, Loader2, ShieldCheck } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { ActionState } from '@/lib/definitions'
import { updateName, updatePassword, updateTwoFactor } from './_lib/settings'
import { Label } from '@/components/ui/label'

const initialState: ActionState = {
  errors: {}
}

export function UpdateAvatarForm () {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(updateName, initialState)

  return (
    <form action={action}>
      <div className='border rounded-lg bg-card text-sm'>
        <div className='flex items-center justify-between gap-6 p-6'>
          <div className='flex flex-col space-y-4'>
            <h3>Avatar</h3>
            <p className='text-foreground/80'>
              This is your display name to view in your dashboard and all views of application.
            </p>
            {state?.errors?.name && <p className='text-error text-sm font-medium'>{state.errors?.name}</p>}
          </div>
          <div>
            <div
              className='w-20 h-20 rounded-full cursor-pointer bg-gradient-to-br from-sky-500 to-blue-900 mx-auto md:mx-0'
              role='button'
              tabIndex={0}
              aria-label='Upload avatar'
            />
          </div>
        </div>
        <div className='py-3 px-6 border-t border-t-muted flex items-center sm:justify-between justify-end'>
          <p className='hidden sm:block text-sm text-muted-foreground'>
            An avatar is optional but strongly recommended.
          </p>
          <Button
            type='submit'
            disabled={isLoading}
          >
            Update Avatar
          </Button>
        </div>
      </div>
    </form>
  )
}

export function UpdateNameForm ({ currentName }: {
  currentName: string
}) {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(updateName, {})
  const [isNewName, setIsNewName] = useState(false)

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== currentName) {
      setIsNewName(true)
    }
  }

  return (
    <form action={action}>
      <div className='border rounded-lg bg-card text-sm'>
        <div className='flex items-center justify-between gap-6 p-6'>
          <div className='flex flex-col space-y-4'>
            <h3>Display Name</h3>
            <p className='text-foreground/80'>
              Please enter your full name, or a display name you are comfortable with.
            </p>
            <div className='grid space-y-1 place-content-start'>
              <div className='flex items-center gap-2'>
                <Input
                  id='name'
                  name='name'
                  placeholder='Enter your name'
                  type='text'
                  disabled={isLoading}
                  sizes='sm'
                  defaultValue={currentName}
                  onChange={handleChangeName}
                />
                {state?.success && <Check />}
              </div>
            </div>
          </div>
        </div>
        <div className='py-3 px-6 border-t border-t-muted flex items-center sm:justify-between justify-end'>
          {state?.errors?.name
            ? (
              <p className='text-error text-sm font-medium'>{state.errors?.name}</p>
              )
            : (
              <p className='hidden sm:block text-sm text-muted-foreground'>
                Please use 32 characters at maximum.
              </p>
              )}
          <Button
            type='submit'
            disabled={isLoading || !isNewName}
          >
            {isLoading ? <Loader2 className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export function UpdatePasswordForm () {
  const [state, action, isLoading] = useActionState<ActionState, FormData>(updatePassword, initialState)

  return (
    <form action={action}>
      <div className='border rounded-lg bg-card text-sm'>
        <div className='flex items-center justify-between gap-6 p-6'>
          <div className='flex flex-col space-y-4'>
            <h3>Password</h3>
            <p className='text-foreground/80'>
              If you want to change your password, please type your current password to get a reset password token on your email.
            </p>
            <div className='flex flex-col md:flex-row justify-start md:gap-6 gap-4'>
              <div className='grid space-y-1 place-content-start'>
                <Label htmlFor='password'>Current Password</Label>
                <Input
                  id='password'
                  name='password'
                  placeholder='Enter your current password'
                  type='password'
                  disabled={isLoading}
                  sizes='sm'
                />
                {state?.errors?.password && state.errors.password.map((error, index) => (
                  <p
                    key={index + 1}
                    className='text-error text-sm font-medium'
                  > -{error}
                  </p>
                ))}
              </div>
              <div className='grid space-y-1 place-content-start'>
                <Label htmlFor='newPassword'>New Password</Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='newPassword'
                    name='newPassword'
                    placeholder='Enter your new password'
                    type='password'
                    disabled={isLoading}
                    sizes='sm'
                  />
                  {state?.success && <Check />}
                </div>
                {state?.errors?.newPassword && state.errors.newPassword.map((error, index) => (
                  <p
                    key={index + 1}
                    className='text-error text-sm font-medium'
                  > -{error}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='py-3 px-6 border-t border-t-muted flex items-center sm:justify-between justify-end'>
          {state?.message
            ? (
              <p className='text-error text-sm font-medium'>{state?.message}</p>
              )
            : (
              <p className='hidden sm:block text-sm text-muted-foreground'>
                Please use 8 characters at minimun alternating between letters, numbers and symbols.
              </p>
              )}
          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export function TwoFactorForm ({ twoFactor }: {
  twoFactor: boolean | null
}) {
  const initialState: ActionState = {
    errors: {}
  }

  const [state, action, isLoading] = useActionState<ActionState, FormData>(updateTwoFactor, initialState)

  return (
    <form action={action}>
      <div className='border rounded-lg bg-card text-sm'>
        <div className='flex items-center gap-6 p-6'>
          <div className='w-full flex flex-col space-y-4'>
            <div className='flex items-center gap-4 justify-between'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='flex-shrink-0 h-5 w-5' />
                <h3 className='line-clamp-1'>Two Factor Authentication</h3>
              </div>
              {twoFactor && (
                <div className='flex items-center gap-1 px-3 py-1 text-sm text-success bg-success/30 rounded-lg'><ShieldCheck className='flex-shrink-0 h-4 w-4' /> Active</div>
              )}
            </div>
            <p className='text-foreground/80'>
              Enable or disable Two Factor Authentication by Email.
            </p>
            <div className='flex items-center justify-between bg-background p-4 rounded-md'>
              <div className='basis-4/6'>
                <p>Add an extra layer of security to your account by enabling two-factor authentication. You will receive a token code on your email when you login on website.</p>
              </div>
              <div className='basis-2/6 flex justify-end'>
                <Switch
                  name='twoFactor'
                  id='twoFactor'
                  defaultChecked={twoFactor as boolean}
                />
              </div>
            </div>
            {state?.errors?.name && <p className='text-error text-sm font-medium'>{state.errors?.name}</p>}
          </div>
        </div>
        <div className='py-3 px-6 border-t border-t-muted flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            {state?.message
              ? (
                <p className='text-sm text-destructive'>{state.message}</p>
                )
              : (
                <p className='hidden sm:block text-sm text-muted-foreground'>
                  Learn more about 2FA.
                </p>
                )}
            {state?.success && <Check />}
          </div>
          <Button
            type='submit'
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  )
}
