'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LucideIcon, ExternalLink } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
  badge?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

interface DashboardSidebarProps {
  sections: NavSection[]
  className?: string
}

export function DashboardSidebar({ sections, className }: DashboardSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'w-64 bg-muted/30 border-r h-full overflow-y-auto flex flex-col',
        'hidden lg:flex',
        className
      )}
    >
      {/* Logo / Brand */}
      <div className="p-4 border-b">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors"
        >
          Movemental
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-1 transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          View public site
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            {/* Section header */}
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {section.title}
            </h3>

            {/* Section items */}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary ml-[-2px] pl-[14px]'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                    >
                      {Icon && <Icon className="h-4 w-4 shrink-0" />}
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}
