import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Save, Mail, Building2, TestTube, Eye, EyeOff, Users, Plus, Trash2, Send, Shield,
  FileText, Image, CreditCard, Crown, Bold, Italic, Underline, AlignLeft, AlignCenter,
  List, Link2, Variable, Undo2, Redo2, Maximize2, Type, Palette, Upload, ChevronRight,
  ExternalLink, Sparkles,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Switch from '../../components/ui/Switch'
import Badge from '../../components/ui/Badge'
import Tabs from '../../components/ui/Tabs'
import Avatar from '../../components/ui/Avatar'
import Modal from '../../components/ui/Modal'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { useToast } from '../../components/ui/Toast'
import PlanGate from '../../components/shared/PlanGate'
import { useAuth } from '../../context/AuthContext'
import { staff as staffData } from '../../data/users'

// ========== AGENZIA ==========
function AgencyTab({ toast }) {
  const { user } = useAuth()
  const [agency, setAgency] = useState({
    name: user?.studio || 'Studio Bianchi Amministrazioni',
    piva: '12345678901', cf: 'BNCMRC80A01H501Z',
    address: 'Via Torino 42, 20123 Milano',
    phone: '+39 02 1234567', email: 'info@studiobianchi.it',
    pec: 'studiobianchi@pec.it', website: 'www.studiobianchi.it',
  })
  const h = (f) => (e) => setAgency((p) => ({ ...p, [f]: e.target.value }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center"><Building2 className="h-5 w-5 text-primary-500" /></div>
          <div><CardTitle>Dati Agenzia</CardTitle><CardDescription>Informazioni dello studio di amministrazione</CardDescription></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><Input label="Ragione Sociale" value={agency.name} onChange={h('name')} /></div>
          <Input label="P.IVA" value={agency.piva} onChange={h('piva')} />
          <Input label="Codice Fiscale" value={agency.cf} onChange={h('cf')} />
          <div className="md:col-span-2"><Input label="Indirizzo" value={agency.address} onChange={h('address')} /></div>
          <Input label="Telefono" value={agency.phone} onChange={h('phone')} />
          <Input label="Email" type="email" value={agency.email} onChange={h('email')} />
          <Input label="PEC" type="email" value={agency.pec} onChange={h('pec')} />
          <Input label="Sito Web" value={agency.website} onChange={h('website')} />
        </div>
      </CardContent>
      <CardFooter><Button onClick={() => toast('Dati agenzia aggiornati')}><Save className="h-4 w-4" />Salva</Button></CardFooter>
    </Card>
  )
}

// ========== STAFF ==========
function StaffTab({ toast }) {
  const [staffList] = useState(staffData.filter((s) => s.adminId === '1'))
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '' })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center"><Users className="h-5 w-5 text-primary-500" /></div>
              <div><CardTitle>Membri dello Staff</CardTitle><CardDescription>{staffList.length} collaboratori attivi</CardDescription></div>
            </div>
            <Button size="sm" onClick={() => setInviteOpen(true)}><Plus className="h-4 w-4" />Invita</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader><TableRow><TableHead>Nome</TableHead><TableHead>Email</TableHead><TableHead>Ruolo</TableHead><TableHead>Stato</TableHead><TableHead className="w-24">Azioni</TableHead></TableRow></TableHeader>
            <TableBody>
              {staffList.map((m) => (
                <TableRow key={m.id}>
                  <TableCell><div className="flex items-center gap-2"><Avatar name={m.name} size="sm" /><span className="font-medium text-gray-800">{m.name}</span></div></TableCell>
                  <TableCell>{m.email}</TableCell>
                  <TableCell><Badge variant="primary">Staff</Badge></TableCell>
                  <TableCell><Badge variant="success">Attivo</Badge></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => toast('Invito reinviato a ' + m.email)}><Send className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => toast('Membro rimosso', 'warning')}><Trash2 className="h-3.5 w-3.5 text-destructive-500" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card variant="muted"><CardContent><div className="flex items-start gap-3"><Shield className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" /><div><p className="text-sm font-medium text-gray-700">Permessi Staff</p><p className="text-xs text-gray-500 mt-0.5">I membri dello staff possono gestire ticket, manutenzioni e visualizzare dati degli immobili. Non possono accedere a finanze, morosita, impostazioni studio e fatturazione.</p></div></div></CardContent></Card>
      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Invita Membro Staff" size="sm"
        footer={<><Button variant="outline" onClick={() => setInviteOpen(false)}>Annulla</Button><Button onClick={() => { toast('Invito inviato a ' + inviteForm.email); setInviteOpen(false); setInviteForm({ name: '', email: '' }) }}><Send className="h-4 w-4" />Invia Invito</Button></>}>
        <div className="space-y-4">
          <Input label="Nome completo" value={inviteForm.name} onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })} placeholder="Es. Mario Rossi" />
          <Input label="Email" type="email" value={inviteForm.email} onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })} placeholder="mario.rossi@tuostudio.it" />
        </div>
      </Modal>
    </div>
  )
}

