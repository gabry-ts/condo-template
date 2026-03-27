import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

const categoryOptions = [
  { value: '', label: 'Seleziona categoria' },
  { value: 'Idraulica', label: 'Idraulica' },
  { value: 'Elettricista', label: 'Elettricista' },
  { value: 'Pulizie', label: 'Pulizie' },
  { value: 'Ascensori', label: 'Ascensori' },
  { value: 'Giardinaggio', label: 'Giardinaggio' },
  { value: 'Edilizia', label: 'Edilizia' },
  { value: 'Fabbro', label: 'Fabbro' },
  { value: 'Altro', label: 'Altro' },
]

export default function SupplierCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    piva: '',
    iban: '',
    address: '',
    category: '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toast('Fornitore creato con successo')
    navigate('/studio/fornitori')
  }

  return (
    <div>
      <PageHeader
        title="Nuovo Fornitore"
        breadcrumbs={[
          { label: 'Fornitori', to: '/studio/fornitori' },
          { label: 'Nuovo Fornitore' },
        ]}
      />

      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Ragione Sociale"
                value={form.company}
                onChange={handleChange('company')}
                placeholder="Es. Idraulica Rossi S.r.l."
                required
              />
              <Input
                label="Referente"
                value={form.contact}
                onChange={handleChange('contact')}
                placeholder="Nome e cognome"
                required
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="info@azienda.it"
                required
              />
              <Input
                label="Telefono"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+39 02 1234567"
                required
              />
              <Input
                label="P.IVA"
                value={form.piva}
                onChange={handleChange('piva')}
                placeholder="12345678901"
                required
              />
              <Input
                label="IBAN"
                value={form.iban}
                onChange={handleChange('iban')}
                placeholder="IT60X0542811101000000123456"
              />
              <div className="md:col-span-2">
                <Input
                  label="Indirizzo"
                  value={form.address}
                  onChange={handleChange('address')}
                  placeholder="Via, numero civico, CAP, Citta"
                />
              </div>
              <Select
                label="Categoria"
                options={categoryOptions}
                value={form.category}
                onChange={handleChange('category')}
                required
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit" variant="primary">
                Salva Fornitore
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/studio/fornitori')}>
                Annulla
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
