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
      { to: '/connect/immobili', icon: Building2, label: 'I Miei Immobili' },
      { to: '/connect/assemblee', icon: Users, label: 'Assemblee' },
      { to: '/connect/fornitori', icon: Truck, label: 'Fornitori' },
      { to: '/connect/manutenzioni', icon: Wrench, label: 'Manutenzioni' },
    ],
  },
  {
    label: 'Comunicazioni',
    items: [
      { to: '/connect/segnalazioni', icon: MessageSquare, label: 'Segnalazioni' },
      { to: '/connect/comunicazioni', icon: Mail, label: 'Comunicazioni' },
      { to: '/connect/notifiche', icon: Bell, label: 'Notifiche' },
    ],
  },
  {
    label: 'Finanze',
    items: [
      { to: '/connect/finanze/rate', icon: CreditCard, label: 'Rate' },
      { to: '/connect/finanze/bilanci', icon: Wallet, label: 'Bilanci' },
      { to: '/connect/finanze/preventivi', icon: FileText, label: 'Preventivi' },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/connect/profilo', icon: UserCircle, label: 'Profilo' },
    ],
  },
]

export default function ConnectMore() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Altro</h1>

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
                <div className="h-9 w-9 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-4.5 w-4.5 text-primary-400" />
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
