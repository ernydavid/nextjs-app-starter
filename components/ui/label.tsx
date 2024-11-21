import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef, LabelHTMLAttributes } from 'react'

const labelVariants = cva(
  'font-medium tracking-tight inline-flex',
  {
    variants: {
      size: {
        default: 'text-sm',
        sm: 'text-xs',
        lg: 'text-base'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
)

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size, className, ...props }, ref) => {
    return (
      <label
        className={cn(
          labelVariants({ size }),
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Label.displayName = 'Label'

export { Label, labelVariants }
