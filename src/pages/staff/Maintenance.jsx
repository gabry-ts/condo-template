import { useState } from 'react'
import { Wrench } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import SearchBar from '../../components/shared/SearchBar'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'

import { maintenances } from '../../data/maintenance'

const priorityVariant = {
  alta: 'destructive',
  media: 'warning',
  bassa: 'default',
}

const statusOptions = [
  { value: '', label: 'Tutti gli stati' },
  { value: 'completato', label: 'Completato' },
  { value: 'in_corso', label: 'In Corso' },
  { value: 'programmata', label: 'Programmata' },
  { value: 'in_attesa', label: 'In Attesa' },
]

export default function Maintenance() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = maintenances.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.buildingName.toLowerCase().includes(search.toLowerCase()) ||
      (m.supplierName && m.supplierName.toLowerCase().includes(search.toLowerCase()))
    const matchStatus = !statusFilter || m.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <PageHeader
        title="Manutenzioni"
        description={`${maintenances.length} manutenzioni totali`}
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca manutenzione..."
          className="w-64"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-48"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="Nessuna manutenzione trovata"
          description="Prova a modificare i filtri di ricerca."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titolo</TableHead>
              <TableHead>Immobile</TableHead>
              <TableHead>Fornitore</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Priorita</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Costo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <span className="font-medium text-gray-800">{m.title}</span>
                </TableCell>
                <TableCell>{m.buildingName}</TableCell>
                <TableCell>{m.supplierName || <span className="text-gray-400">Non assegnato</span>}</TableCell>
                <TableCell>
                  <Badge variant="primary">{m.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant[m.priority]}>
                    {m.priority.charAt(0).toUpperCase() + m.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={m.status} />
                </TableCell>
                <TableCell>{m.scheduledDate || m.createdDate}</TableCell>
                <TableCell>
                  <span className="font-mono">
                    {m.cost.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
