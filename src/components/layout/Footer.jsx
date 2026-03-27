import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Prodotto',
    links: [
      { label: 'Studio', to: '/studio/dashboard' },
      { label: 'Connect', to: '/connect/home' },
      { label: 'Pricing', to: '/scegli-piano' },
    ],
  },
  {
    title: 'Risorse',
    links: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Contattaci', to: '/contattaci' },
      { label: 'Webinar', to: '/webinar' },
    ],
  },
  {
    title: 'Legale',
    links: [
      { label: 'Privacy Policy', to: '#' },
      { label: 'Termini di Servizio', to: '#' },
      { label: 'Cookie Policy', to: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary-600 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DM</span>
              </div>
              <span className="text-lg font-display font-bold">Domea</span>
            </div>
            <p className="text-sm text-primary-200 leading-relaxed max-w-[200px]">
              La piattaforma digitale per la gestione condominiale moderna.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-300 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-primary-200 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-primary-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-300">
            &copy; {new Date().getFullYear()} Domea. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-primary-400">
            Made in Italy
          </p>
        </div>
      </div>
    </footer>
  )
}
