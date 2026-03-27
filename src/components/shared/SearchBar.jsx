import { Search, X } from 'lucide-react'
import { cn } from '../../lib/cn'

export default function SearchBar({ value, onChange, placeholder = 'Cerca...', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-9 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1 transition-shadow"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
