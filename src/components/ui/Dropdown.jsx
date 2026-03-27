import { useState, useRef, useEffect } from 'react'
import { cn } from '../../lib/cn'
import { MoreHorizontal } from 'lucide-react'

export default function Dropdown({ trigger, items = [], align = 'right', className }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Azioni"
      >
        {trigger || <MoreHorizontal className="h-4 w-4 text-gray-500" />}
      </button>
      {open && (
        <div
          className={cn(
            'absolute top-full mt-1 z-50 min-w-[160px] bg-white rounded-xl border border-gray-200 shadow-lg py-1 animate-fade-in',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item, i) =>
            item.divider ? (
              <div key={i} className="h-px bg-gray-100 my-1" />
            ) : (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  item.onClick?.()
                  setOpen(false)
                }}
                className={cn(
                  'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors',
                  item.destructive
                    ? 'text-destructive-500 hover:bg-destructive-50'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
