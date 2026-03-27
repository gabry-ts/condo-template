import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, KeyRound, Mail, Fingerprint, ArrowRight, Shield, QrCode } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'
import { useAuth } from '../../context/AuthContext'

const roles = [
  { value: 'admin', label: 'Amministratore', path: '/studio/dashboard' },
  { value: 'staff', label: 'Staff', path: '/studio/dashboard' },
  { value: 'condomino', label: 'Condomino', path: '/connect/home' },
  { value: 'fornitore', label: 'Fornitore', path: '/fornitore/dashboard' },
  { value: 'superuser', label: 'Superuser', path: '/admin/dashboard' },
]

export default function Login() {
  const [step, setStep] = useState('credentials') // credentials | twofa
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('admin')
  const [twoFACode, setTwoFACode] = useState('')
  const [twoFAMethod, setTwoFAMethod] = useState('totp') // totp | email | passkey
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep('twofa')
  }

  const handleVerify = () => {
    login(selectedRole)
    const role = roles.find((r) => r.value === selectedRole)
    navigate(role?.path || '/studio/dashboard')
  }

  const handlePasskey = () => {
    login(selectedRole)
    const role = roles.find((r) => r.value === selectedRole)
    navigate(role?.path || '/studio/dashboard')
  }

  if (step === 'twofa') {
    return (
      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 bg-primary-500 items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <div className="text-5xl font-bold font-display mb-4">Domea</div>
            <p className="text-primary-100 text-lg">Verifica la tua identita per accedere in sicurezza</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
          <div className="w-full max-w-md">
            <Card className="shadow-xl border-0">
              <CardHeader className="items-center text-center">
                <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-primary-500" />
                </div>
                <CardTitle className="text-xl">Verifica in due passaggi</CardTitle>
                <CardDescription>Scegli come verificare la tua identita</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Method selector */}
                <div className="flex gap-2">
                  {[
                    { id: 'totp', icon: KeyRound, label: 'App' },
                    { id: 'email', icon: Mail, label: 'Email' },
                    { id: 'passkey', icon: Fingerprint, label: 'Passkey' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setTwoFAMethod(m.id); setTwoFACode('') }}
                      className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                        twoFAMethod === m.id ? 'border-primary-400 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <m.icon className={`h-5 w-5 ${twoFAMethod === m.id ? 'text-primary-500' : 'text-gray-400'}`} />
                      <span className={`text-xs font-medium ${twoFAMethod === m.id ? 'text-primary-600' : 'text-gray-500'}`}>{m.label}</span>
                    </button>
                  ))}
                </div>

                {twoFAMethod === 'totp' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">Inserisci il codice dalla tua app authenticator</p>
                    <Input placeholder="000000" value={twoFACode} onChange={(e) => setTwoFACode(e.target.value)} className="text-center text-lg tracking-widest" />
                    <Button className="w-full" size="lg" onClick={handleVerify} disabled={twoFACode.length < 6}>
                      Verifica e Accedi
                    </Button>
                  </div>
                )}

                {twoFAMethod === 'email' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">Abbiamo inviato un codice a <strong>{email || 'la tua email'}</strong></p>
                    <Input placeholder="000000" value={twoFACode} onChange={(e) => setTwoFACode(e.target.value)} className="text-center text-lg tracking-widest" />
                    <Button className="w-full" size="lg" onClick={handleVerify} disabled={twoFACode.length < 6}>
                      Verifica e Accedi
                    </Button>
                    <button className="text-sm text-primary-500 hover:underline text-center w-full">Reinvia codice</button>
                  </div>
                )}

                {twoFAMethod === 'passkey' && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">Usa la tua passkey per accedere</p>
                    <Button className="w-full" size="lg" onClick={handlePasskey}>
                      <Fingerprint className="h-4 w-4" />
                      Accedi con Passkey
                    </Button>
                  </div>
                )}

                <button onClick={() => setStep('credentials')} className="text-sm text-gray-500 hover:text-gray-700 text-center w-full">
                  Torna al login
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-500 items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="text-5xl font-bold font-display mb-4">Domea</div>
          <p className="text-primary-100 text-lg">La piattaforma completa per la gestione condominiale</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <Badge variant="primary" className="mb-2 text-lg font-bold px-4 py-2 lg:hidden">DM</Badge>
              <CardTitle className="text-2xl">Accedi a Domea</CardTitle>
              <CardDescription>Inserisci le tue credenziali</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input label="Email" type="email" placeholder="mario.rossi@email.it" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input label="Password" type="password" placeholder="La tua password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <Button type="submit" size="lg" className="w-full mt-2">
                  <LogIn className="h-4 w-4" />Accedi
                </Button>

                <div className="flex items-center justify-between">
                  <Link to="/recupera-password" className="text-sm text-gray-400 hover:text-primary-500 transition-colors">Password dimenticata?</Link>
                  <Link to="/registrazione" className="text-sm text-primary-500 font-medium hover:underline">Crea un account</Link>
                </div>

                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                  <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-gray-400">oppure</span></div>
                </div>

                <Link to="/attivazione-qr">
                  <Button variant="outline" className="w-full gap-2" type="button">
                    <QrCode className="h-4 w-4" />
                    Attiva account condomino con QR
                  </Button>
                </Link>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center mb-3 uppercase tracking-wider font-medium">Accesso demo</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {roles.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => setSelectedRole(role.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        selectedRole === role.value ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
