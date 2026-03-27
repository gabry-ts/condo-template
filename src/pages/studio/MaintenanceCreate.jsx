import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

import { buildings } from '../../data/buildings'
import { suppliers } from '../../data/suppliers'

const categoryOptions = [
  { value: '', label: 'Seleziona categoria' },
  { value: 'Idraulica', label: 'Idraulica' },
  { value: 'Elettricista', label: 'Elettricista' },
  { value: 'Ascensori', label: 'Ascensori' },
  { value: 'Edilizia', label: 'Edilizia' },
  { value: 'Pulizie', label: 'Pulizie' },
  { value: 'Giardinaggio', label: 'Giardinaggio' },
  { value: 'Altro', label: 'Altro' },
]

const priorityOptions = [
  { value: '', label: 'Seleziona priorita' },
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Media' },
  { value: 'bassa', label: 'Bassa' },
]

export default function MaintenanceCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({
    title: '',
    buildingId: '',
    supplierId: '',
    category: '',
    priority: '',
    cost: '',
    scheduledDate: '',
    description: '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('Manutenzione creata con successo')
    navigate('/studio/manutenzioni')
  }

  const buildingOptions = [
    { value: '', label: 'Seleziona immobile' },
    ...buildings.map((b) => ({ value: b.id, label: b.name })),
  ]

  const supplierOptions = [
    { value: '', label: 'Seleziona fornitore' },
    ...suppliers.map((s) => ({ value: s.id, label: s.company })),
  ]

  return (
    <div>
      <PageHeader
        title="Nuova Manutenzione"
        breadcrumbs={[
          { label: 'Manutenzioni', to: '/studio/manutenzioni' },
          { label: 'Nuova Manutenzione' },
        ]}
      />

      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Titolo"
                  value={form.title}
                  onChange={handleChange('title')}
                  placeholder="Es. Riparazione perdita acqua piano 3"
                  required
                />
              </div>
              <Select
                label="Immobile"
                options={buildingOptions}
                value={form.buildingId}
                onChange={handleChange('buildingId')}
                required
              />
              <Select
                label="Fornitore"
                options={supplierOptions}
                value={form.supplierId}
                onChange={handleChange('supplierId')}
              />
              <Select
                label="Categoria"
                options={categoryOptions}
                value={form.category}
                onChange={handleChange('category')}
                required
              />
              <Select
                label="Priorita"
                options={priorityOptions}
                value={form.priority}
                onChange={handleChange('priority')}
                required
              />
              <Input
                label="Costo Preventivato (EUR)"
                type="number"
                value={form.cost}
                onChange={handleChange('cost')}
                placeholder="Es. 1500"
              />
              <Input
                label="Data Programmata"
                type="date"
                value={form.scheduledDate}
                onChange={handleChange('scheduledDate')}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descrizione</label>
                <textarea
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 min-h-[100px] resize-y"
                  value={form.description}
                  onChange={handleChange('description')}
                  placeholder="Descrivi l'intervento richiesto..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" variant="primary">
                Crea Manutenzione
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/studio/manutenzioni')}>
                Annulla
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
