import { buttonVariants } from '@/components/ui/button'
import { verifyPasswordResetToken } from '@/lib/tokens'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { NewPasswordForm } from '../_components/new-password-form'

type SearchParams = Promise<{
  token: string
}>

export default async function Page (props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const { token } = searchParams

  const verifiedToken = await verifyPasswordResetToken(token)

  if (verifiedToken.error) {
    return (
      <div className='w-full flex flex-col justify-center items-center gap-2 text-center'>
        <p>Oppss... Something went wrong.</p>
        <p className='text-sm text-muted-foreground'>{verifiedToken.error}</p>
        <Link
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' })
          )}
          href='/login'
        >
          Go to login
        </Link>
      </div>
    )
  }

  if (verifiedToken.success) {
    return <NewPasswordForm token={verifiedToken.success} />
  }
}
