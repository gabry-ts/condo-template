import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import PageHeader from '../../components/layout/PageHeader'
import Select from '../../components/ui/Select'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import PlanGate from '../../components/shared/PlanGate'
import { expenseCategories } from '../../data/finance'

const COLORS = ['#1e3a5f', '#e8734a', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280']

function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
}

const consuntivoTotal = expenseCategories.reduce((sum, c) => sum + c.amount, 0)

const preventivoCategories = [
  { category: 'Pulizie', amount: 6000 },
  { category: 'Manutenzione', amount: 8500 },
  { category: 'Utenze', amount: 4200 },
  { category: 'Assicurazione', amount: 2400 },
  { category: 'Ascensore', amount: 3800 },
  { category: 'Giardinaggio', amount: 1600 },
  { category: 'Altro', amount: 1500 },
]
const preventivoTotal = preventivoCategories.reduce((sum, c) => sum + c.amount, 0)

export default function BalanceSheets() {
  const [year, setYear] = useState('2026')

  return (
    <PlanGate feature="la gestione finanziaria">
    <div>
      <PageHeader
        title="Bilanci"
        description="Bilanci consuntivi e preventivi"
        breadcrumbs={[
          { label: 'Finanze', to: '/studio/finanze' },
          { label: 'Bilanci' },
        ]}
      />

      <div className="mb-8 max-w-[160px]">
        <Select
          label="Anno"
          options={[
            { value: '2026', label: '2026' },
            { value: '2025', label: '2025' },
          ]}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card variant="elevated" className="rounded-2xl">
          <CardHeader>
            <CardTitle>Bilancio Consuntivo {year}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Totale Spese</span>
              <span className="text-2xl font-bold font-mono text-gray-800">{formatCurrency(consuntivoTotal)}</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseCategories} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 12 }} />
                  <RechartsTooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
                    {expenseCategories.map((_, i) => (
                      <cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="rounded-2xl">
          <CardHeader>
            <CardTitle>Bilancio Preventivo {year}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-500">Totale Previsto</span>
              <span className="text-2xl font-bold font-mono text-gray-800">{formatCurrency(preventivoTotal)}</span>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={preventivoCategories} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12 }} />
                  <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 12 }} />
                  <RechartsTooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="amount" fill="#e8734a" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </PlanGate>
  )
}
