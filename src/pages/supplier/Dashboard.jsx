import { Link } from 'react-router-dom'
import { Wrench, CheckCircle, CreditCard, ChevronRight } from 'lucide-react'

import Stat from '../../components/ui/Stat'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import StatusBadge from '../../components/shared/StatusBadge'
import Badge from '../../components/ui/Badge'

import { suppliers } from '../../data/suppliers'
import { maintenances } from '../../data/maintenance'

const currentSupplierId = 's1'

export default function Dashboard() {
  const supplier = suppliers.find((s) => s.id === currentSupplierId)
  const myJobs = maintenances.filter((m) => m.supplierId === currentSupplierId)
  const activeJobs = myJobs.filter((m) => m.status === 'in_corso' || m.status === 'programmata' || m.status === 'in_attesa')
  const completedJobs = myJobs.filter((m) => m.status === 'completato')

  const recentJobs = [...myJobs]
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Benvenuto, {supplier?.company}
        </h1>
        <p className="text-base text-gray-500 mt-1">Ecco il riepilogo della tua attivita</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Stat
          icon={Wrench}
          iconColor="bg-primary-100 text-primary-500"
          label="Lavori Attivi"
          value={activeJobs.length}
        />
        <Stat
          icon={CheckCircle}
          iconColor="bg-success-50 text-success-600"
          label="Lavori Completati"
          value={completedJobs.length}
        />
        <Stat
          icon={CreditCard}
          iconColor="bg-warning-50 text-warning-600"
          label="Pagamenti in Attesa"
          value={
            <span className="font-mono">
              {(supplier?.totalUnpaid || 0).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
            </span>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle>Lavori Recenti</CardTitle>
            <Link to="/fornitore/lavori" className="text-sm text-primary-400 hover:text-primary-500 font-medium flex items-center gap-1">
              Vedi tutti <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentJobs.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">Nessun lavoro assegnato.</p>
          ) : (
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/fornitore/lavori/${job.id}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{job.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {job.buildingName} &middot; {job.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-gray-700">
                      {job.cost.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                    </span>
                    <StatusBadge status={job.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
