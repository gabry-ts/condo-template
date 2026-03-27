import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'
import StatusBadge from '../../components/shared/StatusBadge'
import { useToast } from '../../components/ui/Toast'
import { tickets } from '../../data/tickets'
import { CalendarDays, Tag, Building2, Clock, CheckCircle2, Send } from 'lucide-react'

const categoryColors = {
  Manutenzione: 'primary',
  Disturbo: 'warning',
  Documenti: 'info',
  Strutturale: 'destructive',
  Altro: 'default',
}

export default function ConnectTicketDetail() {
  const { id } = useParams()
  const toast = useToast()
  const ticket = tickets.find((t) => t.id === id)
  const [reply, setReply] = useState('')

  const initialMessages = {
    tk6: [
      { id: 'm1', from: 'admin', name: 'Marco Bianchi', text: 'Buongiorno Sig. Rossi, abbiamo preso in carico la segnalazione. Un idraulico verifichera entro 48 ore.', date: '2026-03-23T10:00:00' },
      { id: 'm2', from: 'user', name: 'Giuseppe Rossi', text: 'Grazie. La situazione sta peggiorando, stamattina gocciola di piu. E possibile anticipare?', date: '2026-03-23T18:30:00' },
      { id: 'm3', from: 'admin', name: 'Marco Bianchi', text: 'Ho contattato Idraulica Neri, passera domani mattina alle 9:00. Puo essere presente?', date: '2026-03-24T09:15:00' },
      { id: 'm4', from: 'user', name: 'Giuseppe Rossi', text: 'Si perfetto, saro a casa tutta la mattina. Grazie per la rapidita.', date: '2026-03-24T09:30:00' },
    ],
    tk7: [
      { id: 'm1', from: 'admin', name: 'Marco Bianchi', text: 'Segnalazione ricevuta. Abbiamo contattato il tecnico per un sopralluogo.', date: '2026-02-16T11:00:00' },
      { id: 'm2', from: 'admin', name: 'Laura Verdi', text: 'Il tecnico e intervenuto. Serve un pezzo di ricambio che arrivera in circa 7 giorni.', date: '2026-02-20T16:00:00' },
      { id: 'm3', from: 'user', name: 'Giuseppe Rossi', text: 'Ok grazie, attendo aggiornamenti.', date: '2026-02-21T08:00:00' },
      { id: 'm4', from: 'admin', name: 'Laura Verdi', text: 'Citofono riparato e verificato. Tutto funzionante. Puo confermare?', date: '2026-02-28T14:00:00' },
      { id: 'm5', from: 'user', name: 'Giuseppe Rossi', text: 'Confermo, funziona tutto perfettamente. Grazie!', date: '2026-02-28T18:00:00' },
    ],
  }

  const [messages, setMessages] = useState(initialMessages[id] || [
    { id: 'm1', from: 'admin', name: 'Marco Bianchi', text: 'Segnalazione ricevuta, la prenderemo in carico a breve.', date: new Date().toISOString() },
  ])

  if (!ticket) {
    return <div className="space-y-8"><PageHeader title="Segnalazione non trovata" /><p className="text-lg text-gray-500">Non esiste.</p></div>
  }

  const handleSend = () => {
    if (!reply.trim()) return
    setMessages((prev) => [...prev, { id: `m${Date.now()}`, from: 'user', name: 'Giuseppe Rossi', text: reply, date: new Date().toISOString() }])
    setReply('')
    toast('Messaggio inviato')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={ticket.title}
        breadcrumbs={[{ label: 'Segnalazioni', to: '/connect/segnalazioni' }, { label: ticket.title }]}
        actions={<StatusBadge status={ticket.status} />}
      />

      {/* Info card */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Stato</p>
              <StatusBadge status={ticket.status} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Categoria</p>
              <Badge variant={categoryColors[ticket.category] || 'default'}>{ticket.category}</Badge>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Priorita</p>
              <Badge variant={ticket.priority === 'alta' ? 'destructive' : ticket.priority === 'media' ? 'warning' : 'default'}>{ticket.priority}</Badge>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Data apertura</p>
              <p className="text-sm font-medium text-gray-800">{new Date(ticket.createdDate).toLocaleDateString('it-IT')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Descrizione */}
      <Card>
        <CardHeader><CardTitle className="text-base">Descrizione</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 leading-relaxed">{ticket.description}</p>
        </CardContent>
      </Card>

      {/* Messaggi */}
      <Card>
        <CardHeader><CardTitle className="text-base">Messaggi</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
              <Avatar name={msg.name} size="sm" />
              <div className={`max-w-[80%] ${msg.from === 'user' ? 'items-end' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${msg.from === 'user' ? 'bg-primary-500 text-white rounded-tr-md' : 'bg-gray-100 text-gray-800 rounded-tl-md'}`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className={`flex items-center gap-2 mt-1 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                  <p className="text-xs text-gray-400">{msg.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(msg.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Input risposta */}
          {ticket.status !== 'risolto' && ticket.status !== 'completato' && (
            <div className="flex gap-2 pt-2 border-t border-gray-100">
              <input
                type="text"
                className="flex-1 h-10 rounded-xl border border-gray-200 bg-white px-4 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1"
                placeholder="Scrivi un messaggio..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend} disabled={!reply.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}

          {(ticket.status === 'risolto' || ticket.status === 'completato') && (
            <div className="text-center py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">Segnalazione chiusa. Non e possibile inviare messaggi.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader><CardTitle className="text-base">Cronologia</CardTitle></CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-4">
              {ticket.history.map((event, i) => (
                <div key={i} className="relative flex items-start gap-3 pl-1">
                  <div className={`relative z-10 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${i === 0 ? 'bg-primary-100' : 'bg-gray-100'}`}>
                    {i === 0 ? <Clock className="h-4 w-4 text-primary-400" /> : <CheckCircle2 className="h-4 w-4 text-gray-400" />}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm font-medium text-gray-800">{event.action}</p>
                    <p className="text-xs text-gray-500">{event.by} · {new Date(event.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
