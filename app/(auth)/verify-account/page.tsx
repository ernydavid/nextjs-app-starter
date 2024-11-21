import { Suspense } from 'react'
import { VerifyEmailToken } from '@/app/(auth)/_components/verify-email-token'

interface Props {
  searchParams: Promise<{
    token: string
  }>
}

export default async function VerificationPage (props: Props) {
  const searchParams = await props.searchParams
  const { token } = searchParams

  return (
    <Suspense fallback={<p>Confirmando token...</p>}>
      <VerifyEmailToken token={token} />
    </Suspense>
  )
}
