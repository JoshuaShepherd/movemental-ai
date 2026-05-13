import { BtnPill } from "@/components/sections-mock/primitives";

export function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="contact"
      aria-labelledby="final-cta-heading"
    >
      <div className="container final-cta__inner text-center">
        <h2 className="display mx-auto max-w-4xl" id="final-cta-heading">
          Start with Safety. The path takes care of the order.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-inverse-muted md:text-xl">
          Most leaders have not yet decided what is safe, valuable, or ethical for their work. The
          four-stage path is how you decide, in writing, before you build anything else.
        </p>
        <div className="hero-actions final-cta__actions mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <BtnPill href="/pathway/safety" variant="primary">
            Begin with Safety
          </BtnPill>
          <BtnPill href="/field-guides/safety" variant="ghost">
            Safety field guide
          </BtnPill>
          <BtnPill href="/contact" variant="ghost">
            Start a Conversation
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
