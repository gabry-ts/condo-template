import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Menu, X, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const links = [
  { to: '/faq', label: 'FAQ' },
  { to: '/contattaci', label: 'Contattaci' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-primary-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <span className="text-white font-bold text-sm tracking-tight">DM</span>
            </div>
            <span className="text-lg font-display font-bold tracking-tight text-gray-900">Domea</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  location.pathname === link.to
                    ? 'text-primary-500 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">Accedi</Button>
            </Link>
            <Link to="/registrazione">
              <Button variant="accent" size="sm" className="gap-1.5">
                Inizia Gratis
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-700 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="px-4 py-5 space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-3 text-base font-medium rounded-xl transition-colors',
                  location.pathname === link.to
                    ? 'text-primary-500 bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2.5">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full" size="lg">Accedi</Button>
              </Link>
              <Link to="/registrazione" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" className="w-full" size="lg">Inizia Gratis</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
