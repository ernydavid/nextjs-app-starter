'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { SunIcon, MonitorSmartphone, MoonIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle () {
  const { setTheme, theme } = useTheme()
  const [enabledTheme, setEnabledTheme] = React.useState('')
  const spanRef = React.useRef<HTMLSpanElement | null>(null)
  const [isPending, startTransition] = React.useTransition()

  React.useEffect(() => {
    if (theme) {
      setEnabledTheme(theme)
    }
  }, [theme])

  return (
    <button
      className='h-7 w-7'
      onClick={() => {
        startTransition(() => {
          const currentTheme = spanRef.current?.textContent

          if (currentTheme === 'system') {
            setTheme('light')
          } else if (currentTheme === 'light') {
            setTheme('dark')
          } else {
            setTheme('system')
          }
        })
      }}
    >
      {enabledTheme === 'light'
        ? <SunIcon className={cn(
          'w-5 h-5',
          isPending && 'animate-spin'
        )}
          />
        : enabledTheme === 'dark'
          ? <MoonIcon className={cn(
            'w-5 h-5',
            isPending && 'animate-spin'
          )}
            />
          : enabledTheme === 'system' && (
            <MonitorSmartphone className={cn(
              'w-5 h-5',
              isPending && 'animate-spin'
            )}
            />
          )}
      <span ref={spanRef} className='sr-only'>{enabledTheme}</span>
    </button>
  )
}
