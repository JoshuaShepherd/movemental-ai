'use client'

import { cn } from '@/lib/utils'
import { ProjectCard } from './ProjectCard'
import { Button } from '@/components/ui/button'
import { Plus, FileText } from 'lucide-react'

interface Project {
  id: string
  title: string
  description?: string
  type: 'article' | 'video' | 'course' | 'page'
  status: 'draft' | 'published' | 'archived'
  thumbnail?: string
  lastModified?: Date
  href: string
}

interface ProjectGridProps {
  projects: Project[]
  emptyStateTitle?: string
  emptyStateDescription?: string
  onCreateNew?: () => void
  className?: string
}

export function ProjectGrid({
  projects,
  emptyStateTitle = 'No content yet',
  emptyStateDescription = 'Create your first piece of content to get started.',
  onCreateNew,
  className,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-16', className)}>
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {emptyStateTitle}
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
          {emptyStateDescription}
        </p>
        {onCreateNew && (
          <Button onClick={onCreateNew} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Content
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
        className
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}
