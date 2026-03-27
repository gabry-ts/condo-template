import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/shared/EmptyState'
import { connectNotifications } from '../../data/connectNotifications'
import {
  Bell, BellOff, MessageSquare, CreditCard, CalendarDays,
  FileText, AlertTriangle, CheckCheck, Mail, Wrench,
} from 'lucide-react'

const typeIcons = {
  ticket: MessageSquare,
  rate: CreditCard,
  assemblea: CalendarDays,
  documento: FileText,
  pagamento: CreditCard,
  morosita: AlertTriangle,
  comunicazione: Mail,
  manutenzione: Wrench,
}

export default function ConnectNotifications() {
  const [items, setItems] = useState(connectNotifications)
  const unreadCount = items.filter((n) => !n.read).length

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))

  const handleClick = (id) => {
    setItems((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifiche"
        description={unreadCount > 0 ? `${unreadCount} non lette` : 'Tutte lette'}
        actions={unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="h-4 w-4" />Segna tutte
          </Button>
        )}
      />

      {items.length === 0 ? (
        <EmptyState icon={BellOff} title="Nessuna notifica" description="Non hai notifiche al momento." />
      ) : (
        <div className="space-y-2">
          {items.map((n) => {
            const Icon = typeIcons[n.type] || Bell
            return (
              <Link
                key={n.id}
                to={n.link}
                onClick={() => handleClick(n.id)}
                className={`block rounded-2xl border transition-all ${!n.read ? 'border-primary-200 bg-primary-50/30' : 'border-gray-100 bg-white'}`}
              >
                <div className="flex items-start gap-3 p-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-gray-100' : 'bg-primary-100'}`}>
                    <Icon className={`h-5 w-5 ${n.read ? 'text-gray-400' : 'text-primary-400'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`text-sm ${n.read ? 'font-medium text-gray-600' : 'font-semibold text-gray-800'}`}>{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                      </div>
                      {!n.read && <div className="h-2.5 w-2.5 rounded-full bg-primary-400 flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      {new Date(n.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
