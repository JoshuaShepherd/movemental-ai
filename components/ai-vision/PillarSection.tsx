'use client'

import { LucideIcon } from 'lucide-react'
import { ScrollRevealBlock } from './ScrollRevealBlock'
import { PillarCard } from './PillarCard'
import { cn } from '@/lib/utils'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface PillarSectionProps {
  id: string
  title: string
  subtitle: string
  description: string
  features: Feature[]
  className?: string
}

export function PillarSection({
  id,
  title,
  subtitle,
  description,
  features,
  className,
}: PillarSectionProps) {
  return (
    <section
      id={id}
      className={cn('py-24 sm:py-32 scroll-mt-24', className)}
    >
      <ScrollRevealBlock>
        <div className="mb-4">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {subtitle}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12">
          {description}
        </p>
      </ScrollRevealBlock>

      <div className="grid sm:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <ScrollRevealBlock key={feature.title} delay={index * 100}>
            <PillarCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </ScrollRevealBlock>
        ))}
      </div>
    </section>
  )
}
