'use client'

import { Navigation } from './Navigation'
import { DarkHeroSection } from './DarkHeroSection'
import { LogoBar } from './LogoBar'
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
        {/* Hero section - dark gradient with bold typography */}
        <DarkHeroSection />

        {/* Social proof logo bar */}
        <LogoBar />

        {/* Stats section - key metrics */}
        <StatsSection />

        {/* Features section */}
        <FeatureSection />

        {/* Process steps - how it works */}
        <ProcessSteps />

        {/* Final CTA section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
