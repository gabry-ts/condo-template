import { Link } from 'react-router-dom'
import {
  Check, X, Crown, ArrowRight, Shield, Wallet,
  Users, MessageSquare, BarChart3, Mail, Palette, Send,
  Wrench, Calendar, AlertTriangle, FolderOpen, Zap,
} from 'lucide-react'

import { Card, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { plans } from '../../data/plans'

const proFeatures = [
  { icon: Wallet, title: 'Finanza Completa', desc: 'Bilanci, rate, estratti conto, ripartizione spese e analisi dei movimenti bancari.' },
  { icon: AlertTriangle, title: 'Gestione Morosita', desc: 'Tracking morosi, solleciti automatici, storico notifiche e azioni legali.' },
  { icon: Calendar, title: 'Assemblee Digitali', desc: 'Convocazioni, quorum in tempo reale, delibere, verbali e invio documentazione.' },
  { icon: MessageSquare, title: 'Ticketing Avanzato', desc: 'Gestione ticket con priorita, assegnazione staff, storico e notifiche.' },
  { icon: Send, title: 'Comunicazioni', desc: 'Email massive, template personalizzati, allegati e conferme di lettura.' },
  { icon: Palette, title: 'Branding & Template', desc: 'Logo personalizzato, template HTML email, colori custom e firma automatica.' },
  { icon: Mail, title: 'SMTP Personalizzato', desc: 'Invia email dal tuo dominio con server SMTP dedicato.' },
  { icon: BarChart3, title: 'Report Avanzati', desc: 'Agenda prioritizzata, report settimanali e analytics dettagliati.' },
  { icon: FolderOpen, title: 'Storage Illimitato', desc: 'Documenti illimitati senza limiti di spazio.' },
]

export default function Upgrade() {
  const freePlan = plans.free
  const proPlan = plans.pro

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-accent-50 border border-accent-100 rounded-full px-4 py-1.5 mb-6">
          <Crown className="h-4 w-4 text-accent-400" />
          <span className="text-sm font-semibold text-accent-500">Domea Pro</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Sblocca tutto il potenziale<br />del tuo studio
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto">
          Con il piano Pro hai accesso a tutti gli strumenti per gestire i tuoi condomini in modo professionale e automatizzato.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Freemium</h3>
            <p className="text-sm text-gray-500 mb-4">{freePlan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-800">EUR 0</span>
              <span className="text-sm text-gray-500"> / mese</span>
            </div>
            <ul className="space-y-2.5 mb-6">
              {freePlan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  {f.included ? <Check className="h-4 w-4 text-success-500 flex-shrink-0" /> : <X className="h-4 w-4 text-gray-300 flex-shrink-0" />}
                  <span className={`text-sm ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>{f.name}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full" disabled>Piano Attuale</Button>
          </CardContent>
        </Card>

        <Card variant="elevated" className="ring-2 ring-accent-400 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="accent" className="shadow-lg">Consigliato</Badge>
          </div>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Pro</h3>
            <p className="text-sm text-gray-500 mb-4">{proPlan.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-gray-800">EUR {proPlan.price}</span>
              <span className="text-sm text-gray-500"> / mese</span>
            </div>
            <ul className="space-y-2.5 mb-6">
              {proPlan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 text-success-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{f.name}</span>
                </li>
              ))}
            </ul>
            <Link to="/studio/abbonamento">
              <Button variant="accent" className="w-full gap-2" size="lg">
                <Zap className="h-4 w-4" />
                Passa a Pro
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Detailed features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Cosa ottieni con Pro</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {proFeatures.map((f) => (
            <div key={f.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100">
              <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <f.icon className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-1">{f.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-10">
        <h3 className="text-2xl font-bold text-white mb-3">Pronto a fare il salto?</h3>
        <p className="text-primary-200 mb-6">14 giorni di prova gratuita. Nessun vincolo.</p>
        <Link to="/studio/abbonamento">
          <Button variant="accent" size="xl" className="gap-2 shadow-xl shadow-accent-400/30">
            Inizia la Prova Gratuita
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
