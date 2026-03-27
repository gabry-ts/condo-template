import { cn } from '../../lib/cn'

const variants = {
  default: 'bg-gray-100 text-gray-600',
  primary: 'bg-primary-100 text-primary-500',
  accent: 'bg-accent-100 text-accent-500',
  success: 'bg-success-50 text-success-600',
  destructive: 'bg-destructive-50 text-destructive-600',
  warning: 'bg-warning-50 text-warning-600',
  info: 'bg-info-50 text-info-600',
  pro: 'bg-primary-100 text-primary-500 text-[10px] font-semibold uppercase tracking-wider',
}

export default function Badge({ variant = 'default', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
