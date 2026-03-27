import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ticket } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import useSort from '../../hooks/useSort'
import Badge from '../../components/ui/Badge'
import ComboSelect from '../../components/ui/ComboSelect'
import Avatar from '../../components/ui/Avatar'
import SearchBar from '../../components/shared/SearchBar'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import PlanGate from '../../components/shared/PlanGate'

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
  const navigate = useNavigate()

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
    <PlanGate feature="il ticketing avanzato">
    <div>
      <PageHeader
        title="Ticket"
        description={`${tickets.length} ticket totali`}
        actions={null}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Cerca ticket..." className="flex-1" />
        <ComboSelect options={statusOptions} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} placeholder="Tutti gli stati" />
        <ComboSelect searchable options={buildingOptions} value={buildingFilter} onChange={(e) => setBuildingFilter(e.target.value)} placeholder="Tutti gli immobili" />
        <ComboSelect options={priorityOptions} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} placeholder="Tutte le priorita" />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title="Nessun ticket trovato"
          description="Prova a modificare i filtri di ricerca."
        />
      ) : (
        <TicketTable data={filtered} navigate={navigate} />
      )}
    </div>
    </PlanGate>
  )
}

function TicketTable({ data, navigate }) {
  const { sorted, toggle, getSorted } = useSort(data, 'createdDate', 'desc')
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortable sorted={getSorted('id')} onSort={() => toggle('id')}>ID</TableHead>
          <TableHead sortable sorted={getSorted('title')} onSort={() => toggle('title')}>Titolo</TableHead>
          <TableHead sortable sorted={getSorted('condominoName')} onSort={() => toggle('condominoName')}>Condomino</TableHead>
          <TableHead sortable sorted={getSorted('buildingName')} onSort={() => toggle('buildingName')}>Immobile</TableHead>
          <TableHead sortable sorted={getSorted('category')} onSort={() => toggle('category')}>Categoria</TableHead>
          <TableHead sortable sorted={getSorted('priority')} onSort={() => toggle('priority')}>Priorita</TableHead>
          <TableHead sortable sorted={getSorted('status')} onSort={() => toggle('status')}>Stato</TableHead>
          <TableHead sortable sorted={getSorted('createdDate')} onSort={() => toggle('createdDate')}>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((ticket) => (
          <TableRow key={ticket.id} onClick={() => navigate(`/studio/ticket/${ticket.id}`)}>
            <TableCell mono>#{ticket.id.toUpperCase()}</TableCell>
            <TableCell><span className="font-medium text-gray-800">{ticket.title}</span></TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar name={ticket.condominoName} size="sm" />
                <span>{ticket.condominoName}</span>
              </div>
            </TableCell>
            <TableCell>{ticket.buildingName}</TableCell>
            <TableCell><Badge variant="primary">{ticket.category}</Badge></TableCell>
            <TableCell>
              <Badge variant={priorityVariant[ticket.priority]}>
                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
              </Badge>
            </TableCell>
            <TableCell><StatusBadge status={ticket.status} /></TableCell>
            <TableCell>{ticket.createdDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
