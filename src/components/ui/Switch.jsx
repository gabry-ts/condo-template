import { cn } from '../../lib/cn'

export default function Switch({ checked, onChange, label, className }) {
  return (
    <label className={cn('inline-flex items-center gap-3 cursor-pointer', className)}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
          checked ? 'bg-primary-400' : 'bg-gray-300'
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  )
}
