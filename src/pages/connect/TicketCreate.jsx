import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { buildings } from '../../data/buildings'
import { condomini } from '../../data/users'
import { Send } from 'lucide-react'

export default function TicketCreate() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]
  const myBuilding = buildings.find((b) => b.id === condomino.buildingId)

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    buildingId: condomino.buildingId,
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/connect/segnalazioni')
  }

  const isValid = form.title.trim() && form.description.trim() && form.category

  return (
    <div className="space-y-8">
      <PageHeader
        title="Nuova Segnalazione"
        description="Compila il modulo per inviare una segnalazione all'amministratore"
        breadcrumbs={[
          { label: 'Segnalazioni', to: '/connect/segnalazioni' },
          { label: 'Nuova Segnalazione' },
        ]}
      />

      <Card className="max-w-2xl">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6 pt-2">
            <Input
              label="Titolo"
              placeholder="Descrivi brevemente il problema"
              value={form.title}
              onChange={handleChange('title')}
              required
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Descrizione <span className="text-destructive-500 ml-0.5">*</span>
              </label>
              <textarea
                placeholder="Fornisci maggiori dettagli sulla segnalazione..."
                value={form.description}
                onChange={handleChange('description')}
                rows={5}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 focus:border-primary-400 transition-shadow duration-150 resize-none"
              />
            </div>

            <Select
              label="Categoria"
              placeholder="Seleziona una categoria"
              value={form.category}
              onChange={handleChange('category')}
              required
              options={[
                { value: 'Manutenzione', label: 'Manutenzione' },
                { value: 'Disturbo', label: 'Disturbo' },
                { value: 'Documenti', label: 'Documenti' },
                { value: 'Strutturale', label: 'Strutturale' },
                { value: 'Altro', label: 'Altro' },
              ]}
            />

            <Select
              label="Immobile"
              value={form.buildingId}
              onChange={handleChange('buildingId')}
              options={[
                { value: myBuilding?.id || '', label: myBuilding?.name || '' },
              ]}
              disabled
            />

            <div className="flex items-center gap-4 pt-4">
              <Button type="submit" size="lg" disabled={!isValid}>
                <Send className="h-4 w-4" />
                Invia Segnalazione
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => navigate('/connect/segnalazioni')}>
                Annulla
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
