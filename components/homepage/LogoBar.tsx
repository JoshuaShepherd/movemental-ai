'use client'

import { cn } from '@/lib/utils'

interface LogoBarProps {
  /** Optional additional class names */
  className?: string
}

// Placeholder logos - these would be replaced with actual partner/customer logos
const logos = [
  { name: 'Partner 1', placeholder: true },
  { name: 'Partner 2', placeholder: true },
  { name: 'Partner 3', placeholder: true },
  { name: 'Partner 4', placeholder: true },
  { name: 'Partner 5', placeholder: true },
]

export function LogoBar({ className }: LogoBarProps) {
  return (
    <section
      className={cn(
        'py-12 sm:py-16 bg-background border-y border-border/50',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tagline */}
        <p className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-8">
          Trusted by movement leaders who are transforming their communities
        </p>

        {/* Logo grid */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-60">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-8 sm:h-10"
            >
              {/* Placeholder logo - replace with actual logos */}
              <div
                className={cn(
                  'px-6 py-2 rounded-md',
                  'bg-muted text-muted-foreground',
                  'text-sm font-medium'
                )}
              >
                {logo.placeholder ? 'Logo' : logo.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
