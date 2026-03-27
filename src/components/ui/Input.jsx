import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const Input = forwardRef(({ label, error, className, type = 'text', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-destructive-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={cn(
          'h-10 w-full rounded-lg border bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 focus:border-primary-400',
          'transition-shadow duration-150',
          'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
          error ? 'border-destructive-500 focus:ring-destructive-500' : 'border-gray-200',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive-500">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
