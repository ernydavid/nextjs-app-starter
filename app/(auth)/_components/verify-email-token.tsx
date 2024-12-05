import { verifyToken } from '@/lib/tokens'
import { LoaderIcon } from 'lucide-react'
import Link from 'next/link'

export async function VerifyEmailToken ({ token }: {
  token: string
}) {
  const confirmationToken = await verifyToken(token)

  if (!confirmationToken.error && !confirmationToken.success) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center gap-2'>
        <p>Verifying email...</p>
        <LoaderIcon className='w-5 h-5' />
      </div>
    )
  }

  if (confirmationToken.error) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center gap-2'>
        <p>Something went wrong!</p>
        <p>{confirmationToken.error}</p>
      </div>
    )
  }

  if (confirmationToken.success) {
    return (
      <div className='mx-auto flex flex-col items-center justify-center gap-2'>
        <p>{confirmationToken.success}</p>
        <Link href='/dashboard'>
          Go to dashboard
        </Link>
      </div>
    )
  }
}
