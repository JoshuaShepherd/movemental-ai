'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface Section {
  id: string
  label: string
}

interface SectionNavProps {
  /** Array of sections */
  sections: Section[]
  /** Currently active section ID */
  activeSection?: string
  /** Section click handler */
  onSectionClick?: (sectionId: string) => void
  /** Make sticky on scroll */
  sticky?: boolean
  /** Custom class name */
  className?: string
}

export function SectionNav({
  sections,
  activeSection,
  onSectionClick,
  sticky = true,
  className,
}: SectionNavProps) {
  const [internalActive, setInternalActive] = useState(activeSection || sections[0]?.id)
  const currentSection = activeSection ?? internalActive

  // Update active section based on scroll position
  useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }))

      for (const { id, element } of sectionElements.reverse()) {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setInternalActive(id)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections, sticky])

  const handleClick = (sectionId: string) => {
    setInternalActive(sectionId)
    onSectionClick?.(sectionId)

    // Smooth scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={cn(
        'flex items-center justify-center gap-2 py-4 border-b',
        sticky && 'sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className={cn(
            'px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all',
            currentSection === section.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
          )}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}
