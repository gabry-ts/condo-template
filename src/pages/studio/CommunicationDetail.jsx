import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Mail, Send, Eye, Clock, FileText, Users,
  Building2, Calendar, User, ChevronRight, ExternalLink,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { useToast } from '../../components/ui/Toast'
import PlanGate from '../../components/shared/PlanGate'

import { communications } from '../../data/communications'
import { documents } from '../../data/documents'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function CommunicationDetail() {
  const { comId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const comm = communications.find((c) => c.id === comId)

  if (!comm) {
    return <div className="text-center py-16"><p className="text-lg text-gray-500">Comunicazione non trovata</p></div>
  }

  return (
    <PlanGate feature="le comunicazioni">
    <div>
      <PageHeader
        title={comm.subject}
        breadcrumbs={[
          { label: 'Comunicazioni', to: '/studio/comunicazioni' },
          { label: comm.subject },
        ]}
        actions={
          <Button variant="outline" size="sm" onClick={() => toast('Comunicazione reinviata')}>
            <Send className="h-3.5 w-3.5" />Reinvia
          </Button>
        }
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header info */}
        <Card variant="elevated">
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h2 className="text-lg font-bold text-gray-800">{comm.subject}</h2>
                <Badge variant="success">Inviata</Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoItem icon={Users} label="Destinatari" value={comm.recipients} />
                <InfoItem icon={Building2} label="Immobile" value={comm.buildingName} />
                <InfoItem icon={Calendar} label="Data Invio" value={formatDate(comm.sentDate)} />
                <InfoItem icon={User} label="Inviata da" value={comm.sentBy} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Body */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Contenuto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {comm.body}
            </div>
          </CardContent>
        </Card>

        {/* Attachments */}
        {comm.attachments.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <CardTitle className="text-base">Documenti Allegati ({comm.attachments.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {comm.attachments.map((docId) => {
                  const doc = documents.find((d) => d.id === docId)
                  if (!doc) return null
                  return (
                    <Link key={docId} to={`/studio/documenti/${docId}`} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <FileText className="h-4 w-4 text-primary-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{doc.name}</p>
                        <p className="text-xs text-gray-400">{doc.category} · {doc.type} · {doc.size}</p>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
    </PlanGate>
  )
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-gray-400 flex-shrink-0" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  )
}
