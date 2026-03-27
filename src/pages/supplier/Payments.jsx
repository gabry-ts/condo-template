import { CreditCard, Receipt } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import Stat from '../../components/ui/Stat'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import StatusBadge from '../../components/shared/StatusBadge'

import { suppliers } from '../../data/suppliers'

const currentSupplierId = 's1'

const fakeInvoices = [
  { id: 'FT-2026-001', date: '2026-01-15', amount: 2400.00, status: 'pagato', description: 'Riparazione impianto idraulico' },
  { id: 'FT-2026-002', date: '2026-01-28', amount: 1800.00, status: 'pagato', description: 'Sostituzione rubinetteria' },
  { id: 'FT-2026-003', date: '2026-02-10', amount: 3200.00, status: 'pagato', description: 'Manutenzione straordinaria' },
  { id: 'FT-2026-004', date: '2026-02-28', amount: 350.00, status: 'pagato', description: 'Riparazione perdita piano 3' },
  { id: 'FT-2026-005', date: '2026-03-05', amount: 1200.00, status: 'non_pagato', description: 'Ispezione impianto centrale' },
  { id: 'FT-2026-006', date: '2026-03-20', amount: 1200.00, status: 'non_pagato', description: 'Sostituzione valvole' },
]

export default function Payments() {
  const supplier = suppliers.find((s) => s.id === currentSupplierId)

  return (
    <div>
      <PageHeader
        title="Pagamenti"
        description="Riepilogo delle fatture e dei pagamenti"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <Stat
          icon={CreditCard}
          iconColor="bg-success-50 text-success-600"
          label="Totale Ricevuto"
          value={
            <span className="font-mono">
              {(supplier?.totalPaid || 0).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
            </span>
          }
        />
        <Stat
          icon={Receipt}
          iconColor="bg-warning-50 text-warning-600"
          label="In Attesa"
          value={
            <span className="font-mono">
              {(supplier?.totalUnpaid || 0).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
            </span>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fatture</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numero</TableHead>
                <TableHead>Descrizione</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Importo</TableHead>
                <TableHead>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fakeInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell mono>{inv.id}</TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-800">{inv.description}</span>
                  </TableCell>
                  <TableCell>{new Date(inv.date).toLocaleDateString('it-IT')}</TableCell>
                  <TableCell>
                    <span className="font-mono">
                      {inv.amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={inv.status} />
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
