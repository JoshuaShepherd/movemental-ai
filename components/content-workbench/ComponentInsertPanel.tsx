'use client'

import { cn } from '@/lib/utils'
import { 
  LayoutGrid, 
  Columns, 
  Rows, 
  Image, 
  Video, 
  GalleryHorizontal,
  Type,
  Link2,
  Youtube,
  MousePointerClick,
  Table,
  Quote,
  List,
  LucideIcon
} from 'lucide-react'

interface ComponentOption {
  id: string
  name: string
  icon: LucideIcon
  description?: string
  category: string
}

interface ComponentInsertPanelProps {
  /** Component click handler */
  onComponentClick?: (componentId: string) => void
  /** Filter by category */
  category?: string
  /** Custom class name */
  className?: string
}

const COMPONENTS: ComponentOption[] = [
  // Layout
  { id: 'grid', name: 'Grid', icon: LayoutGrid, category: 'Layout', description: 'A flexible grid layout' },
  { id: 'columns', name: 'Columns', icon: Columns, category: 'Layout', description: 'Multi-column layout' },
  { id: 'rows', name: 'Rows', icon: Rows, category: 'Layout', description: 'Stacked row layout' },
  // Media
  { id: 'image', name: 'Image', icon: Image, category: 'Media', description: 'Single image block' },
  { id: 'video', name: 'Video', icon: Video, category: 'Media', description: 'Video embed block' },
  { id: 'carousel', name: 'Carousel', icon: GalleryHorizontal, category: 'Media', description: 'Image slideshow' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, category: 'Media', description: 'YouTube video embed' },
  // Text
  { id: 'text', name: 'Text', icon: Type, category: 'Text', description: 'Rich text block' },
  { id: 'quote', name: 'Quote', icon: Quote, category: 'Text', description: 'Pull quote block' },
  { id: 'list', name: 'List', icon: List, category: 'Text', description: 'Bullet or numbered list' },
  // Interactive
  { id: 'button', name: 'Button', icon: MousePointerClick, category: 'Interactive', description: 'Call-to-action button' },
  { id: 'link', name: 'Link', icon: Link2, category: 'Interactive', description: 'Inline link' },
  { id: 'table', name: 'Table', icon: Table, category: 'Interactive', description: 'Data table' },
]

export function ComponentInsertPanel({
  onComponentClick,
  category,
  className,
}: ComponentInsertPanelProps) {
  const filteredComponents = category
    ? COMPONENTS.filter((c) => c.category === category)
    : COMPONENTS

  // Group by category
  const groupedComponents = filteredComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = []
    }
    acc[component.category].push(component)
    return acc
  }, {} as Record<string, ComponentOption[]>)

  return (
    <div className={cn('', className)}>
      {Object.entries(groupedComponents).map(([categoryName, components]) => (
        <div key={categoryName} className="mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {categoryName}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {components.map((component) => {
              const Icon = component.icon
              return (
                <button
                  key={component.id}
                  onClick={() => onComponentClick?.(component.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors group"
                  title={component.description}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {component.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
