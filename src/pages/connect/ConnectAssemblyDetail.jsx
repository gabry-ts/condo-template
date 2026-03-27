import { useParams, Link } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import StatusBadge from '../../components/shared/StatusBadge'
import Button from '../../components/ui/Button'
import { assemblies } from '../../data/assemblies'
import { documents } from '../../data/documents'
import {
  CalendarDays,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Users,
} from 'lucide-react'

export default function ConnectAssemblyDetail() {
  const { id } = useParams()
  const assembly = assemblies.find((a) => a.id === id)

  if (!assembly) {
    return (
      <div className="space-y-8">
        <PageHeader title="Assemblea non trovata" />
        <p className="text-lg text-gray-500">L'assemblea richiesta non esiste.</p>
      </div>
    )
  }

  const typeLabel = { ordinaria: 'Ordinaria', straordinaria: 'Straordinaria' }
  const assemblyDocs = documents.filter((d) => assembly.documents.includes(d.id))

  return (
    <div className="space-y-8">
      <PageHeader
        title={assembly.title}
        description={assembly.buildingName}
        breadcrumbs={[
          { label: 'Assemblee', to: '/connect/assemblee' },
          { label: assembly.title },
        ]}
        actions={<StatusBadge status={assembly.status} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Informazioni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-base text-gray-700">
                <CalendarDays className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span>
                  {assembly.date
                    ? new Date(assembly.date).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                    : 'Data non definita'}
                </span>
              </div>
              {assembly.firstCall && (
                <div className="flex items-center gap-3 text-base text-gray-700">
                  <Clock className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>I conv. {assembly.firstCall} &mdash; II conv. {assembly.secondCall}</span>
                </div>
              )}
              {assembly.location && (
                <div className="flex items-center gap-3 text-base text-gray-700">
                  <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>{assembly.location}</span>
                </div>
              )}
              <div className="pt-2">
                <Badge variant={assembly.type === 'straordinaria' ? 'warning' : 'primary'}>
                  {typeLabel[assembly.type]}
                </Badge>
              </div>
              {assembly.status === 'conclusa' && (
                <div className="flex items-center gap-3 text-base text-gray-700">
                  <Users className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>
                    Millesimi presenti: {assembly.presentMillesimi}/{assembly.totalMillesimi}
                    {assembly.quorumReached ? ' (Quorum raggiunto)' : ' (Quorum non raggiunto)'}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {assemblyDocs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary-400" />
                Documenti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assemblyDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-gray-800">{doc.name}</p>
                        <p className="text-sm text-gray-500">{doc.type} &middot; {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      Scarica
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {assembly.resolutions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Delibere</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assembly.resolutions.map((res, index) => (
                <div key={res.id} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${res.approved ? 'bg-success-50' : 'bg-destructive-50'}`}>
                    {res.approved
                      ? <CheckCircle2 className="h-5 w-5 text-success-600" />
                      : <XCircle className="h-5 w-5 text-destructive-500" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-800">{res.title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant={res.approved ? 'success' : 'destructive'}>
                        {res.approved ? 'Approvata' : 'Respinta'}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        Favorevoli: {res.votesFor} &mdash; Contrari: {res.votesAgainst}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
