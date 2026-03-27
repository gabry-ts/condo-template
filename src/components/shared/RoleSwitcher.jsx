import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Settings, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

const roleRoutes = {
  admin: '/studio/dashboard',
  staff: '/studio/dashboard',
  condomino: '/connect/home',
  fornitore: '/fornitore/dashboard',
  superuser: '/admin/dashboard',
}

const roleLabels = {
  admin: 'Amministratore',
  staff: 'Staff',
  condomino: 'Condomino',
  fornitore: 'Fornitore',
  superuser: 'Superuser',
}

export default function RoleSwitcher() {
  const [open, setOpen] = useState(false)
  const { user, switchRole, switchPlan } = useAuth()
  const navigate = useNavigate()

  const handleSwitch = (role) => {
    switchRole(role)
    navigate(roleRoutes[role])
    setOpen(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[200] md:bottom-8 md:right-8">
      <div className={cn(
        'bg-gray-800 text-white rounded-2xl shadow-2xl transition-all duration-200 overflow-hidden',
        open ? 'w-64' : 'w-auto'
      )}>
        {open && (
          <div className="p-4 animate-fade-in">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Dev Tools</p>

            <div className="space-y-1 mb-4">
              <p className="text-xs text-gray-400 mb-1">Ruolo</p>
              {Object.entries(roleLabels).map(([role, label]) => (
                <button
                  key={role}
                  onClick={() => handleSwitch(role)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                    user?.role === role
                      ? 'bg-primary-400 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {(user?.role === 'admin' || user?.role === 'staff') && (
              <div className="space-y-1 pt-3 border-t border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Piano</p>
                {['free', 'pro'].map((plan) => (
                  <button
                    key={plan}
                    onClick={() => switchPlan(plan)}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors capitalize',
                      user?.plan === plan
                        ? 'bg-accent-400 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    )}
                  >
                    {plan === 'free' ? 'Freemium' : 'Pro'}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-700/50 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm font-medium">
            {roleLabels[user?.role]} {user?.plan ? `(${user.plan})` : ''}
          </span>
          {open ? <ChevronDown className="h-4 w-4 ml-auto" /> : <ChevronUp className="h-4 w-4 ml-auto" />}
        </button>
      </div>
    </div>
  )
}
