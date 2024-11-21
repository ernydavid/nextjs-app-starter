import { LogoIcon } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'

export function Footer () {
  return (
    <footer className='h-12 flex items-center justify-between gap-6 px-4 border-t border-t-muted'>
      <LogoIcon />
      <ThemeToggle />
    </footer>
  )
}
