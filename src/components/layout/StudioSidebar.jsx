import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import Tooltip from '../ui/Tooltip'
import {
  LayoutDashboard, Building2, Wallet, Truck,
  Wrench, Users, FolderOpen, MessageSquare, ListTodo,
  ChevronLeft, ChevronRight, AlertTriangle, UserCircle, Send, Lock,
} from 'lucide-react'
import { tickets } from '../../data/tickets'
import { useAuth } from '../../context/AuthContext'

const navSections = [
  {
    label: 'Panoramica',
    items: [
      { to: '/studio/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/studio/agenda', icon: ListTodo, label: 'Agenda' },
    ],
  },
  {
    label: 'Patrimonio',
    items: [
      { to: '/studio/immobili', icon: Building2, label: 'Immobili' },
      { to: '/studio/condomini', icon: UserCircle, label: 'Condomini' },
      { to: '/studio/documenti', icon: FolderOpen, label: 'Documenti' },
      { to: '/studio/assemblee', icon: Users, label: 'Assemblee', pro: true },
    ],
  },
  {
    label: 'Economia',
    items: [
      { to: '/studio/finanze', icon: Wallet, label: 'Finanze', pro: true },
      { to: '/studio/morosita', icon: AlertTriangle, label: 'Morosita', pro: true },
    ],
  },
  {
    label: 'Operativo',
    items: [
      { to: '/studio/manutenzioni', icon: Wrench, label: 'Manutenzioni' },
      { to: '/studio/fornitori', icon: Truck, label: 'Fornitori' },
      { to: '/studio/ticket', icon: MessageSquare, label: 'Ticket', pro: true, badge: tickets.filter(t => t.status === 'aperto').length || null },
      { to: '/studio/comunicazioni', icon: Send, label: 'Comunicazioni', pro: true },
    ],
  },
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
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen flex flex-col transition-all duration-300 ease-out z-40 overflow-hidden',
        'bg-gradient-to-b from-primary-500 to-primary-600',
        collapsed ? 'w-[60px]' : 'w-[220px]'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 border-b border-white/8', collapsed ? 'px-2 justify-center' : 'px-4')}>
        <Link to="/" className="flex items-center gap-2.5">
          <div className={cn(
            'rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm',
            collapsed ? 'h-8 w-8' : 'h-9 w-9'
          )}>
            <span className="text-white font-bold text-sm">DM</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-white leading-tight">Domea</span>
              <span className="text-[9px] font-semibold text-primary-200/80 uppercase tracking-widest">Studio</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className={cn('flex-1 py-3 overflow-y-auto', collapsed ? 'px-1' : 'px-2.5')}>
        <div className={collapsed ? 'flex flex-col gap-1.5' : 'flex flex-col gap-4'}>
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-300/60 px-3 mb-1.5">
                  {section.label}
                </p>
              )}
              {collapsed && <div className="h-px bg-white/8 mx-1 mb-1.5" />}
              <div className={collapsed ? 'flex flex-col gap-0.5' : 'flex flex-col gap-1'}>
                {section.items.map((item) => {
                  const active = isActive(item.to)
                  const locked = item.pro && !isPro

                  const link = (
                    <Link
                      key={item.to}
                      to={locked ? '/studio/upgrade' : item.to}
                      className={cn(
                        'flex items-center rounded-xl transition-all duration-150 relative',
                        collapsed ? 'justify-center w-full h-9' : 'gap-3 px-3 h-10',
                        locked
                          ? 'text-primary-300/40 hover:bg-white/5'
                          : active
                            ? 'bg-white/15 text-white shadow-sm shadow-black/10'
                            : 'text-primary-200 hover:bg-white/8 hover:text-white'
                      )}
                    >
                      <item.icon className={cn('h-[18px] w-[18px] flex-shrink-0', active && !locked && 'text-accent-300')} />
                      {!collapsed && (
                        <>
                          <span className={cn('text-[13px] truncate', active && !locked ? 'font-semibold' : 'font-medium')}>
                            {item.label}
                          </span>
                          {locked && (
                            <Lock className="ml-auto h-3 w-3 text-primary-300/40 flex-shrink-0" />
                          )}
                          {!locked && item.badge && (
                            <span className="ml-auto flex-shrink-0 h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-bold text-white bg-accent-400 flex items-center justify-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {collapsed && locked && (
                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary-400/60 flex items-center justify-center">
                          <Lock className="h-2.5 w-2.5 text-primary-200/60" />
                        </span>
                      )}
                      {collapsed && !locked && item.badge && (
                        <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 rounded-full text-[9px] font-bold text-white bg-accent-400 flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      {active && !locked && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent-400 rounded-r-full" />
                      )}
                    </Link>
                  )

                  return collapsed ? (
                    <Tooltip key={item.to} content={locked ? `${item.label} (Pro)` : item.label}>{link}</Tooltip>
                  ) : link
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Upgrade banner for free users */}
      {!isPro && !collapsed && (
        <div className="px-2.5 pb-2">
          <Link to="/studio/upgrade" className="block p-3 rounded-xl bg-accent-400/20 border border-accent-400/30 hover:bg-accent-400/30 transition-colors">
            <p className="text-[11px] font-semibold text-accent-300">Passa a Pro</p>
            <p className="text-[10px] text-primary-200/70 mt-0.5">Sblocca tutte le funzionalita</p>
          </Link>
        </div>
      )}

      {/* Collapse toggle */}
      <div className={cn('border-t border-white/8 py-3', collapsed ? 'px-1.5' : 'px-2.5')}>
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center gap-3 h-9 rounded-xl text-primary-300/70 hover:bg-white/5 hover:text-primary-200 transition-all w-full',
            collapsed ? 'justify-center px-0' : 'px-3'
          )}
          aria-label={collapsed ? 'Espandi' : 'Comprimi'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4 flex-shrink-0" /><span className="text-xs font-medium">Comprimi</span></>}
        </button>
      </div>
    </aside>
  )
}
