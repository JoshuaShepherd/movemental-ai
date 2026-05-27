'use client'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PillarCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}

export function PillarCard({
  icon: Icon,
  title,
  description,
  className,
}: PillarCardProps) {
  return (
    <div
      className={cn(
        'p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
