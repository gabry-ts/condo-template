import { cn } from '../../lib/cn'
import { Card } from './Card'

export default function Stat({
  icon: Icon,
  iconColor = 'bg-primary-100 text-primary-500',
  label,
  value,
  trend,
  trendUp,
  className,
  onClick,
}) {
  return (
    <Card hover={!!onClick} className={cn('overflow-hidden', className)} onClick={onClick}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-label text-gray-500 truncate">{label}</span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-gray-800 whitespace-nowrap">{value}</span>
          {trend && (
            <span
              className={cn(
                'text-xs font-medium',
                trendUp ? 'text-success-600' : 'text-destructive-500'
              )}
            >
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
        </div>
        {Icon && (
          <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0', iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </Card>
  )
}
