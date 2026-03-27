import { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import { Card } from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'

const phases = [
  'Lettura documento...',
  'Analisi contenuto...',
  'Generazione risultato...',
]

export default function AIProcessing({ onComplete, duration = 3000 }) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = duration / 100
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          onComplete?.()
          return 100
        }
        return p + 1
      })
    }, interval)

    return () => clearInterval(timer)
  }, [duration, onComplete])

  useEffect(() => {
    if (progress < 33) setPhase(0)
    else if (progress < 66) setPhase(1)
    else setPhase(2)
  }, [progress])

  return (
    <Card className="ai-shimmer border-primary-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-primary-400 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary-500 transition-all duration-150">
            {phases[phase]}
          </p>
          <p className="text-xs text-gray-500">Tempo stimato: ~{Math.ceil((duration - (progress * duration / 100)) / 1000)}s</p>
        </div>
      </div>
      <ProgressBar value={progress} color="primary" size="sm" />
    </Card>
  )
}
