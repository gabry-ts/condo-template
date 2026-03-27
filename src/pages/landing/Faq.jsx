import { useState } from 'react'
import { ChevronDown, HelpCircle, Search } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Badge from '../../components/ui/Badge'
import { cn } from '../../lib/cn'

const faqs = [
  {
    q: 'Come funziona la migrazione dei dati dal mio gestionale attuale?',
    a: 'Domea supporta l\'importazione dati dai principali gestionali condominiali in formato CSV, Excel e XML. Il nostro team di onboarding ti assiste gratuitamente durante tutta la fase di migrazione, garantendo la correttezza dei dati trasferiti. Il processo richiede mediamente 3-5 giorni lavorativi.',
  },
  {
    q: 'I condòmini devono installare un\'applicazione?',
    a: 'No, Domea Connect è una web-app progressiva (PWA) accessibile da qualsiasi browser, sia da desktop che da smartphone. I condòmini possono comunque aggiungerla alla schermata home del telefono per un\'esperienza simile a un\'app nativa, senza passare dagli store.',
  },
  {
    q: 'Come viene gestita la sicurezza dei dati sensibili?',
    a: 'Tutti i dati sono crittografati sia in transito (TLS 1.3) che a riposo (AES-256). I server si trovano in data center europei certificati ISO 27001. Eseguiamo backup automatici giornalieri con retention di 90 giorni e audit di sicurezza trimestrali da parte di enti terzi.',
  },
  {
    q: 'È possibile gestire più condomìni da un unico account?',
    a: 'Assolutamente sì. Lo Studio di Domea è progettato per la gestione multi-condominio. Puoi passare da un condominio all\'altro con un click, oppure visualizzare dashboard aggregate per avere una panoramica completa di tutto il tuo portafoglio.',
  },
  {
    q: 'Come funziona il sistema di ticketing?',
    a: 'I condòmini possono aprire segnalazioni direttamente dalla piattaforma Connect, allegando foto e descrizioni. Le segnalazioni vengono automaticamente categorizzate e assegnate. L\'amministratore può monitorare lo stato di ogni ticket, assegnarlo a fornitori e comunicare aggiornamenti in tempo reale.',
  },
  {
    q: 'Quali sono i metodi di pagamento supportati?',
    a: 'Domea supporta pagamenti tramite bollettino postale, bonifico SEPA, SDD (addebito diretto), e carte di credito/debito. L\'integrazione con i principali gateway di pagamento permette ai condòmini di saldare le rate direttamente dalla piattaforma.',
  },
  {
    q: 'È possibile organizzare assemblee online?',
    a: 'Sì, la piattaforma include un modulo per le assemblee virtuali con sistema di voto elettronico certificato, gestione delle deleghe digitali, calcolo automatico dei quorum e verbalizzazione assistita. Le assemblee possono essere svolte in modalità mista (in presenza + online).',
  },
  {
    q: 'Che tipo di supporto tecnico è incluso?',
    a: 'Tutti i piani includono supporto via email con risposta entro 24 ore lavorative. I piani Professional e Enterprise includono supporto telefonico dedicato, chat in tempo reale e un account manager personale. Offriamo inoltre webinar formativi mensili gratuiti per tutti gli utenti.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="primary" className="mb-4">Supporto</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Domande Frequenti</h1>
          <p className="text-lg text-gray-500">
            Trova risposte alle domande più comuni sulla piattaforma Domea.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-2xl border transition-all duration-200',
                  openIndex === i
                    ? 'border-primary-200 bg-primary-50/50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full text-left p-5 gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
                      openIndex === i ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'
                    )}>
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-gray-900">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 text-gray-400 flex-shrink-0 transition-transform duration-200',
                      openIndex === i && 'rotate-180 text-primary-500'
                    )}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 pl-16">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Non hai trovato la risposta?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Contattaci direttamente, saremo felici di aiutarti.
            </p>
            <a href="/contattaci">
              <button className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors">
                Contattaci
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
