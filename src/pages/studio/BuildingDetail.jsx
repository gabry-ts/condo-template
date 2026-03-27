import { useMemo, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useToast } from '../../components/ui/Toast'
import {
  Building2, MapPin, CreditCard, Calendar, Layers, ArrowUpDown, Flame,
  FileText, Download, Mail, Phone, Plus, Users, Wrench, MessageSquare,
  AlertTriangle, ChevronRight, Euro, Wallet, Receipt, Send, Clock,
  Paperclip, Eye,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Avatar from '../../components/ui/Avatar'
import Stat from '../../components/ui/Stat'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import PlanGate from '../../components/shared/PlanGate'

import { buildings, units } from '../../data/buildings'
import { condomini } from '../../data/users'
import { transactions, rates } from '../../data/finance'
import { documents } from '../../data/documents'
import { tickets } from '../../data/tickets'
import { maintenances } from '../../data/maintenance'
import { assemblies } from '../../data/assemblies'
import { delinquencies } from '../../data/delinquency'
import { communications } from '../../data/communications'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/cn'

function fmt(a) { return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(a) }
function fmtDate(d) { return new Date(d).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }) }

const tabConfig = [
  { id: 'panoramica', label: 'Panoramica' },
  { id: 'condomini', label: 'Condomini' },
  { id: 'unita', label: 'Unita' },
  { id: 'finanze', label: 'Finanze' },
  { id: 'ticket', label: 'Ticket' },
  { id: 'manutenzioni', label: 'Manutenzioni' },
  { id: 'assemblee', label: 'Assemblee' },
  { id: 'morosita', label: 'Morosita' },
  { id: 'comunicazioni', label: 'Comunicazioni' },
  { id: 'documenti', label: 'Documenti' },
]

