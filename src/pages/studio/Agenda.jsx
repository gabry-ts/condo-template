import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2, AlertTriangle, Info, Calendar, ArrowUpRight,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import StatusBadge from '../../components/shared/StatusBadge'
import PlanGate from '../../components/shared/PlanGate'
import EmptyState from '../../components/shared/EmptyState'

import { agendaItems } from '../../data/agenda'

const priorityConfig = {
  alta: { color: 'bg-destructive-500', variant: 'destructive', label: 'Alta' },
  media: { color: 'bg-warning-500', variant: 'warning', label: 'Media' },
  bassa: { color: 'bg-info-500', variant: 'info', label: 'Bassa' },
}

const moduleLinks = {
  Finanze: '/studio/finanze',
  Morosita: '/studio/morosita',
  Ticket: '/studio/ticket',
  Assemblee: '/studio/assemblee',
  Manutenzioni: '/studio/manutenzioni',
  Documenti: '/studio/documenti',
  Comunicazioni: '/studio/comunicazioni',
}

export default function Agenda() {
  const navigate = useNavigate()
  const [filterPriority, setFilterPriority] = useState(null)
  const [filterModule, setFilterModule] = useState(null)

  const priorities = ['alta', 'media', 'bassa']
  const modules = [...new Set(agendaItems.map((item) => item.module))]

  const filtered = agendaItems
    .filter((item) => {
      if (filterPriority && item.priority !== filterPriority) return false
      if (filterModule && item.module !== filterModule) return false
      return true
    })
    .sort((a, b) => {
      const pOrder = { alta: 0, media: 1, bassa: 2 }
      if (pOrder[a.priority] !== pOrder[b.priority]) return pOrder[a.priority] - pOrder[b.priority]
      return new Date(a.dueDate) - new Date(b.dueDate)
    })

  const togglePriority = (p) => setFilterPriority(filterPriority === p ? null : p)
  const toggleModule = (m) => setFilterModule(filterModule === m ? null : m)

  const handleItemClick = (item) => {
    const base = moduleLinks[item.module]
    if (base) navigate(base)
  }

  return (
    <PlanGate feature="l'agenda prioritizzata">
      <div>
        <PageHeader
          title="Agenda"
          description={`${agendaItems.length} attivita in programma`}
        />

        {/* Filter chips */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium text-gray-500 self-center mr-1">Priorita:</span>
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => togglePriority(p)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  filterPriority === p
                    ? `${priorityConfig[p].color} text-white border-transparent`
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    filterPriority === p ? 'bg-white' : priorityConfig[p].color
                  }`}
                />
                {priorityConfig[p].label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium text-gray-500 self-center mr-1">Modulo:</span>
            {modules.map((m) => (
              <button
                key={m}
                onClick={() => toggleModule(m)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  filterModule === m
                    ? 'bg-primary-500 text-white border-transparent'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="Tutto in ordine!"
            description="Non ci sono attivita in programma con i filtri selezionati."
            positive
          />
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => {
              const pConfig = priorityConfig[item.priority]
              const isOverdue = new Date(item.dueDate) < new Date()

              return (
                <Card
                  key={item.id}
                  hover
                  className="cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      {/* Priority bar */}
                      <div className={`w-1 h-12 rounded-full flex-shrink-0 ${pConfig.color}`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-gray-800 truncate">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(item.dueDate).toLocaleDateString('it-IT', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          {isOverdue && (
                            <span className="flex items-center gap-1 text-destructive-500 font-medium">
                              <AlertTriangle className="h-3 w-3" />
                              Scaduto
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="primary">{item.module}</Badge>
                        <StatusBadge status={item.status} />
                        <ArrowUpRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </PlanGate>
  )
}
