import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { InputHTMLAttributes, forwardRef } from 'react'

const inputVariants = cva(
  'inline-flex items-center tracking-tight whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-foreground border border-muted placeholder:text-muted-foreground',
        filled: 'bg-secondary/10 dark:bg-secondary/40 text-foreground placeholder:text-muted-foreground'
      },
      sizes: {
        default: 'h-10 px-4',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      sizes: 'default'
    }
  }
)

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, sizes, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          inputVariants({ variant, sizes }),
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
