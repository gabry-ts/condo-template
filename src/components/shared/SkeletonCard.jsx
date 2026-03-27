import { cn } from '../../lib/cn'

export function Skeleton({ className }) {
  return <div className={cn('skeleton', className)} />
}

export default function SkeletonCard({ lines = 3, className }) {
  return (
    <div className={cn('bg-white rounded-2xl border border-gray-200 p-6', className)}>
      <Skeleton className="h-4 w-1/3 mb-4" />
      <Skeleton className="h-8 w-1/2 mb-6" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-3 mb-2', i === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-20" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="px-4 py-3 border-b border-gray-50 flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className={cn('h-3', c === 0 ? 'w-32' : 'w-20')} />
          ))}
        </div>
      ))}
    </div>
  )
}
