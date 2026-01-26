'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FooterProps {
  /** Optional additional class names */
  className?: string
}

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Fit Check', href: '/fit-check' },
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

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'bg-slate-950 border-t border-slate-800',
        'py-12 sm:py-16',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-bold text-white mb-4"
            >
              Movemental
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Complete digital publishing platforms for movement leaders.
              Own your platform. Keep your revenue.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
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
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Movemental. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacy"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/legal/terms"
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
