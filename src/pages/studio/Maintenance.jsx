import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Wrench } from 'lucide-react'
import useSort from '../../hooks/useSort'
import PageHeader from '../../components/layout/PageHeader'
import Button from '../../components/ui/Button'
import SearchBar from '../../components/shared/SearchBar'
import ComboSelect from '../../components/ui/ComboSelect'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import StatusBadge from '../../components/shared/StatusBadge'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/shared/EmptyState'
import { maintenances } from '../../data/maintenance'
import { buildings } from '../../data/buildings'

const statusOptions = [
  { value: 'in_attesa', label: 'In Attesa' },
  { value: 'programmata', label: 'Programmata' },
  { value: 'in_corso', label: 'In Corso' },
  { value: 'completato', label: 'Completato' },
]

const priorityVariants = {
  alta: 'destructive',
  media: 'warning',
  bassa: 'default',
}

export default function Maintenance() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [buildingId, setBuildingId] = useState('')

  const filtered = maintenances.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchStatus = !status || m.status === status
    const matchBuilding = !buildingId || m.buildingId === buildingId
    return matchSearch && matchStatus && matchBuilding
  })

  const { sorted, toggle, getSorted } = useSort(filtered, 'title', 'desc')

  const buildingOptions = buildings.map((b) => ({ value: b.id, label: b.name }))

  return (
    <div>
      <PageHeader
        title="Manutenzioni"
        description="Gestione interventi di manutenzione"
        actions={
          <Link to="/studio/manutenzioni/nuova">
            <Button>
              <Plus className="h-4 w-4" />
              Nuova Manutenzione
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca manutenzione..."
          className="flex-1"
        />
        <ComboSelect
          options={statusOptions}
          placeholder="Tutti gli stati"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <ComboSelect
          searchable
          options={buildingOptions}
          placeholder="Tutti gli immobili"
          value={buildingId}
          onChange={(e) => setBuildingId(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Wrench}
          title="Nessuna manutenzione trovata"
          description="Prova a modificare i filtri oppure crea una nuova manutenzione."
        />
      ) : (
        <Table>
              <TableHeader>
                <TableRow>
                  <TableHead sortable sorted={getSorted('title')} onSort={() => toggle('title')}>Titolo</TableHead>
                  <TableHead sortable sorted={getSorted('buildingName')} onSort={() => toggle('buildingName')}>Immobile</TableHead>
                  <TableHead sortable sorted={getSorted('supplierName')} onSort={() => toggle('supplierName')}>Fornitore</TableHead>
                  <TableHead sortable sorted={getSorted('category')} onSort={() => toggle('category')}>Categoria</TableHead>
                  <TableHead sortable sorted={getSorted('status')} onSort={() => toggle('status')}>Stato</TableHead>
                  <TableHead sortable sorted={getSorted('priority')} onSort={() => toggle('priority')}>Priorita</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead sortable sorted={getSorted('cost')} onSort={() => toggle('cost')}>Costo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((m) => (
                  <TableRow
                    key={m.id}
                    className="cursor-pointer"
                    onClick={() => navigate(`/studio/manutenzioni/${m.id}`)}
                  >
                    <TableCell className="font-medium">{m.title}</TableCell>
                    <TableCell>{m.buildingName}</TableCell>
                    <TableCell>{m.supplierName || '-'}</TableCell>
                    <TableCell>{m.category}</TableCell>
                    <TableCell>
                      <StatusBadge status={m.status} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={priorityVariants[m.priority] || 'default'}>
                        {m.priority.charAt(0).toUpperCase() + m.priority.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {m.scheduledDate
                        ? new Date(m.scheduledDate).toLocaleDateString('it-IT')
                        : '-'}
                    </TableCell>
                    <TableCell className="font-mono">
                      € {m.cost.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
        </Table>
      )}
    </div>
  )
}
