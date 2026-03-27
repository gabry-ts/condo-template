import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Input from '../../components/ui/Input'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
            <Badge variant="primary" className="mb-2 text-lg font-bold px-4 py-2">DM</Badge>
            <CardTitle className="text-2xl">
              {sent ? 'Email inviata' : 'Password dimenticata'}
            </CardTitle>
            <CardDescription>
              {sent
                ? 'Controlla la tua casella di posta'
                : 'Inserisci la tua email per ricevere il link di recupero'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {sent ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-success-500" />
                </div>

                <p className="text-sm text-gray-600 text-center">
                  Abbiamo inviato un link di recupero a{' '}
                  <span className="font-medium text-gray-800">{email}</span>.
                  <br />
                  Segui le istruzioni nell'email per reimpostare la tua password.
                </p>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full mt-2"
                  onClick={() => navigate('/login')}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Torna al login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="mario.rossi@email.it"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button type="submit" size="lg" className="w-full mt-2">
                  <Mail className="h-4 w-4" />
                  Invia link di recupero
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline font-medium"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Torna al login
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
