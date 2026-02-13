'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface PublicFooterProps {
  variant?: 'dark' | 'light'
  className?: string
}

const footerSections = [
  {
    title: 'Platform',
    links: [
      { label: 'Self-Screen', href: '/fit-check' },
      { label: 'Why Movemental', href: '/why-movemental' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'AI Book', href: '/book' },
      { label: 'Books', href: '/books' },
      { label: 'Topics', href: '/topics' },
      { label: 'Learn', href: '/learn' },
      { label: 'Search', href: '/search' },
      { label: 'Network', href: '/network' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'What Is Movemental', href: '/what-is-movemental' },
      { label: 'AI Vision', href: '/ai-vision' },
      { label: 'Team', href: '/team' },
    ],
  },
]

export function PublicFooter({ variant = 'light', className }: PublicFooterProps) {
  const currentYear = new Date().getFullYear()
  const isDark = variant === 'dark'

  return (
    <footer
      className={cn(
        'py-12 sm:py-16 border-t',
        isDark
          ? 'bg-sage-950 border-sage-800'
          : 'bg-muted/30 border-border',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column — full logo per _docs/ui/logo-usage.md */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center mb-4"
              aria-label="Movemental home"
            >
              <Image
                src="/media-library/images/logo/logo-horizontal-full-color-h32.webp"
                alt="Movemental"
                width={67}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p
              className={cn(
                'text-sm leading-relaxed',
                isDark ? 'text-bright-snow-400' : 'text-muted-foreground'
              )}
            >
              Complete digital publishing platforms for movement leaders.
              Own your platform. Keep your revenue.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className={cn(
                  'text-sm font-semibold uppercase tracking-wider mb-4',
                  isDark ? 'text-white' : 'text-foreground'
                )}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-sm transition-colors',
                        isDark
                          ? 'text-bright-snow-400 hover:text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className={cn(
            'mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4',
            isDark ? 'border-sage-800' : 'border-border'
          )}
        >
          <p
            className={cn(
              'text-sm',
              isDark ? 'text-bright-snow-500' : 'text-muted-foreground'
            )}
          >
            &copy; {currentYear} Movemental. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacy"
              className={cn(
                'text-sm transition-colors',
                isDark
                  ? 'text-bright-snow-500 hover:text-bright-snow-300'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className={cn(
                'text-sm transition-colors',
                isDark
                  ? 'text-bright-snow-500 hover:text-bright-snow-300'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
