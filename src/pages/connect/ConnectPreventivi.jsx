import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import Select from '../../components/ui/Select'
import { Card, CardContent } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { condomini } from '../../data/users'

const budgetItems = [
  { category: 'Pulizie', preventivo: 6000, note: 'Contratto annuale rinnovato' },
  { category: 'Manutenzione', preventivo: 8500, note: 'Incluso fondo imprevisti' },
  { category: 'Utenze', preventivo: 4200, note: 'Adeguamento tariffe energia' },
  { category: 'Assicurazione', preventivo: 2500, note: 'Polizza condominiale' },
  { category: 'Ascensore', preventivo: 3800, note: 'Contratto manutenzione full' },
  { category: 'Giardinaggio', preventivo: 1600, note: 'Taglio + potatura stagionale' },
  { category: 'Fondo Riserva', preventivo: 2000, note: 'Accantonamento obbligatorio' },
  { category: 'Altro', preventivo: 1400, note: 'Spese amministrative e varie' },
]

export default function ConnectPreventivi() {
  const { user } = useAuth()
  const [year, setYear] = useState('2026')

  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const totalBudget = budgetItems.reduce((sum, item) => sum + item.preventivo, 0)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Preventivi"
        description="Bilancio preventivo del tuo condominio"
        actions={
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            options={[
              { value: '2026', label: 'Preventivo 2026' },
              { value: '2025', label: 'Preventivo 2025' },
            ]}
          />
        }
      />

      <Card>
        <CardContent>
          <p className="text-base text-gray-700 leading-relaxed">
            Il bilancio preventivo {year} prevede spese complessive per <strong>€ {totalBudget.toLocaleString('it-IT')}</strong>.
            Rispetto all'anno precedente si registra un incremento del 4%, principalmente dovuto all'adeguamento
            delle tariffe energetiche e al rinnovo del contratto di manutenzione ascensore con copertura full-risk.
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dettaglio Voci di Spesa</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Importo Previsto</TableHead>
              <TableHead>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetItems.map((item) => (
              <TableRow key={item.category}>
                <TableCell>
                  <span className="text-base font-medium text-gray-800">{item.category}</span>
                </TableCell>
                <TableCell mono>
                  <span className="text-base">€ {item.preventivo.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-500">{item.note}</span>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <span className="text-base font-bold text-gray-800">Totale</span>
              </TableCell>
              <TableCell mono>
                <span className="text-base font-bold">€ {totalBudget.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</span>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
