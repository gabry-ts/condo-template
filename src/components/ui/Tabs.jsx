import { useState } from 'react'
import { cn } from '../../lib/cn'

export default function Tabs({ tabs, defaultTab, className, onChange }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)

  const handleChange = (id) => {
    setActive(id)
    onChange?.(id)
  }

  const activeTab = tabs.find((t) => t.id === active)

  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors duration-150 border-b-2 -mb-px',
              active === tab.id
                ? 'border-primary-400 text-primary-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab?.content && (
        <div className="pt-6 animate-page-enter">{activeTab.content}</div>
      )}
    </div>
  )
}
