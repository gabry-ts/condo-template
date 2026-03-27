import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary-700 text-primary-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-accent-400 flex items-center justify-center">
                <span className="text-white font-bold text-xs font-display">DM</span>
              </div>
              <span className="text-lg font-display font-bold text-white">Domea</span>
            </div>
            <p className="text-sm leading-relaxed text-primary-300 max-w-[260px]">
              Gestione condominiale digitale. Semplice, trasparente, sicura.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4">Prodotto</h4>
            <ul className="space-y-2.5">
              <FLink to="/studio/dashboard">Studio</FLink>
              <FLink to="/connect/home">Connect</FLink>
              <FLink to="/scegli-piano">Prezzi</FLink>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4">Risorse</h4>
            <ul className="space-y-2.5">
              <FLink to="/faq">FAQ</FLink>
              <FLink to="/contattaci">Contattaci</FLink>
              <FLink to="/attivazione-qr">Attiva Account</FLink>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4">Legale</h4>
            <ul className="space-y-2.5">
              <FLink to="/privacy">Privacy Policy</FLink>
              <FLink to="/termini">Termini di Servizio</FLink>
              <FLink to="/cookie">Cookie Policy</FLink>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-primary-400 mb-4">Contatti</h4>
            <ul className="space-y-2.5">
              <li><a href="mailto:info@domea.it" className="text-sm text-primary-300 hover:text-white transition-colors">info@domea.it</a></li>
              <li><a href="tel:+390200000000" className="text-sm text-primary-300 hover:text-white transition-colors">+39 02 000 0000</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-primary-600 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-400">&copy; {new Date().getFullYear()} Domea S.r.l. — P.IVA 12345678901</p>
          <p className="text-xs text-primary-500">Made in Italy</p>
        </div>
      </div>
    </footer>
  )
}

function FLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-sm text-primary-300 hover:text-white transition-colors duration-150">{children}</Link>
    </li>
  )
}
