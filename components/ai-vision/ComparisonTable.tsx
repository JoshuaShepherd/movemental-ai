'use client'

import { Check, X } from 'lucide-react'
import { ScrollRevealBlock } from './ScrollRevealBlock'
import { cn } from '@/lib/utils'

interface ComparisonItem {
  generic: string
  movemental: string
}

interface ComparisonTableProps {
  items: ComparisonItem[]
  className?: string
}

export function ComparisonTable({ items, className }: ComparisonTableProps) {
  return (
    <ScrollRevealBlock className={cn('', className)}>
      <div className="bg-card border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 sm:p-6 bg-muted/50">
            <h3 className="font-semibold text-muted-foreground">Generic AI</h3>
          </div>
          <div className="p-4 sm:p-6 bg-primary/5">
            <h3 className="font-semibold text-primary">Movemental AI</h3>
          </div>
        </div>

        {/* Rows */}
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'grid grid-cols-2',
              index !== items.length - 1 && 'border-b'
            )}
          >
            <div className="p-4 sm:p-6 flex items-start gap-3">
              <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{item.generic}</span>
            </div>
            <div className="p-4 sm:p-6 flex items-start gap-3 bg-primary/5">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{item.movemental}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollRevealBlock>
  )
}
