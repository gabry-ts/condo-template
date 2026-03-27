import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Gavel, Plus } from 'lucide-react'

import useSort from '../../hooks/useSort'
import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ComboSelect from '../../components/ui/ComboSelect'
import SearchBar from '../../components/shared/SearchBar'
import StatusBadge from '../../components/shared/StatusBadge'
import PlanGate from '../../components/shared/PlanGate'
import EmptyState from '../../components/shared/EmptyState'

import { assemblies } from '../../data/assemblies'
import { buildings } from '../../data/buildings'

export default function Assemblies() {
  const [search, setSearch] = useState('')
  const [filterBuilding, setFilterBuilding] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const navigate = useNavigate()

  const filtered = assemblies.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.buildingName.toLowerCase().includes(search.toLowerCase())
    const matchBuilding = !filterBuilding || a.buildingId === filterBuilding
    const matchStatus = !filterStatus || a.status === filterStatus
    return matchSearch && matchBuilding && matchStatus
  })

  const { sorted, toggle, getSorted } = useSort(filtered, 'date', 'desc')

  const buildingOptions = buildings.map((b) => ({ value: b.id, label: b.name }))
  const statusOptions = [
    { value: 'bozza', label: 'Bozza' },
    { value: 'convocata', label: 'Convocata' },
    { value: 'in_corso', label: 'In Corso' },
    { value: 'conclusa', label: 'Conclusa' },
  ]

  return (
    <PlanGate feature="le assemblee">
      <div>
        <PageHeader
          title="Assemblee"
          description={`${assemblies.length} assemblee totali`}
          actions={
            <Link to="/studio/assemblee/nuova">
              <Button><Plus className="h-4 w-4" />Nuova Assemblea</Button>
            </Link>
          }
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar value={search} onChange={setSearch} placeholder="Cerca assemblea..." className="flex-1" />
          <ComboSelect searchable placeholder="Tutti gli immobili" options={buildingOptions} value={filterBuilding} onChange={(e) => setFilterBuilding(e.target.value)} />
          <ComboSelect placeholder="Tutti gli stati" options={statusOptions} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} />
        </div>

        {sorted.length === 0 ? (
          <EmptyState icon={Gavel} title="Nessuna assemblea trovata" description="Modifica i filtri o crea una nuova assemblea." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead sortable sorted={getSorted('title')} onSort={() => toggle('title')}>Titolo</TableHead>
                <TableHead sortable sorted={getSorted('buildingName')} onSort={() => toggle('buildingName')}>Immobile</TableHead>
                <TableHead sortable sorted={getSorted('type')} onSort={() => toggle('type')}>Tipo</TableHead>
                <TableHead sortable sorted={getSorted('date')} onSort={() => toggle('date')}>Data</TableHead>
                <TableHead>Partecipanti</TableHead>
                <TableHead sortable sorted={getSorted('status')} onSort={() => toggle('status')}>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((a) => (
                <TableRow key={a.id} onClick={() => navigate(`/studio/assemblee/${a.id}`)}>
                  <TableCell className="font-medium">{a.title}</TableCell>
                  <TableCell className="text-gray-500">{a.buildingName}</TableCell>
                  <TableCell><Badge variant={a.type === 'straordinaria' ? 'accent' : 'primary'}>{a.type === 'straordinaria' ? 'Straordinaria' : 'Ordinaria'}</Badge></TableCell>
                  <TableCell>{a.date ? `${new Date(a.date).toLocaleDateString('it-IT')} ${a.time || ''}` : '-'}</TableCell>
                  <TableCell mono>{a.participants.length}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </PlanGate>
  )
}
