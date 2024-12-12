import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { geistSans } from '@/components/fonts'
import { ThemeProvider } from '@/components/theme-provider'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'Next.js Starter App',
  description: 'Template to Started WebApp quickly!',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        href: '/icon-light.svg',
        url: '/icon-light.svg'
      },
      {
        media: '(prefers-color-scheme: dark)',
        href: '/icon-dark.svg',
        url: '/icon-dark.svg'
      }
    ]
  }
}

export default function RootLayout ({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang='es'
    >
      <body
        className={cn(
          'min-h-dvh tracking-tight antialiased flex flex-col relative select-none',
          geistSans.className
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
        >
          <div className='flex-1'>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
