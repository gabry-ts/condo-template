import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import PageHeader from '../../components/layout/PageHeader'
import ComboSelect from '../../components/ui/ComboSelect'
import { Card, CardContent } from '../../components/ui/Card'
import ProgressBar from '../../components/ui/ProgressBar'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { expenseCategories } from '../../data/finance'
import { buildings } from '../../data/buildings'
import PlanGate from '../../components/shared/PlanGate'

const COLORS = ['#1e3a5f', '#e8734a', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#6b7280']

const progressColors = ['primary', 'accent', 'primary', 'success', 'warning', 'primary', 'primary']

function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
}

const total = expenseCategories.reduce((sum, c) => sum + c.amount, 0)

export default function ExpenseDistribution() {
  const [selectedBuilding, setSelectedBuilding] = useState(buildings[0].id)

  return (
    <PlanGate feature="la gestione finanziaria">
    <div>
      <PageHeader
        title="Ripartizione Spese"
        description="Distribuzione delle spese condominiali per categoria"
        breadcrumbs={[
          { label: 'Finanze', to: '/studio/finanze' },
          { label: 'Ripartizione Spese' },
        ]}
      />

      <div className="mb-8 max-w-xs">
        <ComboSelect
          searchable
          label="Condominio"
          options={buildings.map((b) => ({ value: b.id, label: b.name }))}
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card variant="elevated" className="rounded-2xl">
          <CardContent>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Distribuzione per Categoria</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={60}
                    paddingAngle={3}
                    label={({ category, percentage }) => `${category} ${percentage}%`}
                  >
                    {expenseCategories.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card variant="elevated" className="rounded-2xl">
          <CardContent>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Totale Spese</h3>
              <span className="text-2xl font-bold font-mono text-gray-800">{formatCurrency(total)}</span>
            </div>
            <div className="space-y-5">
              {expenseCategories.map((cat, i) => (
                <div key={cat.category}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-sm text-gray-700">{cat.category}</span>
                    </div>
                    <span className="text-sm font-mono font-medium text-gray-700">{formatCurrency(cat.amount)}</span>
                  </div>
                  <ProgressBar value={cat.percentage} color={progressColors[i]} size="sm" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Importo</TableHead>
            <TableHead className="text-right">Percentuale</TableHead>
            <TableHead className="w-48">Distribuzione</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenseCategories.map((cat, i) => (
            <TableRow key={cat.category}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  {cat.category}
                </div>
              </TableCell>
              <TableCell mono className="text-right">{formatCurrency(cat.amount)}</TableCell>
              <TableCell mono className="text-right">{cat.percentage}%</TableCell>
              <TableCell>
                <ProgressBar value={cat.percentage} color={progressColors[i]} size="sm" />
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="bg-gray-50 font-semibold">
            <TableCell className="font-semibold text-gray-800">Totale</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">{formatCurrency(total)}</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">100%</TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
    </PlanGate>
  )
}
