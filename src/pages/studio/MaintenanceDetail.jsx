import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  AlertCircle, Building2, User, Tag, Flag, Calendar, Euro, Clock,
  CheckCircle, Play, Pause, Phone, Mail, FileText, Image, Star,
  Users, Home, Receipt
} from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import StatusBadge from '../../components/shared/StatusBadge'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/shared/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { maintenances } from '../../data/maintenance'
import { suppliers } from '../../data/suppliers'
import { buildings, units } from '../../data/buildings'
import { condomini } from '../../data/users'

const priorityVariants = {
  alta: 'destructive',
  media: 'warning',
  bassa: 'default',
}

const statusFlow = {
  in_attesa: { next: 'programmata', label: 'Programma', icon: Calendar },
  programmata: { next: 'in_corso', label: 'Avvia Lavori', icon: Play },
  in_corso: { next: 'completato', label: 'Completa', icon: CheckCircle },
}

const scopeData = {
  m1: { type: 'unit', unitIds: ['u3'] },
  m3: { type: 'building', label: 'Intero Condominio' },
}

const documents = [
  { name: 'Preventivo Fornitore.pdf', icon: FileText, size: '245 KB' },
  { name: 'Foto Prima Intervento.jpg', icon: Image, size: '1.2 MB' },
]

function getTimeline(m) {
  const steps = []
  steps.push({ date: m.createdDate, label: 'Creata', status: 'completato', icon: Clock })
  if (m.scheduledDate) {
    steps.push({ date: m.scheduledDate, label: 'Programmata', status: 'completato', icon: Calendar })
  }
  if (m.status === 'in_corso' || m.status === 'completato') {
    steps.push({ date: m.scheduledDate, label: 'In Corso', status: 'completato', icon: Play })
  }
  if (m.completedDate) {
    steps.push({ date: m.completedDate, label: 'Completata', status: 'completato', icon: CheckCircle })
  }
  return steps
}

function getScope(maintenance) {
  const data = scopeData[maintenance.id]
  if (!data) return { type: 'common', label: 'Parti Comuni' }
  if (data.type === 'building') return data
  const affectedUnits = data.unitIds.map((uid) => {
    const unit = units.find((u) => u.id === uid)
    const cond = condomini.find((c) => c.unitId === uid)
    return { unit, condomino: cond }
  })
  return { type: 'unit', affectedUnits }
}

