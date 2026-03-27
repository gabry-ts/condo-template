import { useParams, useNavigate } from 'react-router-dom'
import { Send, Calendar, Mail, FileText, Scale, AlertCircle } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import StatusBadge from '../../components/shared/StatusBadge'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/shared/EmptyState'
import PlanGate from '../../components/shared/PlanGate'
import { useToast } from '../../components/ui/Toast'
import { delinquencies } from '../../data/delinquency'

const typeIcons = {
  email: Mail,
  raccomandata: FileText,
  legale: Scale,
}

const typeVariants = {
  email: 'info',
  raccomandata: 'warning',
  legale: 'destructive',
}

export default function DelinquencyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const delinquency = delinquencies.find((d) => d.id === id)

  if (!delinquency) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Morosita non trovata"
        description="La pratica richiesta non esiste o e stata rimossa."
        actionLabel="Torna alla lista"
        onAction={() => navigate('/studio/morosita')}
      />
    )
  }

  return (
    <PlanGate feature="la gestione morosita">
    <div>
      <PageHeader
        title={delinquency.condominoName}
        breadcrumbs={[
          { label: 'Morosita', to: '/studio/morosita' },
          { label: delinquency.condominoName },
        ]}
        actions={
          <Button onClick={() => toast('Sollecito inviato a ' + delinquency.condominoName)}>
            <Send className="h-4 w-4" />
            Invia Sollecito
          </Button>
        }
      />

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Informazioni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Condomino</span>
              <p className="text-sm font-medium text-gray-800 mt-1">{delinquency.condominoName}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Immobile</span>
              <p className="text-sm font-medium text-gray-800 mt-1">{delinquency.buildingName}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Importo Dovuto</span>
              <p className="text-sm font-mono font-semibold text-destructive-500 mt-1">
                € {delinquency.totalOwed.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Mesi di Ritardo</span>
              <p className="text-sm font-medium text-gray-800 mt-1">{delinquency.monthsOverdue} mesi</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Ultimo Pagamento</span>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {new Date(delinquency.lastPayment).toLocaleDateString('it-IT')}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Stato</span>
              <div className="mt-1">
                <StatusBadge status={delinquency.status} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cronologia Notifiche</CardTitle>
        </CardHeader>
        <CardContent>
          {delinquency.notifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">Nessuna notifica inviata</p>
          ) : (
            <div className="relative pl-6">
              <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200" />
              <div className="space-y-6">
                {delinquency.notifications.map((n, i) => {
                  const Icon = typeIcons[n.type] || Mail
                  const variant = typeVariants[n.type] || 'default'
                  return (
                    <div key={i} className="relative flex items-start gap-4">
                      <div className="absolute -left-6 top-0.5 h-5 w-5 rounded-full bg-white border-2 border-primary-300 flex items-center justify-center">
                        <Icon className="h-3 w-3 text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-800">
                            {new Date(n.date).toLocaleDateString('it-IT')}
                          </span>
                          <Badge variant={variant}>
                            {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{n.message}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </PlanGate>
  )
}
