import { cn } from '../../lib/cn'

const colors = {
  primary: 'bg-primary-400',
  accent: 'bg-accent-400',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  destructive: 'bg-destructive-500',
}

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'primary',
  label,
  showValue = false,
  size = 'md',
  className,
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-gray-600">{label}</span>}
          {showValue && (
            <span className="text-sm font-mono font-medium text-gray-700">
              {value}/{max}
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-gray-100 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-400',
            colors[color]
          )}
          style={{
            width: `${pct}%`,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />
      </div>
    </div>
  )
}
