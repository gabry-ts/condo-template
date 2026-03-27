import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode, Keyboard, KeyRound, Fingerprint, Mail, ArrowRight, Check, Copy, Shield } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { useAuth } from '../../context/AuthContext'

function QrPlaceholder() {
  return (
    <div className="w-48 h-48 mx-auto bg-gray-900 rounded-xl p-3 relative">
      <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5">
        {Array.from({ length: 49 }).map((_, i) => {
          const row = Math.floor(i / 7)
          const col = i % 7
          const isCorner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3)
          const isFilled = isCorner || Math.random() > 0.45
          return <div key={i} className={`rounded-sm ${isFilled ? 'bg-white' : 'bg-gray-900'}`} />
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-md p-1"><span className="text-xs font-bold text-primary-500">DM</span></div>
      </div>
    </div>
  )
}

const twoFAOptions = [
  { id: 'totp', icon: KeyRound, label: 'App Authenticator', desc: 'Google Authenticator, Authy, 1Password' },
  { id: 'email', icon: Mail, label: 'Email', desc: 'Ricevi un codice via email ad ogni accesso' },
  { id: 'passkey', icon: Fingerprint, label: 'Passkey', desc: 'Impronta digitale, Face ID o chiave di sicurezza' },
]

export default function QrActivation() {
  const [step, setStep] = useState('scan') // scan | password | twofa | totpSetup | done
  const [code, setCode] = useState('')
  const [showManual, setShowManual] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedTwoFA, setSelectedTwoFA] = useState(null)
  const [totpCode, setTotpCode] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [copied, setCopied] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const mockSecret = 'KBSWY3DPEHPK3PXQ'
  const mockEmail = 'giuseppe.rossi@email.it'

  const handleActivate = (e) => {
    e.preventDefault()
    setStep('password')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    setStep('twofa')
  }

  const handleTwoFASelect = (method) => {
    setSelectedTwoFA(method)
    if (method === 'totp') setStep('totpSetup')
    else if (method === 'email') setStep('emailSetup')
    else if (method === 'passkey') setStep('passkeySetup')
  }

  const handleComplete = () => {
    login('condomino')
    navigate('/connect/home')
  }

  const handleCopy = () => { navigator.clipboard?.writeText(mockSecret); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  // Progress indicator
  const steps = ['Attivazione', 'Password', 'Sicurezza']
  const currentStepIndex = step === 'scan' ? 0 : step === 'password' ? 1 : 2

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-500 items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="text-5xl font-bold font-display mb-4">Domea</div>
          <p className="text-primary-100 text-lg">Attiva il tuo account condomino in pochi semplici passaggi</p>
        </div>
      </div>

      {/* Right side - content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <div className={`w-8 h-0.5 ${i <= currentStepIndex ? 'bg-primary-500' : 'bg-gray-300'}`} />}
              <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                i < currentStepIndex ? 'bg-primary-500 text-white' : i === currentStepIndex ? 'bg-primary-100 text-primary-500 border-2 border-primary-400' : 'bg-gray-200 text-gray-400'
              }`}>
                {i < currentStepIndex ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${i <= currentStepIndex ? 'text-primary-600' : 'text-gray-400'}`}>{s}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Scan/Code */}
        {step === 'scan' && (
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <Badge variant="primary" className="mb-2 text-lg font-bold px-4 py-2">DM</Badge>
              <CardTitle className="text-2xl">Attiva il tuo account</CardTitle>
              <CardDescription>Scansiona il QR code o inserisci il codice manualmente</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              {!showManual ? (
                <>
                  <QrPlaceholder />
                  <div className="flex flex-col items-center gap-3 w-full">
                    <p className="text-sm text-gray-400">Inquadra il QR code con la fotocamera</p>
                    <button type="button" onClick={() => setShowManual(true)} className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline font-medium">
                      <Keyboard className="h-4 w-4" />Inserisci codice manualmente
                    </button>
                  </div>
                  {/* Simulate QR scan */}
                  <Button variant="outline" className="w-full" onClick={() => setStep('password')}>
                    Simula scansione QR
                  </Button>
                </>
              ) : (
                <form onSubmit={handleActivate} className="w-full flex flex-col gap-4">
                  <Input label="Codice di attivazione" placeholder="Es. DM-A1B2-C3D4-E5F6" value={code} onChange={(e) => setCode(e.target.value)} required />
                  <Button type="submit" size="lg" className="w-full"><QrCode className="h-4 w-4" />Attiva</Button>
                  <button type="button" onClick={() => setShowManual(false)} className="text-sm text-primary-500 hover:underline text-center">Torna alla scansione QR</button>
                </form>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Password */}
        {step === 'password' && (
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <div className="h-12 w-12 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-2">
                <Shield className="h-6 w-6 text-primary-500" />
              </div>
              <CardTitle className="text-2xl">Imposta la password</CardTitle>
              <CardDescription>Scegli una password sicura per il tuo account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-primary-50 text-sm text-primary-700 text-center">
                  Benvenuto, <strong>Giuseppe Rossi</strong><br />
                  <span className="text-xs text-primary-500">Condominio Via Roma 15</span>
                </div>
                <Input label="Password" type="password" placeholder="Minimo 8 caratteri" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <Input label="Conferma password" type="password" placeholder="Ripeti la password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <Button type="submit" size="lg" className="w-full gap-2" disabled={password.length < 8 || password !== confirmPassword}>
                  Continua <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: 2FA Choice */}
        {step === 'twofa' && (
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <div className="h-12 w-12 rounded-2xl bg-accent-50 flex items-center justify-center mx-auto mb-2">
                <KeyRound className="h-6 w-6 text-accent-500" />
              </div>
              <CardTitle className="text-2xl">Proteggi il tuo account</CardTitle>
              <CardDescription>Scegli un metodo di verifica a due fattori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {twoFAOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleTwoFASelect(opt.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all text-left"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <opt.icon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{opt.label}</p>
                      <p className="text-xs text-gray-500">{opt.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 ml-auto flex-shrink-0" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* TOTP Setup */}
        {step === 'totpSetup' && (
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <CardTitle className="text-xl">Configura App Authenticator</CardTitle>
              <CardDescription>Scansiona il QR con la tua app authenticator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="h-40 w-40 mx-auto rounded-xl bg-gray-900 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-white" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1 text-center">Codice manuale</p>
                <div className="flex items-center gap-2 justify-center">
                  <code className="text-sm font-mono bg-gray-100 px-3 py-2 rounded-lg text-gray-800">{mockSecret}</code>
                  <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600">
                    {copied ? <Check className="h-4 w-4 text-success-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Input label="Codice di verifica" placeholder="000000" value={totpCode} onChange={(e) => setTotpCode(e.target.value)} />
              <Button className="w-full" size="lg" onClick={handleComplete} disabled={totpCode.length < 6}>
                Attiva e Accedi
              </Button>
              <button onClick={() => setStep('twofa')} className="text-sm text-primary-500 hover:underline text-center w-full">Scegli altro metodo</button>
            </CardContent>
          </Card>
        )}

        {/* Email 2FA Setup */}
        {step === 'emailSetup' && (
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <CardTitle className="text-xl">Verifica via Email</CardTitle>
              <CardDescription>Abbiamo inviato un codice a <strong>{mockEmail}</strong></CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-info-50 flex items-center justify-center">
                <Mail className="h-8 w-8 text-info-500" />
              </div>
              <Input label="Codice di verifica" placeholder="000000" value={emailCode} onChange={(e) => setEmailCode(e.target.value)} />
              <Button className="w-full" size="lg" onClick={handleComplete} disabled={emailCode.length < 6}>
                Verifica e Accedi
              </Button>
              <div className="text-center">
                <button className="text-sm text-primary-500 hover:underline">Reinvia codice</button>
                <span className="text-gray-300 mx-2">·</span>
                <button onClick={() => setStep('twofa')} className="text-sm text-primary-500 hover:underline">Scegli altro metodo</button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Passkey Setup */}
        {step === 'passkeySetup' && (
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <CardTitle className="text-xl">Registra Passkey</CardTitle>
              <CardDescription>Usa impronta digitale, Face ID o chiave di sicurezza</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-accent-50 flex items-center justify-center">
                <Fingerprint className="h-8 w-8 text-accent-500" />
              </div>
              <p className="text-sm text-gray-600 text-center">Clicca il bottone e segui le istruzioni del browser per registrare la tua passkey.</p>
              <Button className="w-full" size="lg" onClick={handleComplete}>
                <Fingerprint className="h-4 w-4" />
                Registra Passkey e Accedi
              </Button>
              <button onClick={() => setStep('twofa')} className="text-sm text-primary-500 hover:underline text-center w-full">Scegli altro metodo</button>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </div>
  )
}
