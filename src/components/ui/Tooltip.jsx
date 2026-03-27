import { useState } from 'react'
import { cn } from '../../lib/cn'

export default function Tooltip({ content, children, className, side = 'right' }) {
  const [show, setShow] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrows = {
    top: 'absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-800',
    right: 'absolute right-full top-1/2 -translate-y-1/2 -mr-px border-4 border-transparent border-r-gray-800',
  }

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && content && (
        <div className={cn('absolute px-3 py-1.5 text-xs font-medium text-white bg-gray-800 rounded-lg whitespace-nowrap animate-fade-in z-50', positions[side], className)}>
          {content}
          <div className={arrows[side]} />
        </div>
      )}
    </div>
  )
}
