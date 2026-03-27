import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ComboSelect from '../../components/ui/ComboSelect'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

import { buildings } from '../../data/buildings'

const typeOptions = [
  { value: '', label: 'Seleziona tipo' },
  { value: 'Appartamento', label: 'Appartamento' },
  { value: 'Attico', label: 'Attico' },
  { value: 'Monolocale', label: 'Monolocale' },
  { value: 'Ufficio', label: 'Ufficio' },
  { value: 'Negozio', label: 'Negozio' },
  { value: 'Box', label: 'Box / Garage' },
  { value: 'Cantina', label: 'Cantina' },
]

export default function UnitCreate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [form, setForm] = useState({
    buildingId: id || '',
    floor: '',
    number: '',
    type: '',
    sqm: '',
    millesimi: '',
  })

  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))

  const buildingOptions = buildings.map((b) => ({ value: b.id, label: b.name }))
  const building = buildings.find((b) => b.id === form.buildingId)

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('Unita creata con successo')
    navigate(id ? `/studio/immobili/${id}` : '/studio/immobili')
  }

  const breadcrumbs = id
    ? [{ label: 'Immobili', to: '/studio/immobili' }, { label: building?.name || '', to: `/studio/immobili/${id}` }, { label: 'Nuova Unita' }]
    : [{ label: 'Immobili', to: '/studio/immobili' }, { label: 'Nuova Unita' }]

  return (
    <div>
      <PageHeader title="Nuova Unita Immobiliare" breadcrumbs={breadcrumbs} />

      <Card className="max-w-2xl mx-auto">
        <CardHeader><CardTitle>Dati Unita</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <ComboSelect
                  label="Immobile"
                  options={buildingOptions}
                  value={form.buildingId}
                  onChange={handleChange('buildingId')}
                  placeholder="Seleziona immobile"
                  searchable
                  required
                />
              </div>
              <Input label="Piano" type="number" value={form.floor} onChange={handleChange('floor')} placeholder="Es. 3" required />
              <Input label="Numero Interno" value={form.number} onChange={handleChange('number')} placeholder="Es. 12" required />
              <Select label="Tipologia" options={typeOptions} value={form.type} onChange={handleChange('type')} required />
              <Input label="Superficie (mq)" type="number" value={form.sqm} onChange={handleChange('sqm')} placeholder="Es. 85" />
              <Input label="Millesimi" type="number" value={form.millesimi} onChange={handleChange('millesimi')} placeholder="Es. 125" required />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" variant="primary">Crea Unita</Button>
              <Button type="button" variant="outline" onClick={() => navigate(id ? `/studio/immobili/${id}` : '/studio/immobili')}>Annulla</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
