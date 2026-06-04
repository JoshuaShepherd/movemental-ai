import { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getThemes } from '@/lib/data/themes'
import { ThemeCard } from '@/components/themes/ThemeCard'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Themes | Movemental',
  description:
    'Explore by theme — missional church, formation, disciple making, APEST, kingdom mission, and Christocentric faith.',
}

export default function ThemesPage() {
  const themes = getThemes()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero — design chain: sage, mvmt surfaces */}
      <section
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="themes-hero-title"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sage-900 via-sage-800 to-sage-900/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sage-600/20 via-transparent to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-sage-300 text-sm font-medium tracking-wide uppercase mb-4">
            Editorial collections
          </p>
          <h1
            id="themes-hero-title"
            className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6"
          >
            Themes
          </h1>
          <p className="text-lg sm:text-xl text-sage-200 max-w-2xl mx-auto leading-relaxed mb-10">
            Explore by theme — missional church, formation, disciple making, APEST, kingdom mission,
            and Christocentric faith.
          </p>
          <Button
            size="lg"
            className="font-semibold bg-sage-500 hover:bg-sage-400 text-sage-950 shadow-lg"
            asChild
          >
            <a href="#themes-grid">
              Explore all themes
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Themes grid — light surface for contrast */}
      <div id="themes-grid" className="bg-sage-50/80 dark:bg-sage-950/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h2 id="themes-list-heading" className="sr-only">
            Explore by theme
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            role="list"
            aria-labelledby="themes-list-heading"
          >
            {themes.map((theme) => (
              <div key={theme.slug} role="listitem">
                <ThemeCard theme={theme} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Browse library CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Browse the library</h2>
          <p className="text-muted-foreground mb-6">
            Find articles, books, courses, and podcasts by theme in the content library.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/topics">Content library</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
