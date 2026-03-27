import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm',
  secondary: 'bg-primary-100 text-primary-500 hover:bg-primary-200',
  accent: 'bg-accent-400 text-white hover:bg-accent-500 shadow-sm',
  outline: 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  destructive: 'bg-destructive-500 text-white hover:bg-destructive-600',
  success: 'bg-success-500 text-white hover:bg-success-600',
  link: 'text-primary-400 underline-offset-4 hover:underline bg-transparent',
  pro: 'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-md hover:shadow-lg',
}

const sizes = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-10 px-6 text-sm',
  lg: 'h-12 px-8 text-base',
  xl: 'h-14 px-10 text-lg',
  icon: 'h-10 w-10 p-0 justify-center',
  'icon-sm': 'h-8 w-8 p-0 justify-center text-xs',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  pill = false,
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 font-medium transition-colors duration-150 btn-press focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        pill ? 'rounded-full' : 'rounded-xl',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
