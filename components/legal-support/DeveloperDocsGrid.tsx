'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { 
  Activity, 
  RefreshCw, 
  Eye, 
  FileCode, 
  Puzzle, 
  ArrowRight,
  Package,
  Mail,
  LayoutDashboard,
  BookOpen,
  Globe,
  History,
  ExternalLink,
  LucideIcon
} from 'lucide-react'

type DocType = 
  | 'events' 
  | 'sync' 
  | 'observability' 
  | 'api' 
  | 'integrations' 
  | 'migration'
  | 'sdk'
  | 'email'
  | 'dashboard'
  | 'glossary'
  | 'domains'
  | 'changelog'

interface DocItem {
  id: string
  type: DocType
  title: string
  description: string
  url: string
  isExternal?: boolean
}

interface DocSection {
  id: string
  title: string
  items: DocItem[]
}

interface DeveloperDocsGridProps {
  /** Sections to display */
  sections: DocSection[]
  /** Grid columns */
  columns?: 3 | 4
  /** Custom class name */
  className?: string
}

const typeIcons: Record<DocType, LucideIcon> = {
  events: Activity,
  sync: RefreshCw,
  observability: Eye,
  api: FileCode,
  integrations: Puzzle,
  migration: ArrowRight,
  sdk: Package,
  email: Mail,
  dashboard: LayoutDashboard,
  glossary: BookOpen,
  domains: Globe,
  changelog: History,
}

export function DeveloperDocsGrid({
  sections,
  columns = 3,
  className,
}: DeveloperDocsGridProps) {
  const columnClasses = {
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={cn('space-y-12', className)}>
      {sections.map((section) => (
        <section key={section.id}>
          <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
          <div className={cn('grid gap-4', columnClasses[columns])}>
            {section.items.map((item) => {
              const Icon = typeIcons[item.type] || FileCode

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  <Card className="p-5 h-full hover:shadow-md hover:border-primary/30 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium flex items-center gap-1 group-hover:text-primary transition-colors">
                          {item.title}
                          {item.isExternal && (
                            <ExternalLink className="h-3 w-3 opacity-50" />
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
