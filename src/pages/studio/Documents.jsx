import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Upload, Download, Trash2, FileText } from 'lucide-react'
import useSort from '../../hooks/useSort'
import PageHeader from '../../components/layout/PageHeader'
import Button from '../../components/ui/Button'
import SearchBar from '../../components/shared/SearchBar'
import ComboSelect from '../../components/ui/ComboSelect'
import { Card, CardContent } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Badge from '../../components/ui/Badge'
import Dropdown from '../../components/ui/Dropdown'
import EmptyState from '../../components/shared/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { documents, documentCategories } from '../../data/documents'
import { buildings } from '../../data/buildings'

export default function Documents() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [buildingId, setBuildingId] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const filtered = documents.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !category || doc.category === category
    const matchBuilding = !buildingId || doc.buildingId === buildingId
    return matchSearch && matchCategory && matchBuilding
  })

  const buildingOptions = buildings.map((b) => ({ value: b.id, label: b.name }))
  const categoryOptions = documentCategories.map((c) => ({ value: c, label: c }))

  const getBuildingName = (bId) => buildings.find((b) => b.id === bId)?.name || '-'

  return (
    <div>
      <PageHeader
        title="Documenti"
        description="Archivio documenti condominiali"
        actions={
          <Link to="/studio/documenti/upload">
            <Button>
              <Upload className="h-4 w-4" />
              Carica Documento
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca documento..."
          className="flex-1"
        />
        <ComboSelect
          searchable
          options={categoryOptions}
          placeholder="Tutte le categorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          icon={FileText}
          title="Nessun documento trovato"
          description="Prova a modificare i filtri di ricerca."
        />
      ) : (
        <DocTable data={filtered} navigate={navigate} toast={toast} getBuildingName={getBuildingName} />
      )}
    </div>
  )
}

function DocTable({ data, navigate, toast, getBuildingName }) {
  const enriched = data.map((d) => ({ ...d, buildingName: getBuildingName(d.buildingId) }))
  const { sorted, toggle, getSorted } = useSort(enriched, 'uploadDate', 'desc')
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead sortable sorted={getSorted('name')} onSort={() => toggle('name')}>Nome</TableHead>
          <TableHead sortable sorted={getSorted('category')} onSort={() => toggle('category')}>Categoria</TableHead>
          <TableHead sortable sorted={getSorted('type')} onSort={() => toggle('type')}>Tipo</TableHead>
          <TableHead>Dimensione</TableHead>
          <TableHead sortable sorted={getSorted('buildingName')} onSort={() => toggle('buildingName')}>Immobile</TableHead>
          <TableHead sortable sorted={getSorted('uploadDate')} onSort={() => toggle('uploadDate')}>Data Upload</TableHead>
          <TableHead className="w-12">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((doc) => (
          <TableRow key={doc.id} onClick={() => navigate(`/studio/documenti/${doc.id}`)}>
            <TableCell className="font-medium">{doc.name}</TableCell>
            <TableCell><Badge variant="primary">{doc.category}</Badge></TableCell>
            <TableCell>{doc.type}</TableCell>
            <TableCell className="text-gray-500">{doc.size}</TableCell>
            <TableCell>{doc.buildingName}</TableCell>
            <TableCell>{new Date(doc.uploadDate).toLocaleDateString('it-IT')}</TableCell>
            <TableCell>
              <Dropdown
                items={[
                  { icon: Download, label: 'Scarica', onClick: () => toast('Download avviato: ' + doc.name) },
                  { divider: true },
                  { icon: Trash2, label: 'Elimina', destructive: true, onClick: () => toast('Documento eliminato', 'warning') },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
