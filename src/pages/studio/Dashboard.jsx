import { Link } from 'react-router-dom'
import {
  Building2, Users, MessageSquare, AlertTriangle, Truck, Wrench,
  Calendar, FileUp, Clock, ChevronRight, UserPlus, Lock,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
} from 'recharts'

import Stat from '../../components/ui/Stat'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/shared/StatusBadge'
import PlanGate from '../../components/shared/PlanGate'
import { useAuth } from '../../context/AuthContext'

import { buildings } from '../../data/buildings'
import { condomini } from '../../data/users'
import { balanceHistory } from '../../data/finance'
import { tickets } from '../../data/tickets'
import { delinquencySummary } from '../../data/delinquency'
import { agendaItems } from '../../data/agenda'
import { assemblies } from '../../data/assemblies'
import { cn } from '../../lib/cn'

const priorityColors = {
  alta: 'bg-destructive-500',
  media: 'bg-warning-500',
  bassa: 'bg-info-400',
}

const moduleBadgeVariant = {
  Finanze: 'warning',
  Morosita: 'destructive',
  Ticket: 'info',
  Assemblee: 'primary',
  Manutenzioni: 'accent',
  Documenti: 'default',
  Comunicazioni: 'default',
}

const quickActions = [
  { label: 'Nuovo Immobile', icon: Building2, to: '/studio/immobili/nuovo' },
  { label: 'Aggiungi Condomino', icon: UserPlus, to: '/studio/condomini/nuovo' },
  { label: 'Nuovo Fornitore', icon: Truck, to: '/studio/fornitori/nuovo' },
  { label: 'Nuova Manutenzione', icon: Wrench, to: '/studio/manutenzioni/nuova' },
  { label: 'Nuova Assemblea', icon: Calendar, to: '/studio/assemblee/nuova', pro: true },
  { label: 'Carica Documento', icon: FileUp, to: '/studio/documenti/upload' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const isPro = user?.plan === 'pro' || user?.role === 'superuser'

  const totalCondomini = buildings.reduce((sum, b) => sum + b.condominCount, 0)
  const openTickets = tickets.filter(
    (t) => t.status === 'aperto' || t.status === 'in_lavorazione'
  ).length
  const delinquencyTotal = delinquencySummary.totalAmount

  const sortedAgenda = [...agendaItems]
    .sort((a, b) => {
      const prio = { alta: 0, media: 1, bassa: 2 }
      return (prio[a.priority] ?? 3) - (prio[b.priority] ?? 3)
    })
    .slice(0, 5)

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, 3)

  const upcomingAssemblies = assemblies.filter(
    (a) => a.status === 'convocata' || a.status === 'bozza'
  )

  return (
    <div className="space-y-8">
      {/* Row 1: Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Stat
          icon={Building2}
          iconColor="bg-primary-100 text-primary-500"
          label="Immobili"
          value={buildings.length}
        />
        <Stat
          icon={Users}
          iconColor="bg-info-50 text-info-500"
          label="Condomini"
          value={totalCondomini}
        />
        {isPro ? (
          <Stat
            icon={MessageSquare}
            iconColor={openTickets > 0 ? 'bg-warning-50 text-warning-600' : 'bg-success-50 text-success-600'}
            label="Ticket Aperti"
            value={openTickets}
            trend={openTickets > 0 ? `${openTickets} da gestire` : undefined}
            trendUp={false}
          />
        ) : (
          <LockedStat label="Ticket Aperti" />
        )}
        {isPro ? (
          <Stat
            icon={AlertTriangle}
            iconColor={delinquencyTotal > 0 ? 'bg-destructive-50 text-destructive-500' : 'bg-success-50 text-success-600'}
            label="Morosita Totale"
            value={
              <span className="font-mono">
                {delinquencyTotal.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
              </span>
            }
            trend={delinquencyTotal > 0 ? `${delinquencySummary.totalMorosi} morosi` : undefined}
            trendUp={false}
          />
        ) : (
          <LockedStat label="Morosita Totale" />
        )}
      </div>

      {/* Row 2: Agenda + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {isPro ? (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary-400" />
                Da Fare Oggi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedAgenda.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-1 h-10 rounded-full ${priorityColors[item.priority]}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Scadenza: {new Date(item.dueDate).toLocaleDateString('it-IT')}
                      </p>
                    </div>
                    <Badge variant={moduleBadgeVariant[item.module] || 'default'}>
                      {item.module}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="lg:col-span-3">
            <PlanGate feature="l'agenda prioritizzata">
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary-400" />Da Fare Oggi</CardTitle></CardHeader>
                <CardContent><div className="space-y-3">{[1,2,3,4,5].map((i) => <div key={i} className="h-12 rounded-xl bg-gray-100" />)}</div></CardContent>
              </Card>
            </PlanGate>
          </div>
        )}

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Azioni Rapide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const locked = action.pro && !isPro
                return (
                  <Link key={action.label} to={locked ? '/studio/upgrade' : action.to}>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start gap-2 text-sm h-auto py-3',
                        locked && 'opacity-50'
                      )}
                    >
                      <action.icon className={cn('h-4 w-4 flex-shrink-0', locked ? 'text-gray-400' : 'text-primary-400')} />
                      <span className="truncate">{action.label}</span>
                      {locked && <Lock className="h-3 w-3 text-gray-400 ml-auto flex-shrink-0" />}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 3: Balance Chart */}
      {isPro ? (
        <Card>
          <CardHeader>
            <CardTitle>Andamento Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={balanceHistory} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#6b7280' }} />
                  <YAxis
                    tick={{ fontSize: 13, fill: '#6b7280' }}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <RechartsTooltip
                    formatter={(value) => [
                      value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' }),
                      'Saldo',
                    ]}
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    fill="url(#balanceGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ) : (
        <PlanGate feature="l'andamento saldo">
          <Card>
            <CardHeader><CardTitle>Andamento Saldo</CardTitle></CardHeader>
            <CardContent><div className="h-72 bg-gray-50 rounded-xl" /></CardContent>
          </Card>
        </PlanGate>
      )}

      {/* Row 4: Recent Tickets + Upcoming Assemblies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isPro ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Ticket Recenti</CardTitle>
                <Link to="/studio/ticket" className="text-sm text-primary-400 hover:text-primary-500 font-medium">
                  Vedi tutti
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50"
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
        ) : (
          <PlanGate feature="il ticketing avanzato">
            <Card>
              <CardHeader><CardTitle>Ticket Recenti</CardTitle></CardHeader>
              <CardContent><div className="space-y-3">{[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-gray-100" />)}</div></CardContent>
            </Card>
          </PlanGate>
        )}

        {isPro ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between w-full">
                <CardTitle>Prossime Assemblee</CardTitle>
                <Link to="/studio/assemblee" className="text-sm text-primary-400 hover:text-primary-500 font-medium">
                  Vedi tutte
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {upcomingAssemblies.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">Nessuna assemblea in programma</p>
              ) : (
                <div className="space-y-3">
                  {upcomingAssemblies.map((assembly) => (
                    <div
                      key={assembly.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{assembly.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {assembly.buildingName}
                          {assembly.date && (
                            <> &middot; {new Date(assembly.date).toLocaleDateString('it-IT')} ore {assembly.time}</>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={assembly.type === 'straordinaria' ? 'accent' : 'primary'}>
                          {assembly.type === 'straordinaria' ? 'Straordinaria' : 'Ordinaria'}
                        </Badge>
                        <StatusBadge status={assembly.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <PlanGate feature="le assemblee">
            <Card>
              <CardHeader><CardTitle>Prossime Assemblee</CardTitle></CardHeader>
              <CardContent><div className="space-y-3">{[1,2].map((i) => <div key={i} className="h-14 rounded-xl bg-gray-100" />)}</div></CardContent>
            </Card>
          </PlanGate>
        )}
      </div>
    </div>
  )
}

function LockedStat({ label }) {
  return (
    <Link to="/studio/upgrade">
      <Card className="opacity-60 hover:opacity-80 transition-opacity cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-label text-gray-500">{label}</span>
            <span className="text-xl font-bold text-gray-400 flex items-center gap-2">
              <Lock className="h-4 w-4" /> Pro
            </span>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
