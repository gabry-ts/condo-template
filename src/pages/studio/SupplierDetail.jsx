import { useParams, Link } from 'react-router-dom'
import { Truck, Mail, Phone, MapPin, CreditCard, Star } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Stat from '../../components/ui/Stat'
import Tabs from '../../components/ui/Tabs'
import StatusBadge from '../../components/shared/StatusBadge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'

import { suppliers } from '../../data/suppliers'
import { maintenances } from '../../data/maintenance'

const fakeInvoices = [
  { id: 'FT-001', date: '2026-01-15', amount: 2400.00, status: 'pagato' },
  { id: 'FT-002', date: '2026-02-10', amount: 1800.00, status: 'pagato' },
  { id: 'FT-003', date: '2026-02-28', amount: 350.00, status: 'pagato' },
  { id: 'FT-004', date: '2026-03-05', amount: 1200.00, status: 'non_pagato' },
  { id: 'FT-005', date: '2026-03-20', amount: 800.00, status: 'non_pagato' },
]

export default function SupplierDetail() {
  const { id } = useParams()
  const supplier = suppliers.find((s) => s.id === id)

  if (!supplier) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Fornitore non trovato.</p>
      </div>
    )
  }

  const supplierJobs = maintenances.filter((m) => m.supplierId === supplier.id)

  const infoFields = [
    { label: 'Ragione Sociale', value: supplier.company },
    { label: 'Referente', value: supplier.contact },
    { label: 'Email', value: supplier.email, icon: Mail },
    { label: 'Telefono', value: supplier.phone, icon: Phone },
    { label: 'P.IVA', value: supplier.piva },
    { label: 'IBAN', value: supplier.iban, mono: true },
    { label: 'Indirizzo', value: supplier.address, icon: MapPin },
    { label: 'Categoria', value: supplier.category },
  ]

  const tabs = [
    {
      id: 'anagrafica',
      label: 'Anagrafica',
      content: (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infoFields.map((field) => (
                <div key={field.label}>
                  <p className="text-sm text-gray-500 mb-1">{field.label}</p>
                  <p className={`text-sm font-medium text-gray-800 ${field.mono ? 'font-mono' : ''}`}>
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'manutenzioni',
      label: 'Manutenzioni',
      content: (
        <Card>
          <CardContent className="pt-6">
            {supplierJobs.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-6">Nessuna manutenzione associata a questo fornitore.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titolo</TableHead>
                    <TableHead>Immobile</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Stato</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Costo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplierJobs.map((job) => (
                    <TableRow key={job.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <Link to={`/studio/manutenzioni/${job.id}`} className="font-medium text-primary-600 hover:text-primary-700">
                          {job.title}
                        </Link>
                      </TableCell>
                      <TableCell>{job.buildingName}</TableCell>
                      <TableCell>
                        <Badge variant="primary">{job.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={job.status} />
                      </TableCell>
                      <TableCell>{job.scheduledDate || job.createdDate}</TableCell>
                      <TableCell>
                        <span className="font-mono">
                          {job.cost.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'pagamenti',
      label: 'Pagamenti',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Stat
              icon={CreditCard}
              iconColor="bg-success-50 text-success-600"
              label="Totale Pagato"
              value={
                <span className="font-mono">
                  {supplier.totalPaid.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                </span>
              }
            />
            <Stat
              icon={CreditCard}
              iconColor="bg-warning-50 text-warning-600"
              label="Totale Non Pagato"
              value={
                <span className="font-mono">
                  {supplier.totalUnpaid.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
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
                    <TableHead>Data</TableHead>
                    <TableHead>Importo</TableHead>
                    <TableHead>Stato</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fakeInvoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell mono>{inv.id}</TableCell>
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
      ),
    },
  ]

  return (
    <div>
      <PageHeader
        title={supplier.company}
        breadcrumbs={[
          { label: 'Fornitori', to: '/studio/fornitori' },
          { label: supplier.company },
        ]}
      />

      <div className="flex items-center gap-3 mb-6">
        <Badge variant="primary">{supplier.category}</Badge>
        <div className="flex items-center gap-1 text-warning-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">{supplier.rating}</span>
        </div>
        <span className="text-sm text-gray-500">{supplier.jobsCompleted} manutenzioni completate</span>
      </div>

      <Tabs tabs={tabs} defaultTab="anagrafica" />
    </div>
  )
}
