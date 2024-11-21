import { AlertCircleIcon } from 'lucide-react'

export function ErrorNotification ({ message }: {
  message?: string | null
}) {
  return (
    <div className='flex items-center gap-2 justify-center bg-error/20 text-error p-2'>
      <AlertCircleIcon className='h-4 w-4 flex-shrink-0' />
      <p className='text-sm leading-tight text-left'>{message}</p>
    </div>
  )
}
