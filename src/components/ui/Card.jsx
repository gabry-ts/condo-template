import { cn } from '../../lib/cn'

const variants = {
  default: 'bg-white border border-gray-200 shadow-sm',
  elevated: 'bg-white border border-primary-200 shadow-md ring-1 ring-primary-100',
  muted: 'bg-gray-50 border border-gray-200',
  ai: 'bg-gradient-to-br from-primary-50 to-info-50 border border-primary-200',
  alert: 'bg-warning-50 border border-warning-100',
  danger: 'bg-destructive-50 border border-destructive-100',
  success: 'bg-success-50 border border-success-100',
}

export function Card({ variant = 'default', hover = false, className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        variants[variant],
        hover && 'card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children }) {
  return <div className={cn('flex flex-col gap-1.5 mb-4', className)}>{children}</div>
}

export function CardTitle({ className, children }) {
  return <h3 className={cn('text-lg font-display font-semibold text-gray-800', className)}>{children}</h3>
}

export function CardDescription({ className, children }) {
  return <p className={cn('text-sm text-gray-500', className)}>{children}</p>
}

export function CardContent({ className, children }) {
  return <div className={cn('', className)}>{children}</div>
}

export function CardFooter({ className, children }) {
  return <div className={cn('flex items-center gap-3 mt-4 pt-4 border-t border-gray-200', className)}>{children}</div>
}
