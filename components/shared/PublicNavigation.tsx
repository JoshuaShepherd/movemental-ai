'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, ChevronDown, Search, BookOpen, Layers, Brain, Sparkles, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

interface NavDropdownItem {
  label: string
  href: string
  icon?: React.ReactNode
  description?: string
}

interface PublicNavigationProps {
  variant?: 'dark' | 'light'
  className?: string
}

// Main navigation items (excluding dropdowns)
const navItems: NavItem[] = [
  { label: 'Fit Check', href: '/fit-check' },
  { label: 'Why Movemental', href: '/why-movemental' },
]

// Content dropdown items
const contentItems: NavDropdownItem[] = [
  { label: 'AI Book', href: '/book', icon: <BookOpen className="h-4 w-4" />, description: 'Interactive AI-powered book' },
  { label: 'Books', href: '/books', icon: <Layers className="h-4 w-4" />, description: 'Browse our book catalog' },
  { label: 'Topics', href: '/topics', icon: <Brain className="h-4 w-4" />, description: 'Explore by subject' },
  { label: 'AI Vision', href: '/ai-vision', icon: <Sparkles className="h-4 w-4" />, description: 'Movemental Intelligence' },
  { label: 'Learn', href: '/learn', icon: <GraduationCap className="h-4 w-4" />, description: 'Courses & resources' },
]

// Secondary navigation items (after dropdown)
const secondaryNavItems: NavItem[] = [
  { label: 'Network', href: '/network' },
  { label: 'Team', href: '/team' },
  { label: 'Pricing', href: '/pricing' },
]

export function PublicNavigation({ variant = 'light', className }: PublicNavigationProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isDark = variant === 'dark'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        isDark
          ? isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800'
            : 'bg-slate-900'
          : isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b'
            : 'bg-background border-b',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'flex items-center gap-2 font-bold text-xl tracking-tight',
              isDark ? 'text-white' : 'text-foreground'
            )}
          >
            Movemental
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Primary nav items */}
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isDark
                      ? isActive
                        ? 'text-white bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Content Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors outline-none',
                  isDark
                    ? contentItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-white bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    : contentItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                Content
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {contentItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-start gap-3 p-3">
                      <span className="text-muted-foreground mt-0.5">{item.icon}</span>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        )}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Secondary nav items */}
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isDark
                      ? isActive
                        ? 'text-white bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/search"
              className={cn(
                'p-2 rounded-md transition-colors',
                isDark
                  ? 'text-slate-300 hover:text-white hover:bg-white/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Button
              asChild
              size="sm"
              className={cn(
                isDark
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-primary hover:bg-primary/90'
              )}
            >
              <Link href="/fit-check">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className={cn(
              'lg:hidden p-2',
              isDark ? 'text-white' : 'text-foreground'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            'lg:hidden border-b',
            isDark
              ? 'bg-slate-900/95 backdrop-blur-md border-slate-800'
              : 'bg-background/95 backdrop-blur-md'
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-1">
            {/* Search */}
            <Link
              href="/search"
              className={cn(
                'flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors',
                isDark
                  ? pathname === '/search'
                    ? 'text-white bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                  : pathname === '/search'
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              <Search className="h-5 w-5" />
              Search
            </Link>

            {/* Primary nav items */}
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                    isDark
                      ? isActive
                        ? 'text-white bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Content section header */}
            <div
              className={cn(
                'px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider',
                isDark ? 'text-slate-500' : 'text-muted-foreground'
              )}
            >
              Content
            </div>

            {/* Content items */}
            {contentItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors',
                    isDark
                      ? isActive
                        ? 'text-white bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <span className="text-muted-foreground">{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}

            {/* Secondary nav items */}
            {secondaryNavItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block px-4 py-3 text-base font-medium rounded-lg transition-colors',
                    isDark
                      ? isActive
                        ? 'text-white bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="pt-4">
              <Button
                asChild
                className={cn(
                  'w-full',
                  isDark
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-primary hover:bg-primary/90'
                )}
              >
                <Link href="/fit-check">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
