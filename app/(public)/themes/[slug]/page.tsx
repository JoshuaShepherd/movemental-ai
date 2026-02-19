import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getThemeBySlug, getThemes } from '@/lib/data/themes'
import { Button } from '@/components/ui/button'

interface ThemePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getThemes().map((theme) => ({ slug: theme.slug }))
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { slug } = await params
  const theme = getThemeBySlug(slug)
  if (!theme) {
    return { title: 'Theme not found | Movemental' }
  }
  return {
    title: `${theme.title} | Themes | Movemental`,
    description: theme.description,
  }
}

export default async function ThemeDetailPage({ params }: ThemePageProps) {
  const { slug } = await params
  const theme = getThemeBySlug(slug)

  if (!theme) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="theme-title"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sage-900 via-sage-800 to-sage-900/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sage-600/15 via-transparent to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="mb-4">
            <Link
              href="/themes"
              className="text-sage-300 hover:text-sage-200 text-sm font-medium transition-colors"
            >
              ← Themes
            </Link>
          </p>
          <h1
            id="theme-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            {theme.title}
          </h1>
          <p className="text-lg sm:text-xl text-sage-200 leading-relaxed">
            {theme.description}
          </p>
        </div>
      </section>

      {/* Content in this theme */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Content in this theme</h2>
          <p className="text-muted-foreground mb-6">
            Find articles, books, courses, and podcasts in the content library filtered by this
            theme.
          </p>
          <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white" asChild>
            <Link href="/topics">Content library</Link>
          </Button>
        </div>
      </section>

      {/* Back to all themes */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/themes" className="text-muted-foreground hover:text-foreground">
              ← All themes
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
