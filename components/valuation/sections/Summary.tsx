'use client'

import { cn } from '@/lib/utils'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatCurrency, yearOneProjection, valuationMultiples } from '../data/valuation-data'

interface SummaryProps {
  className?: string
}

export function Summary({ className }: SummaryProps) {
  const lowValuation = yearOneProjection.totalARR.value * valuationMultiples.low
  const highValuation = yearOneProjection.totalARR.value * valuationMultiples.high

  return (
    <div className={cn('space-y-16 text-center', className)}>
      <NarrativeStatement alignment="center">
        Movemental is not asking to be believed. <strong>We&apos;re showing the math.</strong>
      </NarrativeStatement>

      {/* Summary Stats */}
      <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-muted/30 border">
          <p className="text-sm text-muted-foreground mb-1">Year One Target</p>
          <p className="text-3xl font-bold">{formatCurrency(yearOneProjection.totalARR.value)}</p>
          <p className="text-xs text-muted-foreground mt-1">ARR</p>
        </div>
        <div className="p-6 rounded-xl bg-muted/30 border">
          <p className="text-sm text-muted-foreground mb-1">Multiple Range</p>
          <p className="text-3xl font-bold">{valuationMultiples.low}×–{valuationMultiples.high}×</p>
          <p className="text-xs text-muted-foreground mt-1">SaaS Standard</p>
        </div>
        <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Implied Valuation</p>
          <p className="text-3xl font-bold text-primary">
            {formatCurrency(lowValuation)}–{formatCurrency(highValuation)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Year One</p>
        </div>
      </div>

      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        This page exists so you don&apos;t have to take our word for it.
        The model is transparent. The math is checkable.
      </p>

      {/* Gentle Exit */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <Button asChild variant="outline" size="lg" className="h-12 px-6">
          <Link href="/fit-check">
            See If This Fits You
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="h-12 px-6">
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
