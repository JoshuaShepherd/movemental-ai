import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, BookOpen, Sparkles, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Movemental',
  description: 'Movemental is a relational credibility network for movement leaders—helping transformative content find the people it was made for.',
  openGraph: {
    title: 'About Movemental',
    description: 'A relational credibility network for movement leaders.',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About Movemental
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Movemental is a relational credibility network for movement leaders—helping transformative content find the people it was made for.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">What We Do</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We help movement leaders take content they've already created—books, talks, articles, courses—and make it discoverable, connected, and enduring.
            </p>
            <p>
              This isn't about chasing algorithms or manufacturing virality. It's about building the infrastructure for credibility to compound over time, through real relationships with trusted peers.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                This is for you if…
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• You have years of content that deserves a longer life</li>
                <li>• You lead within a movement, not just an audience</li>
                <li>• You care more about formation than followers</li>
                <li>• You want your work to outlive the algorithm</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                This is not for you if…
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• You're just starting to create content</li>
                <li>• You want maximum reach with minimum depth</li>
                <li>• You prefer to operate independently of peers</li>
                <li>• You're looking for a quick growth hack</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8">What Guides Us</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Credibility First</h3>
              <p className="text-sm text-muted-foreground">
                Real relationships and trusted networks, not manufactured engagement.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Content Stewardship</h3>
              <p className="text-sm text-muted-foreground">
                Your work, your platform, your audience—we're here to serve, not extract.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI as Translation</h3>
              <p className="text-sm text-muted-foreground">
                Technology that amplifies your voice, not replaces it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Learn More</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/why-movemental"
              className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Why Movemental
              </h3>
              <p className="text-sm text-muted-foreground">
                The deeper story behind what we're building and why.
              </p>
            </Link>
            <Link
              href="/ai-vision"
              className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Our AI Posture
              </h3>
              <p className="text-sm text-muted-foreground">
                How we think about AI and why it matters for movement leaders.
              </p>
            </Link>
            <Link
              href="/team"
              className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Meet the Team
              </h3>
              <p className="text-sm text-muted-foreground">
                The stewards behind Movemental.
              </p>
            </Link>
            <Link
              href="/how-it-works"
              className="p-6 rounded-lg border bg-card hover:border-primary/50 transition-colors group"
            >
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                How It Works
              </h3>
              <p className="text-sm text-muted-foreground">
                See the journey from vision to platform.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Curious if Movemental is right for you?
          </h2>
          <p className="text-muted-foreground mb-8">
            Take 60 seconds to find out.
          </p>
          <Button asChild size="lg" className="group">
            <Link href="/fit-check">
              Start Fit Check
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
