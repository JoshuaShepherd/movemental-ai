'use client'

import { cn } from '@/lib/utils'

interface Stat {
  /** The numeric value or figure */
  value: string
  /** Label describing the stat */
  label: string
  /** Additional context or description */
  description?: string
}

interface StatsSectionProps {
  /** Optional additional class names */
  className?: string
}

const stats: Stat[] = [
  {
    value: '90%',
    label: 'Revenue Retained',
    description: 'vs. 10-15% with traditional publishers',
  },
  {
    value: '$1K',
    label: 'Platform Cost',
    description: 'vs. $50K-$150K industry standard',
  },
  {
    value: '2-4',
    label: 'Weeks to Launch',
    description: 'vs. 6-12 months traditional timeline',
  },
  {
    value: '100%',
    label: 'Ownership',
    description: 'Your platform, your audience, your data',
  },
]

export function StatsSection({ className }: StatsSectionProps) {
  return (
    <section
      className={cn(
        'py-16 sm:py-20 bg-blue-600',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-blue-100 mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-blue-200">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
