'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'

interface HelpArticle {
  id: string
  title: string
  url: string
}

interface HelpSection {
  id: string
  title: string
  articles: HelpArticle[]
  defaultExpanded?: boolean
}

interface HelpMenuProps {
  /** Array of help sections */
  sections: HelpSection[]
  /** Active article ID */
  activeArticleId?: string
  /** Article click handler */
  onArticleClick?: (articleId: string) => void
  /** Custom class name */
  className?: string
}

export function HelpMenu({
  sections,
  activeArticleId,
  onArticleClick,
  className,
}: HelpMenuProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.filter((s) => s.defaultExpanded).map((s) => s.id)
  )

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <nav className={cn('', className)}>
      {sections.map((section) => {
        const isExpanded = expandedSections.includes(section.id)

        return (
          <div key={section.id} className="mb-4">
            {/* Section header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>{section.title}</span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {/* Articles */}
            {isExpanded && (
              <ul className="ml-2 space-y-1">
                {section.articles.map((article) => (
                  <li key={article.id}>
                    <a
                      href={article.url}
                      onClick={(e) => {
                        if (onArticleClick) {
                          e.preventDefault()
                          onArticleClick(article.id)
                        }
                      }}
                      className={cn(
                        'flex items-center justify-between py-1.5 px-2 text-sm rounded-md transition-colors',
                        activeArticleId === article.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      )}
                    >
                      <span>{article.title}</span>
                      {article.url.startsWith('http') && (
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}
