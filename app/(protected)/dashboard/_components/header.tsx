import { BreadCrumb } from './breadcrumb'
import { UserMenu } from './user-menu'
import { Suspense } from 'react'
import { UserMenuSkeleton } from '@/components/skeletons'
import { getUser } from '@/lib/dal'

export async function DashboardHeader () {
  // to simulate request time of server
  // delete this on production
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const userPromise = getUser()

  return (
    <header className='w-full h-14 flex items-center justify-between gap-3 bg-background md:bg-none'>
      <BreadCrumb />
      <Suspense fallback={<UserMenuSkeleton />}>
        <UserMenu user={userPromise} />
      </Suspense>
    </header>
  )
}
