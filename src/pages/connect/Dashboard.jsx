import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import StatusBadge from '../../components/shared/StatusBadge'
import Badge from '../../components/ui/Badge'
import { buildings, units } from '../../data/buildings'
import { condomini } from '../../data/users'
import { rates } from '../../data/finance'
import { tickets } from '../../data/tickets'
import { assemblies } from '../../data/assemblies'
import { documents } from '../../data/documents'
import { notifications } from '../../data/notifications'
import {
  CreditCard,
  AlertCircle,
  FileText,
  CalendarDays,
  ChevronRight,
  Bell,
  Truck,
  Wrench,
  UserCircle,
  CheckCircle2,
  Clock,
  Plus,
  MessageSquare,
  Mail,
} from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()

  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const myUnit = units.find((u) => u.id === condomino.unitId)
  const myBuilding = buildings.find((b) => b.id === condomino.buildingId)

  const myRates = rates.filter((r) => r.condominoId === condomino.id)
  const unpaidRates = myRates.filter((r) => r.status !== 'pagata')
  const nextRate = unpaidRates.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0]

  const myTickets = tickets.filter((t) => t.condominoId === condomino.id)
  const openTickets = myTickets.filter((t) => t.status === 'aperto' || t.status === 'in_lavorazione')

  const myAssemblies = assemblies
    .filter((a) => a.buildingId === condomino.buildingId && a.status === 'convocata')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  const nextAssembly = myAssemblies[0]

  const myDocuments = documents
    .filter((d) => d.buildingId === condomino.buildingId)
    .sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
    .slice(0, 3)

  const recentNotifications = notifications.slice(0, 4)

  const quickActions = [
    { label: 'Paga Rata', icon: CreditCard, to: '/connect/finanze', color: 'bg-primary-400 text-white' },
    { label: 'Segnalazione', icon: Plus, to: '/connect/segnalazioni/nuova', color: 'bg-accent-400 text-white' },
    { label: 'Documenti', icon: FileText, to: '/connect/documenti', color: 'bg-info-500 text-white' },
    { label: 'Assemblee', icon: CalendarDays, to: '/connect/assemblee', color: 'bg-success-500 text-white' },
  ]

  const extraNav = [
    { label: 'Segnalazioni', icon: MessageSquare, to: '/connect/segnalazioni', color: 'bg-orange-50 text-orange-600' },
    { label: 'Comunicazioni', icon: Mail, to: '/connect/comunicazioni', color: 'bg-violet-50 text-violet-600' },
    { label: 'Fornitori', icon: Truck, to: '/connect/fornitori', color: 'bg-amber-50 text-amber-600' },
    { label: 'Manutenzioni', icon: Wrench, to: '/connect/manutenzioni', color: 'bg-blue-50 text-blue-600' },
    { label: 'Profilo', icon: UserCircle, to: '/connect/profilo', color: 'bg-gray-100 text-gray-600' },
  ]

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-400 to-primary-300 p-6 text-white">
        <div className="relative z-10">
          <p className="text-primary-100 text-sm font-medium">{myBuilding?.name}</p>
          <h1 className="text-2xl font-bold mt-1">
            {myUnit?.number}, Piano {myUnit?.floor}
          </h1>
          <p className="text-primary-100 text-sm mt-1">{myBuilding?.address}</p>
        </div>
        <svg
          className="absolute bottom-0 left-0 right-0 w-full"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          style={{ height: '40px' }}
        >
          <path
            d="M0,20 C100,40 300,0 400,20 L400,40 L0,40 Z"
            fill="rgba(255,255,255,0.08)"
          />
        </svg>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
        {quickActions.map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className="flex flex-col items-center gap-2 min-w-[72px]"
          >
            <div className={`h-14 w-14 rounded-full ${action.color} flex items-center justify-center shadow-sm transition-transform active:scale-95`}>
              <action.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium text-gray-600 text-center whitespace-nowrap">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Unpaid Alert */}
      {unpaidRates.length > 0 && (
        <Link to="/connect/finanze">
          <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-4 flex items-center gap-4 active:scale-[0.98] transition-transform">
            <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-amber-800">
                {unpaidRates.length === 1 ? 'Hai una rata da pagare' : `Hai ${unpaidRates.length} rate da pagare`}
              </p>
              <p className="text-sm text-amber-600 mt-0.5">
                Totale: {unpaidRates.reduce((sum, r) => sum + r.amount, 0).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0" />
          </div>
        </Link>
      )}

      {/* Next Rate Card */}
      {nextRate && (
        <Card className="overflow-hidden">
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">Prossima rata</p>
              <StatusBadge status={nextRate.status} />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl sm:text-4xl font-mono font-bold text-gray-800">
                  {nextRate.amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                </p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Scadenza {new Date(nextRate.dueDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Link to="/connect/finanze">
                <Button variant="secondary" size="sm">Vedi Dettaglio</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paid confirmation if no unpaid */}
      {unpaidRates.length === 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 p-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-base font-semibold text-green-800">Tutto in regola!</p>
            <p className="text-sm text-green-600">Non hai rate in sospeso.</p>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Attivita recente</h2>
        </div>
        <div className="space-y-3">
          {recentNotifications.map((notif, i) => {
            const typeIcons = {
              ticket: AlertCircle,
              rate: CreditCard,
              assemblea: CalendarDays,
              documento: FileText,
              pagamento: CreditCard,
              morosita: AlertCircle,
            }
            const Icon = typeIcons[notif.type] || Bell
            return (
              <div
                key={notif.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm"
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-primary-50'}`}>
                  <Icon className={`h-5 w-5 ${notif.read ? 'text-gray-400' : 'text-primary-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-tight ${notif.read ? 'text-gray-600' : 'text-gray-800'}`}>
                    {notif.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{notif.body}</p>
                  <p className="text-xs text-gray-300 mt-1">
                    {new Date(notif.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {!notif.read && (
                  <div className="h-2 w-2 rounded-full bg-primary-400 flex-shrink-0 mt-1.5" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Extra Navigation Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Altro</h2>
        <div className="grid grid-cols-3 gap-3">
          {extraNav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm active:scale-95 transition-transform"
            >
              <div className={`h-11 w-11 rounded-xl ${item.color} flex items-center justify-center`}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-gray-600">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
