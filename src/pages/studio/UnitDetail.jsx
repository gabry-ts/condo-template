import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Building2,
  Home,
  Layers,
  Ruler,
  PieChart,
  Mail,
  Phone,
  Calendar,
  Pencil,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { useToast } from '../../components/ui/Toast'

import { buildings, units } from '../../data/buildings'
import { condomini } from '../../data/users'
import { rates } from '../../data/finance'

export default function UnitDetail() {
  const { id, uid } = useParams()
  const toast = useToast()

  const building = buildings.find((b) => b.id === id)
  const unit = units.find((u) => u.id === uid)
  const condomino = unit ? condomini.find((c) => c.id === unit.condominoId) : null
  const unitRates = useMemo(
    () =>
      unit
        ? rates
            .filter((r) => r.condominoId === unit.condominoId && r.buildingId === id)
            .sort((a, b) => {
              if (a.year !== b.year) return b.year - a.year
              return a.quarter.localeCompare(b.quarter)
            })
        : [],
    [unit, id]
  )

  const [editOpen, setEditOpen] = useState(false)
  const [form, setForm] = useState({
    floor: unit?.floor ?? '',
    number: unit?.number ?? '',
    type: unit?.type ?? '',
    sqm: unit?.sqm ?? '',
    millesimi: unit?.millesimi ?? '',
    condominoId: unit?.condominoId ?? '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSave = () => {
    setEditOpen(false)
    toast('Anagrafica unità aggiornata con successo', 'success')
  }

  if (!building || !unit) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <EmptyState
          icon={Home}
          title="Unità non trovata"
          description="L'unità richiesta non esiste o è stata rimossa."
          actionLabel="Torna all'Immobile"
          onAction={() => window.history.back()}
        />
      </div>
    )
  }

  const unitInfo = [
    { label: 'Piano', value: unit.floor, icon: Layers },
    { label: 'Numero', value: unit.number, icon: Home },
    { label: 'Tipologia', value: unit.type, icon: Building2 },
    { label: 'Superficie', value: `${unit.sqm} mq`, icon: Ruler },
    { label: 'Millesimi', value: unit.millesimi, icon: PieChart },
  ]

  const condominoOptions = condomini
    .filter((c) => c.buildingId === id)
    .map((c) => ({ value: c.id, label: c.name }))

  const typeOptions = [
    { value: 'Appartamento', label: 'Appartamento' },
    { value: 'Box', label: 'Box' },
    { value: 'Cantina', label: 'Cantina' },
    { value: 'Negozio', label: 'Negozio' },
    { value: 'Ufficio', label: 'Ufficio' },
  ]

  return (
    <div>
      <PageHeader
        title={unit.number}
        breadcrumbs={[
          { label: 'Immobili', to: '/studio/immobili' },
          { label: building.name, to: `/studio/immobili/${building.id}` },
          { label: unit.number },
        ]}
      />

      {/* Unit Info */}
      <Card variant="elevated" className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary-400" />
              Informazioni Unità
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              <Pencil className="h-3.5 w-3.5" />
              Modifica Anagrafica
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {unitInfo.map((item) => (
              <div key={item.label} className="flex flex-col items-center p-4 rounded-xl bg-gray-50 text-center">
                <div className="h-9 w-9 rounded-lg bg-primary-100 flex items-center justify-center mb-2">
                  <item.icon className="h-4 w-4 text-primary-500" />
                </div>
                <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Condomino Section */}
      {condomino && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Condomino</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar name={condomino.name} size="lg" />
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">{condomino.name}</p>
                <div className="mt-2 space-y-1.5">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {condomino.email}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {condomino.phone}
                  </p>
                </div>
                <div className="mt-3">
                  <Badge variant="primary">
                    <span className="font-mono">{condomino.millesimi}</span> millesimi
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-400" />
            Rate Condominiali
          </CardTitle>
        </CardHeader>
        <CardContent>
          {unitRates.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">Nessuna rata registrata per questa unità.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anno</TableHead>
                  <TableHead>Trimestre</TableHead>
                  <TableHead>Importo</TableHead>
                  <TableHead>Scadenza</TableHead>
                  <TableHead>Pagata il</TableHead>
                  <TableHead>Stato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unitRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell className="text-sm text-gray-800">{rate.year}</TableCell>
                    <TableCell className="text-sm text-gray-800">{rate.quarter}</TableCell>
                    <TableCell>
                      <span className="font-mono text-sm font-medium text-gray-800">
                        {rate.amount.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(rate.dueDate).toLocaleDateString('it-IT')}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {rate.paidDate ? new Date(rate.paidDate).toLocaleDateString('it-IT') : '—'}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={rate.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Modifica Anagrafica Unità"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Annulla</Button>
            <Button onClick={handleSave}>Salva</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Piano" value={form.floor} onChange={handleChange('floor')} />
          <Input label="Numero" value={form.number} onChange={handleChange('number')} />
          <Select
            label="Tipologia"
            value={form.type}
            onChange={handleChange('type')}
            options={typeOptions}
          />
          <Input label="Superficie (mq)" type="number" value={form.sqm} onChange={handleChange('sqm')} />
          <Input label="Millesimi" type="number" value={form.millesimi} onChange={handleChange('millesimi')} />
          <Select
            label="Condomino"
            value={form.condominoId}
            onChange={handleChange('condominoId')}
            options={condominoOptions}
            placeholder="Seleziona condomino"
          />
        </div>
      </Modal>
    </div>
  )
}
