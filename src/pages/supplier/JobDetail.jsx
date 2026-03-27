import { useParams, useNavigate } from 'react-router-dom'
import {
  Building2, Tag, Flag, Calendar, Euro, Clock, CheckCircle, AlertCircle,
} from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import StatusBadge from '../../components/shared/StatusBadge'
import Badge from '../../components/ui/Badge'
import { maintenances } from '../../data/maintenance'

const priorityVariant = {
  alta: 'destructive',
  media: 'warning',
  bassa: 'default',
}

const infoItems = (job) => [
  { icon: Building2, label: 'Immobile', value: job.buildingName },
  { icon: Tag, label: 'Categoria', value: job.category },
  { icon: Flag, label: 'Priorita', value: job.priority, badge: true },
  { icon: Calendar, label: 'Data Programmata', value: job.scheduledDate || '-' },
  { icon: Clock, label: 'Data Creazione', value: job.createdDate },
  { icon: Euro, label: 'Costo', value: job.cost.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }), mono: true },
]

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const job = maintenances.find((m) => m.id === id)

  if (!job) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-500">Lavoro non trovato</p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={job.title}
        breadcrumbs={[
          { label: 'I Miei Lavori', to: '/fornitore/lavori' },
          { label: job.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dettagli Lavoro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-6">
                {job.description || `Intervento di ${job.category.toLowerCase()} presso ${job.buildingName}.`}
              </p>

              {job.notes && (
                <div className="p-4 rounded-xl bg-gray-50 mt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Note</p>
                  <p className="text-sm text-gray-700">{job.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {job.scope && (
            <Card>
              <CardHeader>
                <CardTitle>Ambito Intervento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{job.scope}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Stato</span>
                  <StatusBadge status={job.status} />
                </div>
                {infoItems(job).map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{item.label}</span>
                    </div>
                    {item.badge ? (
                      <Badge variant={priorityVariant[item.value]}>
                        {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                      </Badge>
                    ) : (
                      <span className={`text-sm font-medium text-gray-800 ${item.mono ? 'font-mono' : ''}`}>
                        {item.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
