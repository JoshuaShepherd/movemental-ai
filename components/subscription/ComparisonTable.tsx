'use client'

import { cn } from '@/lib/utils'
import { Check, X, Minus } from 'lucide-react'

interface Tier {
  id: string
  name: string
  price: number
  period: string
}

interface Feature {
  name: string
  values: Record<string, string | boolean | number>
}

interface Category {
  name: string
  features: Feature[]
}

interface ComparisonTableProps {
  tiers: Tier[]
  categories: Category[]
  className?: string
}

function FeatureValue({ value }: { value: string | boolean | number }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check className="h-5 w-5 text-emerald-500 mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground/30 mx-auto" />
    )
  }
  if (value === '-') {
    return <Minus className="h-5 w-5 text-muted-foreground/30 mx-auto" />
  }
  return <span className="text-sm text-foreground">{value}</span>
}

export function ComparisonTable({ tiers, categories, className }: ComparisonTableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full min-w-[600px]">
        {/* Header */}
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left font-medium text-muted-foreground">
              Features
            </th>
            {tiers.map((tier) => (
              <th key={tier.id} className="p-4 text-center">
                <div className="font-semibold text-foreground">{tier.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${tier.price}/{tier.period}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {categories.map((category) => (
            <>
              {/* Category header */}
              <tr key={`cat-${category.name}`}>
                <td
                  colSpan={tiers.length + 1}
                  className="p-4 pt-8 font-semibold text-foreground text-sm uppercase tracking-wider bg-muted/30"
                >
                  {category.name}
                </td>
              </tr>

              {/* Features */}
              {category.features.map((feature) => (
                <tr key={feature.name} className="border-b hover:bg-muted/20">
                  <td className="p-4 text-sm text-muted-foreground">
                    {feature.name}
                  </td>
                  {tiers.map((tier) => (
                    <td key={tier.id} className="p-4 text-center">
                      <FeatureValue value={feature.values[tier.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}
