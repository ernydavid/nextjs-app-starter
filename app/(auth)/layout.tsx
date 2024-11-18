import { ReactNode } from 'react'

export default function AuthLayout ({ children }: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className='w-full min-h-[calc(100dvh-48px)] flex justify-center items-center'>
      {children}
    </div>
  )
}