// ========== TEMPLATE EMAIL — Rich Editor ==========
const emailTemplates = [
  { id: 'invito', name: 'Invito Condomino', subject: 'Benvenuto su Domea', desc: 'Email inviata quando un condomino viene invitato', lastEdit: '15/03/2026',
    body: 'Gentile {{nome_condomino}},\n\nLe diamo il benvenuto sulla piattaforma Domea del condominio {{nome_condominio}}.\n\nPer attivare il suo account, clicchi sul seguente link:\n{{link_attivazione}}\n\nDa questo portale potra:\n- Consultare rate e pagamenti\n- Scaricare documenti condominiali\n- Segnalare problemi e aprire ticket\n- Visualizzare assemblee e delibere\n\nPer qualsiasi domanda, non esiti a contattarci.\n\nCordiali saluti,\n{{nome_studio}}' },
  { id: 'sollecito', name: 'Sollecito Morosita', subject: 'Sollecito pagamento rate condominiali', desc: 'Email di sollecito per rate non pagate', lastEdit: '10/03/2026',
    body: 'Gentile {{nome_condomino}},\n\nLe comunichiamo che risultano non pagate le seguenti rate condominiali per un totale di {{importo_dovuto}}.\n\nLa preghiamo di provvedere al pagamento entro 15 giorni dalla ricezione della presente.\n\nIBAN: {{iban_condominio}}\nCausale: Rata condominiale - {{nome_condominio}}\n\nRimaniamo a disposizione per eventuali chiarimenti.\n\nCordiali saluti,\n{{nome_studio}}' },
  { id: 'assemblea', name: 'Convocazione Assemblea', subject: 'Convocazione assemblea condominiale', desc: 'Email di convocazione per assemblee', lastEdit: '05/03/2026',
    body: 'Gentile Condomino,\n\nLa informiamo che e stata convocata l\'assemblea {{tipo_assemblea}} del condominio {{nome_condominio}}.\n\nData: {{data_assemblea}}\nOra: {{ora_assemblea}}\nLuogo: {{luogo_assemblea}}\n\nOrdine del giorno:\n{{ordine_del_giorno}}\n\nLa preghiamo di confermare la Sua partecipazione.\n\nCordiali saluti,\n{{nome_studio}}' },
  { id: 'manutenzione', name: 'Aggiornamento Manutenzione', subject: 'Aggiornamento lavori di manutenzione', desc: 'Email di notifica per manutenzioni', lastEdit: '01/03/2026',
    body: 'Gentili Condomini,\n\nVi informiamo che i lavori di {{titolo_manutenzione}} presso {{nome_condominio}} sono stati aggiornati.\n\nStato attuale: {{stato_manutenzione}}\nFornitore: {{nome_fornitore}}\n\nPer ulteriori dettagli, accedete al portale Domea Connect.\n\nCordiali saluti,\n{{nome_studio}}' },
  { id: 'comunicazione', name: 'Comunicazione Generica', subject: 'Comunicazione condominiale', desc: 'Template per comunicazioni generiche ai condomini', lastEdit: '25/03/2026',
    body: 'Gentili Condomini,\n\nVi comunichiamo quanto segue riguardo il condominio {{nome_condominio}}.\n\n[Inserire il contenuto della comunicazione]\n\nPer qualsiasi domanda o chiarimento, potete contattarci rispondendo a questa email o tramite il portale Domea Connect.\n\nCordiali saluti,\n{{nome_studio}}' },
]

