export function AvatarCardSkeleton () {
  return (
    <div>
      <div className='border rounded-lg bg-card text-sm'>
        <div className='flex items-center justify-between gap-6 p-6'>
          <div className='flex flex-col space-y-4'>
            <div className='w-24 h-5 rounded-lg bg-secondary animate-pulse' />
            <div className='w-40 h-4 rounded-full bg-secondary animate-pulse' />
          </div>
          <div>
            <div
              className='w-20 h-20 rounded-full bg-secondary mx-auto md:mx-0 animate-pulse'
            />
          </div>
        </div>
        <div className='py-3 px-6 border-t border-t-muted flex items-center sm:justify-between justify-end'>
          <div className='hidden sm:block text-sm bg-secondary animate-pulse h-4 w-full max-w-44 rounded-full' />
          <div className='w-28 h-9 rounded-md bg-secondary animate-pulse' />
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton () {
  return (
    <div>
      <div className='border rounded-lg bg-card text-sm'>
        <div className='flex items-center justify-between gap-6 p-6'>
          <div className='flex flex-col space-y-4'>
            <div className='w-24 h-5 rounded-lg bg-secondary animate-pulse' />
            <div className='w-40 h-4 rounded-full bg-secondary animate-pulse' />
            <div className='grid space-y-1 place-content-start'>
              <div className='w-64 h-9 rounded-md bg-secondary animate-pulse' />
            </div>
          </div>
        </div>
        <div className='py-3 px-6 border-t border-t-muted flex items-center sm:justify-between justify-end'>
          <div className='hidden sm:block text-sm bg-secondary animate-pulse h-4 w-full max-w-44 rounded-full' />
          <div className='w-24 h-9 rounded-md bg-secondary animate-pulse' />
        </div>
      </div>
    </div>
  )
}

export function TwoFactorCardSkeleton () {
  return (
    <div>
      <div className='border rounded-lg bg-card text-sm'>
        <div className='flex items-center gap-6 p-6'>
          <div className='w-full flex flex-col space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 rounded-full bg-secondary animate-pulse' />
              <div className='w-24 h-5 rounded-lg bg-secondary animate-pulse' />
            </div>
            <div className='w-40 h-4 rounded-full bg-secondary animate-pulse' />
            <div className='flex items-center justify-between bg-background p-4 rounded-md'>
              <div className='w-72 h-20 rounded-md bg-secondary animate-pulse' />
              <div className='basis-2/6 flex justify-end'>
                <div className='h-8 w-20 rounded-full bg-secondary animate-pulse' />
              </div>
            </div>
          </div>
        </div>
        <div className='py-3 px-6 border-t border-t-muted flex items-center sm:justify-between justify-end'>
          <div className='hidden sm:block text-sm bg-secondary animate-pulse h-4 w-full max-w-44 rounded-full' />
          <div className='w-24 h-9 rounded-md bg-secondary animate-pulse' />
        </div>
      </div>
    </div>
  )
}
