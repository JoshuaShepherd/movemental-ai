'use client'

import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  children: React.ReactNode
  level?: 2 | 3
  id?: string
  className?: string
}

export function SectionHeader({
  children,
  level = 2,
  id,
  className,
}: SectionHeaderProps) {
  const Tag = `h${level}` as 'h2' | 'h3'

  const levelStyles = {
    2: 'text-2xl sm:text-3xl font-bold mt-16 sm:mt-20 mb-6',
    3: 'text-xl sm:text-2xl font-semibold mt-10 sm:mt-12 mb-4',
  }

  return (
    <Tag
      id={id}
      className={cn(
        'text-foreground scroll-mt-20',
        levelStyles[level],
        className
      )}
    >
      {children}
    </Tag>
  )
}
