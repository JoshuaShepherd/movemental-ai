import { BtnPill } from "@/components/sections-mock/primitives";

/**
 * Home (`/home-new`) — bottom midnight CTA band.
 *
 * Two-CTA sibling of `src/components/sections-mock/home/final-cta.tsx`. The
 * original ships three CTAs (Begin with Safety → `/pathway/safety`, Safety
 * field guide → `/field-guides/safety`, Start a Conversation → `/contact`).
 * The cleaned-up Safety story collapses that to two CTAs so the lead-magnet
 * (Field Guide) and the facilitated path (SafeStart) read as the only two
 * choices:
 *
 *   1. Primary white pill — `Get the Field Guide` → `/field-guides/safety-new`
 *   2. Secondary ghost button — `Talk about SafeStart` → `/contact?interest=safestart`
 *
 * Visual register matches `FinalCta` exactly: `.band-midnight` recipe +
 * `.final-cta` modifier (so `.final-cta__inner`, `.final-cta__actions`,
 * `.final-cta .display`, `.final-cta .lede` apply via `src/app/recipes.css`).
 * The `BtnPill` primitive is reused unchanged; `.band-midnight` automatically
 * inverts the primary pill to ink-on-cream-paper and the ghost pill to
 * inverse-foreground-bordered.
 *
 * Non-destructive: do not edit the original `FinalCta`. See
 * `docs/_new/safety-new-changelog.md` for the rebuild log.
 */
export function HomeCTABandNew() {
  return (
    <section
      className="band-midnight final-cta"
      id="contact"
      aria-labelledby="home-cta-band-new-heading"
    >
      <div className="container final-cta__inner text-center">
        <h2 className="display mx-auto max-w-4xl" id="home-cta-band-new-heading">
          Start with Safety. The path takes care of the order.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-inverse-muted md:text-xl">
          Most leaders have not yet decided what is safe, valuable, or ethical
          for their work. The four-stage path is how you decide, in writing,
          before you build anything else.
        </p>
        <div className="hero-actions final-cta__actions mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <BtnPill href="/field-guides/safety-new" variant="primary">
            Get the Field Guide
          </BtnPill>
          <BtnPill href="/contact?interest=safestart" variant="ghost">
            Talk about SafeStart
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
