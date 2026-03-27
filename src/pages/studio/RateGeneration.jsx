import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import ComboSelect from '../../components/ui/ComboSelect'
import Button from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import StatusBadge from '../../components/shared/StatusBadge'
import ProgressBar from '../../components/ui/ProgressBar'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { rates } from '../../data/finance'
import { buildings } from '../../data/buildings'
import { condomini } from '../../data/users'
import { cn } from '../../lib/cn'
import PlanGate from '../../components/shared/PlanGate'

function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function RateGeneration() {
  const [selectedBuilding, setSelectedBuilding] = useState('b1')
  const [selectedYear, setSelectedYear] = useState('2026')
  const [selectedQuarter, setSelectedQuarter] = useState('Q1')
  const [generating, setGenerating] = useState(false)

  const filteredRates = rates.filter(
    (r) => r.buildingId === selectedBuilding && r.year === Number(selectedYear) && r.quarter === selectedQuarter
  )

  const totalAmount = filteredRates.reduce((sum, r) => sum + r.amount, 0)
  const paidAmount = filteredRates.filter((r) => r.status === 'pagata').reduce((sum, r) => sum + r.amount, 0)
  const paidPercentage = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0

  const getCondomino = (id) => condomini.find((c) => c.id === id)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <PlanGate feature="la gestione finanziaria">
    <div>
      <PageHeader
        title="Rate"
        description="Generazione e gestione delle rate condominiali"
        breadcrumbs={[
          { label: 'Finanze', to: '/studio/finanze' },
          { label: 'Rate' },
        ]}
        actions={
          <Button variant="pro" onClick={handleGenerate} disabled={generating}>
            <Sparkles className={cn('h-4 w-4', generating && 'animate-spin')} style={generating ? { animationDuration: '1.5s' } : undefined} />
            {generating ? 'Generazione...' : 'Genera Rate'}
          </Button>
        }
      />

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="w-64">
          <ComboSelect
            searchable
            label="Condominio"
            options={buildings.map((b) => ({ value: b.id, label: b.name }))}
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
          />
        </div>
        <div className="w-32">
          <ComboSelect
            label="Anno"
            options={[
              { value: '2026', label: '2026' },
              { value: '2025', label: '2025' },
            ]}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
        <div className="w-32">
          <ComboSelect
            label="Trimestre"
            options={[
              { value: 'Q1', label: 'Q1' },
              { value: 'Q2', label: 'Q2' },
              { value: 'Q3', label: 'Q3' },
              { value: 'Q4', label: 'Q4' },
            ]}
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
          />
        </div>
      </div>

      <Card variant="elevated" className="rounded-2xl mb-8">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Totale da Incassare</p>
              <p className="text-xl font-bold font-mono text-gray-800">{formatCurrency(totalAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Incassato</p>
              <p className="text-xl font-bold font-mono text-success-600">{formatCurrency(paidAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Percentuale Incasso</p>
              <div className="flex items-center gap-3">
                <ProgressBar value={paidPercentage} color={paidPercentage >= 75 ? 'success' : paidPercentage >= 50 ? 'warning' : 'destructive'} size="md" className="flex-1" />
                <span className="text-sm font-mono font-semibold text-gray-700">{paidPercentage}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Condomino</TableHead>
            <TableHead>Unita</TableHead>
            <TableHead className="text-right">Millesimi</TableHead>
            <TableHead className="text-right">Importo</TableHead>
            <TableHead>Scadenza</TableHead>
            <TableHead>Stato</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRates.map((r) => {
            const cond = getCondomino(r.condominoId)
            return (
              <TableRow key={r.id}>
                <TableCell>{cond?.name || '-'}</TableCell>
                <TableCell>{cond?.unitId || '-'}</TableCell>
                <TableCell mono className="text-right">{cond?.millesimi || '-'}</TableCell>
                <TableCell mono className="text-right">{formatCurrency(r.amount)}</TableCell>
                <TableCell>{formatDate(r.dueDate)}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
              </TableRow>
            )
          })}
          {filteredRates.length === 0 && (
            <TableRow>
              <TableCell className="text-center text-gray-400 py-8" colSpan={6}>
                Nessuna rata trovata per i filtri selezionati
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </PlanGate>
  )
}
