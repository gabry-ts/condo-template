import { useParams, useNavigate } from 'react-router-dom'
import { FileText, Download, Trash2, Building2, Calendar, User, Tag, HardDrive, StickyNote } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'

import { documents } from '../../data/documents'
import { buildings } from '../../data/buildings'

export default function DocumentDetail() {
  const { docId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const doc = documents.find((d) => d.id === docId)
  const building = doc ? buildings.find((b) => b.id === doc.buildingId) : null

  if (!doc) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-500">Documento non trovato</p>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title={doc.name}
        breadcrumbs={[
          { label: 'Documenti', to: '/studio/documenti' },
          { label: doc.name },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { toast('Documento eliminato', 'warning'); navigate('/studio/documenti') }}>
              <Trash2 className="h-3.5 w-3.5" />
              Elimina
            </Button>
            <Button size="sm" onClick={() => toast('Download avviato: ' + doc.name)}>
              <Download className="h-3.5 w-3.5" />
              Scarica
            </Button>
          </div>
        }
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* File preview placeholder */}
        <Card variant="elevated">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-8 w-8 text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold text-gray-800">{doc.name}</h2>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <Badge variant="primary">{doc.category}</Badge>
                  <span className="text-sm text-gray-500">{doc.type}</span>
                  <span className="text-sm text-gray-500">{doc.size}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Informazioni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoBlock icon={Tag} label="Categoria" value={doc.category} />
              <InfoBlock icon={HardDrive} label="Formato e dimensione" value={`${doc.type} — ${doc.size}`} />
              <InfoBlock icon={Building2} label="Immobile" value={building?.name || '-'} />
              <InfoBlock icon={Calendar} label="Data caricamento" value={new Date(doc.uploadDate).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <InfoBlock icon={User} label="Caricato da" value={doc.uploadedBy} />
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {doc.notes && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <StickyNote className="h-4 w-4 text-warning-500" />
                Note
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">{doc.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card className="bg-gray-50 border-dashed">
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Scarica il documento</p>
                <p className="text-xs text-gray-500 mt-0.5">{doc.name} — {doc.type}, {doc.size}</p>
              </div>
              <Button onClick={() => toast('Download avviato: ' + doc.name)}>
                <Download className="h-4 w-4" />
                Scarica {doc.type}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InfoBlock({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
      <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-primary-500" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  )
}
