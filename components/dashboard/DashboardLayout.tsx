'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { DashboardSidebar, NavSection } from './DashboardSidebar'
import { DashboardHeader } from './DashboardHeader'

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebarSections: NavSection[]
  title?: string
  className?: string
}

export function DashboardLayout({
  children,
  sidebarSections,
  title = 'Dashboard',
  className,
}: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 lg:transform-none lg:relative',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <DashboardSidebar sections={sidebarSections} />
      </div>

      {/* Main content area */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <DashboardHeader
          title={title}
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMenuOpen={isMobileMenuOpen}
        />

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
