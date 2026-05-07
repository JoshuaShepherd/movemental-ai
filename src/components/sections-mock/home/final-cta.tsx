import { BtnPill } from "@/components/sections-mock/primitives";

export function FinalCta() {
  return (
    <section
      className="band-midnight final-cta"
      id="cta"
      aria-labelledby="final-cta-heading"
    >
      <div className="container final-cta__inner">
        <h2 className="display" id="final-cta-heading">
          You don’t need to master AI.
          <br />
          You need a clear path for <em>leading through it.</em>
        </h2>
        <p className="lede lede--regular">
          Start with safety. Build capability. Lead with clarity.
        </p>
        <div className="hero-actions final-cta__actions">
          <BtnPill href="/contact" variant="primary">
            Start a Conversation
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
