import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import {
  LayoutDashboard, Building2, ListTodo, MessageSquare, Menu,
  Home, Wallet, AlertCircle, FileText,
} from 'lucide-react'

const studioItems = [
  { to: '/studio/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/studio/immobili', icon: Building2, label: 'Immobili' },
  { to: '/studio/agenda', icon: ListTodo, label: 'Agenda' },
  { to: '/studio/ticket', icon: MessageSquare, label: 'Ticket' },
  { to: '/studio/more', icon: Menu, label: 'Altro' },
]

const connectItems = [
  { to: '/connect/home', icon: Home, label: 'Home' },
  { to: '/connect/finanze', icon: Wallet, label: 'Finanze' },
  { to: '/connect/segnalazioni', icon: AlertCircle, label: 'Segnalazioni' },
  { to: '/connect/documenti', icon: FileText, label: 'Documenti' },
  { to: '/connect/more', icon: Menu, label: 'Altro' },
]

export default function BottomNav({ portal = 'studio' }) {
  const location = useLocation()
  const items = portal === 'connect' ? connectItems : studioItems

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-14">
        {items.map((item) => {
          const active = location.pathname.startsWith(item.to.replace('/more', ''))
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors relative',
                active ? 'text-primary-500' : 'text-gray-400'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {active && (
                <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary-500" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
