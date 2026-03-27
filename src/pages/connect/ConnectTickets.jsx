import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import StatusBadge from '../../components/shared/StatusBadge'
import Badge from '../../components/ui/Badge'
import { condomini } from '../../data/users'
import { tickets } from '../../data/tickets'
import {
  Plus, Wrench, Volume2, FileText, AlertTriangle, HelpCircle,
  CalendarDays, TicketCheck,
} from 'lucide-react'

const categoryIcons = {
  Manutenzione: Wrench,
  Disturbo: Volume2,
  Documenti: FileText,
  Strutturale: AlertTriangle,
  Altro: HelpCircle,
}

const categoryColors = {
  Manutenzione: 'bg-blue-50 text-blue-500',
  Disturbo: 'bg-amber-50 text-amber-500',
  Documenti: 'bg-violet-50 text-violet-500',
  Strutturale: 'bg-red-50 text-red-500',
  Altro: 'bg-gray-100 text-gray-500',
}

const categoryBadge = {
  Manutenzione: 'primary',
  Disturbo: 'warning',
  Documenti: 'info',
  Strutturale: 'destructive',
  Altro: 'default',
}

export default function ConnectTickets() {
  const { user } = useAuth()
  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]

  const myTickets = tickets
    .filter((t) => t.condominoId === condomino.id)
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Segnalazioni</h1>
        <p className="text-sm text-gray-500 mt-0.5">Le tue segnalazioni al condominio</p>
      </div>

      {myTickets.length === 0 ? (
        <div className="text-center py-16">
          <div className="h-20 w-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <TicketCheck className="h-10 w-10 text-primary-300" />
          </div>
          <p className="text-lg font-semibold text-gray-700">Nessuna segnalazione</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
            Non hai ancora aperto nessuna segnalazione. Tocca il pulsante + per crearne una!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {myTickets.map((ticket) => {
            const CatIcon = categoryIcons[ticket.category] || HelpCircle
            const catColor = categoryColors[ticket.category] || 'bg-gray-100 text-gray-500'
            return (
              <Link key={ticket.id} to={`/connect/segnalazioni/${ticket.id}`}>
                <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 active:scale-[0.98] transition-transform mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-11 w-11 rounded-xl ${catColor} flex items-center justify-center flex-shrink-0`}>
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-semibold text-gray-800 leading-tight line-clamp-1">
                          {ticket.title}
                        </h3>
                        <StatusBadge status={ticket.status} className="flex-shrink-0" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {ticket.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2.5">
                        <Badge variant={categoryBadge[ticket.category] || 'default'}>
                          {ticket.category}
                        </Badge>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(ticket.createdDate).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Floating Action Button */}
      <Link
        to="/connect/segnalazioni/nuova"
        className="fixed bottom-20 xl:bottom-8 right-4 sm:right-6 z-40 h-14 w-14 rounded-full bg-accent-400 text-white shadow-lg flex items-center justify-center hover:bg-accent-500 active:scale-90 transition-all"
        aria-label="Nuova Segnalazione"
      >
        <Plus className="h-7 w-7" />
      </Link>
    </div>
  )
}