export default function BuildingDetail() {
  const { id } = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const [tab, setTab] = useState('panoramica')

  const building = buildings.find((b) => b.id === id)
  const bUnits = useMemo(() => units.filter((u) => u.buildingId === id), [id])
  const bCond = useMemo(() => condomini.filter((c) => c.buildingId === id), [id])
  const bTx = useMemo(() => [...transactions].filter((t) => t.buildingId === id).sort((a, b) => new Date(b.date) - new Date(a.date)), [id])
  const bRates = useMemo(() => rates.filter((r) => r.buildingId === id), [id])
  const bDocs = useMemo(() => documents.filter((d) => d.buildingId === id), [id])
  const bTk = useMemo(() => tickets.filter((t) => t.buildingId === id), [id])
  const bMa = useMemo(() => maintenances.filter((m) => m.buildingId === id), [id])
  const bAs = useMemo(() => assemblies.filter((a) => a.buildingId === id), [id])
  const bDel = useMemo(() => delinquencies.filter((d) => d.buildingId === id), [id])
  const bCom = useMemo(() => communications.filter((c) => c.buildingId === id).sort((a, b) => new Date(b.sentDate) - new Date(a.sentDate)), [id])

  const { user } = useAuth()
  const isPro = user?.plan === 'pro' || user?.role === 'superuser'
  const G = ({ f, children }) => isPro ? children : <PlanGate feature={f}>{children}</PlanGate>

  if (!building) return <EmptyState icon={Building2} title="Immobile non trovato" />

  const totIn = bTx.filter((t) => t.type === 'entrata').reduce((s, t) => s + t.amount, 0)
  const totOut = bTx.filter((t) => t.type === 'uscita').reduce((s, t) => s + Math.abs(t.amount), 0)
  const openTk = bTk.filter((t) => t.status === 'aperto' || t.status === 'in_lavorazione')
  const actMa = bMa.filter((m) => m.status !== 'completato')
  const unpaid = bRates.filter((r) => r.status !== 'pagata')
  const nextAs = bAs.find((a) => a.status === 'convocata' || a.status === 'bozza')

  const content = {
    panoramica: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Mini icon={Layers} label="Unita" value={bUnits.length} />
          <Mini icon={Users} label="Condomini" value={bCond.length} />
          <Mini icon={Wallet} label="Saldo" value={fmt(building.balance)} />
          <Mini icon={AlertTriangle} label="Morosita" value={fmt(building.delinquencyTotal)} alert={building.delinquencyTotal > 0} />
          <Mini icon={MessageSquare} label="Ticket" value={openTk.length} alert={openTk.length > 0} />
          <Mini icon={Wrench} label="Manutenzioni" value={actMa.length} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card><CardHeader><CardTitle className="text-base">Anagrafica</CardTitle></CardHeader><CardContent><div className="space-y-2.5">
            <IR icon={MapPin} l="Indirizzo" v={`${building.address}, ${building.city}`} /><IR icon={CreditCard} l="CF" v={building.cf} m /><IR icon={Euro} l="IBAN" v={building.iban} m />
            <IR icon={Calendar} l="Anno" v={building.yearBuilt} /><IR icon={Layers} l="Piani" v={building.floors} /><IR icon={ArrowUpDown} l="Ascensore" v={building.elevator ? 'Si' : 'No'} />
            <IR icon={Flame} l="Riscaldamento" v={building.heating === 'centralizzato' ? 'Centralizzato' : 'Autonomo'} />
          </div></CardContent></Card>
          <div className="space-y-6">
            {nextAs && <Card className="border-primary-200 bg-primary-50/30"><CardContent><div className="flex items-start justify-between"><div><p className="text-xs font-semibold text-primary-400 uppercase tracking-wider mb-1">Prossima Assemblea</p><p className="text-sm font-semibold text-gray-800">{nextAs.title}</p><p className="text-xs text-gray-500 mt-1">{nextAs.date && fmtDate(nextAs.date)} ore {nextAs.time}</p></div><Link to={`/studio/assemblee/${nextAs.id}`}><Button size="sm" variant="outline">Dettaglio</Button></Link></div></CardContent></Card>}
            <Card><CardHeader><CardTitle className="text-base">Attivita Recente</CardTitle></CardHeader><CardContent><div className="space-y-2">
              {openTk.slice(0, 2).map((t) => <AR key={t.id} icon={MessageSquare} bg="bg-info-50 text-info-500" t={t.title} s={t.condominoName} b={<StatusBadge status={t.status} />} o={() => navigate(`/studio/ticket/${t.id}`)} />)}
              {actMa.slice(0, 2).map((m) => <AR key={m.id} icon={Wrench} bg="bg-warning-50 text-warning-500" t={m.title} s={m.supplierName} b={<StatusBadge status={m.status} />} o={() => navigate(`/studio/manutenzioni/${m.id}`)} />)}
              {openTk.length === 0 && actMa.length === 0 && <p className="text-sm text-gray-400 text-center py-3">Nessuna attivita</p>}
            </div></CardContent></Card>
          </div>
        </div>
      </div>
    ),
    condomini: (<div className="space-y-4"><div className="flex justify-end"><Link to={`/studio/immobili/${id}/condomini/nuovo`}><Button size="sm"><Plus className="h-4 w-4" />Aggiungi</Button></Link></div>
      {bCond.length === 0 ? <EmptyState icon={Users} title="Nessun condomino" action={{ label: 'Aggiungi', to: `/studio/immobili/${id}/condomini/nuovo` }} /> :
      <Table><TableHeader><TableRow><TableHead>Condomino</TableHead><TableHead>Email</TableHead><TableHead>Unita</TableHead><TableHead className="text-right">Millesimi</TableHead><TableHead>Stato</TableHead></TableRow></TableHeader><TableBody>
        {bCond.map((c) => { const u = units.find((x) => x.condominoId === c.id); const d = bDel.some((x) => x.condominoId === c.id); return (
          <TableRow key={c.id} onClick={() => navigate(`/studio/immobili/${id}/condomini/${c.id}`)}>
            <TableCell><div className="flex items-center gap-2"><Avatar name={c.name} size="sm" /><span className="font-medium text-gray-800">{c.name}</span></div></TableCell>
            <TableCell className="text-gray-500">{c.email}</TableCell>
            <TableCell>{u ? `P.${u.floor} Int.${u.number}` : '-'}</TableCell>
            <TableCell mono className="text-right">{c.millesimi}</TableCell>
            <TableCell>{d ? <Badge variant="destructive">Moroso</Badge> : <Badge variant="success">Regolare</Badge>}</TableCell>
          </TableRow>
        )})}
      </TableBody></Table>}</div>),
    unita: (<div className="space-y-4"><div className="flex justify-end"><Link to={`/studio/immobili/${id}/unita/nuova`}><Button size="sm"><Plus className="h-4 w-4" />Aggiungi Unita</Button></Link></div><Table><TableHeader><TableRow><TableHead>Piano</TableHead><TableHead>Int.</TableHead><TableHead>Tipo</TableHead><TableHead>Mq</TableHead><TableHead className="text-right">Millesimi</TableHead><TableHead>Proprietario</TableHead></TableRow></TableHeader><TableBody>
      {bUnits.map((u) => { const o = condomini.find((c) => c.id === u.condominoId); return (
        <TableRow key={u.id} onClick={() => navigate(`/studio/immobili/${id}/unita/${u.id}`)}><TableCell>{u.floor}</TableCell><TableCell mono>{u.number}</TableCell><TableCell>{u.type}</TableCell><TableCell>{u.sqm} mq</TableCell><TableCell mono className="text-right">{u.millesimi}</TableCell>
        <TableCell>{o ? <div className="flex items-center gap-2"><Avatar name={o.name} size="sm" /><span className="text-sm">{o.name}</span></div> : <span className="text-gray-400">Vacante</span>}</TableCell></TableRow>
      )})}</TableBody></Table></div>),
    finanze: (<div className="space-y-4"><div className="grid grid-cols-1 sm:grid-cols-4 gap-3"><Stat label="Saldo" value={fmt(building.balance)} /><Stat label="Entrate" value={<span className="text-success-600">{fmt(totIn)}</span>} /><Stat label="Uscite" value={<span className="text-destructive-500">{fmt(totOut)}</span>} /><Stat label="Rate Non Pagate" value={unpaid.length} /></div>
      <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Data</TableHead><TableHead>Descrizione</TableHead><TableHead>Categoria</TableHead><TableHead className="text-right">Importo</TableHead></TableRow></TableHeader><TableBody>
        {bTx.slice(0, 10).map((t) => <TableRow key={t.id}><TableCell>{fmtDate(t.date)}</TableCell><TableCell>{t.description}</TableCell><TableCell><Badge variant="primary">{t.category}</Badge></TableCell><TableCell mono className={`text-right ${t.type === 'entrata' ? 'text-success-600' : 'text-destructive-500'}`}>{t.type === 'entrata' ? '+' : ''}{fmt(t.amount)}</TableCell></TableRow>)}
      </TableBody></Table></CardContent></Card></div>),
    ticket: bTk.length === 0 ? <EmptyState icon={MessageSquare} title="Nessun ticket" /> : (
      <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Titolo</TableHead><TableHead>Condomino</TableHead><TableHead>Priorita</TableHead><TableHead>Stato</TableHead><TableHead>Data</TableHead></TableRow></TableHeader><TableBody>
        {bTk.map((t) => <TableRow key={t.id} onClick={() => navigate(`/studio/ticket/${t.id}`)}><TableCell mono>#{t.id.toUpperCase()}</TableCell><TableCell className="font-medium">{t.title}</TableCell><TableCell><div className="flex items-center gap-2"><Avatar name={t.condominoName} size="sm" /><span className="text-sm">{t.condominoName}</span></div></TableCell><TableCell><Badge variant={t.priority === 'alta' ? 'destructive' : t.priority === 'media' ? 'warning' : 'default'}>{t.priority}</Badge></TableCell><TableCell><StatusBadge status={t.status} /></TableCell><TableCell>{t.createdDate}</TableCell></TableRow>)}
      </TableBody></Table>),
    manutenzioni: bMa.length === 0 ? <EmptyState icon={Wrench} title="Nessuna manutenzione" /> : (
      <Table><TableHeader><TableRow><TableHead>Titolo</TableHead><TableHead>Fornitore</TableHead><TableHead>Categoria</TableHead><TableHead>Stato</TableHead><TableHead>Costo</TableHead></TableRow></TableHeader><TableBody>
        {bMa.map((m) => <TableRow key={m.id} onClick={() => navigate(`/studio/manutenzioni/${m.id}`)}><TableCell className="font-medium">{m.title}</TableCell><TableCell>{m.supplierName}</TableCell><TableCell><Badge variant="primary">{m.category}</Badge></TableCell><TableCell><StatusBadge status={m.status} /></TableCell><TableCell mono>{fmt(m.cost)}</TableCell></TableRow>)}
      </TableBody></Table>),
    assemblee: bAs.length === 0 ? <EmptyState icon={Calendar} title="Nessuna assemblea" /> : (
      <Table><TableHeader><TableRow><TableHead>Titolo</TableHead><TableHead>Tipo</TableHead><TableHead>Data</TableHead><TableHead>Luogo</TableHead><TableHead>Stato</TableHead></TableRow></TableHeader><TableBody>
        {bAs.map((a) => <TableRow key={a.id} onClick={() => navigate(`/studio/assemblee/${a.id}`)}><TableCell className="font-medium">{a.title}</TableCell><TableCell><Badge variant={a.type === 'straordinaria' ? 'accent' : 'primary'}>{a.type}</Badge></TableCell><TableCell>{a.date && fmtDate(a.date)} {a.time}</TableCell><TableCell className="text-gray-500">{a.location}</TableCell><TableCell><StatusBadge status={a.status} /></TableCell></TableRow>)}
      </TableBody></Table>),
    morosita: bDel.length === 0 ? (
      <Card className="bg-success-50/30 border-success-100"><CardContent><div className="flex items-center gap-3 py-2"><AlertTriangle className="h-5 w-5 text-success-500" /><p className="text-sm font-medium text-success-700">Tutti in regola</p></div></CardContent></Card>
    ) : (<Table><TableHeader><TableRow><TableHead>Condomino</TableHead><TableHead>Importo</TableHead><TableHead>Mesi</TableHead><TableHead>Stato</TableHead></TableRow></TableHeader><TableBody>
        {bDel.map((d) => <TableRow key={d.id} onClick={() => navigate(`/studio/morosita/${d.id}`)}><TableCell className="font-medium">{d.condominoName}</TableCell><TableCell mono className="text-destructive-500">{fmt(d.totalOwed)}</TableCell><TableCell>{d.monthsOverdue}</TableCell><TableCell><StatusBadge status={d.status} /></TableCell></TableRow>)}
      </TableBody></Table>),
    comunicazioni: (<div className="space-y-4"><div className="flex justify-end"><Link to="/studio/comunicazioni/nuova"><Button size="sm"><Send className="h-4 w-4" />Nuova</Button></Link></div>
      {bCom.length === 0 ? <EmptyState icon={Mail} title="Nessuna comunicazione" /> :
      <Table><TableHeader><TableRow><TableHead>Oggetto</TableHead><TableHead>Destinatari</TableHead><TableHead>Data</TableHead><TableHead>Allegati</TableHead><TableHead>Stato</TableHead></TableRow></TableHeader><TableBody>
        {bCom.map((c) => <TableRow key={c.id} onClick={() => navigate(`/studio/comunicazioni/${c.id}`)}><TableCell className="font-medium">{c.subject}</TableCell><TableCell>{c.recipients}</TableCell><TableCell className="text-gray-500">{fmtDate(c.sentDate)}</TableCell><TableCell>{c.attachments.length > 0 ? <div className="flex items-center gap-1"><Paperclip className="h-3.5 w-3.5 text-gray-400" />{c.attachments.length}</div> : '—'}</TableCell><TableCell><Badge variant="success">Inviata</Badge></TableCell></TableRow>)}
      </TableBody></Table>}</div>),
    documenti: (<div className="space-y-4"><div className="flex justify-end"><Link to="/studio/documenti/upload"><Button size="sm" variant="outline"><Plus className="h-4 w-4" />Carica</Button></Link></div>
      {bDocs.length === 0 ? <EmptyState icon={FileText} title="Nessun documento" /> :
      <div className="space-y-2">{bDocs.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer" onClick={() => navigate(`/studio/documenti/${doc.id}`)}>
          <div className="flex items-center gap-3"><div className="h-9 w-9 rounded-lg bg-primary-100 flex items-center justify-center"><FileText className="h-4 w-4 text-primary-500" /></div><div><p className="text-sm font-medium text-gray-800">{doc.name}</p><p className="text-xs text-gray-500">{doc.category} · {doc.type} · {doc.size}</p></div></div>
          <button className="text-gray-400 hover:text-primary-400" onClick={(e) => { e.stopPropagation(); toast('Download: ' + doc.name) }}><Download className="h-4 w-4" /></button>
        </div>))}</div>}</div>),
  }

  return (
    <div>
      <PageHeader title={building.name} breadcrumbs={[{ label: 'Immobili', to: '/studio/immobili' }, { label: building.name }]} />

      <Card variant="elevated" className="mb-5">
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{building.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5"><MapPin className="h-3.5 w-3.5" />{building.address}, {building.cap} {building.city}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {building.delinquencyTotal > 0 && <Badge variant="destructive">Morosita {fmt(building.delinquencyTotal)}</Badge>}
              <Badge variant="primary">{bUnits.length} unita</Badge>
              <Badge variant="default">{bCond.length} condomini</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scrollable pill tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-6 -mx-4 md:-mx-8 px-4 md:px-8 scrollbar-hide">
        {tabConfig.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn(
              'px-3.5 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-all flex-shrink-0',
              tab === t.id ? 'bg-primary-500 text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 hover:text-gray-700'
            )}>
            {t.label}
          </button>
        ))}
      </div>

      {['finanze', 'ticket', 'assemblee', 'morosita', 'comunicazioni'].includes(tab) && !isPro
        ? <PlanGate feature={tab === 'finanze' ? 'la gestione finanziaria' : tab === 'ticket' ? 'il ticketing avanzato' : tab === 'assemblee' ? 'le assemblee' : tab === 'morosita' ? 'la gestione morosita' : 'le comunicazioni'}>{content[tab]}</PlanGate>
        : content[tab]
      }
    </div>
  )
}

function Mini({ icon: Icon, label, value, alert }) {
  return (<div className={`rounded-2xl p-3 border ${alert ? 'bg-destructive-50/50 border-destructive-100' : 'bg-white border-gray-200'}`}>
    <div className="flex items-center gap-1.5 mb-1"><Icon className={`h-3.5 w-3.5 ${alert ? 'text-destructive-500' : 'text-gray-400'}`} /><span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{label}</span></div>
    <p className={`text-base font-bold font-mono ${alert ? 'text-destructive-600' : 'text-gray-800'}`}>{value}</p>
  </div>)
}
function IR({ icon: Icon, l, v, m }) {
  return (<div className="flex items-center justify-between py-1.5"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-gray-400" /><span className="text-sm text-gray-500">{l}</span></div><span className={`text-sm font-medium text-gray-800 ${m ? 'font-mono text-xs' : ''}`}>{v}</span></div>)
}
function AR({ icon: Icon, bg, t, s, b, o }) {
  return (<div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer" onClick={o}><div className={`h-8 w-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}><Icon className="h-4 w-4" /></div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-800 truncate">{t}</p><p className="text-xs text-gray-500 truncate">{s}</p></div>{b}</div>)
}
