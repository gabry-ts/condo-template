import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Truck, Plus, Star } from 'lucide-react'

import useSort from '../../hooks/useSort'
import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import SearchBar from '../../components/shared/SearchBar'
import ComboSelect from '../../components/ui/ComboSelect'
import EmptyState from '../../components/shared/EmptyState'

import { suppliers } from '../../data/suppliers'

function fmt(a) { return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(a) }

const categoryOptions = [
  { value: '', label: 'Tutte le categorie' },
  { value: 'Idraulica', label: 'Idraulica' },
  { value: 'Elettricista', label: 'Elettricista' },
  { value: 'Pulizie', label: 'Pulizie' },
  { value: 'Ascensori', label: 'Ascensori' },
  { value: 'Giardinaggio', label: 'Giardinaggio' },
]

export default function Suppliers() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const navigate = useNavigate()

  const filtered = suppliers.filter((s) => {
    const matchSearch = s.company.toLowerCase().includes(search.toLowerCase()) || s.contact.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !categoryFilter || s.category === categoryFilter
    return matchSearch && matchCategory
  })

  const { sorted, toggle, getSorted } = useSort(filtered, 'company', 'asc')

  return (
    <div>
      <PageHeader
        title="Fornitori"
        description={`${suppliers.length} fornitori registrati`}
        actions={<Link to="/studio/fornitori/nuovo"><Button><Plus className="h-4 w-4" />Nuovo Fornitore</Button></Link>}
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Cerca fornitore..." className="flex-1" />
        <ComboSelect searchable options={categoryOptions} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} placeholder="Tutte le categorie" />
      </div>

      {sorted.length === 0 ? (
        <EmptyState icon={Truck} title="Nessun fornitore trovato" description="Prova a modificare i filtri." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead sortable sorted={getSorted('company')} onSort={() => toggle('company')}>Azienda</TableHead>
              <TableHead sortable sorted={getSorted('contact')} onSort={() => toggle('contact')}>Referente</TableHead>
              <TableHead sortable sorted={getSorted('category')} onSort={() => toggle('category')}>Categoria</TableHead>
              <TableHead>Telefono</TableHead>
              <TableHead sortable sorted={getSorted('rating')} onSort={() => toggle('rating')} className="text-right">Rating</TableHead>
              <TableHead sortable sorted={getSorted('totalPaid')} onSort={() => toggle('totalPaid')} className="text-right">Pagato</TableHead>
              <TableHead className="text-right">Immobili</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((s) => (
              <TableRow key={s.id} onClick={() => navigate(`/studio/fornitori/${s.id}`)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Truck className="h-4 w-4 text-primary-500" />
                    </div>
                    <span className="font-medium text-gray-800">{s.company}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{s.contact}</TableCell>
                <TableCell><Badge variant="primary">{s.category}</Badge></TableCell>
                <TableCell className="text-gray-500">{s.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Star className="h-3.5 w-3.5 text-warning-500 fill-warning-500" />
                    <span className="font-mono font-medium text-gray-800">{s.rating}</span>
                  </div>
                </TableCell>
                <TableCell mono className="text-right">{fmt(s.totalPaid)}</TableCell>
                <TableCell mono className="text-right">{s.buildings.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
