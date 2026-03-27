import { Outlet, Link } from 'react-router-dom'
import ConnectBottomNav from './ConnectBottomNav'
import { useAuth } from '../../context/AuthContext'
import { Bell } from 'lucide-react'
import Avatar from '../ui/Avatar'

export default function ConnectLayout() {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'Utente'

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-gray-50">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-2xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name || 'Utente'} size="md" />
            <div>
              <p className="text-base font-semibold text-gray-800 leading-tight">
                <span className="sm:hidden">Ciao, {firstName}!</span>
                <span className="hidden sm:inline">Ciao, {user?.name || 'Utente'}!</span>
              </p>
              <p className="text-xs text-gray-400 font-medium">Domea Connect</p>
            </div>
          </div>
          <Link
            to="/connect/notifiche"
            className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifiche"
          >
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-accent-400 rounded-full ring-2 ring-white" />
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 pb-24 xl:pb-8 animate-page-enter">
        <Outlet />
      </main>

      <ConnectBottomNav />
    </div>
  )
}
