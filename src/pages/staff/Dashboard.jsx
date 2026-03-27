import { Link } from 'react-router-dom'
import { MessageSquare, Wrench, ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react'

import Stat from '../../components/ui/Stat'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/shared/StatusBadge'

import { tickets } from '../../data/tickets'
import { maintenances } from '../../data/maintenance'

export default function Dashboard() {
  const openTickets = tickets.filter((t) => t.status === 'aperto' || t.status === 'in_lavorazione')
  const resolvedTickets = tickets.filter((t) => t.status === 'risolto' || t.status === 'completato')
  const activeMaintenance = maintenances.filter((m) => m.status === 'in_corso' || m.status === 'programmata')
  const completedMaintenance = maintenances.filter((m) => m.status === 'completato')

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, 4)

  const recentMaintenance = [...maintenances]
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, 4)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          icon={MessageSquare}
          iconColor="bg-warning-50 text-warning-600"
          label="Ticket Aperti"
          value={openTickets.length}
        />
        <Stat
          icon={CheckCircle}
          iconColor="bg-success-50 text-success-600"
          label="Ticket Risolti"
          value={resolvedTickets.length}
        />
        <Stat
          icon={Wrench}
          iconColor="bg-primary-100 text-primary-500"
          label="Manutenzioni Attive"
          value={activeMaintenance.length}
        />
        <Stat
          icon={AlertTriangle}
          iconColor="bg-info-50 text-info-500"
          label="Manutenzioni Completate"
          value={completedMaintenance.length}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Ticket Recenti</CardTitle>
              <Link to="/staff/ticket" className="text-sm text-primary-400 hover:text-primary-500 font-medium flex items-center gap-1">
                Vedi tutti <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{ticket.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {ticket.buildingName} &middot; {ticket.condominoName}
                    </p>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Manutenzioni Recenti</CardTitle>
              <Link to="/staff/manutenzioni" className="text-sm text-primary-400 hover:text-primary-500 font-medium flex items-center gap-1">
                Vedi tutte <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMaintenance.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{m.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {m.buildingName} &middot; {m.supplierName || 'Non assegnato'}
                    </p>
                  </div>
                  <StatusBadge status={m.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/staff/ticket">
          <Button variant="primary">
            <MessageSquare className="h-4 w-4 mr-2" />
            Gestisci Ticket
          </Button>
        </Link>
        <Link to="/staff/manutenzioni">
          <Button variant="outline">
            <Wrench className="h-4 w-4 mr-2" />
            Gestisci Manutenzioni
          </Button>
        </Link>
      </div>
    </div>
  )
}
