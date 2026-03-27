import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard, Users, CreditCard, Activity,
  ChevronLeft, ChevronRight, LogOut,
} from 'lucide-react'
import { useState } from 'react'
import Avatar from '../ui/Avatar'

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/amministratori', icon: Users, label: 'Gestione Utenti' },
  { to: '/admin/piani', icon: CreditCard, label: 'Piani' },
  { to: '/admin/sistema', icon: Activity, label: 'Sistema' },
]

export default function SuperuserLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-250 z-40',
          collapsed ? 'w-16' : 'w-56'
        )}
      >
        <div className="flex items-center h-14 px-3 border-b border-gray-700">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gray-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">DM</span>
              </div>
              <span className="text-sm font-bold text-gray-100">Superuser</span>
            </div>
          ) : (
            <div className="h-8 w-8 rounded-lg bg-gray-600 flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-xs">DM</span>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex items-center gap-3 px-3 h-10 rounded-xl transition-colors',
                  active
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-700 py-3 px-2 space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 h-10 rounded-xl text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 transition-colors w-full"
          >
            {collapsed ? <ChevronRight className="h-5 w-5 mx-auto" /> : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Comprimi</span>
              </>
            )}
          </button>
        </div>
      </aside>

      <div className={cn('transition-all duration-250', collapsed ? 'ml-16' : 'ml-56')}>
        <header className="sticky top-0 z-30 bg-gray-800/80 backdrop-blur-md border-b border-gray-700">
          <div className="flex items-center justify-between h-14 px-8">
            <span className="text-sm text-gray-400">Pannello Amministrazione</span>
            <div className="flex items-center gap-3">
              <Avatar name={user?.name || 'Superuser'} size="sm" />
              <Link to="/login" className="h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gray-700 transition-colors">
                <LogOut className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </header>

        <main className="p-8 animate-page-enter bg-gray-50 min-h-[calc(100vh-56px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
