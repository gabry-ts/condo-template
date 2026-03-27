import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Check, Building2, Users, FileText } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { useToast } from '../../components/ui/Toast'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Badge from '../../components/ui/Badge'
import FileUpload from '../../components/shared/FileUpload'
import PlanGate from '../../components/shared/PlanGate'

import { buildings } from '../../data/buildings'
import { condomini } from '../../data/users'

const steps = [
  { id: 1, label: 'Dettagli', icon: Building2 },
  { id: 2, label: 'Partecipanti', icon: Users },
  { id: 3, label: 'Riepilogo', icon: FileText },
]

export default function AssemblyCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const [step, setStep] = useState(1)

  const [form, setForm] = useState({
    buildingId: '',
    type: 'ordinaria',
    title: '',
    date: '',
    time: '',
  })

  const [selectedParticipants, setSelectedParticipants] = useState([])

  const buildingCondomini = useMemo(
    () => condomini.filter((c) => c.buildingId === form.buildingId),
    [form.buildingId]
  )

  const selectedBuilding = buildings.find((b) => b.id === form.buildingId)

  const handleBuildingChange = (e) => {
    const buildingId = e.target.value
    setForm({ ...form, buildingId })
    const bc = condomini.filter((c) => c.buildingId === buildingId)
    setSelectedParticipants(bc.map((c) => c.id))
  }

  const toggleParticipant = (id) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    if (selectedParticipants.length === buildingCondomini.length) {
      setSelectedParticipants([])
    } else {
      setSelectedParticipants(buildingCondomini.map((c) => c.id))
    }
  }

  const canProceed = () => {
    if (step === 1) return form.buildingId && form.title && form.date && form.time
    if (step === 2) return selectedParticipants.length > 0
    return true
  }

  const handleSubmit = () => {
    toast('Assemblea creata con successo')
    navigate('/studio/assemblee')
  }

  const buildingOptions = buildings.map((b) => ({ value: b.id, label: b.name }))
  const typeOptions = [
    { value: 'ordinaria', label: 'Ordinaria' },
    { value: 'straordinaria', label: 'Straordinaria' },
  ]

  return (
    <PlanGate feature="le assemblee">
    <div>
      <PageHeader
        title="Nuova Assemblea"
        breadcrumbs={[
          { label: 'Assemblee', to: '/studio/assemblee' },
          { label: 'Nuova Assemblea' },
        ]}
      />

      {/* Stepper */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => {
          const StepIcon = s.icon
          const isActive = step === s.id
          const isCompleted = step > s.id

          return (
            <div key={s.id} className="flex items-center gap-2">
              {i > 0 && (
                <div
                  className={`w-12 h-0.5 ${
                    isCompleted ? 'bg-primary-400' : 'bg-gray-200'
                  }`}
                />
              )}
              <div className="flex items-center gap-2">
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : isCompleted
                      ? 'bg-primary-100 text-primary-500'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    isActive ? 'text-primary-500' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Step 1: Dettagli */}
      {step === 1 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Dettagli dell'assemblea</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Immobile"
              value={form.buildingId}
              onChange={handleBuildingChange}
              options={buildingOptions}
              placeholder="Seleziona un immobile"
              required
            />
            <Select
              label="Tipo"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              options={typeOptions}
              required
            />
            <Input
              label="Titolo"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Es. Assemblea Ordinaria Annuale 2026"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Data"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
              <Input
                label="Orario"
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Partecipanti */}
      {step === 2 && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Partecipanti</CardTitle>
              <Button variant="ghost" size="sm" onClick={toggleAll}>
                {selectedParticipants.length === buildingCondomini.length
                  ? 'Deseleziona tutti'
                  : 'Seleziona tutti'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {buildingCondomini.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                Nessun condomino associato a questo immobile.
              </p>
            ) : (
              <div className="space-y-2">
                {buildingCondomini.map((c) => {
                  const selected = selectedParticipants.includes(c.id)
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleParticipant(c.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-150 text-left ${
                        selected
                          ? 'border-primary-400 bg-primary-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                          selected
                            ? 'bg-primary-500 border-primary-500'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {selected && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{c.name}</p>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                      <span className="text-xs font-mono text-gray-500">{c.millesimi} mill.</span>
                    </button>
                  )
                })}
              </div>
            )}
            <p className="text-xs text-gray-400 mt-4 text-center">
              {selectedParticipants.length} di {buildingCondomini.length} condomini selezionati
            </p>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Riepilogo */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Riepilogo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Immobile</span>
                  <span className="font-medium text-gray-800">{selectedBuilding?.name || '-'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Tipo</span>
                  <Badge variant={form.type === 'straordinaria' ? 'accent' : 'primary'}>
                    {form.type === 'straordinaria' ? 'Straordinaria' : 'Ordinaria'}
                  </Badge>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Titolo</span>
                  <span className="font-medium text-gray-800">{form.title}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Data e ora</span>
                  <span className="font-medium text-gray-800">
                    {form.date
                      ? new Date(form.date).toLocaleDateString('it-IT', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : '-'}{' '}
                    alle {form.time || '-'}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Partecipanti</span>
                  <span className="font-medium text-gray-800">{selectedParticipants.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documento di convocazione</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                label="Carica il documento di convocazione"
                accept=".pdf,.doc,.docx"
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between max-w-2xl mx-auto mt-8">
        <Button
          variant="outline"
          onClick={() => (step === 1 ? navigate('/studio/assemblee') : setStep(step - 1))}
        >
          <ChevronLeft className="h-4 w-4" />
          Indietro
        </Button>

        {step < 3 ? (
          <Button
            variant="primary"
            onClick={() => setStep(step + 1)}
            disabled={!canProceed()}
          >
            Avanti
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit}>
            <Check className="h-4 w-4" />
            Crea Assemblea
          </Button>
        )}
      </div>
    </div>
    </PlanGate>
  )
}
