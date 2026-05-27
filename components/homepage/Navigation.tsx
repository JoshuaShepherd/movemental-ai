'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Menu, X, ChevronDown, Search, BookOpen, Layers, Brain, Sparkles, LayoutGrid, Zap, Target, DollarSign, Users, Building, Network, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

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

// Platform dropdown items
const platformItems: NavDropdownItem[] = [
  { label: 'How It Works', href: '/how-it-works', icon: <Zap className="h-4 w-4" />, description: 'See the platform in action' },
  { label: 'Self-Screen', href: '/fit-check', icon: <Target className="h-4 w-4" />, description: 'See if we\'re built for you' },
  { label: 'Pricing', href: '/pricing', icon: <DollarSign className="h-4 w-4" />, description: 'Plans for every stage' },
]

// Learn dropdown items (content path)
const learnItems: NavDropdownItem[] = [
  { label: 'AI Book', href: '/book', icon: <BookOpen className="h-4 w-4" />, description: 'The living artifact' },
  { label: 'Books', href: '/books', icon: <Layers className="h-4 w-4" />, description: 'Browse our catalog' },
  { label: 'Topics', href: '/topics', icon: <Brain className="h-4 w-4" />, description: 'Explore by subject' },
  { label: 'Resources', href: '/learn', icon: <Sparkles className="h-4 w-4" />, description: 'Guides & tutorials' },
]

// Company dropdown items
const companyItems: NavDropdownItem[] = [
  { label: 'Why Movemental', href: '/why-movemental', icon: <Heart className="h-4 w-4" />, description: 'Our mission & vision' },
  { label: 'About', href: '/about', icon: <Building className="h-4 w-4" />, description: 'Our story' },
  { label: 'Team', href: '/team', icon: <Users className="h-4 w-4" />, description: 'Meet the people' },
  { label: 'Network', href: '/network', icon: <Network className="h-4 w-4" />, description: 'Our community' },
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
            {/* Platform Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors outline-none',
                  'text-sage-300 hover:text-white hover:bg-white/10'
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
                  'text-sage-300 hover:text-white hover:bg-white/10'
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
                  'text-sage-300 hover:text-white hover:bg-white/10'
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

            {/* Templates CTA — pastoral-warm with Alan as default */}
            <Link
              href="/templates/library/pastoral-warm/?leader=alan-hirsch"
              className="ml-1 px-3 py-1.5 text-sm font-medium rounded-full transition-colors bg-velvet-orchid-500 text-white hover:bg-velvet-orchid-600"
            >
              Templates
            </Link>
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

            {/* Templates CTA — pastoral-warm with Alan as default */}
            <Link
              href="/templates/library/pastoral-warm/?leader=alan-hirsch"
              className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg text-white bg-velvet-orchid-500 hover:bg-velvet-orchid-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <LayoutGrid className="h-5 w-5" />
              Templates
            </Link>

            {/* Platform section */}
            <div className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-sage-400">
              Platform
            </div>
            {platformItems.map((item) => (
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

            {/* Learn section */}
            <div className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-sage-400">
              Learn
            </div>
            {learnItems.map((item) => (
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

            {/* Company section */}
            <div className="px-4 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-sage-400">
              Company
            </div>
            {companyItems.map((item) => (
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
