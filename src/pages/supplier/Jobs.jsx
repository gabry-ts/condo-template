import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wrench } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import SearchBar from '../../components/shared/SearchBar'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'

import { maintenances } from '../../data/maintenance'

const currentSupplierId = 's1'

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

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const navigate = useNavigate()

  const myJobs = maintenances.filter((m) => m.supplierId === currentSupplierId)

  const filtered = myJobs.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.buildingName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || m.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      <PageHeader
        title="I Miei Lavori"
        description={`${myJobs.length} lavori totali`}
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca lavoro..."
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
          title="Nessun lavoro trovato"
          description="Prova a modificare i filtri di ricerca."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titolo</TableHead>
              <TableHead>Immobile</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Priorita</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Costo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((job) => (
              <TableRow key={job.id} onClick={() => navigate(`/fornitore/lavori/${job.id}`)}>
                <TableCell>
                  <span className="font-medium text-gray-800">{job.title}</span>
                </TableCell>
                <TableCell>{job.buildingName}</TableCell>
                <TableCell>
                  <StatusBadge status={job.status} />
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant[job.priority]}>
                    {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                  </Badge>
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
    </div>
  )
}
