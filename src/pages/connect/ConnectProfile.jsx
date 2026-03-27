import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import { useToast } from '../../components/ui/Toast'
import { condomini } from '../../data/users'
import Switch from '../../components/ui/Switch'
import {
  Save, Download, Trash2, Shield, KeyRound, Fingerprint, Mail as MailIcon,
  QrCode, Copy, Check, Monitor, Smartphone,
} from 'lucide-react'

export default function ConnectProfile() {
  const { user } = useAuth()
  const toast = useToast()
  const condomino = condomini.find((c) => c.name === user.name) || condomini[0]

  const [form, setForm] = useState({
    name: condomino.name,
    email: condomino.email,
    phone: condomino.phone,
  })

  const [twoFAMethod, setTwoFAMethod] = useState(null)
  const [totpStep, setTotpStep] = useState('done')
  const [totpCode, setTotpCode] = useState('')
  const [copied, setCopied] = useState(false)
  const mockSecret = 'KBSWY3DPEHPK3PXQ'

  const handleChange = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))
  const handleSubmit = (e) => { e.preventDefault(); toast('Profilo aggiornato') }
  const handleCopy = () => { navigator.clipboard?.writeText(mockSecret); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  const passkeys = []

  return (
    <div className="space-y-6">
      <PageHeader title="Profilo" description="Gestisci il tuo account" />

      {/* Info personali */}
      <Card>
        <CardContent>
          <div className="flex items-center gap-5 mb-6 pt-2">
            <Avatar name={condomino.name} size="xl" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">{condomino.name}</h2>
              <p className="text-sm text-gray-500">{condomino.email}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Nome completo" value={form.name} onChange={handleChange('name')} />
            <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} />
            <Input label="Telefono" type="tel" value={form.phone} onChange={handleChange('phone')} />
            <div className="pt-2">
              <Button type="submit"><Save className="h-4 w-4" />Salva</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader><CardTitle>Cambia Password</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input label="Password attuale" type="password" placeholder="Inserisci la password attuale" />
          <Input label="Nuova password" type="password" placeholder="Inserisci la nuova password" />
          <Input label="Conferma password" type="password" placeholder="Conferma la nuova password" />
        </CardContent>
        <CardFooter>
          <Button onClick={() => toast('Password aggiornata')}><Shield className="h-4 w-4" />Aggiorna</Button>
        </CardFooter>
      </Card>

      {/* TOTP */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary-100 flex items-center justify-center">
                <KeyRound className="h-4 w-4 text-primary-500" />
              </div>
              <div>
                <CardTitle className="text-base">App Authenticator (TOTP)</CardTitle>
                <p className="text-xs text-gray-500">Google Authenticator, Authy, ecc.</p>
              </div>
            </div>
            {twoFAMethod === 'totp' && totpStep === 'done' ? (
              <Badge variant="success">Attivo</Badge>
            ) : (
              <Button size="sm" variant="outline" onClick={() => { setTwoFAMethod('totp'); setTotpStep('setup') }}>Configura</Button>
            )}
          </div>
        </CardHeader>
        {twoFAMethod === 'totp' && totpStep === 'setup' && (
          <CardContent className="space-y-4 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-600">Scansiona il QR code o inserisci il codice manualmente.</p>
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="h-36 w-36 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                <QrCode className="h-14 w-14 text-white" />
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Codice segreto</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg text-gray-800 flex-1">{mockSecret}</code>
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4 text-success-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Input label="Codice verifica" placeholder="000000" value={totpCode} onChange={(e) => setTotpCode(e.target.value)} />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { setTotpStep('done'); toast('2FA attivato') }} disabled={totpCode.length < 6}>Attiva</Button>
                  <Button size="sm" variant="ghost" onClick={() => { setTwoFAMethod(null); setTotpStep('done') }}>Annulla</Button>
                </div>
              </div>
            </div>
          </CardContent>
        )}
        {twoFAMethod === 'totp' && totpStep === 'done' && (
          <CardContent className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Check className="h-4 w-4 text-success-500" />
                <p className="text-sm font-medium text-gray-800">TOTP attivo</p>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive-500" onClick={() => { setTwoFAMethod(null); toast('2FA disattivato', 'warning') }}>Disattiva</Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Passkey */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-accent-50 flex items-center justify-center">
                <Fingerprint className="h-4 w-4 text-accent-500" />
              </div>
              <div>
                <CardTitle className="text-base">Passkey</CardTitle>
                <p className="text-xs text-gray-500">Impronta, Face ID o chiave di sicurezza</p>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast('Segui le istruzioni del browser', 'info')}>Aggiungi</Button>
          </div>
        </CardHeader>
        <CardContent>
          {passkeys.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-3">Nessuna passkey registrata</p>
          ) : (
            <div className="space-y-2">
              {passkeys.map((pk) => (
                <div key={pk.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-4 w-4 text-gray-500" />
                    <p className="text-sm font-medium text-gray-800">{pk.name}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive-500" onClick={() => toast('Rimossa', 'warning')}>Rimuovi</Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2FA Email */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-info-50 flex items-center justify-center">
                <MailIcon className="h-4 w-4 text-info-500" />
              </div>
              <div>
                <CardTitle className="text-base">Verifica via Email</CardTitle>
                <p className="text-xs text-gray-500">Codice a 6 cifre via email ad ogni accesso</p>
              </div>
            </div>
            <Switch checked={false} onChange={(v) => toast(v ? '2FA Email attivato' : '2FA Email disattivato')} />
          </div>
        </CardHeader>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary-400" />
            <div>
              <CardTitle className="text-base">Privacy e Dati Personali</CardTitle>
              <CardDescription>Gestisci i tuoi dati ai sensi del GDPR</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-800">Esporta i miei dati</p>
                <p className="text-xs text-gray-500">Scarica una copia di tutti i tuoi dati</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast('Esportazione avviata')}><Download className="h-4 w-4" />Esporta</Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-gray-800">Elimina il mio account</p>
                <p className="text-xs text-gray-500">Rimuovi permanentemente account e dati</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => toast('Richiesta inviata all\'amministratore', 'warning')}><Trash2 className="h-4 w-4" />Elimina</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
