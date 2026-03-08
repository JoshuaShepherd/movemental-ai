'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface PricingTier {
  id: string
  name: string
  price: { monthly: number; annual: number }
  description: string
  features: string[]
  cta: { label: string; href: string }
  isHighlighted?: boolean
  badge?: string
}

interface PricingCardProps {
  tier: PricingTier
  billingPeriod: 'monthly' | 'annual'
  onSelect?: () => void
  className?: string
}

export function PricingCard({
  tier,
  billingPeriod,
  onSelect,
  className,
}: PricingCardProps) {
  const price = tier.price[billingPeriod]
  const isAnnual = billingPeriod === 'annual'

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-200',
        tier.isHighlighted
          ? 'border-primary bg-gradient-to-b from-primary/5 to-transparent ring-2 ring-primary'
          : 'hover:border-primary/50',
        className
      )}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-lg">
          {tier.badge}
        </div>
      )}

      <div className="p-6">
        {/* Tier name */}
        <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">${price}</span>
            <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
          </div>
          {isAnnual && (
            <p className="text-sm text-emerald-600 mt-1">
              Save ${(tier.price.monthly * 12 - tier.price.annual).toLocaleString()}/year
            </p>
          )}
        </div>

        {/* CTA */}
        <Button
          className="w-full mb-6"
          variant={tier.isHighlighted ? 'default' : 'outline'}
          onClick={onSelect}
          asChild
        >
          <a href={tier.cta.href}>{tier.cta.label}</a>
        </Button>

        {/* Features */}
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <Check className="h-5 w-5 text-emerald-500 shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
