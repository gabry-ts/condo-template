import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Plus } from 'lucide-react'

import useSort from '../../hooks/useSort'
import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import SearchBar from '../../components/shared/SearchBar'
import EmptyState from '../../components/shared/EmptyState'

import { buildings } from '../../data/buildings'

function fmt(a) { return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(a) }

export default function Buildings() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = buildings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase())
  )

  const { sorted, toggle, getSorted } = useSort(filtered, 'name', 'asc')

  return (
    <div>
      <PageHeader
        title="Immobili"
        description={`${buildings.length} immobili gestiti`}
        actions={
          <Link to="/studio/immobili/nuovo">
            <Button><Plus className="h-4 w-4" />Nuovo Immobile</Button>
          </Link>
        }
      />

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca per nome, indirizzo o citta..."
          className="w-full"
        />
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon={Building2} title="Nessun immobile trovato" description="Prova a modificare i criteri di ricerca." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead sortable sorted={getSorted('name')} onSort={() => toggle('name')}>Nome</TableHead>
              <TableHead sortable sorted={getSorted('address')} onSort={() => toggle('address')}>Indirizzo</TableHead>
              <TableHead sortable sorted={getSorted('city')} onSort={() => toggle('city')}>Citta</TableHead>
              <TableHead sortable sorted={getSorted('unitsCount')} onSort={() => toggle('unitsCount')} className="text-right">Unita</TableHead>
              <TableHead sortable sorted={getSorted('condominCount')} onSort={() => toggle('condominCount')} className="text-right">Condomini</TableHead>
              <TableHead sortable sorted={getSorted('balance')} onSort={() => toggle('balance')} className="text-right">Saldo</TableHead>
              <TableHead>Morosita</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((b) => (
              <TableRow key={b.id} onClick={() => navigate(`/studio/immobili/${b.id}`)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-4 w-4 text-primary-500" />
                    </div>
                    <span className="font-medium text-gray-800">{b.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{b.address}</TableCell>
                <TableCell className="text-gray-500">{b.city}</TableCell>
                <TableCell mono className="text-right">{b.unitsCount}</TableCell>
                <TableCell mono className="text-right">{b.condominCount}</TableCell>
                <TableCell mono className="text-right">{fmt(b.balance)}</TableCell>
                <TableCell>
                  {b.delinquencyTotal > 0 ? (
                    <Badge variant="destructive">{fmt(b.delinquencyTotal)}</Badge>
                  ) : (
                    <Badge variant="success">OK</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
