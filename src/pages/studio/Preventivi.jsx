import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import Select from '../../components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { cn } from '../../lib/cn'
import PlanGate from '../../components/shared/PlanGate'

function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
}

const budgetItems = [
  { voce: 'Pulizie condominiali', preventivo: 6000, consuntivo: 5760 },
  { voce: 'Manutenzione ordinaria', preventivo: 5000, consuntivo: 5400 },
  { voce: 'Manutenzione straordinaria', preventivo: 3500, consuntivo: 2400 },
  { voce: 'Utenze energia elettrica', preventivo: 2000, consuntivo: 1920 },
  { voce: 'Utenze gas e riscaldamento', preventivo: 2200, consuntivo: 1920 },
  { voce: 'Assicurazione fabbricato', preventivo: 2400, consuntivo: 2400 },
  { voce: 'Manutenzione ascensore', preventivo: 3800, consuntivo: 3600 },
  { voce: 'Giardinaggio e aree verdi', preventivo: 1600, consuntivo: 1400 },
  { voce: 'Compenso amministratore', preventivo: 3000, consuntivo: 3000 },
  { voce: 'Spese bancarie', preventivo: 200, consuntivo: 150 },
  { voce: 'Fondo riserva', preventivo: 1500, consuntivo: 1050 },
]

const totalPreventivo = budgetItems.reduce((sum, item) => sum + item.preventivo, 0)
const totalConsuntivo = budgetItems.reduce((sum, item) => sum + item.consuntivo, 0)
const totalDiff = totalConsuntivo - totalPreventivo

export default function Preventivi() {
  const [year, setYear] = useState('2026')

  return (
    <PlanGate feature="la gestione finanziaria">
    <div>
      <PageHeader
        title="Preventivi"
        description="Confronto tra budget preventivato e spese effettive"
        breadcrumbs={[
          { label: 'Finanze', to: '/studio/finanze' },
          { label: 'Preventivi' },
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Voce</TableHead>
            <TableHead className="text-right">Preventivo</TableHead>
            <TableHead className="text-right">Consuntivo</TableHead>
            <TableHead className="text-right">Differenza</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgetItems.map((item) => {
            const diff = item.consuntivo - item.preventivo
            return (
              <TableRow key={item.voce}>
                <TableCell>{item.voce}</TableCell>
                <TableCell mono className="text-right">{formatCurrency(item.preventivo)}</TableCell>
                <TableCell mono className="text-right">{formatCurrency(item.consuntivo)}</TableCell>
                <TableCell mono className={cn('text-right', diff > 0 ? 'text-destructive-500' : diff < 0 ? 'text-success-600' : 'text-gray-500')}>
                  {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow className="bg-gray-50">
            <TableCell className="font-semibold text-gray-800">Totale</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">{formatCurrency(totalPreventivo)}</TableCell>
            <TableCell mono className="text-right font-semibold text-gray-800">{formatCurrency(totalConsuntivo)}</TableCell>
            <TableCell mono className={cn('text-right font-semibold', totalDiff > 0 ? 'text-destructive-500' : 'text-success-600')}>
              {totalDiff > 0 ? '+' : ''}{formatCurrency(totalDiff)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    </PlanGate>
  )
}
