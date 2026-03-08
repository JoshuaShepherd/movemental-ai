'use client'

import { Navigation } from './Navigation'
import { DarkHeroSection } from './DarkHeroSection'
import { CredibilityChainSection } from './LogoBar'
import { StatsSection } from './StatsSection'
import { ProcessSteps } from './ProcessSteps'
import { FeatureSection } from './FeatureSection'
import { CTASection } from './CTASection'
import { Footer } from './Footer'
import { cn } from '@/lib/utils'

interface HomepageContainerProps {
  /** Optional additional class names */
  className?: string
}

export function HomepageContainer({ className }: HomepageContainerProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      {/* Fixed navigation */}
      <Navigation />

      {/* Main content */}
      <main>
        {/* Hero section - credibility-first messaging */}
        <DarkHeroSection />

        {/* Credibility chain - scenius positioning */}
        <CredibilityChainSection />

        {/* Stats section - movement-first pillars */}
        <StatsSection />

        {/* Features section - credibility network leads */}
        <FeatureSection />

        {/* Process steps - fit check to launch */}
        <ProcessSteps />

        {/* Final CTA section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
