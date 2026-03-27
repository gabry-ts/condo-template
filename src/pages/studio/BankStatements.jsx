import { useState } from 'react'
import PageHeader from '../../components/layout/PageHeader'
import FileUpload from '../../components/shared/FileUpload'
import Badge from '../../components/ui/Badge'
import { Card, CardContent } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { cn } from '../../lib/cn'
import PlanGate from '../../components/shared/PlanGate'

const parsedTransactions = [
  { id: 1, date: '15/03/2026', description: 'Bonifico rata Q1 - Rossi Giuseppe', amount: 850.00, category: 'Rate Condominiali', confidence: 97 },
  { id: 2, date: '14/03/2026', description: 'Pagamento fattura pulizie marzo', amount: -480.00, category: 'Pulizie', confidence: 94 },
  { id: 3, date: '12/03/2026', description: 'Addebito utenza gas febbraio', amount: -215.40, category: 'Utenze', confidence: 91 },
  { id: 4, date: '10/03/2026', description: 'Bonifico rata Q1 - Esposito Maria', amount: 680.00, category: 'Rate Condominiali', confidence: 98 },
  { id: 5, date: '08/03/2026', description: 'Fattura manutenzione ascensore', amount: -1200.00, category: 'Manutenzione', confidence: 96 },
  { id: 6, date: '05/03/2026', description: 'Commissioni bancarie febbraio', amount: -12.50, category: 'Spese Bancarie', confidence: 89 },
  { id: 7, date: '03/03/2026', description: 'Bonifico rata Q1 - Ferrari Antonio', amount: 1050.00, category: 'Rate Condominiali', confidence: 99 },
  { id: 8, date: '01/03/2026', description: 'Addebito energia elettrica', amount: -320.00, category: 'Utenze', confidence: 93 },
  { id: 9, date: '28/02/2026', description: 'Pagamento intervento idraulico', amount: -350.00, category: 'Manutenzione', confidence: 92 },
  { id: 10, date: '25/02/2026', description: 'Bonifico rata Q1 - Romano Lucia', amount: 780.00, category: 'Rate Condominiali', confidence: 97 },
  { id: 11, date: '20/02/2026', description: 'Addebito polizza assicurativa', amount: -2400.00, category: 'Assicurazione', confidence: 95 },
  { id: 12, date: '15/02/2026', description: 'Pagamento fattura pulizie febbraio', amount: -480.00, category: 'Pulizie', confidence: 94 },
]

function formatCurrency(amount) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount)
}

function getConfidenceVariant(conf) {
  if (conf >= 95) return 'success'
  if (conf >= 90) return 'warning'
  return 'destructive'
}

export default function BankStatements() {
  const [step, setStep] = useState('upload')

  const handleUpload = () => {
    setStep('results')
  }

  return (
    <PlanGate feature="la gestione finanziaria">
    <div>
      <PageHeader
        title="Estratti Conto"
        description="Carica e analizza gli estratti conto bancari"
        breadcrumbs={[
          { label: 'Finanze', to: '/studio/finanze' },
          { label: 'Estratti Conto' },
        ]}
      />

      <div className="space-y-8">
        <FileUpload
          accept=".pdf,.csv"
          label="Carica estratto conto (PDF o CSV)"
          onUpload={handleUpload}
        />

        {step === 'results' && (
          <>
            <Card>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono text-gray-800">12</p>
                    <p className="text-xs text-gray-500 mt-1">Movimenti trovati</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono text-gray-800">4</p>
                    <p className="text-xs text-gray-500 mt-1">Categorie identificate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono text-primary-500">EUR 15.420,50</p>
                    <p className="text-xs text-gray-500 mt-1">Saldo finale</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Descrizione</TableHead>
                  <TableHead className="text-right">Importo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-center">Confidenza</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parsedTransactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell mono className={cn('text-right', t.amount >= 0 ? 'text-success-600' : 'text-destructive-500')}>
                      {t.amount >= 0 ? '+' : ''}{formatCurrency(t.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="primary">{t.category}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getConfidenceVariant(t.confidence)}>{t.confidence}%</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </div>
    </PlanGate>
  )
}
