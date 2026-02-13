'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

// Map of path segments to human-readable labels
const pathLabels: Record<string, string> = {
  'fit-check': 'Self-Screen',
  'why-movemental': 'Why Movemental',
  book: 'AI Book',
  learn: 'Learn',
  network: 'Network',
  team: 'Team',
  pricing: 'Pricing',
  onboarding: 'Onboarding',
  legal: 'Legal',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
  cookies: 'Cookie Policy',
  security: 'Security',
  dashboard: 'Dashboard',
  settings: 'Settings',
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const segments = pathname.split('/').filter(Boolean)
    const generated: BreadcrumbItem[] = []
    let currentPath = ''

    segments.forEach((segment) => {
      currentPath += `/${segment}`
      // Skip dynamic segments like [chapterId]
      if (!segment.startsWith('[')) {
        generated.push({
          label: pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
          href: currentPath,
        })
      }
    })

    return generated
  })()

  if (breadcrumbs.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-sm', className)}>
      <ol className="flex items-center gap-1">
        {/* Home link */}
        <li>
          <Link
            href="/"
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* Breadcrumb items */}
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li key={item.href} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
