import Link from "next/link";

import { Container, Eyebrow, Reveal, Section } from "@/components/primitives";

import { PathMiniMap } from "./PathMiniMap";

/**
 * PathClosingCta — midnight band that closes the four-stage walk-through.
 *
 * Layout: eyebrow → horizontal mini-map → display heading → body → two
 * pill CTAs. Subtle radial-glow overlay sits behind the content.
 */
export function PathClosingCta() {
  return (
    <Section
      variant="midnight"
      spacing="lg"
      aria-labelledby="path-closing-title"
      className="relative overflow-hidden"
    >
      {/* subtle radial glow — pure decoration */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(244,239,229,0.08),transparent_55%)]"
      />
      <Container className="relative">
        <div className="max-w-[680px]">
          <Reveal>
            <Eyebrow inverse withDot className="mb-5">
              The path
            </Eyebrow>
          </Reveal>
          <Reveal>
            <PathMiniMap />
          </Reveal>
          <Reveal>
            <h2
              id="path-closing-title"
              className="font-sans font-medium tracking-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.06] max-w-[22ch] mb-5"
            >
              The path is consistent. The work <em>becomes specific</em>.
            </h2>
          </Reveal>
          <Reveal>
            <p className="text-[1.05rem] leading-[1.65] text-inverse-muted max-w-[56ch] mb-8">
              Every organization moves through the same basic sequence. The
              difference appears in the details: the risks you carry, the
              people you train, the use cases you approve, and the systems
              you decide to build.
            </p>
          </Reveal>
          <Reveal>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-pill bg-inverse-foreground text-inverse-surface text-[0.95rem] font-medium tracking-tight transition-[transform,background-color] duration-200 ease-out hover:-translate-y-px hover:bg-background"
              >
                Start a Conversation
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/pathway"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-pill bg-transparent text-inverse-foreground border border-inverse-border text-[0.95rem] font-medium tracking-tight transition-[border-color] duration-200 ease-out hover:border-inverse-foreground"
              >
                Explore the Full Path
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
