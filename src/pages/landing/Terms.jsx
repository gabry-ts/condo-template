import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-8">Termini di Servizio</h1>
        <p className="text-sm text-gray-400 mb-12">Ultimo aggiornamento: 1 Marzo 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">1. Definizioni</h2>
            <p>"Servizio" indica la piattaforma Domea per la gestione condominiale digitale. "Utente" indica qualsiasi persona fisica o giuridica che utilizza il Servizio. "Amministratore" indica l'utente che gestisce uno o piu condomini tramite il Servizio. "Condomino" indica l'utente residente che accede al portale Connect.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">2. Accettazione dei Termini</h2>
            <p>L'utilizzo del Servizio implica l'accettazione integrale dei presenti Termini di Servizio. Se non si accettano i presenti termini, non e consentito utilizzare il Servizio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">3. Descrizione del Servizio</h2>
            <p>Domea fornisce una piattaforma cloud per la gestione condominiale che include:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Gestione anagrafica immobili, unita e condomini.</li>
              <li>Contabilita condominiale, rate e bilanci.</li>
              <li>Gestione assemblee, delibere e verbali.</li>
              <li>Sistema di ticketing e segnalazioni.</li>
              <li>Gestione manutenzioni e fornitori.</li>
              <li>Comunicazioni e notifiche.</li>
              <li>Archivio documentale digitale.</li>
              <li>Portale dedicato ai condomini (Connect).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">4. Registrazione e Account</h2>
            <p>Per utilizzare il Servizio e necessario creare un account fornendo informazioni veritiere e complete. L'utente e responsabile della riservatezza delle proprie credenziali e di tutte le attivita svolte tramite il proprio account. E obbligatorio attivare l'autenticazione a due fattori.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">5. Piani e Pagamenti</h2>
            <p>Il Servizio e disponibile in diversi piani (Starter e Pro) con funzionalita e limiti differenti. I pagamenti sono gestiti tramite Stripe. L'abbonamento si rinnova automaticamente alla scadenza. E possibile annullare l'abbonamento in qualsiasi momento; il servizio restera attivo fino alla fine del periodo gia pagato.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">6. Obblighi dell'Utente</h2>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Utilizzare il Servizio in conformita alle leggi vigenti.</li>
              <li>Non caricare contenuti illeciti, diffamatori o lesivi dei diritti di terzi.</li>
              <li>Mantenere riservate le proprie credenziali di accesso.</li>
              <li>Garantire l'accuratezza dei dati inseriti.</li>
              <li>Rispettare le normative GDPR relative ai dati dei condomini gestiti.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">7. Proprieta Intellettuale</h2>
            <p>Tutti i diritti di proprieta intellettuale relativi al Servizio, inclusi software, design, marchi e contenuti, sono di proprieta esclusiva di Domea S.r.l. L'utente conserva la proprieta dei dati inseriti nel Servizio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">8. Limitazione di Responsabilita</h2>
            <p>Il Servizio e fornito "cosi com'e". Domea non garantisce che il Servizio sia privo di errori o interruzioni. Domea non sara responsabile per danni indiretti, incidentali o consequenziali derivanti dall'utilizzo del Servizio.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">9. Risoluzione</h2>
            <p>Domea si riserva il diritto di sospendere o terminare l'accesso al Servizio in caso di violazione dei presenti termini. In caso di risoluzione, l'utente potra esportare i propri dati entro 30 giorni dalla comunicazione.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">10. Legge Applicabile</h2>
            <p>I presenti termini sono regolati dalla legge italiana. Per qualsiasi controversia sara competente il Foro di Milano.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">11. Contatti</h2>
            <p>Per domande sui presenti termini: <strong>legale@domea.it</strong></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
