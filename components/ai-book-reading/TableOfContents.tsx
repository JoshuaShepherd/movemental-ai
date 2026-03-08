'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, List } from 'lucide-react'
import Link from 'next/link'

interface Chapter {
  id: string
  number: number
  title: string
  href: string
}

interface TableOfContentsProps {
  chapters: Chapter[]
  currentChapterId?: string
  variant?: 'sidebar' | 'dropdown'
  className?: string
}

export function TableOfContents({
  chapters,
  currentChapterId,
  variant = 'sidebar',
  className,
}: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <List className="h-4 w-4" />
          Contents
        </Button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 w-64 bg-popover border rounded-lg shadow-lg z-50 py-2 max-h-[400px] overflow-y-auto">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={chapter.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'block px-4 py-2 text-sm hover:bg-muted transition-colors',
                    chapter.id === currentChapterId && 'bg-muted font-medium text-primary'
                  )}
                >
                  <span className="text-muted-foreground mr-2">{chapter.number}.</span>
                  {chapter.title}
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // Sidebar variant
  return (
    <aside
      className={cn(
        'hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 w-64 max-h-[80vh] overflow-y-auto',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'border rounded-lg p-4 shadow-sm',
        className
      )}
    >
      <h3 className="text-sm font-semibold text-foreground mb-4">Contents</h3>
      <nav className="space-y-1">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={chapter.href}
            className={cn(
              'block text-sm py-1.5 px-2 rounded hover:bg-muted transition-colors',
              chapter.id === currentChapterId
                ? 'bg-muted font-medium text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="mr-2">{chapter.number}.</span>
            {chapter.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
