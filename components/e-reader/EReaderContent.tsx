'use client'

import { cn } from '@/lib/utils'

interface EReaderContentProps {
  chapterTitle: string
  content: string
  fontSize: number
  theme: 'light' | 'sepia' | 'dark'
  lineSpacing: 'compact' | 'normal' | 'relaxed'
  className?: string
}

const themeClasses = {
  light: 'bg-white text-slate-900',
  sepia: 'bg-amber-50 text-amber-950',
  dark: 'bg-slate-900 text-slate-100',
}

const lineSpacingClasses = {
  compact: 'leading-relaxed',
  normal: 'leading-loose',
  relaxed: 'leading-[2]',
}

export function EReaderContent({
  chapterTitle,
  content,
  fontSize,
  theme,
  lineSpacing,
  className,
}: EReaderContentProps) {
  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300',
        themeClasses[theme],
        className
      )}
    >
      <article className="max-w-[65ch] mx-auto px-6 py-12">
        {/* Chapter Title */}
        <h1
          className="font-bold mb-8 text-center"
          style={{ fontSize: `${fontSize * 1.5}px` }}
        >
          {chapterTitle}
        </h1>

        {/* Content */}
        <div
          className={cn(
            'prose dark:prose-invert max-w-none',
            lineSpacingClasses[lineSpacing]
          )}
          style={{ fontSize: `${fontSize}px` }}
        >
          {content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  )
}
