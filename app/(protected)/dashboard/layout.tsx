import { ReactNode, Suspense } from 'react'
import { AsideBar } from './_components/aside-bar'
import { DashboardHeader } from './_components/header'
import { HeaderSkeleton } from '@/components/skeletons'

export default function DashboardLayout ({ children }: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className='h-[calc(100dvh-48px)] flex flex-col md:flex-row gap-3'>
      <AsideBar />
      <main className='flex-1 px-4 overflow-y-auto'>
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
