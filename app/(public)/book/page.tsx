import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Clock, Download, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { BOOK_PARTS, BOOK_METADATA, ALL_CHAPTERS } from '@/lib/data/ai-book-chapters'

export const metadata: Metadata = {
  title: 'The Movemental AI Book | Movemental',
  description: 'A comprehensive guide for movement leaders navigating the AI age—preserving voice, building credibility through networks, and creating content that transforms.',
  openGraph: {
    title: 'The Movemental AI Book',
    description: 'Navigating Credibility, AI, and Movement Leadership. A free, comprehensive guide for movement leaders.',
    type: 'website',
  },
}

export default function BookLandingPage() {
  const firstChapter = ALL_CHAPTERS[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 px-4 bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
            <BookOpen className="h-4 w-4" />
            <span>Free • {BOOK_METADATA.totalChapters} Chapters • Comprehensive</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            The Movemental
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
              AI Book
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-sage-300 mb-4">
            {BOOK_METADATA.subtitle}
          </p>

          {/* Description */}
          <p className="text-lg text-sage-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {BOOK_METADATA.description}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-sage-300">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{BOOK_METADATA.totalReadingTime} min total read</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>{BOOK_METADATA.totalChapters} chapters in 5 parts</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="group h-14 px-8 text-lg font-semibold bg-white text-sage-900 hover:bg-sage-100"
            >
              <Link href={`/book/read`}>
                Start Reading
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:transage-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
          </div>
        </div>
      </section>

      {/* Book Structure Overview */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-5 gap-4">
            {BOOK_PARTS.map((part) => (
              <div 
                key={part.number}
                className="p-4 rounded-lg bg-muted/50 text-center"
              >
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Part {part.number}
                </span>
                <h3 className="text-sm font-medium text-foreground mt-1">
                  {part.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {part.chapters.length} chapters
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Section - Organized by Parts */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-12 text-center">
            Table of Contents
          </h2>

          <div className="space-y-12">
            {BOOK_PARTS.map((part) => (
              <div key={part.number}>
                {/* Part Header */}
                <div className="mb-6 pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                      Part {part.number}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {part.title}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1">
                    {part.description}
                  </p>
                </div>

                {/* Chapters */}
                <div className="space-y-3">
                  {part.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/book/read?chapter=${chapter.number}`}
                      className="block p-4 bg-card border rounded-lg hover:border-primary/50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-2xl font-bold text-primary/40 group-hover:text-primary transition-colors w-10 flex-shrink-0">
                          {chapter.number.toString().padStart(2, '0')}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {chapter.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {chapter.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">
                            {chapter.readingTime} min
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Read Section */}
      <section className="py-16 sm:py-24 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center">
            Why Read This Book?
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            This isn&apos;t a lead magnet—it&apos;s the foundation for understanding AI, credibility, and movement leadership in the digital age.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Understand the Crisis',
                description: 'Learn why traditional credibility signals are breaking down in an AI-saturated world.',
              },
              {
                title: 'Get a Framework',
                description: 'Discover principles like scenius, the 70/30 rule, and voice preservation that guide AI usage.',
              },
              {
                title: 'Know the Boundaries',
                description: 'Understand what to embrace and what to refuse when it comes to AI in ministry.',
              },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-background rounded-xl border">
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Ready to Begin?
          </h2>
          <p className="text-muted-foreground mb-8">
            Start with Chapter 1 and work through the book at your own pace.
          </p>
          <Button
            asChild
            size="lg"
            className="group h-14 px-8 text-lg font-semibold"
          >
            <Link href="/book/read">
              Start Reading Chapter 1
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:transage-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
