import Link from "next/link";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import {
  AudienceLabel,
  AudienceSerifEm,
} from "@/components/sections/audience-concept";
import {
  COMMITTED_VOICES,
  VOICES_HUB_PATH,
  voicePath,
} from "@/lib/committed-voices";

import { VoicePortrait } from "./voice-portrait";

type Props = {
  /** Override the eyebrow label per host page. */
  label?: string;
  /** Override the heading — accepts JSX so callers can style italics. */
  title?: React.ReactNode;
  /** Override the cta label. */
  ctaLabel?: string;
  /** Variant passed to the underlying `Section` primitive. */
  variant?: "default" | "section";
};

/**
 * Compact 3-face band linking to `/voices`. Used where a page needs trust /
 * ecosystem proof without duplicating the full hub grid. Framing follows the
 * canonical doctrine: trusted voices are an ecosystem layer, not an audience
 * segment. See `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`.
 */
export function VoicesStrip({
  label = "Built with trusted movement voices",
  title = (
    <>
      Shaped in conversation with <AudienceSerifEm>movement leaders</AudienceSerifEm>.
    </>
  ),
  ctaLabel = "Meet the trusted voices",
  variant = "section",
}: Props) {
  return (
    <Section
      id="trusted-voices-strip"
      variant={variant}
      spacing="lg"
      aria-labelledby="trusted-voices-strip-title"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-12">
          <div>
            <RevealOnScroll>
              <AudienceLabel>{label}</AudienceLabel>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.06}>
              <h2
                id="trusted-voices-strip-title"
                className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground"
              >
                {title}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll
              delaySec={0.12}
              className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted-foreground"
            >
              <p>
                Not built in isolation from the field it serves. The platform is shaped alongside
                named leaders whose public work it is built to carry &mdash; three voices so far,
                each with a different shape of contribution.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delaySec={0.18} className="mt-6">
              <Link
                href={VOICES_HUB_PATH}
                className="group inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {ctaLabel}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  ›
                </span>
              </Link>
            </RevealOnScroll>
          </div>

          <ul className="grid grid-cols-3 gap-4 sm:gap-6">
            {COMMITTED_VOICES.map((voice, i) => (
              <RevealOnScroll key={voice.slug} delaySec={0.08 * i}>
                <li>
                  <Link
                    href={voicePath(voice.slug)}
                    className="group flex flex-col gap-3 border border-border bg-card p-3 transition-colors hover:bg-elevated"
                  >
                    <VoicePortrait
                      imageSrc={voice.portraitSrc}
                      imageAlt={voice.portraitAlt}
                      initials={voice.initials}
                      sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 14vw"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{voice.displayName}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {voice.themes[0]}
                      </p>
                    </div>
                  </Link>
                </li>
              </RevealOnScroll>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
