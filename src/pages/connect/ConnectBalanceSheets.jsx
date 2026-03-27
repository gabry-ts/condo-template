import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import Select from '../../components/ui/Select'
import { Card, CardContent } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { condomini } from '../../data/users'
import { expenseCategories } from '../../data/finance'

export default function ConnectBalanceSheets() {
  const { user } = useAuth()
  const [year, setYear] = useState('2025')

  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const totalExpenses = expenseCategories.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Bilanci"
        description="Bilancio consuntivo del tuo condominio"
        actions={
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            options={[
              { value: '2025', label: 'Consuntivo 2025' },
              { value: '2024', label: 'Consuntivo 2024' },
            ]}
          />
        }
      />

      <Card>
        <CardContent>
          <p className="text-base text-gray-700 leading-relaxed">
            Il bilancio consuntivo {year} del condominio mostra una gestione complessivamente equilibrata.
            Le spese totali ammontano a <strong>€ {totalExpenses.toLocaleString('it-IT')}</strong>, in linea
            con il preventivo approvato. La voce di spesa principale e la manutenzione ordinaria (30%),
            seguita dalle pulizie scale (22%).
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Riepilogo Spese</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Importo</TableHead>
              <TableHead>Percentuale</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseCategories.map((cat) => (
              <TableRow key={cat.category}>
                <TableCell>
                  <span className="text-base font-medium text-gray-800">{cat.category}</span>
                </TableCell>
                <TableCell mono>
                  <span className="text-base">€ {cat.amount.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full max-w-[120px]">
                      <div
                        className="h-2.5 bg-primary-400 rounded-full"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{cat.percentage}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <span className="text-base font-bold text-gray-800">Totale</span>
              </TableCell>
              <TableCell mono>
                <span className="text-base font-bold">€ {totalExpenses.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-bold text-gray-800">100%</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
