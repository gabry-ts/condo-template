import { Link } from 'react-router-dom'
import { Calendar, Clock, Users, Play, ArrowRight, Video } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const upcoming = [
  {
    date: '15 Aprile 2026',
    time: '15:00 - 16:30',
    title: 'Introduzione a Domea Studio',
    desc: 'Scopri come configurare il tuo account, importare i dati del condominio e iniziare a utilizzare la dashboard di gestione.',
    seats: 45,
    tag: 'Base',
  },
  {
    date: '22 Aprile 2026',
    time: '10:00 - 11:30',
    title: 'Contabilità Condominiale Digitale',
    desc: 'Approfondimento sulla gestione finanziaria: bilanci, riparti, gestione delle rate e integrazione con i sistemi di pagamento.',
    seats: 30,
    tag: 'Avanzato',
  },
  {
    date: '6 Maggio 2026',
    time: '14:00 - 15:00',
    title: 'Assemblee Online e Voto Elettronico',
    desc: 'Come organizzare assemblee virtuali con sistema di voto certificato, gestione deleghe e verbalizzazione automatica.',
    seats: 60,
    tag: 'Intermedio',
  },
  {
    date: '20 Maggio 2026',
    time: '11:00 - 12:30',
    title: 'Superbonus e Incentivi Fiscali',
    desc: 'Guida pratica alla gestione documentale e contabile degli incentivi fiscali per il condominio tramite Domea.',
    seats: 50,
    tag: 'Speciale',
  },
]

const past = [
  {
    date: '10 Marzo 2026',
    title: 'Gestione Ticket e Manutenzioni',
    desc: 'Come utilizzare il sistema di ticketing per segnalazioni, gestire i fornitori e tracciare gli interventi di manutenzione.',
    attendees: 78,
  },
  {
    date: '25 Febbraio 2026',
    title: 'Sicurezza dei Dati nel Condominio',
    desc: 'Best practice per la protezione dei dati sensibili, conformità GDPR e gestione degli accessi nella piattaforma.',
    attendees: 62,
  },
  {
    date: '12 Febbraio 2026',
    title: 'Comunicazione Efficace con i Condòmini',
    desc: 'Strategie e strumenti per migliorare la comunicazione: notifiche, bacheca digitale e gestione delle comunicazioni massive.',
    attendees: 91,
  },
  {
    date: '28 Gennaio 2026',
    title: 'Onboarding Rapido: da Zero a Operativi',
    desc: 'Sessione dedicata ai nuovi amministratori: migrazione dati, configurazione iniziale e prime operazioni sulla piattaforma.',
    attendees: 55,
  },
]

export default function Webinar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="accent" className="mb-4">Formazione</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Webinar Formativi</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Partecipa ai nostri webinar gratuiti per scoprire tutte le funzionalità di Domea e migliorare la gestione del tuo condominio.
          </p>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-accent-400 flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Prossimi Webinar</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcoming.map((w) => (
              <Card key={w.title} hover variant="elevated" className="flex flex-col">
                <CardContent className="flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="primary">{w.tag}</Badge>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {w.seats} posti disponibili
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{w.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">{w.desc}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {w.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {w.time}
                    </span>
                  </div>
                  <Button variant="accent" size="md" className="w-full gap-2">
                    Iscriviti
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-gray-200 flex items-center justify-center">
              <Play className="h-5 w-5 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Webinar Passati</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {past.map((w) => (
              <Card key={w.title} variant="default">
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {w.date}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {w.attendees} partecipanti
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{w.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{w.desc}</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Play className="h-3.5 w-3.5" />
                    Guarda la registrazione
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
