'use client'

import { BookOpen, FileText, Video, User, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Suggestion {
  type: 'article' | 'book' | 'course' | 'video' | 'leader'
  title: string
  subtitle?: string
  href: string
}

interface SuggestionGroup {
  type: string
  label: string
  icon: React.ReactNode
  items: Suggestion[]
}

interface SearchSuggestionsProps {
  suggestions: SuggestionGroup[]
  onSelect: (suggestion: Suggestion) => void
  selectedIndex?: number
  className?: string
}

const typeIcons: Record<string, React.ReactNode> = {
  article: <FileText className="h-4 w-4" />,
  book: <BookOpen className="h-4 w-4" />,
  course: <GraduationCap className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  leader: <User className="h-4 w-4" />,
}

export function SearchSuggestions({
  suggestions,
  onSelect,
  selectedIndex = -1,
  className,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null

  let currentIndex = 0

  return (
    <div
      className={cn(
        'absolute top-full left-0 right-0 bg-background border border-t-0 rounded-b-xl shadow-lg z-50 max-h-96 overflow-y-auto',
        className
      )}
    >
      {suggestions.map((group) => (
        <div key={group.type} className="py-2">
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            {group.icon}
            {group.label}
          </div>
          {group.items.map((item) => {
            const itemIndex = currentIndex++
            const isSelected = itemIndex === selectedIndex

            return (
              <button
                key={`${item.type}-${item.href}`}
                onClick={() => onSelect(item)}
                className={cn(
                  'w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-muted transition-colors',
                  isSelected && 'bg-muted'
                )}
              >
                <span className="text-muted-foreground">
                  {typeIcons[item.type]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  {item.subtitle && (
                    <p className="text-xs text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
