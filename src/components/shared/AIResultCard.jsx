import { Sparkles } from 'lucide-react'
import { Card } from '../ui/Card'
import Badge from '../ui/Badge'

export default function AIResultCard({ title, confidence, children, className }) {
  return (
    <Card variant="ai" className={className}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-semibold text-primary-500">{title || 'Analisi AI'}</span>
        </div>
        <Badge variant="pro">AI</Badge>
      </div>
      {children}
      {confidence && (
        <div className="mt-3 pt-3 border-t border-primary-200/50">
          <span className="text-xs text-gray-500">
            Confidenza: <span className="font-mono font-medium text-primary-500">{confidence}%</span>
          </span>
        </div>
      )}
    </Card>
  )
}
