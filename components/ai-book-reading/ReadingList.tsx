'use client'

import { cn } from '@/lib/utils'

interface ReadingListProps {
  items: React.ReactNode[]
  type?: 'bullet' | 'numbered'
  className?: string
}

export function ReadingList({
  items,
  type = 'bullet',
  className,
}: ReadingListProps) {
  const Tag = type === 'numbered' ? 'ol' : 'ul'

  return (
    <Tag
      className={cn(
        'mb-6 space-y-3',
        type === 'bullet' && 'list-disc',
        type === 'numbered' && 'list-decimal',
        'pl-6 sm:pl-8',
        className
      )}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(
            'text-base sm:text-lg leading-relaxed text-foreground/90',
            'pl-2',
            '[&_strong]:font-semibold [&_strong]:text-foreground',
            '[&_em]:italic'
          )}
        >
          {item}
        </li>
      ))}
    </Tag>
  )
}
