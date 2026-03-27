import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard, FolderOpen, Calculator, MessageSquare,
  Sparkles, Shield, Wrench, ArrowRight, Building2,
  Users, Home as HomeIcon, CheckCircle, Zap, Globe,
  ChevronRight, UserPlus, BarChart3, Bell,
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'

// Intersection Observer hook for scroll animations
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

const features = [
  { icon: LayoutDashboard, title: 'Dashboard Intelligente', desc: 'KPI in tempo reale, grafici interattivi e agenda prioritizzata.', color: 'bg-primary-500' },
  { icon: Calculator, title: 'Contabilita Automatica', desc: 'Bilanci, rate, ripartizione spese e analisi estratti conto.', color: 'bg-accent-400' },
  { icon: FolderOpen, title: 'Archivio Digitale', desc: 'Documenti categorizzati e sempre accessibili da qualsiasi dispositivo.', color: 'bg-info-500' },
  { icon: MessageSquare, title: 'Ticketing Integrato', desc: 'Segnalazioni gestite con workflow automatizzati e notifiche.', color: 'bg-success-500' },
  { icon: Sparkles, title: 'Automazioni Intelligenti', desc: 'Categorizzazione documenti, analisi bilanci e report automatici.', color: 'bg-warning-500' },
  { icon: Users, title: 'Assemblee Digitali', desc: 'Convocazioni, quorum in tempo reale, delibere e verbali.', color: 'bg-primary-400' },
  { icon: Wrench, title: 'Manutenzioni', desc: 'Pianificazione, assegnazione fornitori e tracking costi.', color: 'bg-accent-500' },
  { icon: Shield, title: 'Sicurezza Totale', desc: 'Crittografia, 2FA, GDPR compliant, backup giornalieri.', color: 'bg-gray-700' },
]

const steps = [
  { num: '01', icon: UserPlus, title: 'Registrati', desc: 'Crea il tuo account in 30 secondi. Nessuna carta di credito richiesta.' },
  { num: '02', icon: Building2, title: 'Configura', desc: 'Aggiungi i tuoi immobili, importa i condomini e personalizza le impostazioni.' },
  { num: '03', icon: BarChart3, title: 'Gestisci', desc: 'Finanze, assemblee, manutenzioni e comunicazioni in un\'unica piattaforma.' },
]

const studioFeatures = [
  'Dashboard avanzata con analytics e KPI',
  'Contabilita, bilanci e rate automatiche',
  'Analisi documenti e estratti conto',
  'Fornitori, contratti e manutenzioni',
  'Assemblee con quorum in tempo reale',
  'Comunicazioni e notifiche massive',
]

const connectFeatures = [
  'Visualizzazione rate e stato pagamenti',
  'Segnalazioni con tracking in tempo reale',
  'Documenti del condominio scaricabili',
  'Assemblee, delibere e verbali',
  'Notifiche push istantanee',
  'Profilo e dati personali GDPR',
]

