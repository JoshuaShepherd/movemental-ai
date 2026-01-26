'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Headphones, 
  Calendar, 
  Users,
  ExternalLink,
  LucideIcon
} from 'lucide-react'

type ResourceType = 'guide' | 'course' | 'blog' | 'podcast' | 'video' | 'event' | 'community'

interface Resource {
  id: string
  type: ResourceType
  title: string
  description: string
  linkText?: string
  linkUrl?: string
  isExternal?: boolean
}

interface ResourceIconGridProps {
  /** Section title */
  title?: string
  /** Array of resources */
  resources: Resource[]
  /** Grid columns */
  columns?: 2 | 3
  /** Accent color for top border */
  accentColor?: string
  /** Custom class name */
  className?: string
}

const resourceConfig: Record<ResourceType, { icon: LucideIcon; accent: string }> = {
  guide: { icon: BookOpen, accent: 'border-t-emerald-500' },
  course: { icon: Video, accent: 'border-t-blue-500' },
  blog: { icon: FileText, accent: 'border-t-purple-500' },
  podcast: { icon: Headphones, accent: 'border-t-orange-500' },
  video: { icon: Video, accent: 'border-t-red-500' },
  event: { icon: Calendar, accent: 'border-t-cyan-500' },
  community: { icon: Users, accent: 'border-t-pink-500' },
}

export function ResourceIconGrid({
  title,
  resources,
  columns = 3,
  accentColor,
  className,
}: ResourceIconGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  }

  return (
    <section className={cn('', className)}>
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}

      <div className={cn('grid gap-4', columnClasses[columns])}>
        {resources.map((resource) => {
          const config = resourceConfig[resource.type]
          const Icon = config.icon

          return (
            <Card
              key={resource.id}
              className={cn(
                'p-6 border-t-4 transition-all hover:shadow-md',
                accentColor || config.accent
              )}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg border-2 border-muted flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-muted-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {resource.description}
              </p>

              {/* Link */}
              {resource.linkUrl && (
                <a
                  href={resource.linkUrl}
                  target={resource.isExternal ? '_blank' : undefined}
                  rel={resource.isExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                >
                  {resource.linkText || 'Learn more'}
                  {resource.isExternal && <ExternalLink className="h-3 w-3" />}
                </a>
              )}
            </Card>
          )
        })}
      </div>
    </section>
  )
}
