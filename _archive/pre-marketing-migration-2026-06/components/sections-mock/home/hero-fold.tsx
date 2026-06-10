import { BtnPill } from "@/components/sections-mock/primitives";

export function HeroFold() {
  return (
    <section
      className="band-midnight hero hero--fold hero--path"
      aria-labelledby="hero-h1"
    >
      <div className="container">
        <h1 className="display hero-headline" id="hero-h1">
          <span className="hero-headline__line">
            AI is already inside your organization.
          </span>
        </h1>
        <p className="lede lede--regular hero-subhead">
          We built a path to walk you through the organizational and
          technological challenges posed by AI.
        </p>
        <p className="lede lede--regular hero-subhead">
          Four stages, ordered to ensure a strong human foundation precedes any
          technological implementation. Safety first: the governance that
          answers the questions your people are asking. Sandbox: disciplined
          exploration of valuable AI use cases and ethical concerns, without the
          risks of publication and privacy issues. Skills: formation that
          produces leaders, not just users. Solutions: AI-integrated
          technological deployment built on the secure foundation.
        </p>
        <div className="hero-actions">
          <BtnPill href="#pathway" variant="primary">
            See the Path
          </BtnPill>
          <BtnPill href="#contact" variant="ghost">
            Start a Conversation
          </BtnPill>
        </div>
      </div>
    </section>
  );
}
