import { CheckCircle } from 'lucide-react'

export function SuccessNotification ({ message }: {
  message?: string | null
}) {
  return (
    <div className='flex items-center gap-2 justify-center bg-success/20 text-success p-2'>
      <CheckCircle className='h-4 w-4 flex-shrink-0' />
      <p className='text-sm leading-tight text-left'>{message}</p>
    </div>
  )
}
