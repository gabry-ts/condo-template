import { useState } from 'react'
import {
  Rocket,
  Building2,
  Wallet,
  Users,
  ChevronDown,
  Mail,
  Phone,
  Search,
} from 'lucide-react'

import PageHeader from '../../components/layout/PageHeader'
import { Card, CardContent } from '../../components/ui/Card'
import SearchBar from '../../components/shared/SearchBar'

const guides = [
  {
    icon: Rocket,
    title: 'Primi Passi',
    description: 'Scopri come configurare il tuo studio e iniziare a gestire i condomini.',
  },
  {
    icon: Building2,
    title: 'Gestire Immobili',
    description: 'Impara ad aggiungere immobili, unita e condomini alla piattaforma.',
  },
  {
    icon: Wallet,
    title: 'Finanza',
    description: 'Gestisci rate, pagamenti, bilanci e la contabilita condominiale.',
  },
  {
    icon: Users,
    title: 'Assemblee',
    description: 'Organizza assemblee, gestisci il quorum e registra le delibere.',
  },
]

const faqs = [
  {
    question: 'Come posso aggiungere un nuovo immobile?',
    answer: 'Vai nella sezione "Immobili" dal menu laterale e clicca su "Nuovo Immobile". Compila i dati richiesti come indirizzo, codice fiscale e numero di unita. Una volta salvato, potrai aggiungere i singoli condomini.',
  },
  {
    question: 'Come funziona il sistema di ticketing?',
    answer: 'I condomini possono aprire ticket dal portale Connect. Tu riceverai una notifica e potrai prendere in carico il ticket, assegnarlo a un membro dello staff o rispondere direttamente. Lo stato del ticket viene aggiornato automaticamente.',
  },
  {
    question: 'Quali sono le differenze tra il piano Freemium e Pro?',
    answer: 'Il piano Freemium consente di gestire fino a 3 immobili con funzionalita base. Il piano Pro sblocca immobili illimitati, finanza completa, gestione morosita, assemblee con quorum e molto altro al costo di EUR 29/mese.',
  },
  {
    question: 'Come posso inviare comunicazioni ai condomini?',
    answer: 'Dalla sezione "Comunicazioni" puoi creare email personalizzate, selezionare i destinatari per immobile o singolarmente, e inviare comunicazioni ufficiali. Puoi anche allegare documenti e impostare promemoria automatici.',
  },
  {
    question: 'Quali sono le funzionalita avanzate del piano Pro?',
    answer: 'Il piano Pro permette di importare estratti conto bancari, generare bilanci, gestire la morosita con solleciti automatici, organizzare assemblee con quorum in tempo reale e molto altro. Tutto in modo semplice e veloce.',
  },
  {
    question: 'Posso esportare i dati del mio studio?',
    answer: 'Si, puoi esportare i dati in formato Excel o PDF da qualsiasi sezione tramite il pulsante "Esporta". I report includono tutti i dati filtrati e possono essere personalizzati prima del download.',
  },
]

export default function Help() {
  const [search, setSearch] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  )

  const filteredGuides = guides.filter(
    (guide) =>
      guide.title.toLowerCase().includes(search.toLowerCase()) ||
      guide.description.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <PageHeader
        title="Aiuto"
        description="Guide, FAQ e supporto per utilizzare al meglio la piattaforma"
      />

      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Cerca nelle guide e FAQ..."
          className="w-full"
        />
      </div>

      {/* Guide Rapide */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Guide Rapide</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredGuides.map((guide, i) => {
            const Icon = guide.icon
            return (
              <Card key={i} hover>
                <CardContent>
                  <div className="h-10 w-10 rounded-2xl bg-primary-100 flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5 text-primary-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">{guide.title}</h3>
                  <p className="text-xs text-gray-500">{guide.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Domande Frequenti</h2>
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => (
            <Card key={i}>
              <button
                className="w-full text-left px-6 py-4 flex items-center justify-between"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="text-sm font-medium text-gray-800 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openFaq === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">
              Nessun risultato trovato per "{search}"
            </p>
          )}
        </div>
      </section>

      {/* Contattaci */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contattaci</h2>
        <Card>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Non hai trovato quello che cercavi? Il nostro team di supporto e a tua disposizione.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href="mailto:supporto@domea.it"
                    className="text-sm font-medium text-primary-400 hover:text-primary-500 transition-colors"
                  >
                    supporto@domea.it
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Telefono</p>
                  <a
                    href="tel:+390212345678"
                    className="text-sm font-medium text-primary-400 hover:text-primary-500 transition-colors"
                  >
                    +39 02 1234 5678
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
