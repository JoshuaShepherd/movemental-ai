import Link from "next/link";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import {
  AudienceInvitationSection,
  AudienceLabel,
  AudienceSerifEm,
} from "@/components/sections/audience-concept";
import {
  COMMITTED_VOICES,
  type CommittedVoice,
  voicePath,
} from "@/lib/committed-voices";

import { VoicePortrait } from "./voice-portrait";

type Props = {
  voice: CommittedVoice;
};

/**
 * `/voices/[slug]` — per-voice editorial page.
 *
 * Canonical doctrine: `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`.
 * Plan §3.3 + §6 Phase 3: long-form bio + curated outbound links + honest
 * "coming work" empty-state slots. No comment threads. No recruitment surface.
 */
export function VoiceDetailPageContent({ voice }: Props) {
  const others = COMMITTED_VOICES.filter((v) => v.slug !== voice.slug);

  return (
    <div data-voice-detail="concept-modern" className="text-pretty">
      {/* SECTION 1 — HERO ------------------------------------------------ */}
      <Section
        variant="default"
        spacing="lg"
        className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10"
        aria-labelledby="voice-detail-title"
      >
        <Container>
          <RevealOnScroll>
            <AudienceLabel>
              <Link href="/voices" className="hover:text-foreground">
                Movement Voices
              </Link>
              <span aria-hidden className="mx-2 text-ink-soft">
                ›
              </span>
              <span className="text-foreground">{voice.displayName}</span>
            </AudienceLabel>
          </RevealOnScroll>

          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-[clamp(2.5rem,5vw,4rem)]">
            <RevealOnScroll delaySec={0.06}>
              <VoicePortrait
                imageSrc={voice.portraitSrc}
                imageAlt={voice.portraitAlt}
                initials={voice.initials}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </RevealOnScroll>

            <div>
              <RevealOnScroll delaySec={0.1}>
                <h1
                  id="voice-detail-title"
                  className="text-display max-w-[22ch] text-balance text-foreground"
                >
                  {voice.displayName}
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.16}>
                <p className="mt-3 max-w-[44ch] text-base font-medium text-primary">
                  {voice.role}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{voice.locationLine}</p>
              </RevealOnScroll>
              <RevealOnScroll
                delaySec={0.22}
                className="mt-6 max-w-[54ch] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-relaxed text-muted-foreground"
              >
                <p>{voice.shortTagline}</p>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.28} className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a
                    href={voice.primaryUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Visit primary site
                  </a>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="#bio">Read the bio</Link>
                </Button>
              </RevealOnScroll>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 2 — BIOGRAPHY ----------------------------------------- */}
      <Section
        id="bio"
        variant="section"
        spacing="lg"
        aria-labelledby="bio-title"
      >
        <Container width="narrow">
          <RevealOnScroll>
            <AudienceLabel>Biography</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2
              id="bio-title"
              className="mt-2 max-w-[34ch] text-balance text-h2 text-foreground"
            >
              The shape of the <AudienceSerifEm>public work</AudienceSerifEm>.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll
            delaySec={0.12}
            className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground"
          >
            {voice.editorialBio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </RevealOnScroll>
        </Container>
      </Section>

      {/* SECTION 3 — CREDENTIALS + WORKS + LINKS ----------------------- */}
      <Section
        id="references"
        variant="default"
        spacing="lg"
        aria-labelledby="references-title"
      >
        <Container>
          <RevealOnScroll>
            <AudienceLabel>References</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2
              id="references-title"
              className="mt-2 max-w-[32ch] text-balance text-h2 text-foreground"
            >
              Credentials, works, and the links{" "}
              <AudienceSerifEm>worth following</AudienceSerifEm>.
            </h2>
          </RevealOnScroll>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {/* Credentials */}
            <RevealOnScroll delaySec={0.1}>
              <div className="flex h-full flex-col border border-border bg-card p-6">
                <h3 className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  Credentials
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {voice.credentials.map((line) => (
                    <li key={line} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            {/* Featured works */}
            <RevealOnScroll delaySec={0.16}>
              <div className="flex h-full flex-col border border-border bg-card p-6">
                <h3 className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  Selected works
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {voice.featuredWorks.map((work) => (
                    <li key={work} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                      {work}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            {/* Outbound links */}
            <RevealOnScroll delaySec={0.22}>
              <div className="flex h-full flex-col border border-border bg-card p-6">
                <h3 className="text-[0.7rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                  Where to follow
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  <li className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                    <a
                      href={voice.primaryUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Primary site
                    </a>
                    <span className="block text-xs text-ink-soft">{voice.primaryUrl.replace(/^https?:\/\//, "")}</span>
                  </li>
                  {voice.secondaryLinks.map((link) => (
                    <li key={link.href} className="border-t border-border pt-3">
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {link.label}
                      </a>
                      <span className="block text-xs text-ink-soft">{link.href.replace(/^https?:\/\//, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      {/* SECTION 4 — ON MOVEMENTAL (coming work) ---------------------- */}
      <Section
        id="on-movemental"
        variant="section"
        spacing="lg"
        aria-labelledby="on-movemental-title"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-12">
            <div>
              <RevealOnScroll>
                <AudienceLabel>On Movemental</AudienceLabel>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.06}>
                <h2
                  id="on-movemental-title"
                  className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground"
                >
                  What is being built <AudienceSerifEm>together</AudienceSerifEm>.
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll
              delaySec={0.1}
              className="max-w-[54ch] text-base leading-relaxed text-muted-foreground"
            >
              <p>
                These slots are honest about timing. Nothing here ships until consent, corpus, and
                voice integrity are ready. The team page explains how the build runs; this page
                will fill in as work shapes up.
              </p>
            </RevealOnScroll>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {voice.comingWork.map((slot, i) => (
              <RevealOnScroll key={slot.id} delaySec={0.05 * i}>
                <div className="flex h-full flex-col gap-3 border border-border bg-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-medium text-foreground">{slot.heading}</h3>
                    <span className="text-[0.65rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                      {slot.status.label}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{slot.preview}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      {/* SECTION 5 — OTHER VOICES ------------------------------------- */}
      {others.length > 0 ? (
        <Section
          id="other-voices"
          variant="default"
          spacing="lg"
          aria-labelledby="other-voices-title"
        >
          <Container>
            <RevealOnScroll>
              <AudienceLabel>Other trusted voices</AudienceLabel>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.06}>
              <h2
                id="other-voices-title"
                className="mt-2 max-w-[32ch] text-balance text-h2 text-foreground"
              >
                Read the rest of the <AudienceSerifEm>trusted-voice layer</AudienceSerifEm>.
              </h2>
            </RevealOnScroll>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {others.map((other, i) => (
                <RevealOnScroll key={other.slug} delaySec={0.05 * i}>
                  <li>
                    <Link
                      href={voicePath(other.slug)}
                      className="group flex items-center justify-between gap-4 border border-border bg-card p-5 transition-colors hover:bg-elevated"
                    >
                      <div>
                        <p className="text-base font-medium text-foreground">{other.displayName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{other.role}</p>
                      </div>
                      <span
                        aria-hidden
                        className="text-lg text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-foreground"
                      >
                        ›
                      </span>
                    </Link>
                  </li>
                </RevealOnScroll>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <AudienceInvitationSection
        variant="section"
        label="Continue"
        titleId="voice-detail-invitation-title"
        title={
          <>
            See how the platform <AudienceSerifEm>holds the work</AudienceSerifEm>.
          </>
        }
        body={
          <p>
            The fragmentation story explains why a credibility platform exists at all. The team
            page explains who is on the hook to build it. Start wherever fits the question you
            actually have.
          </p>
        }
        primaryCta={{ label: "Read the fragmentation story", href: "/fragmentation" }}
        secondaryCta={{ label: "Meet the team", href: "/team" }}
        tertiaryCta={{ label: "Start a conversation", href: "/contact" }}
      />
    </div>
  );
}
