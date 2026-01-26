'use client'

import { cn } from '@/lib/utils'
import { LucideIcon, FormInput, Video, Music, Share2, ShoppingBag, Wrench } from 'lucide-react'

interface Tab {
  id: string
  label: string
  icon?: LucideIcon
  badge?: string
}

interface CategoryTabsProps {
  /** Array of tabs */
  tabs: Tab[]
  /** Currently active tab ID */
  activeTab: string
  /** Tab change handler */
  onTabChange: (tabId: string) => void
  /** Show icons */
  showIcons?: boolean
  /** Custom class name */
  className?: string
}

const defaultTabs: Tab[] = [
  { id: 'forms', label: 'Forms', icon: FormInput },
  { id: 'video', label: 'Video & Animation', icon: Video },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'social', label: 'Social', icon: Share2 },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'utilities', label: 'Utilities', icon: Wrench },
]

export function CategoryTabs({
  tabs = defaultTabs,
  activeTab,
  onTabChange,
  showIcons = true,
  className,
}: CategoryTabsProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-1 p-1 bg-muted rounded-lg overflow-x-auto',
        className
      )}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all',
              isActive
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {showIcons && Icon && <Icon className="h-4 w-4" />}
            {tab.label}
            {tab.badge && (
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded">
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
