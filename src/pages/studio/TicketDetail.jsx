import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Send,
  UserCheck,
  CheckCircle,
  MessageSquare,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Modal from '../../components/ui/Modal'
import Select from '../../components/ui/Select'
import StatusBadge from '../../components/shared/StatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import PlanGate from '../../components/shared/PlanGate'

import { tickets } from '../../data/tickets'
import { useAuth } from '../../context/AuthContext'

const priorityVariant = {
  alta: 'destructive',
  media: 'warning',
  bassa: 'default',
}

const staffOptions = [
  { value: 'marco', label: 'Marco Bianchi' },
  { value: 'laura', label: 'Laura Verdi' },
  { value: 'giovanni', label: 'Giovanni Neri' },
]

export default function TicketDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const ticketData = tickets.find((t) => t.id === id)

  const [status, setStatus] = useState(ticketData?.status || 'aperto')
  const [history, setHistory] = useState(ticketData?.history || [])
  const [replyText, setReplyText] = useState('')
  const [assignModal, setAssignModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState('')

  const addHistoryEntry = useCallback(
    (action) => {
      setHistory((prev) => [
        ...prev,
        {
          date: new Date().toISOString().split('T')[0],
          action,
          by: user?.name || 'Sistema',
        },
      ])
    },
    [user]
  )

  if (!ticketData) {
    return (
      <div>
        <PageHeader title="Ticket non trovato" />
        <EmptyState
          icon={MessageSquare}
          title="Ticket non trovato"
          description="Il ticket richiesto non esiste."
          actionLabel="Torna ai Ticket"
          onAction={() => navigate('/studio/ticket')}
        />
      </div>
    )
  }

  const handleTakeCharge = () => {
    setStatus('in_lavorazione')
    addHistoryEntry('Preso in carico')
  }

  const handleResolve = () => {
    setStatus('risolto')
    addHistoryEntry('Ticket risolto')
  }

  const handleReply = () => {
    if (!replyText.trim()) return
    addHistoryEntry(`Risposta: ${replyText}`)
    setReplyText('')
  }

  const handleAssign = () => {
    if (!selectedStaff) return
    const staffName = staffOptions.find((s) => s.value === selectedStaff)?.label
    setStatus('in_lavorazione')
    addHistoryEntry(`Assegnato a ${staffName}`)
    setAssignModal(false)
    setSelectedStaff('')
  }

  return (
    <PlanGate feature="il ticketing avanzato">
    <div>
      <PageHeader
        title={ticketData.title}
        breadcrumbs={[
          { label: 'Ticket', to: '/studio/ticket' },
          { label: ticketData.title },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate('/studio/ticket')}>
            <ArrowLeft className="h-4 w-4" />
            Indietro
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dettagli</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase mb-1">Condomino</dt>
                  <dd className="flex items-center gap-2">
                    <Avatar name={ticketData.condominoName} size="sm" />
                    <span className="text-sm text-gray-800">{ticketData.condominoName}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase mb-1">Immobile</dt>
                  <dd className="text-sm text-gray-800">{ticketData.buildingName}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase mb-1">Categoria</dt>
                  <dd><Badge variant="primary">{ticketData.category}</Badge></dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase mb-1">Priorita</dt>
                  <dd>
                    <Badge variant={priorityVariant[ticketData.priority]}>
                      {ticketData.priority.charAt(0).toUpperCase() + ticketData.priority.slice(1)}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase mb-1">Stato</dt>
                  <dd><StatusBadge status={status} /></dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase mb-1">Data apertura</dt>
                  <dd className="text-sm text-gray-800">{ticketData.createdDate}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase mb-1">Ultimo aggiornamento</dt>
                  <dd className="text-sm text-gray-800">{ticketData.updatedDate}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Azioni</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {status === 'aperto' && (
                <Button className="w-full" onClick={handleTakeCharge}>
                  <UserCheck className="h-4 w-4" />
                  Prendi in Carico
                </Button>
              )}
              <Button variant="outline" className="w-full" onClick={() => setAssignModal(true)}>
                <UserCheck className="h-4 w-4" />
                Assegna
              </Button>
              {status === 'in_lavorazione' && (
                <Button variant="success" className="w-full" onClick={handleResolve}>
                  <CheckCircle className="h-4 w-4" />
                  Risolvi
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Descrizione</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 leading-relaxed">{ticketData.description}</p>
            </CardContent>
          </Card>

          {/* History Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Cronologia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0">
                {history.map((entry, i) => (
                  <div key={i} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-primary-400" />
                      </div>
                      {i < history.length - 1 && (
                        <div className="w-px flex-1 bg-gray-200 mt-1" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="text-sm font-medium text-gray-800">{entry.action}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {entry.date} &middot; {entry.by}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reply */}
          <Card>
            <CardHeader>
              <CardTitle>Rispondi</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Scrivi una risposta..."
                rows={3}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 transition-shadow resize-none"
              />
              <div className="flex justify-end mt-3">
                <Button onClick={handleReply} disabled={!replyText.trim()}>
                  <Send className="h-4 w-4" />
                  Invia
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assign Modal */}
      <Modal
        open={assignModal}
        onClose={() => setAssignModal(false)}
        title="Assegna Ticket"
        footer={
          <>
            <Button variant="outline" onClick={() => setAssignModal(false)}>
              Annulla
            </Button>
            <Button onClick={handleAssign} disabled={!selectedStaff}>
              Assegna
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600 mb-4">
          Seleziona il membro dello staff a cui assegnare il ticket.
        </p>
        <Select
          label="Membro Staff"
          placeholder="Seleziona..."
          options={staffOptions}
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
        />
      </Modal>
    </div>
    </PlanGate>
  )
}
