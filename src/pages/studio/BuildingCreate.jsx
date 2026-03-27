import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

export default function BuildingCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    cap: '',
    cf: '',
    iban: '',
    floors: '',
    units: '',
    elevator: '',
    heating: '',
    yearBuilt: '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('Immobile creato con successo')
    navigate('/studio/immobili')
  }

  return (
    <div>
      <PageHeader
        title="Nuovo Immobile"
        breadcrumbs={[
          { label: 'Immobili', to: '/studio/immobili' },
          { label: 'Nuovo Immobile' },
        ]}
      />

      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Anagrafica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="Nome Condominio"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Es. Condominio Via Roma 15"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Input
                    label="Indirizzo"
                    value={form.address}
                    onChange={handleChange('address')}
                    placeholder="Via, numero civico"
                    required
                  />
                </div>
                <Input
                  label="Citta"
                  value={form.city}
                  onChange={handleChange('city')}
                  placeholder="Es. Milano"
                  required
                />
                <Input
                  label="CAP"
                  value={form.cap}
                  onChange={handleChange('cap')}
                  placeholder="Es. 20121"
                />
                <Input
                  label="Codice Fiscale Condominio"
                  value={form.cf}
                  onChange={handleChange('cf')}
                  placeholder="12345678901"
                />
                <Input
                  label="IBAN"
                  value={form.iban}
                  onChange={handleChange('iban')}
                  placeholder="IT60X0542811101000000123456"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Caratteristiche</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Numero Piani"
                  type="number"
                  value={form.floors}
                  onChange={handleChange('floors')}
                  placeholder="Es. 5"
                />
                <Input
                  label="Numero Unita"
                  type="number"
                  value={form.units}
                  onChange={handleChange('units')}
                  placeholder="Es. 12"
                />
                <Select
                  label="Ascensore"
                  options={[
                    { value: '', label: 'Seleziona' },
                    { value: 'si', label: 'Si' },
                    { value: 'no', label: 'No' },
                  ]}
                  value={form.elevator}
                  onChange={handleChange('elevator')}
                />
                <Select
                  label="Riscaldamento"
                  options={[
                    { value: '', label: 'Seleziona' },
                    { value: 'centralizzato', label: 'Centralizzato' },
                    { value: 'autonomo', label: 'Autonomo' },
                  ]}
                  value={form.heating}
                  onChange={handleChange('heating')}
                />
                <Input
                  label="Anno Costruzione"
                  type="number"
                  value={form.yearBuilt}
                  onChange={handleChange('yearBuilt')}
                  placeholder="Es. 1975"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" variant="primary">
                Crea Immobile
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/studio/immobili')}>
                Annulla
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
