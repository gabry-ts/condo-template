import { Check, X, CreditCard, Download, Crown } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import StatusBadge from '../../components/shared/StatusBadge'
import { useToast } from '../../components/ui/Toast'

import { plans } from '../../data/plans'
import { useAuth } from '../../context/AuthContext'

const billingHistory = [
  { id: 1, date: '01/03/2026', amount: 'EUR 29,00', status: 'pagato', invoice: 'INV-2026-003' },
  { id: 2, date: '01/02/2026', amount: 'EUR 29,00', status: 'pagato', invoice: 'INV-2026-002' },
  { id: 3, date: '01/01/2026', amount: 'EUR 29,00', status: 'pagato', invoice: 'INV-2026-001' },
  { id: 4, date: '01/12/2025', amount: 'EUR 29,00', status: 'pagato', invoice: 'INV-2025-012' },
]

export default function Billing() {
  const { user } = useAuth()
  const toast = useToast()
  const currentPlan = user?.plan || 'free'
  const planData = plans[currentPlan]

  return (
    <div>
      <PageHeader
        title="Abbonamento"
        description="Gestisci il tuo piano e i pagamenti"
      />

      {/* Current Plan */}
      <Card variant="elevated" className="mb-8">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-gray-800">Piano {planData.name}</h3>
                <Badge variant="pro">Attivo</Badge>
              </div>
              <p className="text-sm text-gray-500">
                {planData.price === 0 ? 'Gratuito' : `EUR ${planData.price},00 / ${planData.period}`}
                {currentPlan === 'pro' && ' — Prossimo rinnovo: 01/04/2026'}
              </p>
            </div>
            <Crown className="h-10 w-10 text-primary-400" />
          </div>
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.values(plans).map((plan) => {
          const isActive = plan.id === currentPlan
          return (
            <Card
              key={plan.id}
              variant={isActive ? 'elevated' : 'default'}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="flex gap-2">
                    {plan.badge && <Badge variant="accent">{plan.badge}</Badge>}
                    {isActive && <Badge variant="success">Piano Attuale</Badge>}
                  </div>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-800">
                    EUR {plan.price === 0 ? '0' : plan.price}
                  </span>
                  <span className="text-sm text-gray-500"> / {plan.period}</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-success-500 flex-shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {isActive ? (
                  <Button variant="outline" disabled className="w-full">
                    Piano Attuale
                  </Button>
                ) : plan.id === 'pro' ? (
                  <Button variant="pro" className="w-full">
                    Passa a Pro
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">
                    Downgrade a Freemium
                  </Button>
                )}
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Payment Method */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Metodo di Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Visa **** **** **** 4242</p>
                <p className="text-xs text-gray-500">Scade 12/28</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => toast('Funzionalita disponibile dopo il go-live', 'info')}>Modifica</Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Storico Fatturazione</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Importo</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead>Fattura</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell mono>{item.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <button
                      className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-500 transition-colors"
                      onClick={() => toast('Download fattura ' + item.invoice)}
                    >
                      <Download className="h-3.5 w-3.5" />
                      {item.invoice}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
