import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  CalendarDays, MapPin, Clock, Users, CheckCircle2, XCircle,
  Send, FileUp, Plus, Vote, Building2, Mail, ChevronRight,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import StatusBadge from '../../components/shared/StatusBadge'
import QuorumMeter from '../../components/shared/QuorumMeter'
import FileUpload from '../../components/shared/FileUpload'
import EmptyState from '../../components/shared/EmptyState'
import Modal from '../../components/ui/Modal'
import { useToast } from '../../components/ui/Toast'
import PlanGate from '../../components/shared/PlanGate'

import { assemblies } from '../../data/assemblies'
import { condomini } from '../../data/users'
import { buildings } from '../../data/buildings'

export default function AssemblyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const assembly = assemblies.find((a) => a.id === id)

  const [form, setForm] = useState({
    title: assembly?.title || '',
    buildingId: assembly?.buildingId || '',
    date: assembly?.date || '',
    time: assembly?.time || '',
    location: assembly?.location || '',
  })

  const buildingCondomini = useMemo(
    () => condomini.filter((c) => c.buildingId === assembly?.buildingId),
    [assembly?.buildingId]
  )

  const initialParticipants = assembly?.participants.length > 0
    ? assembly.participants
    : buildingCondomini.map((c) => ({
        condominoId: c.id,
        name: c.name,
        millesimi: c.millesimi,
        present: false,
        delegation: null,
      }))

  const [participants, setParticipants] = useState(initialParticipants)
  const [resolutions, setResolutions] = useState(assembly?.resolutions || [])
  const [newResolution, setNewResolution] = useState('')
  const [commModalOpen, setCommModalOpen] = useState(false)
  const [commType, setCommType] = useState('')
  const [assemblyComms] = useState([
    { id: 'ac1', type: 'Convocazione', subject: `Convocazione ${assembly?.title || ''}`, date: assembly?.convocationDate || '2026-03-01', recipients: 'Tutti i condomini', status: 'read' },
    ...(assembly?.status === 'conclusa' ? [{ id: 'ac2', type: 'Verbale', subject: `Verbale ${assembly?.title || ''}`, date: assembly?.date || '2026-01-15', recipients: 'Tutti i condomini', status: 'sent' }] : []),
  ])

  const presentMillesimi = participants
    .filter((p) => p.present)
    .reduce((sum, p) => sum + p.millesimi, 0)

  const toggleAttendance = (condominoId) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.condominoId === condominoId ? { ...p, present: !p.present } : p
      )
    )
  }

  const addResolution = () => {
    if (!newResolution.trim()) return
    const res = {
      id: `res-new-${Date.now()}`,
      title: newResolution,
      approved: null,
      votesFor: 0,
      votesAgainst: 0,
    }
    setResolutions((prev) => [...prev, res])
    setNewResolution('')
  }

  const voteResolution = (resId, approved) => {
    setResolutions((prev) =>
      prev.map((r) =>
        r.id === resId
          ? {
              ...r,
              approved,
              votesFor: approved ? presentMillesimi : 0,
              votesAgainst: approved ? 0 : presentMillesimi,
            }
          : r
      )
    )
  }

  if (!assembly) {
    return (
      <EmptyState
        icon={Users}
        title="Assemblea non trovata"
        description="L'assemblea richiesta non esiste."
        actionLabel="Torna alle assemblee"
        onAction={() => navigate('/studio/assemblee')}
      />
    )
  }

  const breadcrumbs = [
    { label: 'Assemblee', to: '/studio/assemblee' },
    { label: assembly.title },
  ]

  return (
    <PlanGate feature="le assemblee">
    <div>
      <PageHeader
        title={assembly.title}
        breadcrumbs={breadcrumbs}
        actions={<StatusBadge status={assembly.status} />}
      />

      {/* BOZZA */}
      {assembly.status === 'bozza' && (
        <div className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dettagli Assemblea</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Titolo"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <Select
                label="Immobile"
                value={form.buildingId}
                onChange={(e) => setForm({ ...form, buildingId: e.target.value })}
                options={buildings.map((b) => ({ value: b.id, label: b.name }))}
                placeholder="Seleziona immobile"
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
              <Input
                label="Luogo"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Es. Sala riunioni condominiale"
              />
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => navigate('/studio/assemblee')}>
              <Send className="h-4 w-4" />
              Convoca Assemblea
            </Button>
          </div>
        </div>
      )}

      {/* CONVOCATA */}
      {assembly.status === 'convocata' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Informazioni</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">Immobile</span>
                  </div>
                  <span className="text-gray-800">{assembly.buildingName}</span>

                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarDays className="h-4 w-4" />
                    <span className="font-medium">Data</span>
                  </div>
                  <span className="text-gray-800">
                    {new Date(assembly.date).toLocaleDateString('it-IT', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>

                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Prima convocazione</span>
                  </div>
                  <span className="text-gray-800">{assembly.firstCall}</span>

                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Seconda convocazione</span>
                  </div>
                  <span className="text-gray-800">{assembly.secondCall}</span>

                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">Luogo</span>
                  </div>
                  <span className="text-gray-800">{assembly.location}</span>
                </div>

                <div className="mt-6">
                  <Badge variant={assembly.type === 'straordinaria' ? 'accent' : 'primary'}>
                    {assembly.type === 'straordinaria' ? 'Straordinaria' : 'Ordinaria'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <QuorumMeter
              current={0}
              required={assembly.quorumRequired}
              total={assembly.totalMillesimi}
              label="Quorum richiesto"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Partecipanti convocati</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Millesimi</TableHead>
                    <TableHead>Presenza</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buildingCondomini.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.name}</TableCell>
                      <TableCell mono>{c.millesimi}</TableCell>
                      <TableCell>
                        <span className="text-gray-400 text-sm">Da confermare</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="primary" onClick={() => toast('Inviti inviati a ' + assembly.participants.length + ' condomini')}>
              <Send className="h-4 w-4" />
              Invia Inviti
            </Button>
          </div>
        </div>
      )}

      {/* IN CORSO */}
      {assembly.status === 'in_corso' && (
        <div className="space-y-6">
          <QuorumMeter
            current={presentMillesimi}
            required={assembly.quorumRequired}
            total={assembly.totalMillesimi}
            label="Quorum in tempo reale"
          />

          <Card>
            <CardHeader>
              <CardTitle>Presenze</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {participants.map((p) => (
                  <button
                    key={p.condominoId}
                    onClick={() => toggleAttendance(p.condominoId)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-150 text-left ${
                      p.present
                        ? 'border-success-400 bg-success-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        p.present
                          ? 'bg-success-500 text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {p.present ? <CheckCircle2 className="h-4 w-4" /> : p.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">{p.millesimi} millesimi</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delibere</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Titolo della delibera..."
                    value={newResolution}
                    onChange={(e) => setNewResolution(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addResolution()}
                  />
                </div>
                <Button variant="primary" onClick={addResolution}>
                  <Plus className="h-4 w-4" />
                  Aggiungi
                </Button>
              </div>

              {resolutions.length > 0 && (
                <div className="space-y-3">
                  {resolutions.map((res) => (
                    <div
                      key={res.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-800">{res.title}</p>
                        {res.approved !== null && (
                          <p className="text-xs text-gray-500 mt-1">
                            A favore: {res.votesFor} - Contrari: {res.votesAgainst}
                          </p>
                        )}
                      </div>
                      {res.approved === null ? (
                        <div className="flex gap-2">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => voteResolution(res.id, true)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Approva
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => voteResolution(res.id, false)}
                          >
                            <XCircle className="h-3.5 w-3.5" />
                            Respingi
                          </Button>
                        </div>
                      ) : (
                        <Badge variant={res.approved ? 'success' : 'destructive'}>
                          {res.approved ? 'Approvata' : 'Respinta'}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* CONCLUSA */}
      {assembly.status === 'conclusa' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Riepilogo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">Immobile</span>
                  </div>
                  <span className="text-gray-800">{assembly.buildingName}</span>

                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarDays className="h-4 w-4" />
                    <span className="font-medium">Data</span>
                  </div>
                  <span className="text-gray-800">
                    {new Date(assembly.date).toLocaleDateString('it-IT', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>

                  <div className="flex items-center gap-2 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">Presenti</span>
                  </div>
                  <span className="text-gray-800">
                    {assembly.participants.filter((p) => p.present).length} / {assembly.participants.length}
                  </span>

                  <div className="flex items-center gap-2 text-gray-500">
                    <Vote className="h-4 w-4" />
                    <span className="font-medium">Delibere</span>
                  </div>
                  <span className="text-gray-800">{assembly.resolutions.length} totali</span>
                </div>
              </CardContent>
            </Card>

            <QuorumMeter
              current={assembly.presentMillesimi}
              required={assembly.quorumRequired}
              total={assembly.totalMillesimi}
              label="Quorum finale"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Delibere</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assembly.resolutions.map((res) => (
                  <div
                    key={res.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-800">{res.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        A favore: {res.votesFor} - Contrari: {res.votesAgainst}
                      </p>
                    </div>
                    <Badge variant={res.approved ? 'success' : 'destructive'}>
                      {res.approved ? 'Approvata' : 'Respinta'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partecipanti</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Millesimi</TableHead>
                    <TableHead>Presenza</TableHead>
                    <TableHead>Delega</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assembly.participants.map((p) => (
                    <TableRow key={p.condominoId}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell mono>{p.millesimi}</TableCell>
                      <TableCell>
                        {p.present ? (
                          <Badge variant="success">Presente</Badge>
                        ) : (
                          <Badge variant="default">Assente</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {p.delegation ? (
                          <span className="text-sm text-gray-600">Delega a {p.delegation}</span>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verbale</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                label="Carica il verbale dell'assemblea"
                accept=".pdf,.doc,.docx"
              />
            </CardContent>
          </Card>
        </div>
      )}
      {/* COMUNICAZIONI ASSEMBLEA — visibile in tutti gli stati tranne bozza */}
      {assembly.status !== 'bozza' && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary-400" />
                Comunicazioni Assemblea
              </CardTitle>
              <Button size="sm" onClick={() => setCommModalOpen(true)}>
                <Send className="h-3.5 w-3.5" />
                Invia Comunicazione
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {assemblyComms.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-primary-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-800">{c.subject}</p>
                        <Badge variant="default">{c.type}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">A: {c.recipients} · {new Date(c.date).toLocaleDateString('it-IT')}</p>
                    </div>
                  </div>
                  <Badge variant={c.status === 'read' ? 'success' : 'info'}>
                    {c.status === 'read' ? 'Letta' : 'Inviata'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modale invio comunicazione assemblea */}
      <Modal
        open={commModalOpen}
        onClose={() => setCommModalOpen(false)}
        title="Invia Comunicazione Assemblea"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setCommModalOpen(false)}>Annulla</Button>
            <Button onClick={() => { toast('Comunicazione inviata ai condomini'); setCommModalOpen(false) }}>
              <Send className="h-4 w-4" />Invia
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select
            label="Tipo comunicazione"
            value={commType}
            onChange={(e) => setCommType(e.target.value)}
            options={[
              { value: '', label: 'Seleziona tipo' },
              { value: 'convocazione', label: 'Convocazione assemblea' },
              { value: 'promemoria', label: 'Promemoria assemblea' },
              { value: 'spostamento', label: 'Spostamento data assemblea' },
              { value: 'annullamento', label: 'Annullamento assemblea' },
              { value: 'verbale', label: 'Invio verbale assemblea' },
              { value: 'delibere', label: 'Comunicazione delibere' },
              { value: 'generico', label: 'Comunicazione generica' },
            ]}
          />
          <Input
            label="Oggetto"
            defaultValue={commType === 'spostamento' ? `Spostamento ${assembly.title}` : commType === 'verbale' ? `Verbale ${assembly.title}` : assembly.title}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Messaggio</label>
            <textarea
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 min-h-[150px] resize-y"
              placeholder="Scrivi il messaggio..."
            />
          </div>
          <div className="p-3 rounded-xl bg-primary-50 text-sm text-primary-700 flex items-center gap-2">
            <Users className="h-4 w-4 flex-shrink-0" />
            Verra inviata a tutti i condomini di {assembly.buildingName}
          </div>
        </div>
      </Modal>
    </div>
    </PlanGate>
  )
}
