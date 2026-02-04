'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, ChevronDown, Search, BookOpen, Layers, Brain, Sparkles, User } from 'lucide-react'
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

// Tier A: Primary navigation items (conversion path)
const navItems: NavItem[] = [
  { label: 'Fit Check', href: '/fit-check' },
  { label: 'Why Movemental', href: '/why-movemental' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
]

// Tier C: Explore dropdown items (content path)
const exploreItems: NavDropdownItem[] = [
  { label: 'AI Book', href: '/book', icon: <BookOpen className="h-4 w-4" />, description: 'The living artifact' },
  { label: 'Books', href: '/books', icon: <Layers className="h-4 w-4" />, description: 'Browse our catalog' },
  { label: 'Topics', href: '/topics', icon: <Brain className="h-4 w-4" />, description: 'Explore by subject' },
  { label: 'Learn', href: '/learn', icon: <Sparkles className="h-4 w-4" />, description: 'Resources & guides' },
  { label: 'Profile Workspace', href: '/profile-workspace', icon: <User className="h-4 w-4" />, description: 'Your voice & work' },
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
            ? 'bg-sage-900/95 backdrop-blur-md border-b border-sage-800'
            : 'bg-sage-900'
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
            className="flex items-center gap-2"
          >
            <Image
              src="/media-library/images/logo/mark.webp"
              alt="Movemental mark"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <Image
              src="/media-library/images/logo/logo.webp"
              alt="Movemental"
              width={140}
              height={32}
              className="h-7 w-auto"
            />
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
                        : 'text-sage-300 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Explore Dropdown (Tier C) */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors outline-none',
                  isDark
                    ? exploreItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-white bg-white/10'
                      : 'text-sage-300 hover:text-white hover:bg-white/10'
                    : exploreItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                Explore
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {exploreItems.map((item) => (
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

            {/* Templates CTA */}
            <Link
              href="/templates"
              className={cn(
                'ml-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
                isDark
                  ? 'bg-velvet-orchid-500 text-white hover:bg-velvet-orchid-600'
                  : 'bg-velvet-orchid-500 text-white hover:bg-velvet-orchid-600'
              )}
            >
              Templates
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/search"
              className={cn(
                'p-2 rounded-md transition-colors',
                isDark
                  ? 'text-sage-300 hover:text-white hover:bg-white/10'
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
                  ? 'bg-scarlet-rush-500 hover:bg-scarlet-rush-600 text-white'
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
              ? 'bg-sage-900/95 backdrop-blur-md border-sage-800'
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
                    : 'text-sage-300 hover:text-white hover:bg-white/10'
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
                        : 'text-sage-300 hover:text-white hover:bg-white/10'
                      : isActive
                        ? 'text-foreground bg-muted'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            {/* Templates CTA (mobile) */}
            <Link
              href="/templates"
              className="block px-4 py-3 text-base font-medium rounded-lg bg-velvet-orchid-500 text-white hover:bg-velvet-orchid-600 transition-colors"
            >
              Templates
            </Link>

            {/* Explore section header */}
            <div
              className={cn(
                'px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider',
                isDark ? 'text-sage-400' : 'text-muted-foreground'
              )}
            >
              Explore
            </div>

            {/* Explore items */}
            {exploreItems.map((item) => {
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
                        : 'text-sage-300 hover:text-white hover:bg-white/10'
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

            <div className="pt-4">
              <Button
                asChild
                className={cn(
                  'w-full',
                  isDark
                    ? 'bg-scarlet-rush-500 hover:bg-scarlet-rush-600 text-white'
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
