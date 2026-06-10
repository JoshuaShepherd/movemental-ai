import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ContactConversationForm } from "@/components/forms/contact-conversation-form";
import { Container, Reveal, Section } from "@/components/primitives";
import { type ContactInterest, contactInterestToOrgType } from "@/lib/contact-interest";

function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dim"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden strokeWidth={2} />
    </Link>
  );
}

export function ContactPageContent({ contactInterest }: { contactInterest?: ContactInterest | null }) {
  const presetOrgType = contactInterest ? contactInterestToOrgType(contactInterest) : undefined;

  return (
    <>
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="contact-hero-title"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container width="default" className="max-w-4xl">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-eyebrow text-inverse-muted">Start a conversation</p>
            <h1
              id="contact-hero-title"
              className="mt-8 font-serif text-5xl font-medium italic leading-none tracking-tight text-inverse-foreground md:text-7xl lg:text-8xl"
            >
              Tell us what you&apos;re working on.
            </h1>
            <div className="mt-8 max-w-2xl space-y-6 text-lg leading-relaxed text-inverse-muted">
              <p>
                A 30-minute conversation with Brad, Alan, or Josh. We listen, ask honest questions, and tell you{" "}
                
                  whether Safety is the right starting place for your organization or whether you&apos;d be better served
                  waiting or starting elsewhere.
                
              </p>
              <p className="text-sm font-semibold uppercase tracking-eyebrow text-inverse-muted/90">
                We respond within one business day.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container width="default" className="max-w-6xl">
          <Reveal>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground">
              Three steps from here to a working conversation.
            </h2>
            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-24">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">Step 01</p>
                <h3 className="font-serif text-2xl italic text-foreground">You send a note.</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Use the form below or email{" "}
                  <a
                    href="mailto:josh@movemental.ai"
                    className="font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary-dim"
                  >
                    josh@movemental.ai
                  </a>{" "}
                  directly. Include enough context that we can come to the conversation prepared.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">Step 02</p>
                <h3 className="font-serif text-2xl italic text-foreground">A founder responds.</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Within one business day. Josh typically responds first; Brad or Alan join the conversation when the
                  situation calls for it. We propose two or three times for a 30-minute call.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">Step 03</p>
                <h3 className="font-serif text-2xl italic text-foreground">We talk.</h3>
                <p className="leading-relaxed text-muted-foreground">
                  30 minutes. No slide deck, no demo. We listen to what you&apos;re navigating and tell you honestly what
                  we&apos;d recommend — including &ldquo;you don&apos;t need us yet&rdquo; when that&apos;s the answer.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" id="message">
        <Container width="reading" className="max-w-3xl">
          <Reveal>
            <div className="mb-16 space-y-6">
              <p className="text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">Send a note</p>
              <h2 className="font-serif text-3xl font-medium italic tracking-tight text-foreground md:text-4xl">
                What&apos;s on your desk?
              </h2>
              <p className="text-lg text-muted-foreground">
                The more context you can share, the better the first conversation will be.
              </p>
            </div>
            <ContactConversationForm initialOrgType={presetOrgType} />
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container width="default" className="max-w-6xl">
          <Reveal>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-foreground">Or skip the form.</h2>
            <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
              <article className="flex flex-col gap-6 border-l-4 border-primary bg-section p-10">
                <p className="text-sm font-semibold uppercase tracking-eyebrow text-primary">Read first</p>
                <h3 className="font-serif text-3xl font-medium italic tracking-tight text-foreground md:text-4xl">
                  Not yet sure whether to reach out?
                </h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The Safety Field Guide is 33 pages and free. It walks your leadership team through the seven
                  ratifiable decisions before you have a single conversation with us. Many organizations are best
                  served reading it together first.
                </p>
                <div className="mt-2">
                  <TextLink href="/field-guides/safety">Read the Safety Field Guide</TextLink>
                </div>
              </article>
              <div className="grid grid-cols-1 gap-12">
                <div className="space-y-3 border-b border-border pb-12 md:pb-12">
                  <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-foreground">Email directly</h3>
                  <p className="text-muted-foreground">For visitors who&apos;d rather just write.</p>
                  <a
                    href="mailto:josh@movemental.ai"
                    className="mt-2 inline-block font-medium text-primary transition-colors hover:text-primary-dim"
                  >
                    josh@movemental.ai
                  </a>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-foreground">Book a slot</h3>
                  <p className="text-muted-foreground">Pick a time on Josh&apos;s calendar.</p>
                  <div className="mt-2">
                    <TextLink href="/contact">See available times</TextLink>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="default" spacing="lg">
        <Container width="default" className="max-w-4xl">
          <Reveal>
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-3 md:gap-16">
              <div className="md:col-span-1">
                <h2 className="font-serif text-3xl font-medium italic tracking-tight text-foreground">
                  A 30-minute conversation works best when you&apos;re already past &apos;curious.&apos;
                </h2>
              </div>
              <div className="space-y-8 border-l border-primary pl-8 md:col-span-2">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The conversation is most useful when you can name a specific situation your organization is navigating.
                  A board member raised AI at the last meeting. Staff are using AI tools individually and you&apos;re not
                  sure what&apos;s happening. Your accreditor is asking about AI policy. A donor wants to know your
                  posture. Something has surfaced that you need to think through with someone who has done this work
                  before.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  If you&apos;re earlier than that — exploring whether AI matters for your organization, reading broadly,
                  not yet at a specific question — the field guide is probably a better starting place than a 30-minute
                  call.
                </p>
                <TextLink href="/field-guides">Read the field guide first</TextLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
