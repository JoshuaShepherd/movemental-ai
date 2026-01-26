'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

interface TOCSection {
  id: string
  number?: string
  title: string
  illustration?: string
  url?: string
}

interface IllustratedTOCProps {
  /** Title for the TOC */
  title?: string
  /** Subtitle/description */
  subtitle?: string
  /** Array of sections */
  sections: TOCSection[]
  /** Section click handler */
  onSectionClick?: (sectionId: string) => void
  /** Custom class name */
  className?: string
}

export function IllustratedTOC({
  title = 'Table of Contents',
  subtitle,
  sections,
  onSectionClick,
  className,
}: IllustratedTOCProps) {
  return (
    <div className={cn('', className)}>
      {/* Header */}
      <div className="mb-8">
        {subtitle && (
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
            {subtitle}
          </p>
        )}
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      {/* Sections grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <Card
            key={section.id}
            className={cn(
              'group overflow-hidden cursor-pointer transition-all',
              'hover:shadow-lg hover:ring-2 hover:ring-primary/20'
            )}
            onClick={() => onSectionClick?.(section.id)}
          >
            <a href={section.url} className="flex items-center gap-4 p-4">
              {/* Illustration */}
              <div className="relative w-24 h-24 flex-shrink-0 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg overflow-hidden">
                {section.illustration ? (
                  <img
                    src={section.illustration}
                    alt={section.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-teal-200">
                      {section.number || (sections.indexOf(section) + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                )}
                {/* Number badge */}
                {section.number && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-teal-600 text-white text-xs font-bold rounded flex items-center justify-center">
                    {section.number}
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
              </div>
            </a>
          </Card>
        ))}
      </div>
    </div>
  )
}
