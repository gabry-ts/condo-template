import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { condomini } from '../../data/users'
import { maintenances } from '../../data/maintenance'
import { Wrench, CalendarDays, HardHat, AlertTriangle } from 'lucide-react'

const priorityConfig = {
  alta: { variant: 'destructive', label: 'Alta' },
  media: { variant: 'warning', label: 'Media' },
  bassa: { variant: 'default', label: 'Bassa' },
}

export default function ConnectMaintenance() {
  const { user } = useAuth()
  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]

  const myMaintenances = maintenances
    .filter((m) => m.buildingId === condomino.buildingId)
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))

  return (
    <div className="space-y-8">
      <PageHeader
        title="Manutenzioni"
        description="Interventi di manutenzione del tuo condominio"
      />

      {myMaintenances.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="Nessuna manutenzione"
          description="Non ci sono manutenzioni in programma per il tuo condominio."
        />
      ) : (
        <div className="space-y-6">
          {myMaintenances.map((m) => (
            <Card key={m.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Wrench className="h-6 w-6 text-primary-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{m.title}</CardTitle>
                      <p className="text-base text-gray-500 mt-0.5">{m.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={priorityConfig[m.priority]?.variant || 'default'}>
                      {priorityConfig[m.priority]?.label || m.priority}
                    </Badge>
                    <StatusBadge status={m.status} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base text-gray-700 leading-relaxed mb-4">{m.description}</p>
                {m.notes && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-gray-600 mb-1">Note</p>
                    <p className="text-base text-gray-700">{m.notes}</p>
                  </div>
                )}
                <div className="flex flex-wrap items-center gap-6 text-base text-gray-600">
                  {m.supplierName && (
                    <div className="flex items-center gap-2">
                      <HardHat className="h-5 w-5 text-gray-400" />
                      {m.supplierName}
                    </div>
                  )}
                  {m.scheduledDate && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                      Programmata: {new Date(m.scheduledDate).toLocaleDateString('it-IT')}
                    </div>
                  )}
                  {m.completedDate && (
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-gray-400" />
                      Completata: {new Date(m.completedDate).toLocaleDateString('it-IT')}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
