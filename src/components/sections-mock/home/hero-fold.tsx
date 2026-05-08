import { BtnPill } from "@/components/sections-mock/primitives";

export function HeroFold() {
  return (
    <section
      className="band-midnight hero hero--fold hero--path"
      aria-labelledby="hero-h1"
    >
      <div className="container">
        <p className="eyebrow">For organizational leaders</p>
        <h1 className="display hero-headline" id="hero-h1">
          <span className="hero-headline__line">
            AI is already inside your organization.
          </span>
          <span className="hero-headline__line">
            The question is whether you’re{" "}
            <em>leading it—or reacting to it.</em>
          </span>
        </h1>
        <p className="lede lede--regular hero-subhead">
          We give mission-driven organizations a clear path to adopt AI safely,
          build real capability, and lead their people through it—without losing
          trust, credibility, or identity.
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
