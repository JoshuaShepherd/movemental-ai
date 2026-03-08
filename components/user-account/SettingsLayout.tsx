'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SettingsSection {
  title: string
  items: { label: string; href: string; icon?: LucideIcon }[]
}

interface SettingsLayoutProps {
  children: React.ReactNode
  sections: SettingsSection[]
  title: string
  description?: string
  saveAction?: {
    label: string
    onClick: () => void
    isLoading?: boolean
    isDisabled?: boolean
  }
  className?: string
}

export function SettingsLayout({
  children,
  sections,
  title,
  description,
  saveAction,
  className,
}: SettingsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className={cn('flex min-h-screen', className)}>
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 border-r p-6 shrink-0">
        <nav className="space-y-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 py-2 px-3 rounded-md text-sm transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        )}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {saveAction && (
            <Button
              onClick={saveAction.onClick}
              disabled={saveAction.isLoading || saveAction.isDisabled}
            >
              {saveAction.isLoading ? 'Saving...' : saveAction.label}
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="max-w-2xl">{children}</div>
      </main>
    </div>
  )
}
