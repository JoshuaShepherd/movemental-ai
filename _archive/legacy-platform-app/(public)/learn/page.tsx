import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, Sparkles, Users, ArrowRight, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learn | Movemental',
  description: 'Resources and guides for movement leaders using Movemental. Learning hub coming soon.',
}

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Clock className="h-4 w-4" />
          Coming Soon
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Learning Hub
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          We&apos;re building comprehensive guides, tutorials, and courses for movement leaders. 
          In the meantime, explore these resources.
        </p>
      </section>

      {/* Available Resources */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Start Here
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/ai-vision"
              className="p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">AI Vision</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Understand how Movemental approaches AI—as a translation layer, not a replacement for your voice.
              </p>
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/book"
              className="p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">The AI Book</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Deep dive into credibility, AI, and movement leadership with our interactive book.
              </p>
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                Start Reading <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/how-it-works"
              className="p-6 rounded-xl border bg-card hover:border-primary/50 hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">How It Works</h3>
              <p className="text-sm text-muted-foreground mb-4">
                See the four-phase journey from vision to platform launch.
              </p>
              <span className="text-sm font-medium text-primary flex items-center gap-1">
                See Journey <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Coming */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-6">What&apos;s Coming</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left mb-8">
            <div className="p-4 rounded-lg bg-background border">
              <h3 className="font-medium mb-1">Platform Tutorials</h3>
              <p className="text-sm text-muted-foreground">Step-by-step guides for publishing, courses, and analytics.</p>
            </div>
            <div className="p-4 rounded-lg bg-background border">
              <h3 className="font-medium mb-1">Content Strategy Guides</h3>
              <p className="text-sm text-muted-foreground">How to structure and organize your existing content.</p>
            </div>
            <div className="p-4 rounded-lg bg-background border">
              <h3 className="font-medium mb-1">AI Best Practices</h3>
              <p className="text-sm text-muted-foreground">Using AI as a translation layer while preserving your voice.</p>
            </div>
            <div className="p-4 rounded-lg bg-background border">
              <h3 className="font-medium mb-1">Network Integration</h3>
              <p className="text-sm text-muted-foreground">Building credibility through peer connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mb-8">
            The best way to learn Movemental is to see if it&apos;s right for you.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/fit-check">
              Take the Fit Check
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
