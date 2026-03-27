import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Send, UserPlus } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import ComboSelect from '../../components/ui/ComboSelect'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

import { buildings, units } from '../../data/buildings'

export default function CondominoCreate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    cf: '',
    buildingId: id || '',
    unitId: '',
    millesimi: '',
    role: '',
    sendInvite: true,
  })

  const handleChange = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const buildingOptions = buildings.map((b) => ({ value: b.id, label: b.name }))

  const buildingUnits = units.filter((u) => u.buildingId === form.buildingId)
  const unitOptions = buildingUnits.map((u) => ({ value: u.id, label: `${u.type} - Piano ${u.floor}, Int. ${u.number}` }))

  const roleOptions = [
    { value: '', label: 'Seleziona ruolo' },
    { value: 'proprietario', label: 'Proprietario' },
    { value: 'inquilino', label: 'Inquilino' },
    { value: 'usufruttuario', label: 'Usufruttuario' },
  ]

  const building = buildings.find((b) => b.id === form.buildingId)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.sendInvite) {
      toast('Condomino aggiunto e invito inviato a ' + form.email)
    } else {
      toast('Condomino aggiunto con successo')
    }
    if (id) {
      navigate(`/studio/immobili/${id}`)
    } else {
      navigate('/studio/condomini')
    }
  }

  const breadcrumbs = id
    ? [{ label: 'Immobili', to: '/studio/immobili' }, { label: building?.name || '', to: `/studio/immobili/${id}` }, { label: 'Nuovo Condomino' }]
    : [{ label: 'Condomini', to: '/studio/condomini' }, { label: 'Nuovo Condomino' }]

  return (
    <div>
      <PageHeader title="Nuovo Condomino" breadcrumbs={breadcrumbs} />

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dati Anagrafici</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Nome" value={form.name} onChange={handleChange('name')} placeholder="Es. Giuseppe" required />
                <Input label="Cognome" value={form.surname} onChange={handleChange('surname')} placeholder="Es. Rossi" required />
                <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} placeholder="giuseppe.rossi@email.it" required />
                <Input label="Telefono" type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="+39 333 1234567" />
                <Input label="Codice Fiscale" value={form.cf} onChange={handleChange('cf')} placeholder="RSSGPP80A01H501Z" />
                <Select label="Ruolo" options={roleOptions} value={form.role} onChange={handleChange('role')} required />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">Assegnazione Immobile</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ComboSelect
                    label="Immobile"
                    options={buildingOptions}
                    value={form.buildingId}
                    onChange={handleChange('buildingId')}
                    placeholder="Seleziona immobile"
                    searchable
                    required
                  />
                  <ComboSelect
                    label="Unita Immobiliare"
                    options={unitOptions}
                    value={form.unitId}
                    onChange={handleChange('unitId')}
                    placeholder={form.buildingId ? 'Seleziona unita' : 'Prima seleziona immobile'}
                    searchable={unitOptions.length > 5}
                    disabled={!form.buildingId}
                    required
                  />
                  <Input label="Millesimi" type="number" value={form.millesimi} onChange={handleChange('millesimi')} placeholder="Es. 85" required />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="sendInvite"
                    checked={form.sendInvite}
                    onChange={handleChange('sendInvite')}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-400"
                  />
                  <label htmlFor="sendInvite" className="cursor-pointer">
                    <p className="text-sm font-medium text-gray-800">Invia invito al condomino</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Ricevera un'email con il link di attivazione per accedere al portale Connect.
                    </p>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button type="submit" variant="primary">
                  {form.sendInvite ? (
                    <><Send className="h-4 w-4" />Salva e Invia Invito</>
                  ) : (
                    <><UserPlus className="h-4 w-4" />Salva Condomino</>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate(id ? `/studio/immobili/${id}` : '/studio/condomini')}>
                  Annulla
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
