import { TwoFactorForm } from '../_components/two-factor-form'

type SearchParams = Promise<{
  token: string
}>

export default async function Page (props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const token = searchParams.token

  return <TwoFactorForm twoFactorId={token} />
}
