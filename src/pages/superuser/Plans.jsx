import { useState } from 'react'
import {
  Crown, Users, TrendingUp, Euro, Pencil,
  CreditCard, AlertCircle, CheckCircle,
  Receipt, ExternalLink,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import Stat from '../../components/ui/Stat'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import Input from '../../components/ui/Input'
import Modal from '../../components/ui/Modal'
import Tabs from '../../components/ui/Tabs'
import SearchBar from '../../components/shared/SearchBar'
import { useToast } from '../../components/ui/Toast'

import { admins } from '../../data/users'

const planVariant = { pro: 'accent', free: 'default' }

const mockSubscriptions = [
  { id: 's1', adminName: 'Marco Bianchi', studio: 'Studio Bianchi Amministrazioni', plan: 'pro', status: 'active', amount: 29, startDate: '2025-01-15', nextBilling: '2026-04-15', paymentMethod: 'Visa **** 4242', lastPayment: '2026-03-15', lastPaymentStatus: 'paid' },
  { id: 's2', adminName: 'Francesca Moretti', studio: 'Moretti Gestioni', plan: 'pro', status: 'active', amount: 29, startDate: '2025-06-03', nextBilling: '2026-04-03', paymentMethod: 'Mastercard **** 8910', lastPayment: '2026-03-03', lastPaymentStatus: 'paid' },
  { id: 's3', adminName: 'Roberto Colombo', studio: 'Colombo & Associati', plan: 'free', status: 'active', amount: 0, startDate: '2025-09-22', nextBilling: null, paymentMethod: null, lastPayment: null, lastPaymentStatus: null },
]

const mockPayments = [
  { id: 'p1', date: '2026-03-15', admin: 'Marco Bianchi', amount: 29, status: 'paid', invoice: 'INV-2026-045' },
  { id: 'p2', date: '2026-03-03', admin: 'Francesca Moretti', amount: 29, status: 'paid', invoice: 'INV-2026-038' },
  { id: 'p3', date: '2026-02-15', admin: 'Marco Bianchi', amount: 29, status: 'paid', invoice: 'INV-2026-022' },
  { id: 'p4', date: '2026-02-03', admin: 'Francesca Moretti', amount: 29, status: 'paid', invoice: 'INV-2026-015' },
  { id: 'p5', date: '2026-01-15', admin: 'Marco Bianchi', amount: 29, status: 'paid', invoice: 'INV-2026-008' },
  { id: 'p6', date: '2026-01-03', admin: 'Francesca Moretti', amount: 29, status: 'failed', invoice: 'INV-2026-003' },
]

export default function Plans() {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [editPlan, setEditPlan] = useState(null)

  const [planConfigs, setPlanConfigs] = useState({
    free: { name: 'Freemium', price: 0, period: 'mese', trialDays: 0, description: 'Per iniziare a digitalizzare la gestione condominiale', maxBuildings: 3, maxStorage: '500 MB' },
    pro: { name: 'Pro', price: 29, period: 'mese', trialDays: 14, description: 'Tutto il necessario per gestire al meglio i tuoi condomini', maxBuildings: 0, maxStorage: 'Illimitato' },
  })

  const proCount = mockSubscriptions.filter((s) => s.plan === 'pro' && s.status === 'active').length
  const freeCount = mockSubscriptions.filter((s) => s.plan === 'free').length
  const mrr = mockSubscriptions.filter((s) => s.plan === 'pro' && s.status === 'active').reduce((sum, s) => sum + s.amount, 0)
  const arr = mrr * 12

  const filteredSubs = mockSubscriptions.filter((s) =>
    s.adminName.toLowerCase().includes(search.toLowerCase()) ||
    s.studio.toLowerCase().includes(search.toLowerCase())
  )

  const handleSavePlan = () => {
    toast('Piano aggiornato: ' + editPlan.name)
    setPlanConfigs((prev) => ({ ...prev, [editPlan.id]: { ...prev[editPlan.id], ...editPlan } }))
    setEditPlan(null)
  }

  const subscriptionsTab = (
    <div className="space-y-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Cerca amministratore..." className="w-72" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Amministratore</TableHead>
            <TableHead>Piano</TableHead>
            <TableHead>Importo</TableHead>
            <TableHead>Prossima Fatturazione</TableHead>
            <TableHead>Metodo Pagamento</TableHead>
            <TableHead>Ultimo Pagamento</TableHead>
            <TableHead>Stato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubs.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar name={sub.adminName} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{sub.adminName}</p>
                    <p className="text-xs text-gray-500">{sub.studio}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell><Badge variant={planVariant[sub.plan]}>{sub.plan === 'pro' ? 'Pro' : 'Freemium'}</Badge></TableCell>
              <TableCell mono>{sub.amount > 0 ? `EUR ${sub.amount},00/mese` : 'Gratuito'}</TableCell>
              <TableCell>{sub.nextBilling ? new Date(sub.nextBilling).toLocaleDateString('it-IT') : '—'}</TableCell>
              <TableCell>
                {sub.paymentMethod ? (
                  <div className="flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-sm text-gray-600">{sub.paymentMethod}</span>
                  </div>
                ) : '—'}
              </TableCell>
              <TableCell>
                {sub.lastPayment ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-gray-600">{new Date(sub.lastPayment).toLocaleDateString('it-IT')}</span>
                    {sub.lastPaymentStatus === 'paid' ? <CheckCircle className="h-3.5 w-3.5 text-success-500" /> : <AlertCircle className="h-3.5 w-3.5 text-destructive-500" />}
                  </div>
                ) : '—'}
              </TableCell>
              <TableCell><Badge variant={sub.status === 'active' ? 'success' : 'warning'}>{sub.status === 'active' ? 'Attivo' : 'Scaduto'}</Badge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  const paymentsTab = (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Amministratore</TableHead>
          <TableHead>Importo</TableHead>
          <TableHead>Fattura</TableHead>
          <TableHead>Stato</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockPayments.map((p) => (
          <TableRow key={p.id}>
            <TableCell>{new Date(p.date).toLocaleDateString('it-IT')}</TableCell>
            <TableCell className="font-medium">{p.admin}</TableCell>
            <TableCell mono>EUR {p.amount},00</TableCell>
            <TableCell>
              <button className="text-sm text-primary-400 hover:text-primary-500 flex items-center gap-1" onClick={() => toast('Download ' + p.invoice)}>
                <Receipt className="h-3.5 w-3.5" />{p.invoice}
              </button>
            </TableCell>
            <TableCell>{p.status === 'paid' ? <Badge variant="success">Pagato</Badge> : <Badge variant="destructive">Fallito</Badge>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const plansConfigTab = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(planConfigs).map(([key, plan]) => (
        <Card key={key} variant={key === 'pro' ? 'elevated' : 'default'}>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl ${key === 'pro' ? 'bg-accent-100' : 'bg-gray-100'} flex items-center justify-center`}>
                  <Crown className={`h-5 w-5 ${key === 'pro' ? 'text-accent-500' : 'text-gray-500'}`} />
                </div>
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditPlan({ id: key, ...plan })}>
                <Pencil className="h-3.5 w-3.5" />Modifica
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <InfoRow label="Prezzo" value={plan.price === 0 ? 'Gratuito' : `EUR ${plan.price},00/${plan.period}`} bold />
              <InfoRow label="Periodo di prova" value={plan.trialDays > 0 ? `${plan.trialDays} giorni` : 'Nessuno'} />
              <InfoRow label="Max immobili" value={plan.maxBuildings === 0 ? 'Illimitati' : plan.maxBuildings} />
              <InfoRow label="Storage" value={plan.maxStorage} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Users className="h-3.5 w-3.5" />{key === 'pro' ? proCount : freeCount} abbonati attivi
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  const tabs = [
    { id: 'abbonamenti', label: 'Abbonamenti', content: subscriptionsTab },
    { id: 'pagamenti', label: 'Storico Pagamenti', content: paymentsTab },
    { id: 'configurazione', label: 'Configurazione Piani', content: plansConfigTab },
  ]

  return (
    <div>
      <PageHeader title="Piani e Abbonamenti" description="Gestione abbonamenti, pagamenti e configurazione piani"
        actions={<Button variant="outline" size="sm" onClick={() => toast('Apertura dashboard Stripe...', 'info')}><ExternalLink className="h-3.5 w-3.5" />Dashboard Stripe</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Stat icon={Crown} iconColor="bg-accent-50 text-accent-500" label="Abbonati Pro" value={proCount} />
        <Stat icon={Users} iconColor="bg-gray-100 text-gray-500" label="Freemium" value={freeCount} />
        <Stat icon={Euro} iconColor="bg-success-50 text-success-600" label="MRR" value={<span className="font-mono">EUR {mrr},00</span>} trend={`ARR: EUR ${arr.toLocaleString('it-IT')}`} trendUp />
        <Stat icon={TrendingUp} iconColor="bg-info-50 text-info-500" label="Conversione" value={`${Math.round((proCount / (proCount + freeCount)) * 100)}%`} />
      </div>

      <Tabs tabs={tabs} defaultTab="abbonamenti" />

      <Modal open={!!editPlan} onClose={() => setEditPlan(null)} title={`Modifica Piano ${editPlan?.name || ''}`} size="md"
        footer={<><Button variant="outline" onClick={() => setEditPlan(null)}>Annulla</Button><Button onClick={handleSavePlan}>Salva Modifiche</Button></>}
      >
        {editPlan && (
          <div className="space-y-4">
            <Input label="Nome Piano" value={editPlan.name} onChange={(e) => setEditPlan({ ...editPlan, name: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Prezzo (EUR)" type="number" value={editPlan.price} onChange={(e) => setEditPlan({ ...editPlan, price: Number(e.target.value) })} />
              <Input label="Periodo" value={editPlan.period} onChange={(e) => setEditPlan({ ...editPlan, period: e.target.value })} placeholder="mese / anno" />
            </div>
            <Input label="Giorni di Prova" type="number" value={editPlan.trialDays} onChange={(e) => setEditPlan({ ...editPlan, trialDays: Number(e.target.value) })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Max Immobili (0 = illimitati)" type="number" value={editPlan.maxBuildings} onChange={(e) => setEditPlan({ ...editPlan, maxBuildings: Number(e.target.value) })} />
              <Input label="Storage" value={editPlan.maxStorage} onChange={(e) => setEditPlan({ ...editPlan, maxStorage: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrizione</label>
              <textarea className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 min-h-[80px] resize-y"
                value={editPlan.description} onChange={(e) => setEditPlan({ ...editPlan, description: e.target.value })} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

function InfoRow({ label, value, bold }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm ${bold ? 'font-bold font-mono' : 'font-medium'} text-gray-800`}>{value}</span>
    </div>
  )
}
