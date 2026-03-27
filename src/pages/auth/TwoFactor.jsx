import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, RefreshCw } from 'lucide-react'
import Button from '../../components/ui/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

export default function TwoFactor() {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(299)
  const inputRefs = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const next = [...digits]
    next[index] = value
    setDigits(next)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/studio/dashboard')
  }

  const handleResend = () => {
    setTimer(299)
    setDigits(['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
            <Badge variant="primary" className="mb-2 text-lg font-bold px-4 py-2">DM</Badge>
            <CardTitle className="text-2xl">Verifica in due passaggi</CardTitle>
            <CardDescription>
              Inserisci il codice a 6 cifre inviato al tuo dispositivo
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
              <div className="flex gap-3">
                {digits.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value.replace(/\D/, ''))}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-xl font-semibold rounded-xl border border-gray-200 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-shadow"
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4" />
                <span>Codice valido per {formatTime(timer)}</span>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Verifica
              </Button>

              <button
                type="button"
                onClick={handleResend}
                className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline font-medium"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Invia nuovo codice
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
