import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save } from 'lucide-react'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import FileUpload from '../../components/shared/FileUpload'
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { documentCategories } from '../../data/documents'
import { buildings } from '../../data/buildings'

export default function DocumentUpload() {
  const navigate = useNavigate()
  const [step, setStep] = useState('upload')
  const [categoria, setCategoria] = useState('')
  const [buildingId, setBuildingId] = useState('')
  const [note, setNote] = useState('')

  const handleUpload = useCallback(() => {
    setStep('categorize')
  }, [])

  const categoryOptions = documentCategories.map((c) => ({ value: c, label: c }))
  const buildingOptions = buildings.map((b) => ({ value: b.id, label: b.name }))

  return (
    <div>
      <PageHeader
        title="Carica Documento"
        breadcrumbs={[
          { label: 'Documenti', to: '/studio/documenti' },
          { label: 'Carica Documento' },
        ]}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Seleziona File</CardTitle>
          </CardHeader>
          <CardContent>
            <FileUpload
              accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.png"
              label="Carica un documento"
              onUpload={handleUpload}
            />
          </CardContent>
        </Card>

        {step === 'categorize' && (
          <Card>
            <CardHeader>
              <CardTitle>Dettagli Documento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select
                  label="Categoria"
                  options={categoryOptions}
                  placeholder="Seleziona categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                />
                <Select
                  label="Immobile"
                  options={buildingOptions}
                  placeholder="Seleziona immobile"
                  value={buildingId}
                  onChange={(e) => setBuildingId(e.target.value)}
                  required
                />
                <Input
                  label="Note"
                  placeholder="Aggiungi note opzionali..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => navigate('/studio/documenti')}>
                    Annulla
                  </Button>
                  <Button onClick={() => navigate('/studio/documenti')}>
                    <Save className="h-4 w-4" />
                    Salva Documento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
