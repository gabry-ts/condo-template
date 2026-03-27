import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Building2, Calculator, MessageSquare,
  Wrench, CheckCircle, X as XIcon,
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className, delay }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className || ''}`}>
      {children}
    </div>
  )
}

const trustNames = [
  'Studio Marchetti', 'Gestioni Landi', 'Ferraro Associati',
  'Immobiliare Conti', 'Studio Bianchi', 'Admin Pro Milano',
]

const painPoints = [
  'Fogli Excel sparsi e difficili da aggiornare',
  'Email perse e comunicazioni frammentate',
  'Documenti cartacei senza backup digitale',
  'Nessuna trasparenza verso i condomini',
]

const solutions = [
  'Un\'unica piattaforma per tutti i dati',
  'Comunicazioni centralizzate e tracciabili',
  'Archivio digitale sicuro e sempre accessibile',
  'Portale dedicato per ogni condomino',
]

const features = [
  {
    icon: Building2,
    title: 'Gestione Immobili e Condomini',
    desc: 'Anagrafica completa, unita immobiliari, tabelle millesimali e documenti sempre aggiornati in un unico archivio digitale.',
    color: 'bg-primary-500',
    mockItems: ['Via Roma 12', 'Via Mazzini 8', 'Corso Italia 44'],
  },
  {
    icon: Calculator,
    title: 'Contabilita e Finanze',
    desc: 'Bilanci automatici, ripartizione spese, gestione rate e analisi estratti conto bancari con riconciliazione intelligente.',
    color: 'bg-accent-400',
    mockItems: ['Bilancio 2026', 'Rate Q1', 'Estratto conto'],
  },
  {
    icon: MessageSquare,
    title: 'Assemblee e Comunicazioni',
    desc: 'Convocazioni digitali, quorum in tempo reale, delibere e verbali. Comunicazioni massive con notifiche push.',
    color: 'bg-info-500',
    mockItems: ['Assemblea 15/03', 'Delibera #42', 'Verbale Q4'],
  },
  {
    icon: Wrench,
    title: 'Ticketing e Manutenzioni',
    desc: 'Segnalazioni con workflow automatizzati, assegnazione fornitori, tracking costi e stato avanzamento lavori.',
    color: 'bg-success-500',
    mockItems: ['Ticket #128', 'Manutenzione ascensore', 'Riparazione tetto'],
  },
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '29',
    desc: 'Per studi che iniziano la digitalizzazione',
    features: [
      { label: 'Fino a 10 condomini', included: true },
      { label: 'Gestione immobili', included: true },
      { label: 'Contabilita base', included: true },
      { label: 'Ticketing', included: true },
      { label: 'Portale condomino', included: true },
      { label: 'Assemblee digitali', included: false },
      { label: 'Analisi estratti conto', included: false },
      { label: 'Supporto prioritario', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '79',
    desc: 'Per studi strutturati che vogliono il massimo',
    features: [
      { label: 'Condomini illimitati', included: true },
      { label: 'Gestione immobili', included: true },
      { label: 'Contabilita avanzata', included: true },
      { label: 'Ticketing avanzato', included: true },
      { label: 'Portale condomino', included: true },
      { label: 'Assemblee digitali', included: true },
      { label: 'Analisi estratti conto', included: true },
      { label: 'Supporto prioritario', included: true },
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ====== HERO ====== */}
      <section className="relative pt-32 pb-28 md:pt-44 md:pb-36 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-reveal-up">
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-gray-900 leading-[0.95] tracking-tight mb-6">
                La gestione del tuo condominio,{' '}
                <span className="text-primary-400">finalmente digitale.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-lg mb-10">
                Domea unifica immobili, contabilita, assemblee e manutenzioni
                in un unico ecosistema semplice e trasparente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/registrazione">
                  <Button variant="accent" size="xl" className="gap-2.5 shadow-xl shadow-accent-400/30 text-base px-8">
                    Inizia Gratis
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contattaci">
                  <Button variant="outline" size="xl" className="text-base px-8">
                    Richiedi una Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center animate-reveal-up" style={{ animationDelay: '200ms' }}>
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-200 via-primary-100 to-accent-100 opacity-60 blur-2xl" />
                <div className="absolute top-8 left-8 w-48 h-48 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-500 opacity-80 rotate-6" />
                <div className="absolute bottom-8 right-4 w-40 h-40 rounded-3xl bg-gradient-to-br from-accent-300 to-accent-400 opacity-70 -rotate-12" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-white shadow-2xl flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-primary-500">DM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TRUST BAR ====== */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-display text-sm font-medium text-gray-400 text-center mb-8 tracking-wide">
              Scelto da oltre 200 amministratori in tutta Italia
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {trustNames.map((name) => (
                <span key={name} className="text-gray-300 font-display font-semibold text-lg whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== PROBLEM / SOLUTION ====== */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-8">Il problema</h2>
                <ul className="space-y-5">
                  {painPoints.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <XIcon className="h-5 w-5 text-destructive-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-8">La soluzione</h2>
                <ul className="space-y-5">
                  {solutions.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====== FEATURES ZIGZAG ====== */}
      <section className="py-28 md:py-36 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 text-center mb-20 tracking-tight">
              Tutto quello che ti serve
            </h2>
          </Reveal>

          <div className="space-y-24">
            {features.map((f, i) => {
              const isReversed = i % 2 !== 0
              return (
                <Reveal key={f.title}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}>
                    <div className={isReversed ? 'lg:order-2' : ''}>
                      <div className={`inline-flex h-12 w-12 rounded-xl ${f.color} items-center justify-center mb-5`}>
                        <f.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4">{f.title}</h3>
                      <p className="text-gray-500 leading-relaxed max-w-md">{f.desc}</p>
                    </div>
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-3 w-3 rounded-full bg-gray-200" />
                          <div className="h-3 w-3 rounded-full bg-gray-200" />
                          <div className="h-3 w-3 rounded-full bg-gray-200" />
                          <div className="ml-2 h-5 flex-1 bg-gray-100 rounded" />
                        </div>
                        <div className="space-y-3">
                          {f.mockItems.map((item) => (
                            <div key={item} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                              <div className={`h-2 w-2 rounded-full ${f.color}`} />
                              <span className="text-sm font-medium text-gray-700">{item}</span>
                              <div className="ml-auto h-2 bg-gray-200 rounded-full w-16" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS — Horizontal Timeline ====== */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 text-center mb-20 tracking-tight">
              Tre passi per iniziare
            </h2>
          </Reveal>
          <Reveal>
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
                {[
                  { num: '1', title: 'Registrati', desc: 'Crea il tuo account in 30 secondi. Nessuna carta di credito richiesta.' },
                  { num: '2', title: 'Configura', desc: 'Aggiungi immobili, importa condomini e personalizza le impostazioni.' },
                  { num: '3', title: 'Gestisci', desc: 'Finanze, assemblee, manutenzioni e comunicazioni in un\'unica piattaforma.' },
                ].map((step) => (
                  <div key={step.num}>
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 border-primary-400 bg-white text-primary-500 font-display text-2xl font-bold mb-5 relative z-10">
                      {step.num}
                    </div>
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== PRICING ====== */}
      <section className="py-28 md:py-36 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 text-center mb-4 tracking-tight">
              Piani e prezzi
            </h2>
            <p className="text-gray-500 text-center mb-16 text-lg">
              Scegli il piano adatto al tuo studio. Cambia quando vuoi.
            </p>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden border border-gray-200">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className="bg-white p-8 md:p-10">
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-display text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-400">/mese</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-center gap-3">
                        {f.included ? (
                          <CheckCircle className="h-4 w-4 text-primary-400 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border border-gray-200 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/registrazione">
                    <Button
                      variant={plan.name === 'Pro' ? 'accent' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      Inizia con {plan.name}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="py-28 md:py-36 bg-primary-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Pronto a semplificare la gestione condominiale?
            </h2>
            <p className="text-primary-200 text-lg mb-10 max-w-lg mx-auto">
              Inizia gratis oggi. Nessuna carta di credito, nessun vincolo.
            </p>
            <Link to="/registrazione">
              <Button variant="accent" size="xl" className="gap-2.5 shadow-xl shadow-accent-400/30 text-base px-10">
                Inizia Gratis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
