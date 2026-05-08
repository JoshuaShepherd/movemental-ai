import { BtnPill } from "@/components/sections-mock/primitives";

export function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="contact"
      aria-labelledby="final-cta-heading"
    >
      <div className="container final-cta__inner text-center">
        <h2 className="display mx-auto max-w-5xl" id="final-cta-heading">
          When it comes to AI, we&apos;re all beginners and no one asked for this.
        </h2>
        <p className="final-cta__mantra mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-xs font-semibold uppercase tracking-eyebrow text-inverse-muted">
          <span className="text-inverse-foreground">Lead anyway.</span>
          <span aria-hidden className="text-inverse-foreground/30">
            •
          </span>
          <span>Start with safety.</span>
          <span aria-hidden className="text-inverse-foreground/30">
            •
          </span>
          <span>Build for movement.</span>
        </p>
        <div className="hero-actions final-cta__actions mt-12 justify-center">
          <BtnPill href="/contact" variant="primary">
            Start a Conversation
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