export default function MaintenanceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const maintenance = maintenances.find((m) => m.id === id)

  if (!maintenance) {
    return (
      <EmptyState
        icon={AlertCircle}
        title="Manutenzione non trovata"
        description="L'intervento richiesto non esiste o e stato rimosso."
        actionLabel="Torna alla lista"
        onAction={() => navigate('/studio/manutenzioni')}
      />
    )
  }

  const timeline = getTimeline(maintenance)
  const nextAction = statusFlow[maintenance.status]
  const supplier = maintenance.supplierId
    ? suppliers.find((s) => s.id === maintenance.supplierId)
    : null
  const scope = getScope(maintenance)

  const laborCost = maintenance.cost * 0.6
  const materialCost = maintenance.cost * 0.3
  const subtotal = laborCost + materialCost
  const iva = subtotal * 0.22
  const total = subtotal + iva

  return (
    <div>
      <PageHeader
        title={maintenance.title}
        breadcrumbs={[
          { label: 'Manutenzioni', to: '/studio/manutenzioni' },
          { label: maintenance.title },
        ]}
        actions={
          nextAction && (
            <Button onClick={() => toast(nextAction.label + ': stato aggiornato')}>
              <nextAction.icon className="h-4 w-4" />
              {nextAction.label}
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info card */}
          <Card>
            <CardHeader>
              <CardTitle>Informazioni</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Building2 className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Immobile</span>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{maintenance.buildingName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Fornitore</span>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {supplier ? (
                        <Link to={`/studio/fornitori/${supplier.id}`} className="text-primary-600 hover:text-primary-700">
                          {supplier.company}
                        </Link>
                      ) : 'Non assegnato'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Categoria</span>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{maintenance.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Flag className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Priorita</span>
                    <div className="mt-0.5">
                      <Badge variant={priorityVariants[maintenance.priority] || 'default'}>
                        {maintenance.priority.charAt(0).toUpperCase() + maintenance.priority.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Stato</span>
                    <div className="mt-0.5">
                      <StatusBadge status={maintenance.status} />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Euro className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Costo</span>
                    <p className="text-sm font-mono font-semibold text-gray-800 mt-0.5">
                      {'\u20AC'} {maintenance.cost.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Data Creazione</span>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      {new Date(maintenance.createdDate).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                </div>
                {maintenance.scheduledDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Data Programmata</span>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">
                        {new Date(maintenance.scheduledDate).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                  </div>
                )}
                {maintenance.completedDate && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-success-500 mt-0.5" />
                    <div>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">Data Completamento</span>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">
                        {new Date(maintenance.completedDate).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descrizione</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">{maintenance.description}</p>
            </CardContent>
          </Card>

          {/* Notes */}
          {maintenance.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">{maintenance.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Scope section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Ambito Intervento
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scope.type === 'building' && (
                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary-500" />
                  <div>
                    <p className="text-sm font-medium text-primary-800">Intero Condominio</p>
                    <p className="text-xs text-primary-600">L'intervento riguarda l'intero edificio</p>
                  </div>
                </div>
              )}
              {scope.type === 'common' && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Parti Comuni</p>
                    <p className="text-xs text-gray-500">L'intervento riguarda le aree comuni dell'edificio</p>
                  </div>
                </div>
              )}
              {scope.type === 'unit' && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">Unita interessate:</p>
                  {scope.affectedUnits.map(({ unit, condomino }) => (
                    <div key={unit.id} className="flex items-center gap-3 p-3 bg-warning-50 rounded-lg">
                      <Home className="h-5 w-5 text-warning-500" />
                      <div>
                        <p className="text-sm font-medium text-warning-800">
                          {unit.number} - Piano {unit.floor}
                        </p>
                        <p className="text-xs text-warning-600">
                          {condomino ? condomino.name : 'Proprietario non disponibile'} &middot; {unit.sqm} mq
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cost breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Dettaglio Costi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Costo Manodopera</span>
                  <span className="text-sm font-mono text-gray-800">
                    {'\u20AC'} {laborCost.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Costo Materiali</span>
                  <span className="text-sm font-mono text-gray-800">
                    {'\u20AC'} {materialCost.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">IVA (22%)</span>
                  <span className="text-sm font-mono text-gray-800">
                    {'\u20AC'} {iva.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-gray-200" />
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-semibold text-gray-800">Totale</span>
                  <span className="text-lg font-mono font-bold text-gray-900">
                    {'\u20AC'} {total.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex items-center gap-2 pt-1">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    Ripartizione: {scope.type === 'building' ? 'Per millesimi di proprieta' : scope.type === 'unit' ? 'Quota fissa al condomino interessato' : 'Per millesimi di proprieta'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback (only for completed) */}
          {maintenance.status === 'completato' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Feedback Condomini
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= 4 ? 'text-warning-400 fill-warning-400' : 'text-warning-400 fill-warning-400 opacity-50'}`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-800">4.5 / 5</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 italic">"Intervento rapido e professionale"</p>
                  <p className="text-xs text-gray-500 mt-2">Valutazione media basata su 3 risposte</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Cronologia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6">
                <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {timeline.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-3">
                      <div className="absolute -left-6 top-0.5 h-5 w-5 rounded-full bg-white border-2 border-primary-300 flex items-center justify-center">
                        <step.icon className="h-3 w-3 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{step.label}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(step.date).toLocaleDateString('it-IT')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplier contact card */}
          {supplier && (
            <Card>
              <CardHeader>
                <CardTitle>Contatto Fornitore</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{supplier.company}</p>
                    <p className="text-xs text-gray-500">{supplier.category}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-3.5 w-3.5 text-gray-400" />
                    {supplier.contact}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    {supplier.email}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <a href={`tel:${supplier.phone}`} className="flex-1">
                      <Button variant="outline" className="w-full text-xs">
                        <Phone className="h-3.5 w-3.5" />
                        Chiama
                      </Button>
                    </a>
                    <a href={`mailto:${supplier.email}`} className="flex-1">
                      <Button variant="outline" className="w-full text-xs">
                        <Mail className="h-3.5 w-3.5" />
                        Email
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Documenti</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.name} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <doc.icon className="h-4 w-4 text-gray-400 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-700 truncate">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.size}</p>
                    </div>
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
