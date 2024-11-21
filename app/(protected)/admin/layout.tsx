import { ReactNode } from 'react'

export default function AdminLayout ({ children }: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className='min-h-dvh flex flex-col md:flex-row'>
      {/** Aside bar */}
      <main className='flex flex-col flex-1'>
        <header>Admin Header</header>
        {children}
      </main>
    </div>
  )
}
