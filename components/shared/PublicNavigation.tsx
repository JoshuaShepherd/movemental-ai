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
import { Menu, X, ChevronDown, Search, BookOpen, Layers, Brain, Sparkles, User, Zap, Target, DollarSign, Users, Building, Network, Heart, LayoutGrid, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Full logo (horizontal) — full color for both light and dark nav. Per _docs/ui/logo-usage.md */
const LOGO_NAV = '/media-library/images/logo/logo-horizontal-full-color-h32.webp'

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

// Platform dropdown items
const platformItems: NavDropdownItem[] = [
  { label: 'How It Works', href: '/how-it-works', icon: <Zap className="h-4 w-4" />, description: 'See the platform in action' },
  { label: 'Self-Screen', href: '/fit-check', icon: <Target className="h-4 w-4" />, description: 'See if we\'re built for you' },
  { label: 'Pricing', href: '/pricing', icon: <DollarSign className="h-4 w-4" />, description: 'Plans for every stage' },
  { label: 'FAQ', href: '/faq', icon: <HelpCircle className="h-4 w-4" />, description: 'Billing, ownership, roles & support' },
]

// Learn dropdown items (content path)
const learnItems: NavDropdownItem[] = [
  { label: 'AI Book', href: '/book', icon: <BookOpen className="h-4 w-4" />, description: 'The living artifact' },
  { label: 'Books', href: '/books', icon: <Layers className="h-4 w-4" />, description: 'Browse our catalog' },
  { label: 'Topics', href: '/topics', icon: <Brain className="h-4 w-4" />, description: 'Explore by subject' },
  { label: 'Resources', href: '/learn', icon: <Sparkles className="h-4 w-4" />, description: 'Guides & tutorials' },
  { label: 'Profile Workspace', href: '/profile-workspace', icon: <User className="h-4 w-4" />, description: 'Your voice & work' },
]

// Company dropdown items
const companyItems: NavDropdownItem[] = [
  { label: 'Why Movemental', href: '/why-movemental', icon: <Heart className="h-4 w-4" />, description: 'Our mission & vision' },
  { label: 'About', href: '/about', icon: <Building className="h-4 w-4" />, description: 'Our story' },
  { label: 'Team', href: '/team', icon: <Users className="h-4 w-4" />, description: 'Meet the people' },
  { label: 'Network', href: '/network', icon: <Network className="h-4 w-4" />, description: 'Our community' },
]

// All dropdown items for checking active states
const allDropdownItems = [...platformItems, ...learnItems, ...companyItems]

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
          <Link
            href="/"
            className="inline-flex items-center shrink-0"
            aria-label="Movemental home"
          >
            <Image
              src={LOGO_NAV}
              alt="Movemental"
              width={67}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Platform Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors outline-none',
                  isDark
                    ? platformItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-white bg-white/10'
                      : 'text-sage-300 hover:text-white hover:bg-white/10'
                    : platformItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                Platform
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {platformItems.map((item) => (
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

            {/* Learn Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors outline-none',
                  isDark
                    ? learnItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-white bg-white/10'
                      : 'text-sage-300 hover:text-white hover:bg-white/10'
                    : learnItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                Learn
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {learnItems.map((item) => (
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

            {/* Company Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors outline-none',
                  isDark
                    ? companyItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-white bg-white/10'
                      : 'text-sage-300 hover:text-white hover:bg-white/10'
                    : companyItems.some(item => pathname === item.href || pathname.startsWith(item.href + '/'))
                      ? 'text-foreground bg-muted'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                Company
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {companyItems.map((item) => (
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
              className="ml-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors bg-velvet-orchid-500 text-white hover:bg-velvet-orchid-600"
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

            {/* Templates CTA (mobile) */}
            <Link
              href="/templates"
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg bg-velvet-orchid-500 text-white hover:bg-velvet-orchid-600 transition-colors"
            >
              <LayoutGrid className="h-5 w-5" />
              Templates
            </Link>

            {/* Platform section */}
            <div
              className={cn(
                'px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider',
                isDark ? 'text-sage-400' : 'text-muted-foreground'
              )}
            >
              Platform
            </div>
            {platformItems.map((item) => {
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

            {/* Learn section */}
            <div
              className={cn(
                'px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider',
                isDark ? 'text-sage-400' : 'text-muted-foreground'
              )}
            >
              Learn
            </div>
            {learnItems.map((item) => {
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

            {/* Company section */}
            <div
              className={cn(
                'px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider',
                isDark ? 'text-sage-400' : 'text-muted-foreground'
              )}
            >
              Company
            </div>
            {companyItems.map((item) => {
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
