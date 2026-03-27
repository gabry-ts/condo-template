import { useState } from 'react'
import { Save, Shield, Monitor, Smartphone, KeyRound, Fingerprint, QrCode, Copy, Check } from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Tabs from '../../components/ui/Tabs'
import Switch from '../../components/ui/Switch'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { useToast } from '../../components/ui/Toast'

import { useAuth } from '../../context/AuthContext'

function ProfileTab({ user, toast }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+39 02 1234567',
    studio: user?.studio || '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profilo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar name={form.name} size="xl" />
          <div>
            <p className="text-sm font-medium text-gray-800">{form.name}</p>
            <p className="text-xs text-gray-500">{form.email}</p>
            <Button variant="link" size="sm" className="mt-1 px-0">
              Cambia foto
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome completo"
            value={form.name}
            onChange={handleChange('name')}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
          />
          <Input
            label="Telefono"
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
          />
          <Input
            label="Nome Studio"
            value={form.studio}
            onChange={handleChange('studio')}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => toast('Profilo aggiornato')}>
          <Save className="h-4 w-4" />
          Salva
        </Button>
      </CardFooter>
    </Card>
  )
}

function SecurityTab({ toast, user }) {
  const [twoFAMethod, setTwoFAMethod] = useState('totp') // null | 'totp' | 'passkey'
  const [totpStep, setTotpStep] = useState('done') // 'setup' | 'verify' | 'done'
  const [totpCode, setTotpCode] = useState('')
  const [copied, setCopied] = useState(false)

  const mockSecret = 'JBSWY3DPEHPK3PXP'
  const passkeys = [
    { id: 'pk1', name: 'MacBook Pro', created: '15/01/2026', lastUsed: '27/03/2026' },
  ]

  const sessions = [
    { device: 'Chrome su MacOS', location: 'Milano, IT', current: true, icon: Monitor },
    { device: 'Safari su iPhone', location: 'Milano, IT', current: false, icon: Smartphone },
  ]

  const handleCopySecret = () => {
    navigator.clipboard?.writeText(mockSecret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Password */}
      <Card>
        <CardHeader><CardTitle>Cambia Password</CardTitle></CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <Input label="Password attuale" type="password" placeholder="Inserisci la password attuale" />
          <Input label="Nuova password" type="password" placeholder="Inserisci la nuova password" />
          <Input label="Conferma password" type="password" placeholder="Conferma la nuova password" />
        </CardContent>
        <CardFooter>
          <Button onClick={() => toast('Password aggiornata')}><Shield className="h-4 w-4" />Aggiorna Password</Button>
        </CardFooter>
      </Card>

      {/* 2FA — TOTP */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center">
                <KeyRound className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <CardTitle>App Authenticator (TOTP)</CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">Google Authenticator, Authy, 1Password, ecc.</p>
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
          <CardContent className="space-y-5 border-t border-gray-100 pt-5">
            <p className="text-sm text-gray-600">Scansiona il QR code con la tua app authenticator oppure inserisci il codice manualmente.</p>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {/* QR placeholder */}
              <div className="h-40 w-40 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                <div className="text-center">
                  <QrCode className="h-16 w-16 text-white mx-auto" />
                  <p className="text-[10px] text-gray-400 mt-1">QR Code TOTP</p>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Codice segreto (manuale)</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg text-gray-800 select-all flex-1">{mockSecret}</code>
                    <Button variant="ghost" size="sm" onClick={handleCopySecret}>
                      {copied ? <Check className="h-4 w-4 text-success-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="max-w-xs">
                  <Input label="Codice di verifica" placeholder="000000" value={totpCode} onChange={(e) => setTotpCode(e.target.value)} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { setTotpStep('done'); toast('2FA TOTP attivato') }} disabled={totpCode.length < 6}>Verifica e Attiva</Button>
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
                <div className="h-8 w-8 rounded-lg bg-success-50 flex items-center justify-center">
                  <Check className="h-4 w-4 text-success-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">TOTP attivo</p>
                  <p className="text-xs text-gray-500">Configurato il 15/01/2026</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-destructive-500" onClick={() => { setTwoFAMethod(null); toast('2FA TOTP disattivato', 'warning') }}>Disattiva</Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Passkey */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-accent-50 flex items-center justify-center">
                <Fingerprint className="h-5 w-5 text-accent-500" />
              </div>
              <div>
                <CardTitle>Passkey</CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">Accedi con impronta, Face ID o chiave di sicurezza</p>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={() => toast('Registrazione passkey avviata. Segui le istruzioni del browser.', 'info')}>
              Aggiungi Passkey
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {passkeys.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Nessuna passkey registrata</p>
          ) : (
            <div className="space-y-3">
              {passkeys.map((pk) => (
                <div key={pk.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Fingerprint className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{pk.name}</p>
                      <p className="text-xs text-gray-500">Creata il {pk.created} · Ultimo uso: {pk.lastUsed}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive-500" onClick={() => toast('Passkey rimossa', 'warning')}>Rimuovi</Button>
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
              <div className="h-10 w-10 rounded-xl bg-info-50 flex items-center justify-center">
                <Monitor className="h-5 w-5 text-info-500" />
              </div>
              <div>
                <CardTitle>Verifica via Email</CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">Ricevi un codice a 6 cifre via email ad ogni accesso</p>
              </div>
            </div>
            <Switch checked={twoFAMethod === 'email'} onChange={(v) => { setTwoFAMethod(v ? 'email' : null); toast(v ? '2FA Email attivato' : '2FA Email disattivato', v ? 'success' : 'warning') }} />
          </div>
        </CardHeader>
        {twoFAMethod === 'email' && (
          <CardContent className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              <Check className="h-4 w-4 text-success-500" />
              <p className="text-sm text-gray-700">I codici verranno inviati a <strong>{user?.email || 'la tua email'}</strong></p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Sessioni */}
      <Card>
        <CardHeader><CardTitle>Sessioni Attive</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session, i) => {
              const Icon = session.icon
              return (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{session.device}</p>
                      <p className="text-xs text-gray-500">{session.location}</p>
                    </div>
                  </div>
                  {session.current ? (
                    <Badge variant="success">Sessione corrente</Badge>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={() => toast('Sessione disconnessa')}>Disconnetti</Button>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function NotificationsTab({ toast }) {
  const [notifications, setNotifications] = useState({
    emailTicket: true,
    emailRate: true,
    emailAssemblee: false,
    push: true,
    emailManutenzione: true,
    emailDocumenti: false,
    reportSettimanale: true,
    scadenzeRate: true,
  })

  const toggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const items = [
    { key: 'emailTicket', label: 'Email per nuovi ticket', description: 'Ricevi una notifica quando viene aperto un nuovo ticket.' },
    { key: 'emailRate', label: 'Email pagamento rate', description: 'Notifica quando un condomino effettua un pagamento.' },
    { key: 'emailAssemblee', label: 'Email assemblee', description: 'Promemoria per le assemblee in programma.' },
    { key: 'push', label: 'Notifiche push', description: 'Ricevi notifiche push nel browser.' },
    { key: 'emailManutenzione', label: 'Email manutenzioni', description: 'Aggiornamenti sullo stato delle manutenzioni.' },
    { key: 'emailDocumenti', label: 'Email nuovi documenti', description: 'Notifica quando un documento viene caricato.' },
    { key: 'reportSettimanale', label: 'Report settimanale', description: 'Ricevi un riepilogo settimanale via email.' },
    { key: 'scadenzeRate', label: 'Scadenze rate', description: 'Promemoria per le rate in scadenza.' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferenze Notifiche</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onChange={() => toggle(item.key)}
              />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => toast('Preferenze salvate')}>
          <Save className="h-4 w-4" />
          Salva Preferenze
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Settings() {
  const { user } = useAuth()
  const toast = useToast()

  const tabs = [
    {
      id: 'profilo',
      label: 'Profilo',
      content: <ProfileTab user={user} toast={toast} />,
    },
    {
      id: 'sicurezza',
      label: 'Sicurezza',
      content: <SecurityTab toast={toast} user={user} />,
    },
    {
      id: 'notifiche',
      label: 'Notifiche',
      content: <NotificationsTab toast={toast} />,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Impostazioni"
        description="Gestisci il tuo account e le preferenze"
      />
      <Tabs tabs={tabs} defaultTab="profilo" />
    </div>
  )
}
