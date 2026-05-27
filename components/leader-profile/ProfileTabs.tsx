'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  count?: number
}

interface ProfileTabsProps {
  /** Array of tabs */
  tabs: Tab[]
  /** Currently active tab ID */
  activeTab?: string
  /** Tab change handler */
  onTabChange?: (tabId: string) => void
  /** Custom class name */
  className?: string
}

export function ProfileTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: ProfileTabsProps) {
  const [internalActive, setInternalActive] = useState(activeTab || tabs[0]?.id)
  const currentTab = activeTab ?? internalActive

  const handleTabClick = (tabId: string) => {
    setInternalActive(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className={cn('border-b', className)}>
      <nav className="flex gap-6 -mb-px overflow-x-auto" aria-label="Profile tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              'py-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
              currentTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
            )}
            aria-current={currentTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  'ml-2 px-2 py-0.5 rounded-full text-xs',
                  currentTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
