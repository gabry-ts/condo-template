import { Link, Outlet, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Briefcase, Wallet, UserCircle, Bell } from 'lucide-react'
import Avatar from '../ui/Avatar'

const navItems = [
  { to: '/fornitore/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/fornitore/lavori', icon: Briefcase, label: 'Lavori' },
  { to: '/fornitore/pagamenti', icon: Wallet, label: 'Pagamenti' },
  { to: '/fornitore/profilo', icon: UserCircle, label: 'Profilo' },
]

export default function FornitoreLayout() {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 glass border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-accent-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">DM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 leading-tight">Domea</span>
                  <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Fornitore</span>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      location.pathname.startsWith(item.to)
                        ? 'text-accent-500 bg-accent-50'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors" aria-label="Notifiche">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <Avatar name={user?.name || 'Fornitore'} size="sm" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 pb-20 md:pb-8 animate-page-enter">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden safe-area-pb">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors',
                  active ? 'text-accent-500' : 'text-gray-400'
                )}
              >
                <item.icon className={cn('h-5 w-5', active && 'fill-current')} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
