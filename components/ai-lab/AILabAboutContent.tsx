'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AILabConfigDropdowns } from './AILabConfigDropdowns'
import type { Theme, Mode, Style } from '@/lib/types/ai-lab'
import { Beaker, ArrowRight } from 'lucide-react'

export function AILabAboutContent() {
  const [theme, setTheme] = useState<Theme>('mdna')
  const [mode, setMode] = useState<Mode>('teacher')
  const [style, setStyle] = useState<Style>('conversation')

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      <div className="space-y-12">
        {/* Intro */}
        <section>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How Movemental Does AI
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Movemental Intelligence is AI built for movement leaders: theologically grounded,
            voice-aware, and designed to amplify authentic expertise instead of replacing it.
            The AI Lab is where that intelligence becomes a customizable learning companion.
          </p>
        </section>

        {/* How we do AI — condensed from ai-vision */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our approach to AI</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">Scenius-enhanced.</strong> AI trained on
              movemental frameworks (APEST, mDNA, incarnational theology) so it understands
              your domain, not just keywords.
            </li>
            <li>
              <strong className="text-foreground">Amplification, not replacement.</strong> Tools
              that preserve your voice and theological depth while helping your expertise reach
              more people.
            </li>
            <li>
              <strong className="text-foreground">Network-aware.</strong> Intelligence that
              connects leaders and ideas across the movement and surfaces what matters.
            </li>
            <li>
              <strong className="text-foreground">Credibility through quality.</strong> In a
              world of synthetic fluency, we help real expertise stand out with curation and
              editorial standards.
            </li>
          </ul>
        </section>

        {/* What is the AI Lab */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Beaker className="h-6 w-6" />
            What is the AI Lab?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The AI Lab is an experimental learning companion that adapts to how you want to learn.
            One agent becomes many different experiences through three dimensions: <strong className="text-foreground">Theme</strong> (what you&apos;re exploring),
            <strong className="text-foreground"> Mode</strong> (how you want to learn), and <strong className="text-foreground">Style</strong> (how you want to interact).
            Each combination changes the way the Lab teaches, questions, and responds—so you can
            experiment until you find what works for you.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The Lab keeps the leader&apos;s authentic voice while adapting its teaching approach and
            personality. It&apos;s built for exploration: try different configurations, ask follow-up
            questions, and see how the same topic gets different treatment with different settings.
          </p>
        </section>

        {/* Try the dropdowns */}
        <section className="rounded-lg border bg-muted/30 p-6">
          <h3 className="text-lg font-semibold mb-2">See how it works</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Use the dropdowns below to explore Theme, Mode, and Style. In the Lab, your choice
            shapes the whole conversation.
          </p>
          <AILabConfigDropdowns
            theme={theme}
            mode={mode}
            style={style}
            onThemeChange={setTheme}
            onModeChange={setMode}
            onStyleChange={setStyle}
          />
        </section>

        {/* How to use it */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to use the AI Lab</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">Start with a question.</strong> The Lab works
              best when you have something specific to explore—a framework, a concept, or a
              practical challenge.
            </li>
            <li>
              <strong className="text-foreground">Configure your experience.</strong> Use Theme,
              Mode, and Style in the Lab header to match how you want to learn. Defaults (e.g.
              mDNA, Teacher, Conversation) work well for most people.
            </li>
            <li>
              <strong className="text-foreground">Experiment freely.</strong> Change settings,
              ask the same question in different configurations, and see how the response
              changes. The Lab is designed for that kind of experimentation.
            </li>
          </ul>
        </section>

        {/* Progressive disclosure note */}
        <section className="rounded-lg border border-primary/20 bg-primary/5 p-6">
          <p className="text-sm text-muted-foreground">
            This page is the place we point you to when you ask &ldquo;What is this?&rdquo; or
            &ldquo;How does the Lab work?&rdquo; from inside the AI Lab. We want the Lab to stay
            focused on conversation while making it easy to learn more whenever you want.
          </p>
        </section>

        {/* CTAs */}
        <section className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/ai-vision">
              Movemental Intelligence
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
