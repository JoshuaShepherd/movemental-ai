'use client'

import { useMemo } from 'react'
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

/**
 * Simple markdown parser for e-reader content.
 * Handles: ## headings, **bold**, *italic*, paragraphs
 */
function parseMarkdown(content: string): string {
  let html = content
    // Escape HTML entities first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers (## and ###)
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-10 mb-6">$1</h2>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Bullet lists
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-current/20" />')

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/(<li[^>]*>.*?<\/li>\n?)+/g, (match) => {
    return `<ul class="list-disc space-y-2 my-4">${match}</ul>`
  })

  // Convert double newlines to paragraph breaks (but not around block elements)
  const blocks = html.split('\n\n')
  html = blocks
    .map((block) => {
      const trimmed = block.trim()
      // Don't wrap if already a block element
      if (
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<hr') ||
        trimmed === ''
      ) {
        return trimmed
      }
      // Wrap in paragraph
      return `<p class="mb-6">${trimmed.replace(/\n/g, '<br />')}</p>`
    })
    .join('\n')

  return html
}

export function EReaderContent({
  chapterTitle,
  content,
  fontSize,
  theme,
  lineSpacing,
  className,
}: EReaderContentProps) {
  const htmlContent = useMemo(() => parseMarkdown(content), [content])

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
            lineSpacingClasses[lineSpacing],
            // Theme-specific prose adjustments
            theme === 'sepia' && 'prose-amber',
            theme === 'dark' && 'prose-invert'
          )}
          style={{ fontSize: `${fontSize}px` }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  )
}
