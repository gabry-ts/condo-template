import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'info@domea.it',
    desc: 'Rispondiamo entro 24 ore lavorative',
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: '+39 02 1234 5678',
    desc: 'Lun - Ven, 9:00 - 18:00',
  },
  {
    icon: MapPin,
    label: 'Sede',
    value: 'Via Monte Napoleone 8, Milano',
    desc: '20121 Milano (MI), Italia',
  },
]

const requestTypes = [
  { value: 'demo', label: 'Richiedi Demo' },
  { value: 'supporto', label: 'Supporto' },
  { value: 'altro', label: 'Altro' },
]

export default function Contact() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefono: '',
    tipo: 'demo',
    messaggio: '',
  })

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="primary" className="mb-4">Contatti</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contattaci</h1>
          <p className="text-lg text-gray-500">
            Hai domande o vuoi richiedere una demo? Compila il modulo e ti risponderemo al più presto.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <Card variant="elevated" className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-primary-500 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Inviaci un messaggio</h2>
                    <p className="text-sm text-gray-500">Compila tutti i campi obbligatori</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Nome e Cognome"
                      placeholder="Mario Rossi"
                      required
                      value={form.nome}
                      onChange={handleChange('nome')}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="mario@email.com"
                      required
                      value={form.email}
                      onChange={handleChange('email')}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Telefono"
                      type="tel"
                      placeholder="+39 333 123 4567"
                      value={form.telefono}
                      onChange={handleChange('telefono')}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Tipo di richiesta <span className="text-destructive-500 ml-0.5">*</span>
                      </label>
                      <select
                        value={form.tipo}
                        onChange={handleChange('tipo')}
                        className="h-10 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 focus:border-primary-400 transition-shadow duration-150"
                      >
                        {requestTypes.map((t) => (
                          <option key={t.value} value={t.value}>
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Messaggio <span className="text-destructive-500 ml-0.5">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Descrivi la tua richiesta..."
                      required
                      value={form.messaggio}
                      onChange={handleChange('messaggio')}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 focus:border-primary-400 transition-shadow duration-150 resize-none"
                    />
                  </div>
                  <Button variant="primary" size="lg" className="w-full gap-2" type="submit">
                    <Send className="h-4 w-4" />
                    Invia messaggio
                  </Button>
                </form>
              </Card>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              {contactInfo.map((info) => (
                <Card key={info.label} hover className="p-6">
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                        <p className="text-base font-semibold text-gray-900">{info.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{info.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card variant="muted" className="p-6">
                <CardContent>
                  <h3 className="font-semibold text-gray-900 mb-2">Orari di supporto</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Lunedì - Venerdì</span>
                      <span className="font-medium">9:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabato</span>
                      <span className="font-medium">9:00 - 13:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domenica</span>
                      <span className="font-medium text-gray-400">Chiuso</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
