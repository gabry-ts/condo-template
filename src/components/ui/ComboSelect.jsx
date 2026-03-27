import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/cn'
import { ChevronDown, Search, Check, X } from 'lucide-react'

export default function ComboSelect({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Seleziona...',
  searchable = false,
  error,
  required,
  className,
  disabled,
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const ref = useRef(null)
  const inputRef = useRef(null)

  const selected = options.find((o) => o.value === value)

  const filtered = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open && searchable && inputRef.current) inputRef.current.focus()
  }, [open, searchable])

  const handleSelect = (val) => {
    onChange({ target: { value: val } })
    setOpen(false)
    setSearch('')
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange({ target: { value: '' } })
    setSearch('')
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)} ref={ref}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-destructive-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen(!open)}
          className={cn(
            'h-10 w-full rounded-xl border bg-white px-3 pr-16 text-sm text-left flex items-center',
            'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1',
            'transition-shadow duration-150',
            disabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
            error ? 'border-destructive-500' : open ? 'border-primary-400 ring-2 ring-primary-400 ring-offset-1' : 'border-gray-200',
          )}
        >
          {selected ? (
            <span className="text-gray-800 truncate">{selected.label}</span>
          ) : (
            <span className="text-gray-400 truncate">{placeholder}</span>
          )}
        </button>

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && !disabled && (
            <button type="button" onClick={handleClear} className="h-5 w-5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <X className="h-3 w-3" />
            </button>
          )}
          <ChevronDown className={cn('h-4 w-4 text-gray-400 transition-transform', open && 'rotate-180')} />
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden animate-fade-in">
            {searchable && (
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    className="w-full h-8 pl-8 pr-3 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-400 placeholder:text-gray-400"
                    placeholder="Cerca..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            )}
            <div className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">Nessun risultato</p>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors',
                      opt.value === value && 'bg-primary-50 text-primary-600'
                    )}
                  >
                    <span className="flex-1 truncate">{opt.label}</span>
                    {opt.value === value && <Check className="h-4 w-4 text-primary-500 flex-shrink-0" />}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive-500">{error}</p>}
    </div>
  )
}
