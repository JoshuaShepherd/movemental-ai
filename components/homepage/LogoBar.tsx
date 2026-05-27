import { cn } from '@/lib/utils'
import { Users, Link2, Sparkles } from 'lucide-react'

interface CredibilityChainSectionProps {
  /** Optional additional class names */
  className?: string
}

const credibilityPoints = [
  {
    icon: Sparkles,
    text: 'In an AI-saturated world, trust is the scarce resource.',
  },
  {
    icon: Users,
    text: "Movemental is a network of verified peers who reference, link, and reinforce one another's work.",
  },
  {
    icon: Link2,
    text: "Your content moves farther when it doesn't move alone.",
  },
]

/**
 * CredibilityChainSection - Replaces the placeholder LogoBar
 * Emphasizes credibility network / scenius positioning
 */
export function CredibilityChainSection({ className }: CredibilityChainSectionProps) {
  return (
    <section
      className={cn(
        'py-12 sm:py-16 bg-background border-y border-border/50',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-foreground mb-8">
          Credibility travels through people.
        </h2>

        {/* Credibility points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {credibilityPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center text-center p-4',
                'rounded-lg'
              )}
            >
              <div className="mb-3 p-2 rounded-full bg-scarlet-rush-100">
                <point.icon className="w-5 h-5 text-scarlet-rush-500" />
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Keep LogoBar export for backward compatibility with imports
export { CredibilityChainSection as LogoBar }
