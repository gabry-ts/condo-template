import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    studioName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    piva: '',
    password: '',
    confirmPassword: '',
  })

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/scegli-piano')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-500 items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <div className="text-5xl font-bold font-display mb-4">Domea</div>
          <p className="text-primary-100 text-lg">Registra il tuo studio e inizia a gestire i tuoi condomini</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-lg">
          <Card className="shadow-xl border-0">
            <CardHeader className="items-center text-center">
              <Badge variant="primary" className="mb-2 text-lg font-bold px-4 py-2 lg:hidden">DM</Badge>
              <CardTitle className="text-2xl">Crea il tuo account</CardTitle>
              <CardDescription>Registra il tuo studio di amministrazione</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Nome Studio"
                  placeholder="Studio Bianchi Amministrazioni"
                  value={form.studioName}
                  onChange={update('studioName')}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Nome"
                    placeholder="Marco"
                    value={form.firstName}
                    onChange={update('firstName')}
                    required
                  />
                  <Input
                    label="Cognome"
                    placeholder="Bianchi"
                    value={form.lastName}
                    onChange={update('lastName')}
                    required
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  placeholder="marco@studiobianchi.it"
                  value={form.email}
                  onChange={update('email')}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Telefono"
                    type="tel"
                    placeholder="+39 02 1234567"
                    value={form.phone}
                    onChange={update('phone')}
                    required
                  />
                  <Input
                    label="P.IVA"
                    placeholder="01234567890"
                    value={form.piva}
                    onChange={update('piva')}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Minimo 8 caratteri"
                    value={form.password}
                    onChange={update('password')}
                    required
                  />
                  <Input
                    label="Conferma Password"
                    type="password"
                    placeholder="Ripeti la password"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full mt-2">
                  <UserPlus className="h-4 w-4" />
                  Registrati
                </Button>

                <div className="text-center text-sm text-gray-500">
                  Hai gia un account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-primary-500 font-medium hover:underline"
                  >
                    Accedi
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
