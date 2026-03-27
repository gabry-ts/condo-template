import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import {
  Home, Building2, Wallet, Users, AlertCircle,
  FileText, Truck, Wrench, Bell, UserCircle,
} from 'lucide-react'

const navItems = [
  { to: '/connect/home', icon: Home, label: 'Home' },
  { to: '/connect/immobili', icon: Building2, label: 'I Miei Immobili' },
  { to: '/connect/finanze', icon: Wallet, label: 'Finanze' },
  { to: '/connect/assemblee', icon: Users, label: 'Assemblee' },
  { to: '/connect/segnalazioni', icon: AlertCircle, label: 'Segnalazioni' },
  { to: '/connect/documenti', icon: FileText, label: 'Documenti' },
  { to: '/connect/fornitori', icon: Truck, label: 'Fornitori' },
  { to: '/connect/manutenzioni', icon: Wrench, label: 'Manutenzioni' },
  { to: '/connect/notifiche', icon: Bell, label: 'Notifiche' },
  { to: '/connect/profilo', icon: UserCircle, label: 'Profilo' },
]

export default function ConnectSidebar() {
  const location = useLocation()
  const isActive = (to) => location.pathname.startsWith(to)

  return (
    <aside className="fixed top-0 left-0 h-screen w-[220px] bg-white border-r border-gray-200 flex flex-col z-40">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">DM</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-800">Domea</span>
            <span className="text-[10px] font-medium text-primary-400 uppercase tracking-wider">Connect</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 px-3 h-10 rounded-xl transition-colors duration-150',
                active
                  ? 'bg-primary-50 text-primary-500 font-medium border-l-[3px] border-primary-400 pl-[9px]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
