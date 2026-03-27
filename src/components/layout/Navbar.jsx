import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { Menu, X, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/faq', label: 'FAQ' },
  { to: '/webinar', label: 'Webinar' },
  { to: '/contattaci', label: 'Contattaci' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-sm'
        : 'bg-transparent border-b border-transparent'
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-primary-500 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <span className="text-white font-bold text-sm tracking-tight">DM</span>
            </div>
            <span className={cn(
              'text-lg font-bold tracking-tight transition-colors duration-300',
              scrolled ? 'text-primary-500' : 'text-white'
            )}>Domea</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                  location.pathname === link.to
                    ? scrolled ? 'text-primary-500 bg-primary-50' : 'text-white bg-white/15'
                    : scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50' : 'text-white/75 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant={scrolled ? 'outline' : 'ghost'} size="sm"
                className={cn(!scrolled && 'text-white/85 border-white/25 hover:bg-white/10 hover:text-white')}
              >
                Accedi
              </Button>
            </Link>
            <Link to="/registrazione">
              <Button variant="accent" size="sm" className="gap-1.5 shadow-md shadow-accent-400/20">
                Inizia Gratis
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <button
            className={cn(
              'md:hidden h-10 w-10 flex items-center justify-center rounded-xl transition-colors',
              scrolled ? 'hover:bg-gray-100 text-gray-700' : 'hover:bg-white/10 text-white'
            )}
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
