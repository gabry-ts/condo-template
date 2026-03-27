import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Bell, X, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import { notifications } from '../../data/notifications'

function timeAgo(dateStr) {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now - date) / 1000)
  if (diff < 60) return 'Ora'
  if (diff < 3600) return `${Math.floor(diff / 60)} min fa`
  if (diff < 86400) return `${Math.floor(diff / 3600)} ore fa`
  if (diff < 172800) return 'Ieri'
  return `${Math.floor(diff / 86400)} giorni fa`
}

export default function NotificationBell({ notificationsPath = '/studio/comunicazioni' }) {
  const [open, setOpen] = useState(false)
  const timeoutRef = useRef(null)
  const unread = notifications.filter((n) => !n.read).length

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        to={notificationsPath}
        className="relative h-9 w-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        aria-label="Notifiche"
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {unread > 0 && (
          <span className="absolute top-0.5 right-0.5 h-4 w-4 bg-accent-400 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
            {unread}
          </span>
        )}
      </Link>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray-200 shadow-lg z-50 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800">Notifiche</h3>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.slice(0, 5).map((n) => (
              <Link
                key={n.id}
                to={n.link}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors',
                  !n.read && 'bg-primary-50/50'
                )}
              >
                <div className="flex items-start gap-2">
                  {!n.read && <span className="h-2 w-2 bg-accent-400 rounded-full mt-1.5 flex-shrink-0" />}
                  <div className="min-w-0">
                    <p className="text-sm text-gray-700 font-medium truncate">{n.title}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{n.body}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{timeAgo(n.date)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to={notificationsPath}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-primary-500 hover:bg-primary-50 transition-colors rounded-b-2xl"
            onClick={() => setOpen(false)}
          >
            Vedi tutte le notifiche
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  )
}
