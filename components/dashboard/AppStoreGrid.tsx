'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ArrowRight, Search, Sparkles } from 'lucide-react'

interface App {
  id: string
  name: string
  description: string
  icon?: string
  iconBgColor?: string
  isFeatured?: boolean
  url?: string
}

interface AppCategory {
  id: string
  name: string
  apps: App[]
}

interface AppStoreGridProps {
  /** Categories with apps */
  categories: AppCategory[]
  /** Featured apps (shown at top) */
  featuredApps?: App[]
  /** Search query */
  searchQuery?: string
  /** Search change handler */
  onSearchChange?: (query: string) => void
  /** App click handler */
  onAppClick?: (appId: string) => void
  /** "View All" click handler */
  onViewAllClick?: (categoryId: string) => void
  /** Custom class name */
  className?: string
}

function AppCard({
  app,
  onClick,
}: {
  app: App
  onClick?: () => void
}) {
  return (
    <Card
      className={cn(
        'p-4 cursor-pointer transition-all hover:shadow-md hover:ring-2 hover:ring-primary/20',
        app.isFeatured && 'ring-1 ring-primary/30'
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* App icon */}
        <div
          className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
            app.iconBgColor || 'bg-primary/10'
          )}
        >
          {app.icon ? (
            <img src={app.icon} alt={app.name} className="w-8 h-8" />
          ) : (
            <span className="text-xl font-bold text-primary">
              {app.name.charAt(0)}
            </span>
          )}
        </div>

        {/* App info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm truncate">{app.name}</h3>
            {app.isFeatured && (
              <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-medium rounded">
                <Sparkles className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {app.description}
          </p>
        </div>
      </div>
    </Card>
  )
}

export function AppStoreGrid({
  categories,
  featuredApps = [],
  searchQuery = '',
  onSearchChange,
  onAppClick,
  onViewAllClick,
  className,
}: AppStoreGridProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Search */}
      {onSearchChange && (
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for an app"
            className="w-full h-10 pl-10 pr-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      )}

      {/* Featured section */}
      {featuredApps.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Featured</h2>
            {onViewAllClick && (
              <button
                onClick={() => onViewAllClick('featured')}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View All <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onClick={() => onAppClick?.(app.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Category sections */}
      {categories.map((category) => (
        <section key={category.id}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">{category.name}</h2>
            {onViewAllClick && (
              <button
                onClick={() => onViewAllClick(category.id)}
                className="flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View All <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.apps.slice(0, 4).map((app) => (
              <AppCard
                key={app.id}
                app={app}
                onClick={() => onAppClick?.(app.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