const testimonials = [
  { name: 'Studio Marchetti & Associati', city: 'Milano', text: 'Da quando usiamo Domea abbiamo dimezzato il tempo di gestione amministrativa. I condomini sono finalmente soddisfatti della trasparenza.', buildings: 15 },
  { name: 'Gestioni Immobiliari Landi', city: 'Roma', text: 'L\'importazione estratti conto ci ha cambiato la vita. Quello che prima richiedeva ore ora si fa in pochi minuti.', buildings: 8 },
  { name: 'Studio Ferraro Amministrazioni', city: 'Napoli', text: 'Il portale Connect ha rivoluzionato il rapporto con i condomini. Meno telefonate, piu efficienza, tutti contenti.', buildings: 22 },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-display">
      <Navbar />

      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden bg-primary-500 pt-32 pb-28 md:pt-44 md:pb-40">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-accent-400/8 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-300/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/[0.04]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[0.06]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/[0.12] rounded-full px-5 py-2 mb-10 animate-reveal-up">
            <Zap className="h-4 w-4 text-accent-300" />
            <span className="text-sm font-medium text-white/80">La piattaforma condominiale di nuova generazione</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-extrabold text-white leading-[0.92] tracking-tight mb-8 animate-reveal-up" style={{ animationDelay: '100ms' }}>
            Gestione condominiale
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-accent-300 to-accent-400 bg-clip-text text-transparent">semplice e trasparente</span>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-primary-200 leading-relaxed max-w-2xl mx-auto mb-12 animate-reveal-up" style={{ animationDelay: '200ms' }}>
            Un ecosistema digitale completo per amministratori e condomini.
            Automatizzato, trasparente e partecipativo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-reveal-up" style={{ animationDelay: '300ms' }}>
            <Link to="/registrazione">
              <Button variant="accent" size="xl" className="gap-2.5 shadow-xl shadow-accent-400/30 text-base px-8">
                Inizia Gratis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contattaci">
              <Button variant="ghost" size="xl" className="gap-2 text-white/70 hover:text-white hover:bg-white/10 text-base">
                <Globe className="h-5 w-5" />
                Richiedi una Demo
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto animate-reveal-up" style={{ animationDelay: '400ms' }}>
            {[
              { value: '20+', label: 'Moduli' },
              { value: '100%', label: 'Digitale' },
              { value: '3 click', label: 'Max per azione' },
            ].map((n) => (
              <div key={n.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{n.value}</p>
                <p className="text-xs sm:text-sm text-primary-300 mt-0.5">{n.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto">
            <path d="M0 80V40c240-40 480-40 720 0s480 40 720 0v40H0z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ====== COME FUNZIONA — 3 Step ====== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-sm font-semibold text-accent-400 uppercase tracking-widest mb-3">Come funziona</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Operativo in 3 passi
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i + 1}>
                <div className="text-center group">
                  <div className="relative inline-flex mb-6">
                    <div className="h-20 w-20 rounded-3xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors duration-300">
                      <s.icon className="h-9 w-9 text-primary-400" />
                    </div>
                    <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-accent-400 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-accent-400/30">
                      {s.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent-400 uppercase tracking-widest mb-3">Funzionalita</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Tutto. In un unico posto.
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                20 moduli integrati per ogni aspetto della gestione condominiale.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={Math.min(i + 1, 7)}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group h-full">
                  <div className={`h-12 w-12 rounded-2xl ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PLATFORM — Studio vs Connect (zigzag) ====== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <p className="text-sm font-semibold text-accent-400 uppercase tracking-widest mb-3">Piattaforma</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Due anime. Un sistema.
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                Interfacce dedicate per chi amministra e per chi abita.
              </p>
            </div>
          </Reveal>

          {/* Studio — text left, visual right */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary-500 flex items-center justify-center">
                    <Building2 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">Studio</h3>
                    <p className="text-sm text-gray-500">Per l'amministratore</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Un hub centralizzato per gestire ogni aspetto dei tuoi condomini.
                  Dalla contabilita alle assemblee, tutto in un click.
                </p>
                <ul className="space-y-3 mb-8">
                  {studioFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/studio/dashboard">
                  <Button variant="primary" size="lg" className="gap-2">
                    Esplora Studio
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-primary-500/20">
                  <div className="space-y-3">
                    {['Dashboard', 'Immobili', 'Finanze', 'Assemblee', 'Ticket'].map((item, i) => (
                      <div key={item} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="h-2 w-2 rounded-full bg-accent-300" />
                        <span className="text-sm font-medium text-white/90">{item}</span>
                        <div className="ml-auto h-2 bg-white/20 rounded-full flex-1 max-w-[100px]">
                          <div className="h-full bg-accent-400 rounded-full" style={{ width: `${85 - i * 12}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Connect — visual left, text right */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="bg-gradient-to-br from-accent-400 to-accent-500 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-accent-400/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Nuova rata disponibile</p>
                      <p className="text-xs text-white/60">Q1 2026 — EUR 850,00</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['Rate e pagamenti', 'Segnalazioni', 'Documenti', 'Profilo'].map((item) => (
                      <div key={item} className="bg-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/85 backdrop-blur-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-14 w-14 rounded-2xl bg-accent-400 flex items-center justify-center">
                    <HomeIcon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900">Connect</h3>
                    <p className="text-sm text-gray-500">Per il condomino</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Un portale trasparente dove ogni condomino puo controllare rate, documenti,
                  segnalare problemi e partecipare alle assemblee.
                </p>
                <ul className="space-y-3 mb-8">
                  {connectFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/connect/home">
                  <Button variant="accent" size="lg" className="gap-2">
                    Esplora Connect
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====== SOCIAL PROOF ====== */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-accent-400 uppercase tracking-widest mb-3">Testimonianze</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                Chi ci ha scelto
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i + 1}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="h-4 w-4 text-warning-500 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">"{t.text}"</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.city}</p>
                    </div>
                    <Badge variant="primary">{t.buildings} immobili</Badge>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA FINALE ====== */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-[2rem] p-10 md:p-20 text-center overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-400/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-300/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl" />

              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
                  Pronto a rivoluzionare<br className="hidden sm:block" /> la tua gestione?
                </h2>
                <p className="text-lg text-primary-200 mb-10 max-w-lg mx-auto">
                  Inizia gratis, senza carta di credito. Passa a Pro quando vuoi.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/registrazione">
                    <Button variant="accent" size="xl" className="gap-2.5 shadow-xl shadow-accent-400/30 text-base px-8">
                      Inizia Gratis Ora
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/contattaci">
                    <Button variant="ghost" size="lg" className="text-white/70 hover:text-white hover:bg-white/10 gap-2">
                      Parla con noi
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  )
}
