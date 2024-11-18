import { LogoIcon } from '@/components/ui/marketing/logo'
import { ThemeToggle } from '@/components/theme-toggle'

export function Footer () {
  return (
    <footer className='h-12 flex items-center justify-between gap-6 px-4'>
      <LogoIcon />
      <ThemeToggle />
    </footer>
  )
}
