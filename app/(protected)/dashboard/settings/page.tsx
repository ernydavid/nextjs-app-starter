import { TwoFactorForm, UpdateAvatarForm, UpdateNameForm, UpdatePasswordForm } from '@/app/(protected)/dashboard/_components/settings-forms'
import { getUser } from '@/lib/dal'

export default async function Page () {
  // this simulated request server time
  // delete on production
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const user = await getUser()

  return (
    <div className='w-full space-y-6'>
      <UpdateAvatarForm />
      <UpdateNameForm currentName={user.name as string} />
      <UpdatePasswordForm />
      <TwoFactorForm twoFactor={user.isTwoFactor} />
    </div>
  )
}
