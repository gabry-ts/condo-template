import { cn } from '../../lib/cn'

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const bgColors = [
  'bg-primary-400',
  'bg-accent-400',
  'bg-success-500',
  'bg-info-500',
  'bg-warning-500',
]

function getColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return bgColors[Math.abs(hash) % bgColors.length]
}

export default function Avatar({ name, src, size = 'md', className }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover', sizes[size], className)}
      />
    )
  }

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white',
        sizes[size],
        getColor(name || 'U'),
        className
      )}
      title={name}
    >
      {getInitials(name || 'U')}
    </div>
  )
}
