'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface ChapterLink {
  id: string
  title: string
  href: string
}

interface ChapterNavProps {
  previousChapter?: ChapterLink
  nextChapter?: ChapterLink
  className?: string
}

export function ChapterNav({
  previousChapter,
  nextChapter,
  className,
}: ChapterNavProps) {
  return (
    <nav
      className={cn(
        'flex flex-col sm:flex-row justify-between gap-4 pt-12 mt-12 border-t',
        className
      )}
    >
      {previousChapter ? (
        <Button variant="outline" asChild className="flex-1 h-auto py-4 justify-start">
          <Link href={previousChapter.href}>
            <ArrowLeft className="mr-3 h-4 w-4 shrink-0" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground mb-1">Previous</p>
              <p className="font-medium truncate">{previousChapter.title}</p>
            </div>
          </Link>
        </Button>
      ) : (
        <div className="flex-1" />
      )}

      {nextChapter ? (
        <Button variant="outline" asChild className="flex-1 h-auto py-4 justify-end">
          <Link href={nextChapter.href}>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Next</p>
              <p className="font-medium truncate">{nextChapter.title}</p>
            </div>
            <ArrowRight className="ml-3 h-4 w-4 shrink-0" />
          </Link>
        </Button>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
