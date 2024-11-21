export function UserMenuSkeleton () {
  return (
    <div className='w-9 h-9 rounded-full bg-secondary animate-pulse' />
  )
}

export function DashboardSkeleton () {
  return (
    <div className='h-[calc(100dvh-48px)] flex flex-col md:flex-row gap-3'>
      <main className='flex flex-col flex-1'>
        <div className='grid py-36 place-content-center place-items-center gap-6'>
          <div className='h-7 w-52 rounded-full bg-secondary animate-pulse' />
          <div className='h-3 w-40 rounded-full bg-secondary animate-pulse' />
        </div>
      </main>

    </div>
  )
}

export function HeaderSkeleton () {
  return (
    <header className='w-full h-12 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <div className='w-7 h-7 rounded-lg bg-secondary animate-pulse md:hidden flex' />
        <div className='h-4 w-24 bg-secondary rounded-full animate-pulse' />
      </div>
      <div className='h-9 w-9 bg-secondary rounded-full animate-pulse' />
    </header>
  )
}
