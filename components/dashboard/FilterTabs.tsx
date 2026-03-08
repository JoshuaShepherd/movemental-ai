'use client'

import { cn } from '@/lib/utils'
import { LucideIcon, Files, Clock, User, Star } from 'lucide-react'

interface FilterTab {
  id: string
  label: string
  icon?: LucideIcon
}

interface FilterTabsProps {
  /** Array of tabs */
  tabs: FilterTab[]
  /** Currently active tab ID */
  activeTab: string
  /** Tab change handler */
  onTabChange: (tabId: string) => void
  /** Custom class name */
  className?: string
}

const defaultTabs: FilterTab[] = [
  { id: 'all', label: 'All', icon: Files },
  { id: 'recent', label: 'Recently viewed', icon: Clock },
  { id: 'created', label: 'Created by you', icon: User },
  { id: 'favorites', label: 'Favorites', icon: Star },
]

export function FilterTabs({
  tabs = defaultTabs,
  activeTab,
  onTabChange,
  className,
}: FilterTabsProps) {
  return (
    <div className={cn('flex items-center gap-2 overflow-x-auto', className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
