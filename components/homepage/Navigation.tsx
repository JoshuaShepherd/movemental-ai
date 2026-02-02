'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu, X, ChevronDown, Search, BookOpen, Layers, Brain, Sparkles, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  /** Display label for the navigation item */
  label: string
  /** URL to navigate to */
  href: string
  /** Whether this is a primary navigation item */
  primary?: boolean
}

interface NavDropdownItem {
  label: string
  href: string
  icon?: React.ReactNode
  description?: string
}

interface NavigationProps {
  /** Optional additional class names */
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
]

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-sage-900/95 backdrop-blur-md border-b border-sage-800'
          : 'bg-transparent',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-white"
          >
            Movemental
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Primary nav items */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-colors',
                  'text-sage-300 hover:text-white hover:bg-white/10'
                )}
              >
                {item.label}
              </Link>
            ))}

            {/* Templates */}
            <Link
              href="/templates"
              className="px-3 py-1.5 text-sm font-medium rounded-full transition-colors bg-velvet-orchid-500 text-white hover:bg-velvet-orchid-600"
            >
              Templates
            </Link>

            {/* Explore Dropdown (Tier C) */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-colors outline-none',
                  'text-sage-300 hover:text-white hover:bg-white/10'
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
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 text-sage-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Button
              asChild
              size="sm"
              className="bg-scarlet-rush-500 hover:bg-scarlet-rush-600 text-white"
            >
              <Link href="/fit-check">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white"
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
        <div className="md:hidden bg-sage-900/95 backdrop-blur-md border-b border-sage-800">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {/* Search */}
            <Link
              href="/search"
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg text-sage-300 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search className="h-5 w-5" />
              Search
            </Link>

            {/* Primary nav items */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-base font-medium rounded-lg text-sage-300 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Templates */}
            <Link
              href="/templates"
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg text-white bg-velvet-orchid-500 hover:bg-velvet-orchid-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutGrid className="h-5 w-5" />
              Templates
            </Link>

            {/* Explore section header */}
            <div className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-sage-400">
              Explore
            </div>

            {/* Explore items */}
            {exploreItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg text-sage-300 hover:text-white hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-sage-300">{item.icon}</span>
                {item.label}
              </Link>
            ))}

            <div className="pt-4">
              <Button
                asChild
                className="w-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 text-white"
              >
                <Link href="/fit-check" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
