'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

interface Template {
  id: string
  name: string
  description?: string
  category?: string
  previews: string[] // Array of preview images (for stacked effect)
  url?: string
}

interface TemplateGridProps {
  /** Section title */
  title?: string
  /** Section description */
  description?: string
  /** Array of templates */
  templates: Template[]
  /** Template click handler */
  onTemplateClick?: (templateId: string) => void
  /** Columns per row */
  columns?: 3 | 4
  /** Custom class name */
  className?: string
}

export function TemplateGrid({
  title,
  description,
  templates,
  onTemplateClick,
  columns = 4,
  className,
}: TemplateGridProps) {
  const columnClasses = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={cn('', className)}>
      {/* Header */}
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && <h2 className="text-3xl font-bold">{title}</h2>}
          {description && (
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Grid */}
      <div className={cn('grid gap-6', columnClasses[columns])}>
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              'group overflow-hidden cursor-pointer transition-all',
              'hover:shadow-xl hover:ring-2 hover:ring-primary/20'
            )}
            onClick={() => onTemplateClick?.(template.id)}
          >
            {/* Stacked previews */}
            <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 p-4">
              <div className="relative w-full h-full">
                {template.previews.slice(0, 3).map((preview, index) => (
                  <div
                    key={index}
                    className={cn(
                      'absolute bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300',
                      'group-hover:scale-105'
                    )}
                    style={{
                      width: '75%',
                      height: '80%',
                      left: `${index * 8}%`,
                      top: `${index * 5}%`,
                      transform: `rotate(${(index - 1) * 3}deg)`,
                      zIndex: 3 - index,
                    }}
                  >
                    <img
                      src={preview}
                      alt={`${template.name} preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-semibold group-hover:text-primary transition-colors">
                {template.name}
              </h3>
              {template.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
