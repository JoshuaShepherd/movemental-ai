'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  X,
  Settings,
  User,
  LogOut
} from 'lucide-react'

interface DashboardHeaderProps {
  title?: string
  showSearch?: boolean
  onMenuToggle?: () => void
  isMenuOpen?: boolean
  className?: string
}

export function DashboardHeader({
  title = 'Dashboard',
  showSearch = true,
  onMenuToggle,
  isMenuOpen,
  className,
}: DashboardHeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        'flex items-center justify-between px-4 lg:px-6',
        className
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuToggle}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Title */}
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      {/* Center - Search (desktop) */}
      {showSearch && (
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search content..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border bg-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Create button */}
        <Button size="sm" className="gap-2 hidden sm:flex">
          <Plus className="h-4 w-4" />
          Create
        </Button>
        <Button size="icon" className="sm:hidden" variant="ghost">
          <Plus className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>

        {/* User menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="rounded-full"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
          </Button>

          {isUserMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsUserMenuOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-popover border rounded-lg shadow-lg z-50 py-1">
                <a
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </a>
                <a
                  href="/dashboard/settings/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4" />
                  Profile
                </a>
                <hr className="my-1 border-border" />
                <button
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
