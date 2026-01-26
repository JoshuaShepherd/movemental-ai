'use client'

import { cn } from '@/lib/utils'

interface Pillar {
  id: string
  label: string
}

interface MobileNavTabsProps {
  pillars: Pillar[]
  activeId: string | null
  className?: string
}

export function MobileNavTabs({
  pillars,
  activeId,
  className,
}: MobileNavTabsProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className={cn(
        'lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur border-b overflow-x-auto',
        className
      )}
    >
      <div className="flex gap-1 p-2 min-w-max">
        {pillars.map((pillar) => {
          const isActive = activeId === pillar.id

          return (
            <button
              key={pillar.id}
              onClick={() => scrollToSection(pillar.id)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              {pillar.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
