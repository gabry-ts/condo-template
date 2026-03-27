import { Link } from 'react-router-dom'
import {
  Building2, Users, Truck, Wrench, Bell, UserCircle,
  Wallet, FileText, Mail, MessageSquare, ChevronRight,
  Shield, CreditCard,
} from 'lucide-react'

const sections = [
  {
    label: 'Il mio condominio',
    items: [
      { to: '/connect/immobili', icon: Building2, label: 'I Miei Immobili', iconBg: 'bg-amber-100 text-amber-600' },
      { to: '/connect/assemblee', icon: Users, label: 'Assemblee', iconBg: 'bg-orange-100 text-orange-600' },
      { to: '/connect/fornitori', icon: Truck, label: 'Fornitori', iconBg: 'bg-rose-100 text-rose-600' },
      { to: '/connect/manutenzioni', icon: Wrench, label: 'Manutenzioni', iconBg: 'bg-teal-100 text-teal-600' },
    ],
  },
  {
    label: 'Comunicazioni',
    items: [
      { to: '/connect/segnalazioni', icon: MessageSquare, label: 'Segnalazioni', iconBg: 'bg-violet-100 text-violet-600' },
      { to: '/connect/comunicazioni', icon: Mail, label: 'Comunicazioni', iconBg: 'bg-sky-100 text-sky-600' },
      { to: '/connect/notifiche', icon: Bell, label: 'Notifiche', iconBg: 'bg-pink-100 text-pink-600' },
    ],
  },
  {
    label: 'Finanze',
    items: [
      { to: '/connect/finanze/rate', icon: CreditCard, label: 'Rate', iconBg: 'bg-emerald-100 text-emerald-600' },
      { to: '/connect/finanze/bilanci', icon: Wallet, label: 'Bilanci', iconBg: 'bg-cyan-100 text-cyan-600' },
      { to: '/connect/finanze/preventivi', icon: FileText, label: 'Preventivi', iconBg: 'bg-lime-100 text-lime-600' },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/connect/profilo', icon: UserCircle, label: 'Profilo', iconBg: 'bg-gray-200 text-gray-600' },
    ],
  },
]

export default function ConnectMore() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-bold text-gray-800">Altro</h1>

      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">{section.label}</p>
          <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden divide-y divide-gray-100">
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className={`h-9 w-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-sm font-medium text-gray-800 flex-1">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-gray-300" />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
