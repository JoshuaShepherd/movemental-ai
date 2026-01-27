'use client'

import { cn } from '@/lib/utils'
import {
  Users,
  Share2,
  Network,
  Shield,
  Globe,
  Lock,
  LucideIcon,
} from 'lucide-react'
import { whyThisHoldsPoints } from '../data/valuation-data'

const iconMap: Record<string, LucideIcon> = {
  Users,
  Share2,
  Network,
  Shield,
  Globe,
  Lock,
}

interface ConfidenceChecklistProps {
  className?: string
}

export function ConfidenceChecklist({ className }: ConfidenceChecklistProps) {
  return (
    <div className={cn('grid sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {whyThisHoldsPoints.map((point) => {
        const Icon = iconMap[point.icon] || Shield

        return (
          <div
            key={point.title}
            className="p-5 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">{point.title}</h4>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
