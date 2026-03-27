import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Users, Plus } from 'lucide-react'

import useSort from '../../hooks/useSort'
import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import ComboSelect from '../../components/ui/ComboSelect'
import Avatar from '../../components/ui/Avatar'
import SearchBar from '../../components/shared/SearchBar'
import EmptyState from '../../components/shared/EmptyState'

import { condomini } from '../../data/users'
import { buildings, units } from '../../data/buildings'
import { delinquencies } from '../../data/delinquency'

export default function Condomini() {
  const [search, setSearch] = useState('')
  const [buildingFilter, setBuildingFilter] = useState('')
  const navigate = useNavigate()

  const buildingOptions = [
    { value: '', label: 'Tutti gli immobili' },
    ...buildings.map((b) => ({ value: b.id, label: b.name })),
  ]

  const getBuilding = (id) => buildings.find((b) => b.id === id)
  const getUnit = (id) => units.find((u) => u.id === id)
  const isDelinquent = (condId) => delinquencies.some((d) => d.condominoId === condId)

  const filtered = condomini.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.toLowerCase().includes(search.toLowerCase())
    const matchBuilding = !buildingFilter || c.buildingId === buildingFilter
    return matchSearch && matchBuilding
  }).map((c) => ({ ...c, buildingName: getBuilding(c.buildingId)?.name || '' }))

  const { sorted, toggle, getSorted } = useSort(filtered, 'name', 'desc')

  return (
    <div>
      <PageHeader
        title="Condomini"
        description={`${condomini.length} condomini totali`}
        actions={
          <Link to="/studio/condomini/nuovo">
            <Button><Plus className="h-4 w-4" />Aggiungi Condomino</Button>
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca per nome, email, telefono..."
          className="flex-1"
        />
        <ComboSelect
          searchable
          options={buildingOptions}
          value={buildingFilter}
          onChange={(e) => setBuildingFilter(e.target.value)}
          placeholder="Tutti gli immobili"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nessun condomino trovato"
          description="Prova a modificare i filtri di ricerca."
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead sortable sorted={getSorted('name')} onSort={() => toggle('name')}>Condomino</TableHead>
              <TableHead sortable sorted={getSorted('buildingName')} onSort={() => toggle('buildingName')}>Immobile</TableHead>
              <TableHead>Unita</TableHead>
              <TableHead className="text-right" sortable sorted={getSorted('millesimi')} onSort={() => toggle('millesimi')}>Millesimi</TableHead>
              <TableHead sortable sorted={getSorted('phone')} onSort={() => toggle('phone')}>Telefono</TableHead>
              <TableHead>Stato</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((condo) => {
              const building = getBuilding(condo.buildingId)
              const unit = getUnit(condo.unitId)
              const delinquent = isDelinquent(condo.id)
              return (
                <TableRow
                  key={condo.id}
                  onClick={() => navigate(`/studio/immobili/${condo.buildingId}/condomini/${condo.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={condo.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{condo.name}</p>
                        <p className="text-xs text-gray-500">{condo.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">{building?.name || '-'}</span>
                  </TableCell>
                  <TableCell>
                    {unit ? (
                      <span className="text-sm text-gray-600">Piano {unit.floor}, Int. {unit.number}</span>
                    ) : '-'}
                  </TableCell>
                  <TableCell mono className="text-right">{condo.millesimi}</TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{condo.phone}</span>
                  </TableCell>
                  <TableCell>
                    {delinquent ? (
                      <Badge variant="destructive">Moroso</Badge>
                    ) : (
                      <Badge variant="success">Regolare</Badge>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
