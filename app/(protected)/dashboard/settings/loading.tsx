import { AvatarCardSkeleton, CardSkeleton, TwoFactorCardSkeleton } from '../_components/skeletons'

export default function Loading () {
  return (
    <div className='w-full space-y-6'>
      <AvatarCardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <TwoFactorCardSkeleton />
    </div>
  )
}
