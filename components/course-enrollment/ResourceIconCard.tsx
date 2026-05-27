'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { 
  BookOpen, 
  Video, 
  FileText, 
  Headphones, 
  Calendar, 
  Lightbulb,
  GraduationCap,
  Users,
  LucideIcon
} from 'lucide-react'

type ResourceType = 'guide' | 'course' | 'blog' | 'podcast' | 'video' | 'event' | 'tip' | 'community'

interface ResourceIconCardProps {
  /** Resource type for icon selection */
  type: ResourceType
  /** Card title */
  title: string
  /** Card description */
  description: string
  /** CTA link text */
  linkText?: string
  /** CTA link URL */
  linkUrl?: string
  /** Accent color for top border */
  accentColor?: string
  /** Custom class name */
  className?: string
}

const resourceConfig: Record<ResourceType, { icon: LucideIcon; defaultAccent: string }> = {
  guide: { icon: BookOpen, defaultAccent: 'border-t-emerald-500' },
  course: { icon: GraduationCap, defaultAccent: 'border-t-blue-500' },
  blog: { icon: FileText, defaultAccent: 'border-t-purple-500' },
  podcast: { icon: Headphones, defaultAccent: 'border-t-orange-500' },
  video: { icon: Video, defaultAccent: 'border-t-red-500' },
  event: { icon: Calendar, defaultAccent: 'border-t-cyan-500' },
  tip: { icon: Lightbulb, defaultAccent: 'border-t-amber-500' },
  community: { icon: Users, defaultAccent: 'border-t-pink-500' },
}

export function ResourceIconCard({
  type,
  title,
  description,
  linkText = 'Learn more',
  linkUrl,
  accentColor,
  className,
}: ResourceIconCardProps) {
  const config = resourceConfig[type]
  const Icon = config.icon

  return (
    <Card
      className={cn(
        'p-6 border-t-4 transition-all hover:shadow-md',
        accentColor || config.defaultAccent,
        className
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>

      {/* Content */}
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {/* Link */}
      {linkUrl && (
        <a
          href={linkUrl}
          className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          {linkText}
        </a>
      )}
    </Card>
  )
}

interface ResourceGridProps {
  /** Array of resources */
  resources: Array<{
    id: string
    type: ResourceType
    title: string
    description: string
    linkText?: string
    linkUrl?: string
  }>
  /** Grid columns */
  columns?: 2 | 3 | 4
  /** Custom class name */
  className?: string
}

export function ResourceGrid({
  resources,
  columns = 3,
  className,
}: ResourceGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {resources.map((resource) => (
        <ResourceIconCard key={resource.id} {...resource} />
      ))}
    </div>
  )
}
