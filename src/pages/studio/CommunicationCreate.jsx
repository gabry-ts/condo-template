import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Send, Paperclip, X, Bold, Italic, Underline, AlignLeft,
  List, Link2, Image, Variable, Users, Building2, FileText,
  ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import { useToast } from '../../components/ui/Toast'
import PlanGate from '../../components/shared/PlanGate'

import { buildings } from '../../data/buildings'
import { condomini } from '../../data/users'
import { documents } from '../../data/documents'

const templates = [
  { id: 'blank', name: 'Vuoto', subject: '', body: '' },
  { id: 'invito', name: 'Invito Condomino', subject: 'Benvenuto su Domea', body: 'Gentile {{nome_condomino}},\n\nLe diamo il benvenuto sulla piattaforma Domea del condominio {{nome_condominio}}.\n\nPer attivare il suo account, clicchi sul link di attivazione ricevuto via email.\n\nCordiali saluti,\n{{nome_studio}}' },
  { id: 'assemblea', name: 'Convocazione Assemblea', subject: 'Convocazione assemblea condominiale', body: 'Gentili Condomini,\n\nSi convoca l\'assemblea del condominio {{nome_condominio}}.\n\nData: [inserire data]\nOra: [inserire ora]\nLuogo: [inserire luogo]\n\nOrdine del giorno:\n1. [punto 1]\n2. [punto 2]\n\nCordiali saluti,\n{{nome_studio}}' },
  { id: 'sollecito', name: 'Sollecito Pagamento', subject: 'Sollecito pagamento rate condominiali', body: 'Gentile {{nome_condomino}},\n\nLe comunichiamo che risultano non pagate le rate condominiali.\n\nLa preghiamo di provvedere al pagamento entro 15 giorni.\n\nCordiali saluti,\n{{nome_studio}}' },
  { id: 'avviso', name: 'Avviso Generico', subject: 'Comunicazione condominiale', body: 'Gentili Condomini,\n\nVi informiamo che [descrizione avviso].\n\nPer qualsiasi domanda, non esitate a contattarci.\n\nCordiali saluti,\n{{nome_studio}}' },
]

const variables = [
  { tag: '{{nome_condomino}}', label: 'Nome condomino' },
  { tag: '{{nome_condominio}}', label: 'Nome condominio' },
  { tag: '{{nome_studio}}', label: 'Nome studio' },
]

