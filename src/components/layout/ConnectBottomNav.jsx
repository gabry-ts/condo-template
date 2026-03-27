import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import {
  Home, Wallet, AlertCircle, FileText, Menu,
} from 'lucide-react'

const items = [
  { to: '/connect/home', icon: Home, label: 'Home' },
  { to: '/connect/finanze', icon: Wallet, label: 'Finanze' },
  { to: '/connect/segnalazioni', icon: AlertCircle, label: 'Segnalazioni' },
  { to: '/connect/documenti', icon: FileText, label: 'Documenti' },
  { to: '/connect/more', icon: Menu, label: 'Altro' },
]

export default function ConnectBottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 xl:hidden safe-area-pb">
      <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
          {items.map((item) => {
            const active = location.pathname.startsWith(item.to.replace('/more', ''))
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200',
                  active
                    ? 'text-primary-400'
                    : 'text-gray-400 active:scale-95'
                )}
              >
                <item.icon
                  className={cn(
                    'h-6 w-6 transition-transform duration-200',
                    active && 'scale-110 fill-current'
                  )}
                />
                <span className={cn(
                  'text-[11px] font-medium',
                  active && 'font-semibold'
                )}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
