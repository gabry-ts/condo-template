import { cn } from '../../lib/cn'
import { CheckCircle } from 'lucide-react'

export default function QuorumMeter({ current, required, total = 1000, label = 'Quorum' }) {
  const pct = (current / total) * 100
  const reached = current >= required
  const requiredPct = (required / total) * 100

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        {reached && (
          <span className="flex items-center gap-1.5 text-sm font-medium text-success-600">
            <CheckCircle className="h-4 w-4" />
            Quorum raggiunto!
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-stat text-gray-800">{current}</span>
        <span className="text-lg text-gray-400">/ {total}</span>
        <span className="text-sm text-gray-500 ml-1">millesimi</span>
      </div>

      <div className="relative">
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              reached ? 'bg-success-500' : pct > requiredPct * 0.8 ? 'bg-warning-500' : 'bg-gray-300'
            )}
            style={{
              width: `${Math.min(100, pct)}%`,
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        </div>
        <div
          className="absolute top-0 h-4 border-r-2 border-dashed border-gray-400"
          style={{ left: `${requiredPct}%` }}
        />
        <div
          className="absolute -top-6 text-[10px] font-mono text-gray-500 -translate-x-1/2"
          style={{ left: `${requiredPct}%` }}
        >
          {required}
        </div>
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>0</span>
        <span>{total}</span>
      </div>
    </div>
  )
}
