import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DecideChatSection } from './DecideChatSection'

export const metadata: Metadata = {
  title: 'Help me decide | Movemental',
  description: 'A discernment companion for movement leaders. Clarify fit, scope, and expectations without pressure.',
  openGraph: {
    title: 'It\'s worth deciding carefully | Movemental',
    description: 'Discernment companion for movement leaders.',
    type: 'website',
  },
}

export default function DecidePage() {
  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        {/* 1. Opening Acknowledgment */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            It&apos;s worth deciding carefully.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hesitation is appropriate. Building inside shared infrastructure is meaningful. Discernment is part of leadership.
          </p>
        </header>

        {/* 2. Common Points of Tension */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Common points of tension
          </h2>
          <p className="text-muted-foreground mb-3">You may be asking yourself:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>Is this really necessary?</li>
            <li>Am I overcomplicating something that should stay simple?</li>
            <li>Do I want to be part of a shared credibility network?</li>
            <li>How much time will this actually take?</li>
            <li>What happens to my voice and intellectual property?</li>
            <li>Is this about growth or stewardship?</li>
            <li>What if I don&apos;t want to build a business?</li>
          </ul>
        </section>

        {/* 3. The Discernment Companion (AI Agent Section) */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Talk it through
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            This conversation agent is trained to help you clarify fit, scope, expectations, boundaries, and economics. It is not here to persuade you. It is here to help you think clearly.
          </p>
          <DecideChatSection />
        </section>

        {/* 4. Suggested prompts are inside DecideChatSection */}

        {/* 5. Human Escalation */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Prefer to talk to a person?
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            If you&apos;d rather think this through with someone directly, you can request a conversation.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Request a Conversation</Link>
          </Button>
        </section>

        {/* 6. Clarifying Boundaries Section */}
        <section className="mb-14 space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              What this is not
            </h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1">
              <li>Not a growth hack.</li>
              <li>Not a content treadmill.</li>
              <li>Not a replacement for embodied leadership.</li>
              <li>Not a personal branding accelerator.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              What this is
            </h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-1">
              <li>Structured infrastructure.</li>
              <li>Credibility alignment.</li>
              <li>Long-term stewardship.</li>
            </ul>
          </div>
        </section>

        {/* 7. Soft Return Path */}
        <section className="pt-6 border-t border-border">
          <p className="text-muted-foreground mb-4">
            If you reach clarity and are ready, you can continue.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link href="/decided">I&apos;ve decided</Link>
          </Button>
        </section>
      </article>
    </div>
  )
}