export default function CommunicationCreate() {
  const navigate = useNavigate()
  const toast = useToast()

  const [buildingId, setBuildingId] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [attachments, setAttachments] = useState([])
  const [showVars, setShowVars] = useState(false)
  const [searchAvailable, setSearchAvailable] = useState('')
  const [searchSelected, setSearchSelected] = useState('')

  const buildingOptions = [
    { value: '', label: 'Seleziona immobile' },
    ...buildings.map((b) => ({ value: b.id, label: b.name })),
  ]

  const available = useMemo(() => {
    const pool = buildingId ? condomini.filter((c) => c.buildingId === buildingId) : condomini
    return pool.filter((c) => !selectedIds.includes(c.id))
      .filter((c) => c.name.toLowerCase().includes(searchAvailable.toLowerCase()) || c.email.toLowerCase().includes(searchAvailable.toLowerCase()))
  }, [buildingId, selectedIds, searchAvailable])

  const selected = useMemo(() => {
    return condomini.filter((c) => selectedIds.includes(c.id))
      .filter((c) => c.name.toLowerCase().includes(searchSelected.toLowerCase()) || c.email.toLowerCase().includes(searchSelected.toLowerCase()))
  }, [selectedIds, searchSelected])

  const addOne = (id) => setSelectedIds((p) => [...p, id])
  const removeOne = (id) => setSelectedIds((p) => p.filter((i) => i !== id))
  const addAll = () => setSelectedIds((p) => [...p, ...available.map((c) => c.id)])
  const removeAll = () => {
    const visibleIds = selected.map((c) => c.id)
    setSelectedIds((p) => p.filter((id) => !visibleIds.includes(id)))
  }

  const [docPickerOpen, setDocPickerOpen] = useState(false)
  const availableDocs = documents.filter((d) => !attachments.includes(d.id) && (!buildingId || d.buildingId === buildingId))

  const addAttachment = (docId) => { setAttachments((p) => [...p, docId]); setDocPickerOpen(false) }
  const removeAttachment = (docId) => setAttachments((p) => p.filter((id) => id !== docId))

  const insertVariable = (tag) => { setBody((p) => p + tag); setShowVars(false) }

  const handleSend = () => {
    toast(`Comunicazione inviata a ${selectedIds.length} destinatari`)
    navigate('/studio/comunicazioni')
  }

  return (
    <PlanGate feature="le comunicazioni">
    <div>
      <PageHeader title="Nuova Comunicazione" breadcrumbs={[{ label: 'Comunicazioni', to: '/studio/comunicazioni' }, { label: 'Nuova' }]} />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Destinatari — Dual List */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center"><Users className="h-5 w-5 text-primary-500" /></div>
              <div><CardTitle>Destinatari</CardTitle><CardDescription>Seleziona i condomini a cui inviare la comunicazione</CardDescription></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select label="Filtra per immobile" options={buildingOptions} value={buildingId} onChange={(e) => { setBuildingId(e.target.value); setSelectedIds([]) }} />

            {/* Dual list transfer */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-start">
              {/* Available */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Disponibili ({available.length})</span>
                </div>
                <div className="px-3 py-2 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input className="w-full h-8 pl-8 pr-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-400" placeholder="Cerca..." value={searchAvailable} onChange={(e) => setSearchAvailable(e.target.value)} />
                  </div>
                </div>
                <div className="max-h-52 overflow-y-auto">
                  {available.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-6">Nessun condomino disponibile</p>
                  ) : available.map((c) => (
                    <button key={c.id} onClick={() => addOne(c.id)} className="flex items-center gap-2.5 w-full px-3 py-2 hover:bg-primary-50 transition-colors text-left">
                      <Avatar name={c.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                        <p className="text-xs text-gray-500 truncate">{c.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transfer buttons */}
              <div className="flex md:flex-col items-center justify-center gap-1.5 py-4">
                <button onClick={addAll} className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500" title="Aggiungi tutti"><ChevronsRight className="h-4 w-4" /></button>
                <button onClick={removeAll} className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500" title="Rimuovi tutti"><ChevronsLeft className="h-4 w-4" /></button>
              </div>

              {/* Selected */}
              <div className="border border-primary-200 rounded-xl overflow-hidden bg-primary-50/20">
                <div className="bg-primary-50 px-3 py-2 border-b border-primary-200 flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary-500 uppercase">Selezionati ({selectedIds.length})</span>
                </div>
                <div className="px-3 py-2 border-b border-primary-100">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input className="w-full h-8 pl-8 pr-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-400" placeholder="Cerca..." value={searchSelected} onChange={(e) => setSearchSelected(e.target.value)} />
                  </div>
                </div>
                <div className="max-h-52 overflow-y-auto">
                  {selected.length === 0 ? (
                    <p className="text-xs text-gray-400 text-center py-6">Nessun destinatario selezionato</p>
                  ) : selected.map((c) => (
                    <button key={c.id} onClick={() => removeOne(c.id)} className="flex items-center gap-2.5 w-full px-3 py-2 hover:bg-destructive-50 transition-colors text-left group">
                      <Avatar name={c.name} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                        <p className="text-xs text-gray-500 truncate">{c.email}</p>
                      </div>
                      <X className="h-3.5 w-3.5 text-gray-400 group-hover:text-destructive-500 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contenuto */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Contenuto</CardTitle>
              <Select
                options={templates.map((t) => ({ value: t.id, label: t.name }))}
                value=""
                onChange={(e) => {
                  const tpl = templates.find((t) => t.id === e.target.value)
                  if (tpl) { setSubject(tpl.subject); setBody(tpl.body) }
                }}
                placeholder="Usa template..."
                className="w-48"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Oggetto" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Oggetto della comunicazione" required />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Messaggio</label>
              <div className="flex items-center gap-0.5 p-2 border border-gray-200 border-b-0 rounded-t-xl bg-gray-50 flex-wrap">
                <TBtn icon={Bold} /><TBtn icon={Italic} /><TBtn icon={Underline} />
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <TBtn icon={AlignLeft} /><TBtn icon={List} />
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <TBtn icon={Link2} /><TBtn icon={Image} />
                <div className="w-px h-5 bg-gray-200 mx-1" />
                <div className="relative">
                  <button onClick={() => setShowVars(!showVars)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-accent-50 text-accent-500 hover:bg-accent-100 transition-colors">
                    <Variable className="h-3.5 w-3.5" />Variabili
                  </button>
                  {showVars && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl border border-gray-200 shadow-lg z-10 py-1 animate-fade-in">
                      {variables.map((v) => (
                        <button key={v.tag} onClick={() => insertVariable(v.tag)} className="flex items-center justify-between w-full px-3 py-2 text-xs hover:bg-gray-50">
                          <span className="text-gray-700">{v.label}</span>
                          <code className="text-[10px] text-accent-400 bg-accent-50 px-1.5 py-0.5 rounded">{v.tag}</code>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <textarea className="w-full border border-gray-200 rounded-b-xl px-4 py-4 text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 min-h-[250px] resize-y" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Scrivi il contenuto della comunicazione..." />
            </div>
          </CardContent>
        </Card>

        {/* Documenti Allegati */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center"><Paperclip className="h-5 w-5 text-gray-500" /></div>
                <div><CardTitle>Documenti Allegati</CardTitle><CardDescription>{attachments.length > 0 ? `${attachments.length} documenti` : 'Nessun documento allegato'}</CardDescription></div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setDocPickerOpen(!docPickerOpen)}><Paperclip className="h-3.5 w-3.5" />Allega Documento</Button>
            </div>
          </CardHeader>
          <CardContent>
            {docPickerOpen && (
              <div className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 border-b border-gray-200"><span className="text-xs font-semibold text-gray-500 uppercase">Seleziona documento</span></div>
                <div className="max-h-48 overflow-y-auto">
                  {availableDocs.length === 0 ? <p className="text-xs text-gray-400 text-center py-4">Nessun documento disponibile</p> : availableDocs.map((doc) => (
                    <button key={doc.id} onClick={() => addAttachment(doc.id)} className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-primary-50 transition-colors text-left">
                      <FileText className="h-4 w-4 text-primary-400 flex-shrink-0" />
                      <div className="min-w-0 flex-1"><p className="text-sm font-medium text-gray-800 truncate">{doc.name}</p><p className="text-xs text-gray-500">{doc.category} · {doc.type} · {doc.size}</p></div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((docId) => { const doc = documents.find((d) => d.id === docId); if (!doc) return null; return (
                  <div key={docId} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3"><FileText className="h-4 w-4 text-primary-400" /><div><p className="text-sm font-medium text-gray-700">{doc.name}</p><p className="text-xs text-gray-400">{doc.category} · {doc.type} · {doc.size}</p></div></div>
                    <button onClick={() => removeAttachment(docId)} className="text-gray-400 hover:text-destructive-500"><X className="h-4 w-4" /></button>
                  </div>
                )})}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between pb-8">
          <Button variant="outline" onClick={() => navigate('/studio/comunicazioni')}>Annulla</Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => toast('Bozza salvata')}>Salva Bozza</Button>
            <Button onClick={handleSend} disabled={selectedIds.length === 0}>
              <Send className="h-4 w-4" />Invia a {selectedIds.length} destinatari
            </Button>
          </div>
        </div>
      </div>
    </div>
    </PlanGate>
  )
}

function TBtn({ icon: Icon }) {
  return <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"><Icon className="h-3.5 w-3.5" /></button>
}
