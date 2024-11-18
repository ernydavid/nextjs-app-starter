import { LogoIcon } from '@/components/ui/marketing/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SignUpForm () {
  return (
    <div className='w-full max-w-md px-4 md:px-0 grid gap-6'>
      <LogoIcon className='w-9 h-9 mx-auto' />
      <h2 className='text-center'>Create your account</h2>
      <form
        className='w-full grid gap-4'
        action=''
      >
        <Input
          placeholder='Enter your name'
          type='text'
        />
        <Input
          placeholder='Enter your email'
          type='email'
        />
        <Input
          placeholder='*******'
          type='password'
        />
        <Button
          className='mt-5'
          variant='primary'
        >
          Create account
        </Button>

      </form>
    </div>
  )
}
