import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Plus, Eye, Clock, Send, Paperclip, Search } from 'lucide-react'

import useSort from '../../hooks/useSort'
import PageHeader from '../../components/layout/PageHeader'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import ComboSelect from '../../components/ui/ComboSelect'
import SearchBar from '../../components/shared/SearchBar'
import EmptyState from '../../components/shared/EmptyState'
import PlanGate from '../../components/shared/PlanGate'

import { communications } from '../../data/communications'
import { buildings } from '../../data/buildings'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function Communications() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [buildingFilter, setBuildingFilter] = useState('')

  const buildingOptions = [
    { value: '', label: 'Tutti gli immobili' },
    ...buildings.map((b) => ({ value: b.id, label: b.name })),
  ]

  const filtered = communications.filter((c) => {
    const matchSearch = c.subject.toLowerCase().includes(search.toLowerCase()) || c.recipients.toLowerCase().includes(search.toLowerCase())
    const matchBuilding = !buildingFilter || c.buildingId === buildingFilter
    return matchSearch && matchBuilding
  })

  const { sorted, toggle, getSorted } = useSort(filtered, 'sentDate', 'desc')

  return (
    <PlanGate feature="le comunicazioni">
      <div>
        <PageHeader
          title="Comunicazioni"
          description={`${communications.length} comunicazioni inviate`}
          actions={
            <Link to="/studio/comunicazioni/nuova">
              <Button><Plus className="h-4 w-4" />Nuova Comunicazione</Button>
            </Link>
          }
        />

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar value={search} onChange={setSearch} placeholder="Cerca per oggetto o destinatario..." className="flex-1" />
          <ComboSelect searchable options={buildingOptions} value={buildingFilter} onChange={(e) => setBuildingFilter(e.target.value)} placeholder="Tutti gli immobili" />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Mail} title="Nessuna comunicazione" description="Non ci sono comunicazioni per i filtri selezionati." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead sortable sorted={getSorted('subject')} onSort={() => toggle('subject')}>Oggetto</TableHead>
                <TableHead sortable sorted={getSorted('recipients')} onSort={() => toggle('recipients')}>Destinatari</TableHead>
                <TableHead sortable sorted={getSorted('buildingName')} onSort={() => toggle('buildingName')}>Immobile</TableHead>
                <TableHead sortable sorted={getSorted('sentDate')} onSort={() => toggle('sentDate')}>Data Invio</TableHead>
                <TableHead>Allegati</TableHead>
                <TableHead>Stato</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((c) => (
                <TableRow key={c.id} onClick={() => navigate(`/studio/comunicazioni/${c.id}`)}>
                  <TableCell className="font-medium">{c.subject}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm text-gray-700">{c.recipients}</span>
                      {c.recipientCount > 1 && <Badge variant="default">{c.recipientCount}</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{c.buildingName}</TableCell>
                  <TableCell className="text-gray-500">{formatDate(c.sentDate)}</TableCell>
                  <TableCell>
                    {c.attachments.length > 0 ? (
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-sm text-gray-600">{c.attachments.length}</span>
                      </div>
                    ) : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">Inviata</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </PlanGate>
  )
}
