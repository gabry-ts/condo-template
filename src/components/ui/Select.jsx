import { forwardRef } from 'react'
import { cn } from '../../lib/cn'
import { ChevronDown } from 'lucide-react'

const Select = forwardRef(({ label, error, options = [], placeholder, className, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-destructive-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'h-10 w-full rounded-xl border bg-white px-4 pr-10 text-sm text-gray-800 appearance-none',
            'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 focus:border-primary-400',
            'transition-shadow duration-150',
            'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
            error ? 'border-destructive-500' : 'border-gray-200',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-destructive-500">{error}</p>}
    </div>
  )
})

Select.displayName = 'Select'
export default Select
