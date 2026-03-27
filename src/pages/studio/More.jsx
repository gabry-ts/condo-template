import { Link } from 'react-router-dom'
import {
  Wallet, AlertTriangle, Wrench, Truck, Users, FolderOpen,
  MessageSquare, Send, CreditCard, UserCircle, HelpCircle,
} from 'lucide-react'

const sections = [
  {
    label: 'Economia',
    items: [
      { to: '/studio/finanze', icon: Wallet, label: 'Finanze' },
      { to: '/studio/morosita', icon: AlertTriangle, label: 'Morosita' },
    ],
  },
  {
    label: 'Patrimonio',
    items: [
      { to: '/studio/documenti', icon: FolderOpen, label: 'Documenti' },
      { to: '/studio/assemblee', icon: Users, label: 'Assemblee' },
    ],
  },
  {
    label: 'Operativo',
    items: [
      { to: '/studio/manutenzioni', icon: Wrench, label: 'Manutenzioni' },
      { to: '/studio/fornitori', icon: Truck, label: 'Fornitori' },
      { to: '/studio/comunicazioni', icon: Send, label: 'Comunicazioni' },
    ],
  },
  {
    label: 'Strumenti',
    items: [
      { to: '/studio/abbonamento', icon: CreditCard, label: 'Abbonamento' },
      { to: '/studio/profilo', icon: UserCircle, label: 'Profilo' },
      { to: '/studio/aiuto', icon: HelpCircle, label: 'Aiuto' },
    ],
  },
]

export default function StudioMore() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Altro</h1>
      {sections.map((section) => (
        <div key={section.label}>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 px-1">
            {section.label}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:bg-gray-50 active:scale-[0.97] transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-primary-50 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary-400" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
