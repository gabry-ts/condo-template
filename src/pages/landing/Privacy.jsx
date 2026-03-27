import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Ultimo aggiornamento: 1 Marzo 2026</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-600 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">1. Titolare del Trattamento</h2>
            <p>Il titolare del trattamento dei dati personali e Domea S.r.l., con sede in Via Example 1, 20121 Milano (MI), P.IVA 12345678901, email: privacy@domea.it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">2. Dati Raccolti</h2>
            <p>Raccogliamo le seguenti categorie di dati personali:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong>Dati identificativi:</strong> nome, cognome, codice fiscale, indirizzo email, numero di telefono.</li>
              <li><strong>Dati di accesso:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, data e ora di accesso.</li>
              <li><strong>Dati condominiali:</strong> informazioni relative agli immobili, unita immobiliari, millesimi, rate condominiali.</li>
              <li><strong>Dati di pagamento:</strong> dati necessari per la gestione degli abbonamenti tramite provider terzi (Stripe).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">3. Finalita del Trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalita:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Erogazione del servizio di gestione condominiale digitale.</li>
              <li>Gestione dell'account utente e autenticazione.</li>
              <li>Comunicazioni relative al servizio (notifiche, aggiornamenti, comunicazioni condominiali).</li>
              <li>Gestione della fatturazione e degli abbonamenti.</li>
              <li>Adempimento di obblighi di legge.</li>
              <li>Miglioramento del servizio tramite analisi aggregate e anonimizzate.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">4. Base Giuridica</h2>
            <p>Il trattamento dei dati si fonda sulle seguenti basi giuridiche ai sensi dell'art. 6 del GDPR:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Esecuzione del contratto di servizio.</li>
              <li>Consenso esplicito dell'interessato.</li>
              <li>Legittimo interesse del titolare.</li>
              <li>Adempimento di obblighi legali.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">5. Conservazione dei Dati</h2>
            <p>I dati personali sono conservati per il tempo strettamente necessario al raggiungimento delle finalita per cui sono stati raccolti, e comunque non oltre 10 anni dalla cessazione del rapporto contrattuale, salvo diversi obblighi di legge.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">6. Diritti dell'Interessato</h2>
            <p>Ai sensi degli articoli 15-22 del GDPR, l'interessato ha diritto di:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Accedere ai propri dati personali.</li>
              <li>Richiedere la rettifica o la cancellazione dei dati.</li>
              <li>Limitare il trattamento o opporsi allo stesso.</li>
              <li>Richiedere la portabilita dei dati.</li>
              <li>Revocare il consenso in qualsiasi momento.</li>
              <li>Proporre reclamo all'autorita di controllo (Garante per la protezione dei dati personali).</li>
            </ul>
            <p className="mt-3">Per esercitare i propri diritti, scrivere a: <strong>privacy@domea.it</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">7. Trasferimento dei Dati</h2>
            <p>I dati personali sono conservati su server situati nell'Unione Europea. Qualora fosse necessario trasferire dati al di fuori dello Spazio Economico Europeo, il trasferimento avverra nel rispetto delle garanzie previste dal GDPR.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold font-display text-gray-900 mb-3">8. Contatti</h2>
            <p>Per qualsiasi domanda relativa alla presente informativa, e possibile contattarci all'indirizzo email <strong>privacy@domea.it</strong> o scrivere a Domea S.r.l., Via Example 1, 20121 Milano (MI).</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