const variables = [
  { tag: '{{nome_condomino}}', label: 'Nome condomino' },
  { tag: '{{nome_condominio}}', label: 'Nome condominio' },
  { tag: '{{nome_studio}}', label: 'Nome studio' },
  { tag: '{{importo_dovuto}}', label: 'Importo dovuto' },
  { tag: '{{iban_condominio}}', label: 'IBAN condominio' },
  { tag: '{{link_attivazione}}', label: 'Link attivazione' },
  { tag: '{{data_assemblea}}', label: 'Data assemblea' },
  { tag: '{{ora_assemblea}}', label: 'Ora assemblea' },
  { tag: '{{luogo_assemblea}}', label: 'Luogo assemblea' },
]

function TemplateEmailTab({ toast }) {
  const [selected, setSelected] = useState(null)
  const [editSubject, setEditSubject] = useState('')
  const [editBody, setEditBody] = useState('')
  const [showVars, setShowVars] = useState(false)
  const [preview, setPreview] = useState(false)

  const openEditor = (tpl) => {
    setSelected(tpl)
    setEditSubject(tpl.subject)
    setEditBody(tpl.body)
  }

  const insertVariable = (tag) => {
    setEditBody((prev) => prev + tag)
    setShowVars(false)
  }

  const previewBody = (text) => {
    return text
      .replace('{{nome_condomino}}', 'Giuseppe Rossi')
      .replace('{{nome_condominio}}', 'Condominio Via Roma 15')
      .replace('{{nome_studio}}', 'Studio Bianchi Amministrazioni')
      .replace('{{importo_dovuto}}', 'EUR 1.560,00')
      .replace('{{iban_condominio}}', 'IT60X0542811101000000123456')
      .replace('{{link_attivazione}}', 'https://app.domea.it/attiva/abc123')
      .replace('{{data_assemblea}}', '10/04/2026')
      .replace('{{ora_assemblea}}', '18:00')
      .replace('{{luogo_assemblea}}', 'Sala condominiale piano terra')
      .replace('{{tipo_assemblea}}', 'ordinaria')
      .replace('{{ordine_del_giorno}}', '1. Approvazione bilancio\n2. Nomina amministratore\n3. Varie ed eventuali')
      .replace('{{titolo_manutenzione}}', 'riparazione perdita acqua')
      .replace('{{stato_manutenzione}}', 'In corso')
      .replace('{{nome_fornitore}}', 'Idraulica Neri S.r.l.')
  }

  if (selected) {
    return (
      <div className="space-y-4">
        {/* Back button */}
        <button onClick={() => setSelected(null)} className="text-sm text-primary-400 hover:text-primary-500 font-medium flex items-center gap-1">
          &larr; Torna ai template
        </button>

        <Card variant="elevated">
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <div>
                <CardTitle>{selected.name}</CardTitle>
                <CardDescription>{selected.desc}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant={preview ? 'primary' : 'outline'} size="sm" onClick={() => setPreview(!preview)}>
                  <Eye className="h-3.5 w-3.5" />{preview ? 'Editor' : 'Preview'}
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast('Email di test inviata', 'info')}>
                  <Send className="h-3.5 w-3.5" />Test
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Subject */}
            <Input label="Oggetto" value={editSubject} onChange={(e) => setEditSubject(e.target.value)} />

            {preview ? (
              /* Preview mode */
              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <div className="border-b border-gray-100 pb-3 mb-4">
                  <p className="text-xs text-gray-500">Da: Studio Bianchi Amministrazioni &lt;info@studiobianchi.it&gt;</p>
                  <p className="text-xs text-gray-500">A: Giuseppe Rossi &lt;giuseppe.rossi@email.it&gt;</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">{editSubject}</p>
                </div>
                <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {previewBody(editBody)}
                </div>
              </div>
            ) : (
              /* Editor mode */
              <div>
                {/* Toolbar */}
                <div className="flex items-center gap-0.5 p-2 border border-gray-200 border-b-0 rounded-t-xl bg-gray-50 flex-wrap">
                  <ToolbarBtn icon={Bold} label="Grassetto" />
                  <ToolbarBtn icon={Italic} label="Corsivo" />
                  <ToolbarBtn icon={Underline} label="Sottolineato" />
                  <div className="w-px h-5 bg-gray-200 mx-1" />
                  <ToolbarBtn icon={AlignLeft} label="Allinea" />
                  <ToolbarBtn icon={AlignCenter} label="Centra" />
                  <ToolbarBtn icon={List} label="Lista" />
                  <div className="w-px h-5 bg-gray-200 mx-1" />
                  <ToolbarBtn icon={Link2} label="Link" />
                  <ToolbarBtn icon={Image} label="Immagine" />
                  <div className="w-px h-5 bg-gray-200 mx-1" />
                  <div className="relative">
                    <button
                      onClick={() => setShowVars(!showVars)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-accent-50 text-accent-500 hover:bg-accent-100 transition-colors"
                    >
                      <Variable className="h-3.5 w-3.5" />
                      Variabili
                    </button>
                    {showVars && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border border-gray-200 shadow-lg z-10 py-1 animate-fade-in">
                        {variables.map((v) => (
                          <button key={v.tag} onClick={() => insertVariable(v.tag)}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs hover:bg-gray-50 transition-colors">
                            <span className="text-gray-700">{v.label}</span>
                            <code className="text-[10px] text-accent-400 bg-accent-50 px-1.5 py-0.5 rounded">{v.tag}</code>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-1" />
                  <ToolbarBtn icon={Undo2} label="Annulla" />
                  <ToolbarBtn icon={Redo2} label="Ripeti" />
                  <ToolbarBtn icon={Maximize2} label="Schermo intero" />
                </div>

                {/* Textarea */}
                <textarea
                  className="w-full border border-gray-200 rounded-b-xl px-4 py-4 text-sm text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 min-h-[350px] resize-y font-mono"
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={() => setSelected(null)}>Annulla</Button>
            <Button onClick={() => { toast('Template "' + selected.name + '" salvato'); setSelected(null) }}>
              <Save className="h-4 w-4" />Salva Template
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {emailTemplates.map((tpl) => (
        <Card key={tpl.id} hover className="cursor-pointer" onClick={() => openEditor(tpl)}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-accent-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{tpl.name}</p>
                  <p className="text-xs text-gray-500">{tpl.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">Modificato il {tpl.lastEdit}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ToolbarBtn({ icon: Icon, label }) {
  return (
    <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors" title={label}>
      <Icon className="h-3.5 w-3.5" />
    </button>
  )
}

// ========== BRANDING ==========
const defaultHtmlTemplate = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="background:{{colore_primario}};padding:24px 32px;text-align:center;">
          <img src="{{logo_url}}" alt="{{nome_studio}}" height="40" style="height:40px;" />
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;">
          {{contenuto}}
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#f9f9f9;padding:20px 32px;text-align:center;border-top:1px solid #eee;">
          <p style="margin:0;font-size:12px;color:#999;">{{nome_studio}}</p>
          <p style="margin:4px 0 0;font-size:11px;color:#bbb;">{{indirizzo_studio}}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

function BrandingTab({ toast }) {
  const [htmlTemplate, setHtmlTemplate] = useState(defaultHtmlTemplate)
  const [showPreview, setShowPreview] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#1e3a5f')

  const previewHtml = htmlTemplate
    .replace(/\{\{colore_primario\}\}/g, primaryColor)
    .replace(/\{\{logo_url\}\}/g, '')
    .replace(/\{\{nome_studio\}\}/g, 'Studio Bianchi Amministrazioni')
    .replace(/\{\{indirizzo_studio\}\}/g, 'Via Torino 42, 20123 Milano')
    .replace(/\{\{contenuto\}\}/g, '<p style="font-size:14px;color:#333;line-height:1.6;">Gentile Giuseppe Rossi,</p><p style="font-size:14px;color:#333;line-height:1.6;">Le comunichiamo che e stata convocata l\'assemblea ordinaria del condominio Via Roma 15.</p><p style="font-size:14px;color:#333;line-height:1.6;">Cordiali saluti,<br/><strong>Studio Bianchi Amministrazioni</strong></p>')

  return (
    <div className="space-y-6">
      {/* Logo */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-accent-50 flex items-center justify-center"><Palette className="h-5 w-5 text-accent-400" /></div>
            <div><CardTitle>Logo Studio</CardTitle><CardDescription>Utilizzato nelle email, nel portale Connect e nei documenti</CardDescription></div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
              <div className="text-center"><Image className="h-5 w-5 text-gray-400 mx-auto mb-0.5" /><span className="text-[9px] text-gray-400">Logo</span></div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">PNG o SVG, min 200x200px</p>
              <Button variant="outline" size="sm" onClick={() => toast('Upload logo: seleziona un file', 'info')}><Upload className="h-4 w-4" />Carica Logo</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HTML Email Template */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center"><Mail className="h-5 w-5 text-primary-500" /></div>
              <div><CardTitle>Template HTML Email</CardTitle><CardDescription>Il layout che avvolge tutte le comunicazioni inviate</CardDescription></div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={showPreview ? 'primary' : 'outline'} size="sm" onClick={() => setShowPreview(!showPreview)}>
                <Eye className="h-3.5 w-3.5" />{showPreview ? 'Editor' : 'Preview'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Color picker */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Colore primario</label>
            <div className="flex items-center gap-2">
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-8 w-8 rounded-lg border border-gray-200 cursor-pointer" />
              <span className="text-xs font-mono text-gray-500">{primaryColor}</span>
            </div>
          </div>

          {showPreview ? (
            /* Preview */
            <div className="space-y-3">
              <p className="text-xs text-gray-500">Anteprima con dati di esempio:</p>
              <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  srcDoc={previewHtml}
                  className="w-full border-0"
                  style={{ height: '480px' }}
                  title="Email Preview"
                  sandbox=""
                />
              </div>
            </div>
          ) : (
            /* Editor */
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">Variabili disponibili: <code className="text-accent-400">{'{{contenuto}}'}</code> <code className="text-accent-400">{'{{nome_studio}}'}</code> <code className="text-accent-400">{'{{logo_url}}'}</code> <code className="text-accent-400">{'{{colore_primario}}'}</code> <code className="text-accent-400">{'{{indirizzo_studio}}'}</code></p>
                <Button variant="ghost" size="sm" onClick={() => { setHtmlTemplate(defaultHtmlTemplate); toast('Template ripristinato') }}>Reset Default</Button>
              </div>
              <textarea
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-700 font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 min-h-[400px] resize-y bg-gray-900 text-green-400"
                value={htmlTemplate}
                onChange={(e) => setHtmlTemplate(e.target.value)}
                spellCheck={false}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" onClick={() => toast('Email di test inviata con template', 'info')}><Send className="h-4 w-4" />Invia Test</Button>
          <Button onClick={() => toast('Template HTML salvato')}><Save className="h-4 w-4" />Salva Template</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// ========== DOCUMENTI LEGALI ==========
function LegalTab({ toast }) {
  const docs = [
    { id: 'privacy', name: 'Informativa Privacy', desc: 'Policy mostrata ai condomini in fase di registrazione', status: 'Pubblicata', lastEdit: '01/02/2026' },
    { id: 'terms', name: 'Termini di Servizio', desc: 'Condizioni generali di utilizzo del portale', status: 'Pubblicata', lastEdit: '01/02/2026' },
    { id: 'cookie', name: 'Cookie Policy', desc: 'Informativa sull\'utilizzo dei cookie', status: 'Bozza', lastEdit: '15/01/2026' },
    { id: 'gdpr', name: 'Registro Trattamenti', desc: 'Registro dei trattamenti dati personali (GDPR Art. 30)', status: 'Bozza', lastEdit: '10/01/2026' },
  ]

  return (
    <div className="space-y-4">
      <Card variant="muted" className="p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            I documenti legali sono necessari per la compliance GDPR. L'informativa privacy e i termini
            vengono mostrati ai condomini durante l'attivazione dell'account. Si consiglia di far redigere
            i testi da un consulente legale.
          </p>
        </div>
      </Card>

      {docs.map((doc) => (
        <Card key={doc.id} hover className="cursor-pointer">
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                    <Badge variant={doc.status === 'Pubblicata' ? 'success' : 'warning'}>{doc.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500">{doc.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{doc.lastEdit}</span>
                <Button variant="outline" size="sm" onClick={() => toast('Editor documento aperto', 'info')}>Modifica</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ========== FATTURAZIONE ==========
function BillingTab({ toast }) {
  const { user } = useAuth()
  return (
    <div className="space-y-6">
      <Card variant="elevated">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-bold text-gray-800">Piano Pro</h3>
                <Badge variant="pro">Attivo</Badge>
              </div>
              <p className="text-sm text-gray-500">EUR 29,00/mese — Prossimo rinnovo: 01/04/2026</p>
            </div>
            <Crown className="h-10 w-10 text-accent-300" />
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center gap-3">
        <Link to="/studio/abbonamento">
          <Button variant="outline" className="gap-2"><CreditCard className="h-4 w-4" />Gestisci Abbonamento<ChevronRight className="h-3.5 w-3.5" /></Button>
        </Link>
      </div>
    </div>
  )
}

// ========== SMTP ==========
function SmtpTab({ toast }) {
  const { user } = useAuth()
  const [smtp, setSmtp] = useState({ enabled: false, host: '', port: '587', username: '', password: '', encryption: 'tls', fromName: user?.studio || '', fromEmail: '' })
  const [showPw, setShowPw] = useState(false)
  const h = (f) => (e) => { const v = e.target?.value !== undefined ? e.target.value : e; setSmtp((p) => ({ ...p, [f]: v })) }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-info-50 flex items-center justify-center"><Mail className="h-5 w-5 text-info-500" /></div>
            <div><CardTitle>Server SMTP</CardTitle><CardDescription>Invia email dal tuo dominio</CardDescription></div>
          </div>
          <div className="flex items-center gap-3">
            {smtp.enabled ? <Badge variant="success">Attivo</Badge> : <Badge variant="default">Disattivo</Badge>}
            <Switch checked={smtp.enabled} onChange={(v) => h('enabled')(v)} />
          </div>
        </div>
      </CardHeader>
      {smtp.enabled && (
        <>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Server SMTP" value={smtp.host} onChange={h('host')} placeholder="smtp.tuodominio.it" />
              <Input label="Porta" value={smtp.port} onChange={h('port')} placeholder="587" />
              <Input label="Username" value={smtp.username} onChange={h('username')} placeholder="info@tuodominio.it" />
              <div className="relative">
                <Input label="Password" type={showPw ? 'text' : 'password'} value={smtp.password} onChange={h('password')} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <Select label="Crittografia" value={smtp.encryption} onChange={h('encryption')} options={[{ value: 'tls', label: 'TLS' }, { value: 'ssl', label: 'SSL' }, { value: 'none', label: 'Nessuna' }]} />
              <Input label="Nome Mittente" value={smtp.fromName} onChange={h('fromName')} />
              <div className="md:col-span-2"><Input label="Email Mittente" type="email" value={smtp.fromEmail} onChange={h('fromEmail')} /></div>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" onClick={() => toast('Email di test inviata', 'info')}><TestTube className="h-4 w-4" />Invia Test</Button>
            <Button onClick={() => toast('SMTP salvato')}><Save className="h-4 w-4" />Salva</Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

// ========== MAIN ==========
function ProTabGate({ children, feature, user }) {
  const isPro = user?.plan === 'pro' || user?.role === 'superuser'
  if (isPro) return children
  return <PlanGate feature={feature}>{children}</PlanGate>
}

export default function StudioSettings() {
  const toast = useToast()
  const { user } = useAuth()

  const tabs = [
    { id: 'agenzia', label: 'Agenzia', content: <AgencyTab toast={toast} /> },
    { id: 'staff', label: 'Staff', content: <ProTabGate feature="la gestione staff" user={user}><StaffTab toast={toast} /></ProTabGate> },
    { id: 'template', label: 'Template Email', content: <ProTabGate feature="i template email" user={user}><TemplateEmailTab toast={toast} /></ProTabGate> },
    { id: 'branding', label: 'Branding', content: <ProTabGate feature="il branding personalizzato" user={user}><BrandingTab toast={toast} /></ProTabGate> },
    { id: 'legale', label: 'Documenti Legali', content: <LegalTab toast={toast} /> },
    { id: 'fatturazione', label: 'Fatturazione', content: <BillingTab toast={toast} /> },
    { id: 'smtp', label: 'SMTP', content: <ProTabGate feature="l\'SMTP personalizzato" user={user}><SmtpTab toast={toast} /></ProTabGate> },
  ]

  return (
    <div>
      <PageHeader title="Impostazioni Studio" description="Configura agenzia, staff, comunicazioni e fatturazione" />
      <div className="max-w-4xl mx-auto">
        <Tabs tabs={tabs} defaultTab="agenzia" />
      </div>
    </div>
  )
}
