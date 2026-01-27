'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { milestones, formatCurrency, valuationMultiples } from '../data/valuation-data'

interface MilestoneTimelineProps {
  className?: string
}

export function MilestoneTimeline({ className }: MilestoneTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className={cn('', className)}>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden lg:block">
        {/* Timeline Track */}
        <div className="relative mb-8">
          <div className="absolute top-6 left-0 right-0 h-1 bg-muted" />

          {/* Progress fill */}
          <div
            className="absolute top-6 left-0 h-1 bg-primary"
            style={{ width: '20%' }} // First milestone active
          />

          {/* Milestone Dots */}
          <div className="relative flex justify-between">
            {milestones.map((milestone, index) => {
              const isFirst = index === 0
              const isExpanded = expandedId === milestone.id

              return (
                <div
                  key={milestone.id}
                  className="flex flex-col items-center cursor-pointer group"
                  style={{ width: `${100 / milestones.length}%` }}
                  onClick={() => toggleExpand(milestone.id)}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all',
                      'border-4 border-background',
                      isFirst
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground group-hover:bg-accent'
                    )}
                  >
                    {milestone.users === 0 ? (
                      <span className="text-xs font-bold">NOW</span>
                    ) : (
                      <span className="text-sm font-bold">{milestone.users}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-4 text-center">
                    <p className="font-semibold text-sm">{milestone.label}</p>
                    <p className="text-xs text-muted-foreground">{milestone.quarter}</p>
                  </div>

                  {/* Valuation Preview */}
                  <div className="mt-2 text-center">
                    <p className="text-xs text-muted-foreground">Valuation</p>
                    <p className="text-sm font-bold text-primary">
                      {formatCurrency(milestone.valuationLow)}–{formatCurrency(milestone.valuationHigh)}
                    </p>
                  </div>

                  {/* Expand Indicator */}
                  <div className="mt-2">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Expanded Detail Card */}
        {expandedId && (
          <MilestoneDetail
            milestone={milestones.find((m) => m.id === expandedId)!}
            onClose={() => setExpandedId(null)}
          />
        )}
      </div>

      {/* Mobile: Vertical Timeline with Collapsible Cards */}
      <div className="lg:hidden space-y-4">
        {milestones.map((milestone, index) => {
          const isFirst = index === 0
          const isExpanded = expandedId === milestone.id

          return (
            <div key={milestone.id} className="relative">
              {/* Timeline connector */}
              {index < milestones.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-muted" />
              )}

              {/* Card */}
              <div
                className={cn(
                  'relative ml-0 rounded-lg border transition-all cursor-pointer',
                  isFirst
                    ? 'bg-primary/5 border-primary'
                    : 'bg-card hover:bg-accent/50'
                )}
                onClick={() => toggleExpand(milestone.id)}
              >
                {/* Header */}
                <div className="flex items-start gap-4 p-4">
                  {/* Dot */}
                  <div
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center shrink-0',
                      isFirst
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {milestone.users === 0 ? (
                      <span className="text-xs font-bold">NOW</span>
                    ) : (
                      <span className="text-sm font-bold">{milestone.users}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{milestone.label}</p>
                        <p className="text-sm text-muted-foreground">{milestone.quarter}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          {formatCurrency(milestone.valuationLow)}–{formatCurrency(milestone.valuationHigh)}
                        </p>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground inline" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground inline" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 ml-16 border-t mt-2 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">ARR Range</p>
                        <p className="font-semibold">
                          {formatCurrency(milestone.arrLow)}–{formatCurrency(milestone.arrHigh)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Multiple</p>
                        <p className="font-semibold">
                          {valuationMultiples.low}×–{valuationMultiples.high}×
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Confidence</p>
                        <p className="font-semibold">{milestone.confidence}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Leaders</p>
                        <p className="font-semibold">{milestone.users}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-muted-foreground text-sm mb-2">Key Points</p>
                      <ul className="space-y-1">
                        {milestone.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Detail card component for desktop expanded view
function MilestoneDetail({
  milestone,
  onClose,
}: {
  milestone: (typeof milestones)[0]
  onClose: () => void
}) {
  return (
    <div className="p-6 rounded-xl border bg-card animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xl font-bold">{milestone.label}</h4>
          <p className="text-muted-foreground">{milestone.description}</p>
        </div>
        <span className="text-sm px-2 py-1 rounded bg-muted text-muted-foreground">
          {milestone.quarter}
        </span>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Leaders</p>
          <p className="text-2xl font-bold">{milestone.users}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">ARR Range</p>
          <p className="text-2xl font-bold">
            {formatCurrency(milestone.arrLow)}–{formatCurrency(milestone.arrHigh)}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Multiple Range</p>
          <p className="text-2xl font-bold">
            {valuationMultiples.low}×–{valuationMultiples.high}×
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Valuation Range</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(milestone.valuationLow)}–{formatCurrency(milestone.valuationHigh)}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Key Points</p>
            <div className="flex flex-wrap gap-2">
              {milestone.keyPoints.map((point, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full bg-muted"
                >
                  <Check className="h-3 w-3 text-emerald-500" />
                  {point}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Confidence</p>
            <p className="font-semibold">{milestone.confidence}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
