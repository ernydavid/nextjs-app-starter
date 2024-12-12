import { ReactNode, Suspense } from 'react'
import { AsideBar } from './_components/aside-bar'
import { DashboardHeader } from './_components/header'
import { HeaderSkeleton } from '@/components/skeletons'

export default function DashboardLayout ({ children }: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className='flex min-h-[calc(100dvh-48px)] flex-col md:flex-row gap-3'>
      <AsideBar />
      <main className='px-4 flex-1'>
        <Suspense fallback={<HeaderSkeleton />}>
          <DashboardHeader />
        </Suspense>
        <div className='py-6'>
          {children}
        </div>
      </main>

    </div>
  )
}
