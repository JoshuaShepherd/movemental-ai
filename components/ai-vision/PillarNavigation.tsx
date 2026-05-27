'use client'

import { cn } from '@/lib/utils'

interface Pillar {
  id: string
  label: string
}

interface PillarNavigationProps {
  pillars: Pillar[]
  activeId: string | null
  progress: number
  className?: string
}

export function PillarNavigation({
  pillars,
  activeId,
  progress,
  className,
}: PillarNavigationProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      className={cn(
        'hidden lg:flex flex-col gap-4',
        className
      )}
    >
      {pillars.map((pillar) => {
        const isActive = activeId === pillar.id

        return (
          <button
            key={pillar.id}
            onClick={() => scrollToSection(pillar.id)}
            className={cn(
              'flex items-center gap-3 text-left transition-all',
              isActive
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                isActive ? 'bg-primary scale-125' : 'bg-muted-foreground/30'
              )}
            />
            <span className="text-sm">{pillar.label}</span>
          </button>
        )
      })}

      {/* Progress */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </nav>
  )
}
