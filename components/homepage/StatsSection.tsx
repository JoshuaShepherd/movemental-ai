import { cn } from '@/lib/utils'
import { Shield, TrendingUp, Sparkles, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Stat {
  /** Lucide icon for the stat */
  icon: LucideIcon
  /** Label describing the stat */
  label: string
  /** Additional context or description */
  description: string
}

interface StatsSectionProps {
  /** Optional additional class names */
  className?: string
}

const stats: Stat[] = [
  {
    icon: Shield,
    label: 'Credibility-First',
    description: 'Peer trust signals that AI cannot fake. Your reputation, verified by real relationships.',
  },
  {
    icon: TrendingUp,
    label: 'Content That Compounds',
    description: 'Internal and external linking, structured presence, designed for discovery over time.',
  },
  {
    icon: Sparkles,
    label: 'AI for Amplification',
    description: 'AI handles the mechanics—formatting, structure, metadata—while your voice stays yours.',
  },
  {
    icon: Rocket,
    label: '2–4 Weeks to Launch',
    description: 'What used to require agencies and huge budgets now ships in weeks.',
  },
]

export function StatsSection({ className }: StatsSectionProps) {
  return (
    <section
      className={cn(
        'py-16 sm:py-20 bg-scarlet-rush-500',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-xl bg-white/10">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-lg sm:text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-scarlet-rush-100 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
