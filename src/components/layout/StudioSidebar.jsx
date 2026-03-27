import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import {
  Grid3X3, Building, Wallet2, Truck, PenTool, UsersRound,
  FolderClosed, MessagesSquare, CalendarClock, TriangleAlert,
  Contact, SendHorizonal, PanelLeftClose, PanelLeftOpen, LockKeyhole, Sparkle,
} from 'lucide-react'
import { tickets } from '../../data/tickets'
import { useAuth } from '../../context/AuthContext'

const nav = [
  { to: '/studio/dashboard', icon: Grid3X3, label: 'Dashboard' },
  { to: '/studio/agenda', icon: CalendarClock, label: 'Agenda' },
  { type: 'divider' },
  { to: '/studio/immobili', icon: Building, label: 'Immobili' },
  { to: '/studio/condomini', icon: Contact, label: 'Condomini' },
  { to: '/studio/documenti', icon: FolderClosed, label: 'Documenti' },
  { to: '/studio/assemblee', icon: UsersRound, label: 'Assemblee', pro: true },
  { type: 'divider' },
  { to: '/studio/finanze', icon: Wallet2, label: 'Finanze', pro: true },
  { to: '/studio/morosita', icon: TriangleAlert, label: 'Morosita', pro: true },
  { type: 'divider' },
  { to: '/studio/manutenzioni', icon: PenTool, label: 'Manutenzioni' },
  { to: '/studio/fornitori', icon: Truck, label: 'Fornitori' },
  { to: '/studio/ticket', icon: MessagesSquare, label: 'Ticket', pro: true, badge: tickets.filter(t => t.status === 'aperto').length || null },
  { to: '/studio/comunicazioni', icon: SendHorizonal, label: 'Comunicazioni', pro: true },
]

export default function StudioSidebar({ collapsed, onToggle }) {
  const location = useLocation()
  const { user } = useAuth()
  const isPro = user?.plan === 'pro' || user?.role === 'superuser'

  const isActive = (to) => {
    if (to === '/studio/dashboard') return location.pathname === '/studio/dashboard' || location.pathname === '/studio'
    return location.pathname.startsWith(to)
  }

  return (
    <aside className={cn(
      'fixed top-0 left-0 h-screen flex flex-col transition-all duration-200 z-40 overflow-hidden',
      'bg-gray-950 text-gray-400',
      collapsed ? 'w-14' : 'w-56'
    )}>
      {/* Brand */}
      <div className={cn('flex items-center h-14 shrink-0', collapsed ? 'justify-center' : 'px-4')}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-accent-400 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-extrabold text-white tracking-tight">DM</span>
          </div>
          {!collapsed && <span className="text-sm font-bold text-white tracking-tight">Domea</span>}
        </Link>
      </div>

      {/* Nav */}
      <nav className={cn('flex-1 overflow-y-auto py-2', collapsed ? 'px-1.5' : 'px-2')}>
        {nav.map((item, i) => {
          if (item.type === 'divider') {
            return <div key={`d${i}`} className={cn('my-2', collapsed ? 'mx-1 h-px bg-gray-800' : 'mx-2 h-px bg-gray-800/60')} />
          }

          const active = isActive(item.to)
          const locked = item.pro && !isPro

          return (
            <Link
              key={item.to}
              to={locked ? '/studio/upgrade' : item.to}
              className={cn(
                'flex items-center rounded-md mb-0.5 transition-colors duration-100 relative group',
                collapsed ? 'justify-center h-9 w-full' : 'gap-2.5 h-9 px-2.5',
                locked
                  ? 'text-gray-700 hover:text-gray-600'
                  : active
                    ? 'bg-white/[0.08] text-white'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
              )}
            >
              <item.icon className={cn('h-4 w-4 shrink-0', active && !locked && 'text-accent-400')} strokeWidth={active ? 2 : 1.5} />

              {!collapsed && (
                <>
                  <span className={cn('text-[13px] truncate', active && !locked ? 'font-semibold text-white' : 'font-medium')}>
                    {item.label}
                  </span>
                  {locked && <LockKeyhole className="ml-auto h-3 w-3 text-gray-700 shrink-0" />}
                  {!locked && item.badge && (
                    <span className="ml-auto h-4.5 min-w-[18px] px-1 rounded text-[10px] font-bold text-accent-400 bg-accent-400/10 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {collapsed && locked && (
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-gray-800 flex items-center justify-center">
                  <LockKeyhole className="h-2 w-2 text-gray-600" />
                </span>
              )}
              {collapsed && !locked && item.badge && (
                <span className="absolute -top-0.5 -right-0.5 h-3.5 min-w-[14px] px-0.5 rounded text-[8px] font-bold text-accent-400 bg-gray-800 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade */}
      {!isPro && !collapsed && (
        <div className="px-2 pb-2">
          <Link to="/studio/upgrade" className="flex items-center gap-2 p-2.5 rounded-md bg-accent-400/10 hover:bg-accent-400/15 transition-colors">
            <Sparkle className="h-3.5 w-3.5 text-accent-400" />
            <div>
              <p className="text-[11px] font-semibold text-accent-400">Passa a Pro</p>
              <p className="text-[9px] text-gray-600">Sblocca tutto</p>
            </div>
          </Link>
        </div>
      )}

      {/* Toggle */}
      <div className={cn('shrink-0 border-t border-gray-800/60 py-2', collapsed ? 'px-1.5' : 'px-2')}>
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center h-8 rounded-md text-gray-600 hover:text-gray-400 hover:bg-white/[0.04] transition-colors w-full',
            collapsed ? 'justify-center' : 'gap-2.5 px-2.5'
          )}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <><PanelLeftClose className="h-4 w-4 shrink-0" /><span className="text-xs">Comprimi</span></>}
        </button>
      </div>
    </aside>
  )
}
