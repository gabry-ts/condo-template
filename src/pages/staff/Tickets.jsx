import { useState } from 'react'
import { Ticket } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Select from '../../components/ui/Select'
import Avatar from '../../components/ui/Avatar'
import SearchBar from '../../components/shared/SearchBar'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'

import { tickets } from '../../data/tickets'
import { buildings } from '../../data/buildings'

const priorityVariant = {
  alta: 'destructive',
  media: 'warning',
  bassa: 'default',
}

const statusOptions = [
  { value: '', label: 'Tutti gli stati' },
  { value: 'aperto', label: 'Aperto' },
  { value: 'in_lavorazione', label: 'In Lavorazione' },
  { value: 'risolto', label: 'Risolto' },
  { value: 'completato', label: 'Completato' },
]

const priorityOptions = [
  { value: '', label: 'Tutte le priorita' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'bassa', label: 'Bassa' },
]

export default function Tickets() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [buildingFilter, setBuildingFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const buildingOptions = [
    { value: '', label: 'Tutti gli immobili' },
    ...buildings.map((b) => ({ value: b.id, label: b.name })),
  ]

  const filtered = tickets.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.condominoName.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !statusFilter || t.status === statusFilter
    const matchBuilding = !buildingFilter || t.buildingId === buildingFilter
    const matchPriority = !priorityFilter || t.priority === priorityFilter
    return matchSearch && matchStatus && matchBuilding && matchPriority
  })

  return (
    <div>
      <PageHeader
        title="Ticket"
        description={`${tickets.length} ticket totali`}
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca ticket..."
          className="w-64"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-44"
        />
        <Select
          options={buildingOptions}
          value={buildingFilter}
          onChange={(e) => setBuildingFilter(e.target.value)}
          className="w-52"
        />
        <Select
          options={priorityOptions}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-44"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title="Nessun ticket trovato"
          description="Prova a modificare i filtri di ricerca."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Titolo</TableHead>
              <TableHead>Condomino</TableHead>
              <TableHead>Immobile</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Priorita</TableHead>
              <TableHead>Stato</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell mono>#{ticket.id.toUpperCase()}</TableCell>
                <TableCell>
                  <span className="font-medium text-gray-800">{ticket.title}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar name={ticket.condominoName} size="sm" />
                    <span>{ticket.condominoName}</span>
                  </div>
                </TableCell>
                <TableCell>{ticket.buildingName}</TableCell>
                <TableCell>
                  <Badge variant="primary">{ticket.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={priorityVariant[ticket.priority]}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>{ticket.createdDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
