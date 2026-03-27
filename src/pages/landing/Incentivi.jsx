import { Link } from 'react-router-dom'
import {
  Sun,
  Leaf,
  Building,
  ShieldCheck,
  ArrowRight,
  BadgePercent,
  TrendingUp,
  FileCheck,
  AlertCircle,
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import { Card, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'

const incentivi = [
  {
    icon: Sun,
    title: 'Superbonus',
    detrazione: '70%',
    scadenza: '31 Dicembre 2025',
    desc: 'Il Superbonus consente una detrazione del 70% per interventi di efficientamento energetico e riduzione del rischio sismico sugli edifici condominiali. Si applica a cappotto termico, sostituzione impianti di climatizzazione e interventi antisismici.',
    requisiti: [
      'Miglioramento di almeno 2 classi energetiche',
      'Interventi su parti comuni condominiali',
      'Asseverazione tecnica e visto di conformità',
      'Comunicazione ENEA entro 90 giorni',
    ],
    status: 'active',
  },
  {
    icon: Leaf,
    title: 'Ecobonus',
    detrazione: '50% - 65%',
    scadenza: '31 Dicembre 2026',
    desc: 'L\'Ecobonus prevede detrazioni dal 50% al 65% per interventi di riqualificazione energetica. Include sostituzione infissi, schermature solari, caldaie a condensazione, pompe di calore e isolamento termico delle parti comuni.',
    requisiti: [
      'Rispetto dei valori di trasmittanza previsti',
      'Installazione da parte di tecnici qualificati',
      'Pagamento con bonifico parlante',
      'Comunicazione ENEA obbligatoria',
    ],
    status: 'active',
  },
  {
    icon: Building,
    title: 'Bonus Facciate',
    detrazione: '60%',
    scadenza: '31 Dicembre 2025',
    desc: 'Il Bonus Facciate permette una detrazione del 60% per interventi di recupero e restauro della facciata esterna degli edifici. Include pulitura, tinteggiatura, e interventi su balconi, ornamenti e fregi in zona A e B.',
    requisiti: [
      'Edificio in zona A o B del comune',
      'Interventi sulla facciata esterna visibile',
      'Nessun limite massimo di spesa',
      'Pagamento con bonifico parlante',
    ],
    status: 'expiring',
  },
  {
    icon: ShieldCheck,
    title: 'Sismabonus',
    detrazione: '50% - 85%',
    scadenza: '31 Dicembre 2026',
    desc: 'Il Sismabonus offre detrazioni dal 50% all\'85% per interventi di adeguamento antisismico. La detrazione varia in base al miglioramento della classe di rischio sismico ottenuto, con un massimale di 96.000 euro per unità immobiliare.',
    requisiti: [
      'Edificio in zona sismica 1, 2 o 3',
      'Progetto strutturale e asseverazione',
      'Classificazione rischio sismico pre/post',
      'Collaudo statico degli interventi',
    ],
    status: 'active',
  },
]

const highlights = [
  { icon: BadgePercent, label: 'Detrazioni fino all\'85%', desc: 'Massime agevolazioni per il condominio' },
  { icon: TrendingUp, label: 'Valorizzazione immobili', desc: 'Aumento del valore degli appartamenti' },
  { icon: FileCheck, label: 'Gestione documentale', desc: 'Domea automatizza tutta la pratica' },
]

export default function Incentivi() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-primary-500/95 via-primary-500/85 to-primary-400/70 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-4">Agevolazioni 2025-2026</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Incentivi Fiscali per il Condominio
            </h1>
            <p className="text-lg text-primary-100 leading-relaxed mb-8">
              Scopri tutti gli incentivi fiscali disponibili per il tuo condominio. Domea ti aiuta a gestire
              la documentazione e monitorare lo stato delle pratiche in corso.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div key={h.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent-400/20 flex items-center justify-center flex-shrink-0">
                    <h.icon className="h-5 w-5 text-accent-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{h.label}</p>
                    <p className="text-xs text-primary-200">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Incentivi Disponibili</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Panoramica degli incentivi fiscali attualmente in vigore per gli interventi sulle parti comuni condominiali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {incentivi.map((item) => (
              <Card key={item.title} variant="elevated" className="p-8 flex flex-col">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-400">Scadenza: {item.scadenza}</p>
                    </div>
                  </div>
                  {item.status === 'active' ? (
                    <Badge variant="success">Attivo</Badge>
                  ) : (
                    <Badge variant="warning">In scadenza</Badge>
                  )}
                </div>

                <div className="bg-primary-50 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
                  <BadgePercent className="h-5 w-5 text-primary-500" />
                  <span className="text-lg font-bold text-primary-500">Detrazione: {item.detrazione}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">{item.desc}</p>

                <div>
                  <p className="text-sm font-medium text-gray-900 mb-3">Requisiti principali:</p>
                  <ul className="space-y-2">
                    {item.requisiti.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="h-5 w-5 rounded-full bg-success-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FileCheck className="h-3 w-3 text-success-600" />
                        </div>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10">
            <div className="h-14 w-14 rounded-2xl bg-accent-400/10 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="h-7 w-7 text-accent-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Hai bisogno di assistenza sugli incentivi?
            </h3>
            <p className="text-gray-500 mb-6 max-w-lg mx-auto">
              Il nostro team può aiutarti a identificare gli incentivi più adatti al tuo condominio e a gestire tutta la documentazione necessaria.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contattaci">
                <Button variant="primary" size="lg" className="gap-2">
                  Richiedi consulenza
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/faq">
                <Button variant="outline" size="lg">
                  Leggi le FAQ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
