import Link from "next/link";
import { CircleHelp, DollarSign, Mail } from "lucide-react";

import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
} from "@/components/primitives";
import { IconFeatureCard } from "@/components/editorial-stitch";
import { ContactForm } from "@/components/forms/contact-form";
import { SSSS_FIELD_GUIDE_PATH } from "@/lib/canon-routes";

export function ContactPageContent() {
  return (
    <>
      <Section spacing="lg" className="text-center">
        <Container>
          <Eyebrow className="mb-4 animate-fade-in [animation-delay:100ms]">Invitation</Eyebrow>
          <Display size="lg" className="mx-auto max-w-4xl animate-fade-up">Start a conversation</Display>
          <Prose className="mx-auto mt-6 max-w-2xl text-lg animate-fade-up [animation-delay:200ms]">
            <p>Movemental grows through relationships and careful work. If you are responsible for formation — as a movement leader, organization, or partner — this page is the front door.</p>
          </Prose>
          <div className="mt-8 flex flex-wrap justify-center gap-6 animate-fade-up [animation-delay:400ms]">
            <ArrowLink href="#message" size="lg">
              Go to the form
            </ArrowLink>
            <ArrowLink href="mailto:hello@movemental.com" tone="foreground" size="lg">
              Email hello@movemental.com
            </ArrowLink>
          </div>
        </Container>
      </Section>

      <Section variant="section">
        <Reveal>
        <Container>
          <Display size="md" as="h2">Who this is for</Display>
          <Prose className="mt-4"><p>We serve multiple audiences with the same underlying posture.</p></Prose>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Movement leaders building a durable body of work", "Denominations, networks, and institutions", "Nonprofits and ministries", "Media, research, and aligned partners"].map((a) => (
              <span key={a} className="rounded-full bg-card px-5 py-2 text-sm font-medium text-foreground">{a}</span>
            ))}
          </div>
          <Prose className="mt-6">
            <p>
              For movement leaders, churches, nonprofits, and institutions — use the form below or email and we will
              route the conversation.
            </p>
          </Prose>
        </Container>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
        <Container>
          <Display size="md" as="h2">What to expect</Display>
          <Prose className="mt-6"><p>We read what you send. We may respond slowly when depth matters more than speed. If your note needs a human with context, you will get one — not an automated funnel pretending to be instant.</p><p>Referrals and warm introductions still matter. If someone we trust pointed you here, say so — it helps us route with care.</p></Prose>
        </Container>
        </Reveal>
      </Section>

      <Section variant="section">
        <Reveal>
        <Container>
          <Display size="md" as="h2">How to start</Display>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <IconFeatureCard
              icon={<Mail className="size-10" aria-hidden />}
              eyebrow="Step 1"
              title="Email outline"
              description='Share context, links, and what "success" would mean in 12–18 months — enough signal for a human to route with care.'
            />
            <IconFeatureCard
              icon={<CircleHelp className="size-10" aria-hidden />}
              eyebrow="Step 2"
              title="FAQ first"
              description="Many logistics questions are pre-answered — reading there first saves both sides a round-trip."
            />
            <IconFeatureCard
              icon={<DollarSign className="size-10" aria-hidden />}
              eyebrow="Step 3"
              title="Economics in conversation"
              description="Commercial shape is discussed directly once we understand your context — no separate pricing sheet required to start."
            />
          </div>
          <Prose className="mt-8 text-center text-sm">
            <p>
              <Link href="/faq" className="text-primary hover:underline">
                Read the FAQ
              </Link>
            </p>
          </Prose>
        </Container>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
        <Container>
          <Display size="md" as="h2">Trust &amp; inspectability</Display>
          <ul className="mt-6 space-y-3 text-muted-foreground">
            <li><Link href="/faq" className="text-primary hover:underline">FAQ</Link> — logistics, scope, and how we work</li>
            <li><Link href="/privacy" className="text-primary hover:underline">Privacy</Link> — how we handle information you share</li>
          </ul>
        </Container>
        </Reveal>
      </Section>

      <Section variant="section" id="message">
        <Reveal>
        <Container>
          <Display size="md" as="h2">Message</Display>
          <Prose className="mt-4"><p>Tell us about your work, your goals, and what led you here.</p></Prose>
          <div className="mt-8 max-w-2xl">
            <ContactForm />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            You can also reach us directly at{" "}
            <a href="mailto:hello@movemental.com" className="text-primary hover:underline">hello@movemental.com</a>
          </p>
        </Container>
        </Reveal>
      </Section>

      <Section>
        <Reveal>
        <Container>
          <Display size="sm" as="h2">Prefer to explore first?</Display>
          <Prose className="mt-4">
            <p>
              The fragmentation story, the book (<em className="font-serif not-italic">From Fragmentation to Movement</em>
              ), and the AI Stewardship Sequence field guide — scatter, structure, and a safe adoption sequence.
            </p>
          </Prose>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/fragmentation" className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Fragmentation story &rarr;</Link>
            <Link href="/book" className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">Book &rarr;</Link>
            <Link href={SSSS_FIELD_GUIDE_PATH} className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">AI Stewardship Sequence field guide &rarr;</Link>
          </div>
        </Container>
        </Reveal>
      </Section>
    </>
  );
}
