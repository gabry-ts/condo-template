import { useAuth } from '../../context/AuthContext'
import { Lock, Sparkles } from 'lucide-react'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

export default function PlanGate({ children, feature = 'questa funzionalita' }) {
  const { user } = useAuth()

  if (user?.plan === 'pro' || user?.role === 'superuser') {
    return children
  }

  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[300px]">
      <div className="filter blur-[3px] pointer-events-none select-none max-h-[500px] overflow-hidden" aria-hidden="true">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/95 flex items-center justify-center z-10">
        <div className="text-center max-w-sm p-8">
          <div className="h-14 w-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-7 w-7 text-primary-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Funzionalita Pro</h3>
          <p className="text-sm text-gray-500 mb-6">
            Passa al piano Pro per accedere a {feature} e sbloccare tutte le funzionalita avanzate.
          </p>
          <Link to="/studio/upgrade">
            <Button variant="pro">
              <Lock className="h-4 w-4" />
              Passa a Pro
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
