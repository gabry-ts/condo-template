import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function Cookies() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-8">Cookie Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Ultimo aggiornamento: 1 Marzo 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">1. Cosa sono i Cookie</h2>
            <p>I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente quando visita un sito web. Sono ampiamente utilizzati per far funzionare i siti web, migliorarne l'efficienza e fornire informazioni ai proprietari del sito.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">2. Cookie Utilizzati</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-2">Cookie Tecnici (Necessari)</h3>
            <p>Questi cookie sono essenziali per il funzionamento del Servizio e non possono essere disattivati.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left font-medium text-gray-700">Cookie</th><th className="px-4 py-2 text-left font-medium text-gray-700">Finalita</th><th className="px-4 py-2 text-left font-medium text-gray-700">Durata</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-2 font-mono text-xs">session_id</td><td className="px-4 py-2">Gestione della sessione utente</td><td className="px-4 py-2">Sessione</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">csrf_token</td><td className="px-4 py-2">Protezione CSRF</td><td className="px-4 py-2">Sessione</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">auth_token</td><td className="px-4 py-2">Autenticazione JWT</td><td className="px-4 py-2">7 giorni</td></tr>
                  <tr><td className="px-4 py-2 font-mono text-xs">cookie_consent</td><td className="px-4 py-2">Memorizzazione preferenze cookie</td><td className="px-4 py-2">1 anno</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-2">Cookie Analitici</h3>
            <p>Questi cookie ci permettono di contare le visite e le fonti di traffico per misurare e migliorare le prestazioni del Servizio. Tutti i dati sono aggregati e anonimi.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50"><tr><th className="px-4 py-2 text-left font-medium text-gray-700">Cookie</th><th className="px-4 py-2 text-left font-medium text-gray-700">Finalita</th><th className="px-4 py-2 text-left font-medium text-gray-700">Durata</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-2 font-mono text-xs">_analytics</td><td className="px-4 py-2">Analisi anonima del traffico</td><td className="px-4 py-2">1 anno</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">3. Gestione dei Cookie</h2>
            <p>E possibile gestire le preferenze sui cookie in qualsiasi momento attraverso le impostazioni del proprio browser. La disattivazione dei cookie tecnici potrebbe compromettere il funzionamento del Servizio.</p>
            <p className="mt-3">Istruzioni per i principali browser:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
              <li><strong>Firefox:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
              <li><strong>Safari:</strong> Preferenze → Privacy → Gestisci dati siti web</li>
              <li><strong>Edge:</strong> Impostazioni → Cookie e autorizzazioni sito</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">4. Cookie di Terze Parti</h2>
            <p>Il Servizio utilizza Stripe per la gestione dei pagamenti. Stripe puo impostare i propri cookie secondo la propria informativa sulla privacy disponibile su stripe.com/privacy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">5. Aggiornamenti</h2>
            <p>La presente Cookie Policy puo essere aggiornata periodicamente. Le modifiche saranno pubblicate su questa pagina con la data di ultimo aggiornamento.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">6. Contatti</h2>
            <p>Per domande sulla presente Cookie Policy: <strong>privacy@domea.it</strong></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
