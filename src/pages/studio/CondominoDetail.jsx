import { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'
import {
  User, Mail, Phone, Building2, Home, PieChart, Pencil, Calendar,
  FileText, Download, AlertTriangle, Send, MessageSquare, Wrench,
  Clock, ChevronRight, Euro, CreditCard, Shield,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'

import { condomini } from '../../data/users'
import { buildings, units } from '../../data/buildings'
import { rates } from '../../data/finance'
import { tickets } from '../../data/tickets'
import { documents } from '../../data/documents'
import { delinquencies } from '../../data/delinquency'
import { maintenances } from '../../data/maintenance'
import { assemblies } from '../../data/assemblies'

function fmt(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
}

export default function CondominoDetail() {
  const { id, condominoId } = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  const condomino = condomini.find((c) => c.id === condominoId)
  const building = buildings.find((b) => b.id === id)
  const unit = condomino ? units.find((u) => u.id === condomino.unitId) : null

  const condominoRates = useMemo(() =>
    condomino ? rates.filter((r) => r.condominoId === condominoId && r.buildingId === id)
      .sort((a, b) => b.year !== a.year ? b.year - a.year : a.quarter.localeCompare(b.quarter)) : [],
    [condominoId, id, condomino]
  )
  const condominoTickets = useMemo(() => condomino ? tickets.filter((t) => t.condominoId === condominoId) : [], [condominoId, condomino])
  const condominoDocs = useMemo(() => building ? documents.filter((d) => d.buildingId === id) : [], [id, building])
  const delinquency = useMemo(() => delinquencies.find((d) => d.condominoId === condominoId), [condominoId])
  const buildingMaintenance = useMemo(() => maintenances.filter((m) => m.buildingId === id), [id])
  const buildingAssemblies = useMemo(() => assemblies.filter((a) => a.buildingId === id), [id])

  const totalPaid = condominoRates.filter((r) => r.status === 'pagata').reduce((s, r) => s + r.amount, 0)
  const totalUnpaid = condominoRates.filter((r) => r.status !== 'pagata').reduce((s, r) => s + r.amount, 0)
  const openTickets = condominoTickets.filter((t) => t.status === 'aperto' || t.status === 'in_lavorazione')

  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState({
    name: condomino?.name ?? '',
    email: condomino?.email ?? '',
    phone: condomino?.phone ?? '',
  })

  const handleChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  const handleSave = () => { setEditOpen(false); toast('Anagrafica aggiornata') }

  if (!condomino || !building) {
    return <EmptyState icon={User} title="Condomino non trovato" description="Il condomino richiesto non esiste." />
  }

  return (
    <div>
      <PageHeader
        title={condomino.name}
        breadcrumbs={[
          { label: 'Immobili', to: '/studio/immobili' },
          { label: building.name, to: `/studio/immobili/${id}` },
          { label: condomino.name },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => toast('Invito reinviato a ' + condomino.email)}>
              <Send className="h-3.5 w-3.5" />
              Reinvia Invito
            </Button>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="h-3.5 w-3.5" />
              Modifica
            </Button>
          </div>
        }
      />

      {/* === HERO: Identity + Quick Stats === */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Identity card */}
        <Card variant="elevated" className="lg:col-span-2">
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar name={condomino.name} size="xl" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-gray-800">{condomino.name}</h2>
                  {delinquency && <Badge variant="destructive">Moroso</Badge>}
                </div>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 truncate">
                    <Mail className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />{condomino.email}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />{condomino.phone}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 truncate">
                    <Building2 className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />{building.name}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1.5">
                    <Home className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    {unit ? `Piano ${unit.floor}, Int. ${unit.number} — ${unit.sqm} mq` : '—'}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="primary"><span className="font-mono">{condomino.millesimi}</span> millesimi</Badge>
                  {unit && <Badge variant="default">{unit.type}</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick finance stats */}
        <QuickStat
          icon={Euro}
          iconBg="bg-success-50 text-success-600"
          label="Pagato"
          value={fmt(totalPaid)}
          valueClass="text-success-600"
        />
        <QuickStat
          icon={AlertTriangle}
          iconBg={totalUnpaid > 0 ? 'bg-destructive-50 text-destructive-500' : 'bg-success-50 text-success-600'}
          label="Da pagare"
          value={fmt(totalUnpaid)}
          valueClass={totalUnpaid > 0 ? 'text-destructive-500' : 'text-success-600'}
          sub={openTickets.length > 0 ? `${openTickets.length} ticket aperti` : undefined}
        />
      </div>

      {/* === DELINQUENCY ALERT === */}
      {delinquency && (
        <Card className="border-destructive-200 bg-destructive-50/40 mb-6">
          <CardContent>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-destructive-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-destructive-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive-700">
                    Morosita: {fmt(delinquency.totalOwed)} — {delinquency.monthsOverdue} mesi di ritardo
                  </p>
                  <p className="text-xs text-destructive-500 mt-0.5">
                    Ultimo sollecito: {delinquency.notifications?.length > 0
                      ? new Date(delinquency.notifications[delinquency.notifications.length - 1].date).toLocaleDateString('it-IT')
                      : 'Nessuno'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={delinquency.status} />
                <Button size="sm" variant="destructive" onClick={() => toast('Sollecito inviato a ' + condomino.email)}>
                  <Send className="h-3.5 w-3.5" />
                  Sollecita
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* === MAIN CONTENT: 2 columns === */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT: 2/3 width */}
        <div className="xl:col-span-2 space-y-6">

          {/* Rate */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary-400" />
                  Rate Condominiali
                </CardTitle>
                <Badge variant="default">{condominoRates.filter(r => r.status === 'pagata').length}/{condominoRates.length} pagate</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {condominoRates.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">Nessuna rata registrata</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Periodo</TableHead>
                      <TableHead className="text-right">Importo</TableHead>
                      <TableHead>Scadenza</TableHead>
                      <TableHead>Stato</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {condominoRates.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.quarter} {r.year}</TableCell>
                        <TableCell mono className="text-right">{fmt(r.amount)}</TableCell>
                        <TableCell className="text-gray-500">{new Date(r.dueDate).toLocaleDateString('it-IT')}</TableCell>
                        <TableCell><StatusBadge status={r.status} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Ticket */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-info-500" />
                  Ticket
                </CardTitle>
                {openTickets.length > 0 && <Badge variant="warning">{openTickets.length} aperti</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              {condominoTickets.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Nessun ticket</p>
              ) : (
                <div className="space-y-2">
                  {condominoTickets.map((t) => (
                    <Link key={t.id} to={`/studio/ticket/${t.id}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{t.title}</p>
                        <p className="text-xs text-gray-500">{t.category} · {t.createdDate}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                        <Badge variant={t.priority === 'alta' ? 'destructive' : t.priority === 'media' ? 'warning' : 'default'}>{t.priority}</Badge>
                        <StatusBadge status={t.status} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documenti */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary-400" />
                Documenti Condominiali
              </CardTitle>
            </CardHeader>
            <CardContent>
              {condominoDocs.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Nessun documento</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {condominoDocs.slice(0, 6).map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-3.5 w-3.5 text-primary-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{doc.name}</p>
                        <p className="text-[11px] text-gray-400">{doc.type} · {doc.size}</p>
                      </div>
                      <button className="text-gray-400 hover:text-primary-400 flex-shrink-0" onClick={() => toast('Download: ' + doc.name)}>
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR: 1/3 width */}
        <div className="space-y-6">

          {/* Assemblee del condominio */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary-400" />
                Assemblee
              </CardTitle>
            </CardHeader>
            <CardContent>
              {buildingAssemblies.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Nessuna assemblea</p>
              ) : (
                <div className="space-y-3">
                  {buildingAssemblies.map((a) => (
                    <Link key={a.id} to={`/studio/assemblee/${a.id}`}
                      className="block p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-800 truncate flex-1">{a.title}</p>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={a.status} />
                        <span className="text-xs text-gray-500">
                          {a.date && new Date(a.date).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manutenzioni */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Wrench className="h-4 w-4 text-warning-500" />
                Manutenzioni
              </CardTitle>
            </CardHeader>
            <CardContent>
              {buildingMaintenance.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Nessuna manutenzione</p>
              ) : (
                <div className="space-y-3">
                  {buildingMaintenance.slice(0, 4).map((m) => (
                    <Link key={m.id} to={`/studio/manutenzioni/${m.id}`}
                      className="block p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-800 truncate flex-1">{m.title}</p>
                        <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={m.status} />
                        <span className="text-xs text-gray-500">{m.supplierName}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info rapide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4 text-gray-400" />
                Informazioni
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <InfoLine label="Codice Fiscale" value={condomino.cf || 'Non inserito'} />
                <InfoLine label="Immobile" value={building.name} />
                <InfoLine label="Indirizzo" value={`${building.address}, ${building.city}`} />
                <InfoLine label="Piano / Interno" value={unit ? `${unit.floor} / ${unit.number}` : '—'} />
                <InfoLine label="Superficie" value={unit ? `${unit.sqm} mq` : '—'} />
                <InfoLine label="Millesimi" value={condomino.millesimi} mono />
                <InfoLine label="Tipologia" value={unit?.type || '—'} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title="Modifica Anagrafica"
        footer={<><Button variant="outline" onClick={() => setEditOpen(false)}>Annulla</Button><Button onClick={handleSave}>Salva</Button></>}
      >
        <div className="space-y-4">
          <Input label="Nome" value={form.name} onChange={handleChange('name')} />
          <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} />
          <Input label="Telefono" value={form.phone} onChange={handleChange('phone')} />
        </div>
      </Modal>
    </div>
  )
}

function QuickStat({ icon: Icon, iconBg, label, value, valueClass, sub }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-3 mb-2">
          <div className={`h-9 w-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        </div>
        <p className={`text-xl font-bold font-mono ${valueClass || 'text-gray-800'}`}>{value}</p>
        {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
      </CardContent>
    </Card>
  )
}

function InfoLine({ label, value, mono }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-sm font-medium text-gray-800 ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  )
}
