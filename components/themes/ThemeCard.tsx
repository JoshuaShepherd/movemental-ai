'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Theme } from '@/lib/data/themes'
import { getThemeAccentGradient } from '@/lib/data/themes'

export interface ThemeCardProps {
  theme: Theme
  className?: string
}

export function ThemeCard({ theme, className }: ThemeCardProps) {
  const gradient = getThemeAccentGradient(theme.slug)

  return (
    <Card
      className={cn(
        'group relative h-full flex flex-col overflow-hidden',
        'border border-border/80 rounded-xl',
        'bg-card shadow-[var(--shadow-mvmt-sm)] hover:shadow-[var(--shadow-mvmt-md)]',
        'transition-all duration-300 hover:border-sage-300 dark:hover:border-sage-600',
        'before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1',
        `before:bg-gradient-to-b before:from-sage-500 before:to-sage-700 before:opacity-70`,
        'hover:before:opacity-100 hover:before:transition-opacity',
        className
      )}
    >
      {/* Top accent bar */}
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity',
          gradient
        )}
      />

      <CardHeader className="flex-1 pb-2 pt-7">
        {theme.coverImage ? (
          <div className="mb-4 rounded-lg overflow-hidden border border-border/40 aspect-video relative bg-muted">
            <Image
              src={theme.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ) : (
          <div
            className={cn(
              'mb-4 rounded-lg aspect-[4/3] bg-gradient-to-br flex items-center justify-center',
              gradient,
              'text-white/90 text-4xl font-semibold'
            )}
          >
            {theme.title.charAt(0)}
          </div>
        )}

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-sage-100 dark:bg-sage-900/50 border border-sage-200 dark:border-sage-700 w-fit mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-sage-700 dark:text-sage-300">
            Theme
          </span>
        </div>

        <CardTitle className="text-xl font-bold text-foreground group-hover:text-sage-800 dark:group-hover:text-sage-200 transition-colors leading-tight">
          {theme.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mt-1">
          {theme.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 pb-6">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />
        <Button
          variant="default"
          size="default"
          className="w-full font-semibold bg-sage-600 hover:bg-sage-700 text-white shadow-sm"
          asChild
        >
          <Link href={`/themes/${theme.slug}`} className="flex items-center justify-center">
            Explore theme
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
