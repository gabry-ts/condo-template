import { cn } from '../../lib/cn'

export function Table({ className, children }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
      <table className={cn('w-full text-sm', className)}>{children}</table>
    </div>
  )
}

export function TableHeader({ className, children }) {
  return <thead className={cn('bg-gray-50 border-b border-gray-200', className)}>{children}</thead>
}

export function TableBody({ className, children }) {
  return <tbody className={cn('divide-y divide-gray-100', className)}>{children}</tbody>
}

export function TableRow({ className, onClick, children }) {
  return (
    <tr
      className={cn(
        'transition-colors duration-100',
        onClick && 'cursor-pointer hover:bg-gray-50',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

export function TableHead({ className, sortable, sorted, onSort, children }) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide',
        sortable && 'cursor-pointer select-none hover:text-gray-700 group',
        className
      )}
      onClick={sortable ? onSort : undefined}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortable && (
          <span className={cn('text-[10px] transition-opacity', sorted ? 'opacity-100' : 'opacity-0 group-hover:opacity-40')}>
            {sorted === 'asc' ? '↑' : sorted === 'desc' ? '↓' : '↕'}
          </span>
        )}
      </span>
    </th>
  )
}

export function TableCell({ className, mono, children }) {
  return (
    <td className={cn('px-4 py-3 text-gray-700', mono && 'font-mono font-semibold', className)}>
      {children}
    </td>
  )
}
