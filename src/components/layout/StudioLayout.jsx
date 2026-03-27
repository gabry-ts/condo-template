import { useState, useRef } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/cn'
import StudioSidebar from './StudioSidebar'
import BottomNav from './BottomNav'
import NotificationBell from '../shared/NotificationBell'
import { useAuth } from '../../context/AuthContext'
import { UserCircle, CreditCard, LogOut, HelpCircle, Settings, ChevronDown, Menu } from 'lucide-react'
import Avatar from '../ui/Avatar'

export default function StudioLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [profileOpen, setProfileOpen] = useState(false)
  const profileTimeout = useRef(null)

  const handleProfileEnter = () => { clearTimeout(profileTimeout.current); setProfileOpen(true) }
  const handleProfileLeave = () => { profileTimeout.current = setTimeout(() => setProfileOpen(false), 200) }
  const handleLogout = () => { setProfileOpen(false); logout(); navigate('/login') }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar — desktop only */}
      <div className="hidden md:block">
        <StudioSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} plan={user?.plan} />
      </div>

      {/* Top bar — full width, always on top */}
      <header className={cn(
        'fixed top-0 right-0 z-30 h-14 flex items-center justify-between transition-all duration-300',
        'bg-white border-b border-gray-200/80',
        collapsed ? 'md:left-[60px]' : 'md:left-[220px]',
        'left-0'
      )}>
        <div className="flex items-center gap-3 px-4 md:px-6">
          {/* Mobile hamburger */}
          <button className="md:hidden h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </button>

          {/* Logo on mobile */}
          <Link to="/studio/dashboard" className="md:hidden flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">DM</span>
            </div>
            <span className="text-sm font-bold text-gray-800">Domea</span>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 px-4 md:px-6">
          <NotificationBell notificationsPath="/studio/comunicazioni" />

          <div className="w-px h-5 bg-gray-200 mx-1.5" />

          {/* Profile */}
          <div className="relative" onMouseEnter={handleProfileEnter} onMouseLeave={handleProfileLeave}>
            <button
              onClick={() => navigate('/studio/profilo')}
              className="flex items-center gap-2 px-1.5 py-1 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Avatar name={user?.name || 'Admin'} size="sm" />
              <div className="hidden lg:block text-left max-w-[140px]">
                <p className="text-[13px] font-medium text-gray-800 leading-tight truncate">{user?.name || 'Admin'}</p>
              </div>
              <ChevronDown className={cn('h-3 w-3 text-gray-400 hidden lg:block transition-transform duration-200', profileOpen && 'rotate-180')} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl border border-gray-200/80 shadow-lg z-50 animate-fade-in overflow-hidden">
                <div className="px-3.5 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                  <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                </div>
                <div className="py-0.5">
                  <DLink to="/studio/profilo" icon={UserCircle} label="Profilo" onClick={() => setProfileOpen(false)} />
                  <DLink to="/studio/abbonamento" icon={CreditCard} label="Abbonamento" onClick={() => setProfileOpen(false)} />
                  <DLink to="/studio/impostazioni-studio" icon={Settings} label="Impostazioni" onClick={() => setProfileOpen(false)} />
                  <DLink to="/studio/aiuto" icon={HelpCircle} label="Aiuto" onClick={() => setProfileOpen(false)} />
                </div>
                <div className="border-t border-gray-100 py-0.5">
                  <button onClick={handleLogout} className="flex items-center gap-2 px-3.5 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full">
                    <LogOut className="h-3.5 w-3.5" />Esci
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content area */}
      <div className={cn(
        'pt-14 transition-all duration-300',
        collapsed ? 'md:ml-[60px]' : 'md:ml-[220px]'
      )}>
        <main className="p-4 md:p-8 pb-20 md:pb-8 animate-page-enter">
          <Outlet />
        </main>
      </div>

      <BottomNav portal="studio" />
    </div>
  )
}

function DLink({ to, icon: Icon, label, onClick }) {
  return (
    <Link to={to} onClick={onClick} className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
      <Icon className="h-3.5 w-3.5 text-gray-400" />{label}
    </Link>
  )
}
