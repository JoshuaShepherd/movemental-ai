import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Movemental Path overview — the canonical structured explanation of the
 * four-stage system. Consolidated from /path and /work-with-us into a single
 * surface. Semantic tokens only; no recipes.css.
 */
export function PathwayOverviewTemplate() {
  return (
    <div className="bg-background text-foreground">
      <div className="pt-24 md:pt-28">
        <HeroSection />
        <TwoTrapsSection />
        <WhyOrderMattersSection />
        <FourStagesSection />
        <EngagementOptionsSection />
        <ScenariosSection />
        <InstitutionalSection />
        <BoundariesSection />
        <ClosingCtaSection />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

function HeroSection() {
  return (
    <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-8 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:gap-16">
      <div className="flex flex-col justify-center space-y-8 lg:col-span-7">
        <h1 className="font-serif-display text-5xl italic leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Four stages, in the order that makes them work.
        </h1>
        <p className="max-w-[640px] font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
          Safety. Sandbox. Skills. Solutions. In that order. The Field Guide is the
          best place to begin — a printable artifact your leadership team can read
          together before the first conversation.
        </p>
        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Link
            href="/field-guides/safety"
            className="bg-primary px-8 py-4 text-center font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary-dim"
          >
            Read the Field Guide
          </Link>
          <Link
            href="/pathway/safety"
            className="border border-border px-8 py-4 text-center font-sans text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-input"
          >
            Begin with Safety
          </Link>
        </div>
      </div>
      <div className="flex flex-col space-y-12 border-l border-border pl-8 lg:col-span-5 lg:pl-16">
        {[
          {
            n: "01",
            title: "Safety",
            body: "Establish ethical governance and foundational AI literacy before deploying tools.",
            href: "/pathway/safety",
          },
          {
            n: "02",
            title: "Sandbox",
            body: "Create safe environments for experimentation and build a portfolio of proof.",
            href: "/pathway/sandbox",
          },
          {
            n: "03",
            title: "Skills",
            body: "Form stewards through cohort-based learning and continuous capability development.",
            href: "/pathway/skills",
          },
          {
            n: "04",
            title: "Solutions",
            body: "Integrate bespoke AI solutions that align with institutional values and goals.",
            href: "/pathway/solutions",
          },
        ].map((item) => (
          <div key={item.n}>
            <div className="font-serif-display mb-2 text-3xl italic text-primary/40">{item.n}</div>
            <h3 className="font-serif-display mb-2 text-2xl text-foreground">{item.title}</h3>
            <p className="mb-3 font-sans text-sm text-muted-foreground">{item.body}</p>
            <Link
              href={item.href}
              className="inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-primary transition-colors hover:text-primary-dim"
            >
              Read more
              <ArrowRight className="size-3.5 shrink-0" aria-hidden />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Two Traps — migrated from /path                                            */
/* -------------------------------------------------------------------------- */

const TWO_TRAPS = [
  {
    label: "Trap one",
    title: "Rush Ahead",
    body: "Adopt tools quickly without shared standards, clear boundaries, or leadership alignment.",
    bullets: [
      "Tools multiply without coordination",
      "Staff develop inconsistent habits",
      "Risk and confusion increase over time",
    ],
  },
  {
    label: "Trap two",
    title: "Stand Still",
    body: "Delay engagement with AI due to uncertainty, risk, or lack of clarity.",
    bullets: [
      "Staff experiment anyway, without guidance",
      "Opportunities are missed",
      "Leadership loses visibility",
    ],
  },
] as const;

function TwoTrapsSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mx-auto mb-16 max-w-[720px] text-center">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
            The problem
          </p>
          <h2 className="font-serif-display text-4xl italic text-foreground md:text-5xl">
            Most organizations fall into one of two traps.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {TWO_TRAPS.map((trap) => (
            <article key={trap.title} className="bg-card p-10 md:p-12">
              <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {trap.label}
              </p>
              <h3 className="mb-4 font-serif-display text-3xl text-foreground">{trap.title}</h3>
              <p className="mb-6 font-sans text-base leading-relaxed text-muted-foreground">{trap.body}</p>
              <ul className="space-y-2 font-sans text-sm text-muted-foreground">
                {trap.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="text-primary" aria-hidden>•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-[600px] text-center font-serif-display text-xl italic text-foreground">
          Neither approach leads to responsible, sustainable adoption.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why the order matters                                                      */
/* -------------------------------------------------------------------------- */

function WhyOrderMattersSection() {
  return (
    <section className="bg-section py-24 md:py-32">
      <div className="mx-auto max-w-[720px] px-8">
        <h2 className="mb-16 text-center font-serif-display text-4xl italic text-foreground">
          Why the order matters
        </h2>
        <div className="space-y-12 font-sans text-lg leading-relaxed text-muted-foreground">
          <p>
            <strong className="font-medium text-foreground">Safety (Governance first):</strong> You cannot
            experiment safely without knowing the boundaries. Establishing governance first ensures that every
            subsequent action is protected and aligned with institutional values. It mitigates risk before risk is
            taken.
          </p>
          <p>
            <strong className="font-medium text-foreground">Sandbox (Portfolio of proof):</strong> Once safe, you
            must prove utility. The sandbox allows for contained experimentation to build a portfolio of proof. This
            generates internal buy-in and practical understanding before wide-scale training begins.
          </p>
          <p>
            <strong className="font-medium text-foreground">Skills (Formed stewards):</strong> With proof in hand,
            you train the people. You are not just teaching software; you are forming stewards who understand how to
            apply AI ethically within their specific domain expertise.
          </p>
          <p>
            <strong className="font-medium text-foreground">Solutions (Integrated value):</strong> Only when your
            people are trained and your governance is solid should you build custom solutions. Premature building
            leads to abandoned tools. Solutions built by formed stewards create lasting integrated value.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Four Stages — pricing bands                                                */
/* -------------------------------------------------------------------------- */

function FourStagesSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-8">
        <h2 className="mb-16 text-center font-serif-display text-3xl uppercase tracking-widest text-foreground">
          The Four Stages
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div className="border border-border p-12 transition-colors duration-300 hover:bg-card">
            <div className="font-serif-display mb-6 text-4xl italic text-primary/30">01</div>
            <h3 className="font-serif-display mb-4 text-3xl text-foreground">Safety</h3>
            <p className="mb-8 min-h-20 font-sans text-muted-foreground">
              Establish your foundational governance, ethical frameworks, and initial literacy baselines.
            </p>
            <div className="flex items-end justify-between border-t border-border pt-6">
              <div>
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Investment
                </div>
                <div className="font-serif-display text-xl text-foreground">$1,000</div>
              </div>
              <div className="text-right">
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Timeline
                </div>
                <div className="font-serif-display text-xl text-foreground">2 weeks</div>
              </div>
            </div>
          </div>
          <div className="border border-border p-12 transition-colors duration-300 hover:bg-card">
            <div className="font-serif-display mb-6 text-4xl italic text-primary/30">02</div>
            <h3 className="font-serif-display mb-4 text-3xl text-foreground">Sandbox</h3>
            <p className="mb-8 min-h-20 font-sans text-muted-foreground">
              Guided, contained experimentation to uncover high-value use cases and build a portfolio of proof.
            </p>
            <div className="flex items-end justify-between border-t border-border pt-6">
              <div>
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Investment
                </div>
                <div className="font-serif-display text-xl text-foreground">$15,000</div>
              </div>
              <div className="text-right">
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Timeline
                </div>
                <div className="font-serif-display text-xl text-foreground">4 weeks</div>
              </div>
            </div>
          </div>
          <div className="border border-border p-12 transition-colors duration-300 hover:bg-card">
            <div className="font-serif-display mb-6 text-4xl italic text-primary/30">03</div>
            <h3 className="font-serif-display mb-4 text-3xl text-foreground">Skills</h3>
            <p className="mb-8 min-h-20 font-sans text-muted-foreground">
              Cohort-based learning programs designed to form ethical stewards and advance operational capabilities.
            </p>
            <div className="flex items-end justify-between border-t border-border pt-6">
              <div>
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Investment
                </div>
                <div className="font-serif-display text-xl text-foreground">
                  $15,000 <span className="text-sm italic text-muted-foreground">cohort</span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Ongoing
                </div>
                <div className="font-serif-display text-xl text-foreground">
                  +$5,000<span className="text-sm italic text-muted-foreground">/yr</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-border p-12 transition-colors duration-300 hover:bg-card">
            <div className="font-serif-display mb-6 text-4xl italic text-primary/30">04</div>
            <h3 className="font-serif-display mb-4 text-3xl text-foreground">Solutions</h3>
            <p className="mb-8 min-h-20 font-sans text-muted-foreground">
              Bespoke integration, custom tooling, and architectural development for complex institutional needs.
            </p>
            <div className="flex items-end justify-between border-t border-border pt-6">
              <div>
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Investment
                </div>
                <div className="font-serif-display text-xl text-foreground">From $30,000</div>
              </div>
              <div className="text-right">
                <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Timeline
                </div>
                <div className="font-serif-display text-xl text-foreground">Custom</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Engagement Options — migrated from /work-with-us                           */
/* -------------------------------------------------------------------------- */

const ENGAGEMENT_OPTIONS = [
  {
    title: "Safety Session",
    bestFor: "Leaders who need a clear first step.",
    body: "A focused engagement to assess current AI use, identify immediate risks, and establish the first layer of shared clarity.",
    includes: [
      "Current-state conversation",
      "Safety priorities",
      "Initial guardrail recommendations",
      "Next-step roadmap",
    ],
    cta: "Start with Safety",
    href: "/pathway/safety",
  },
  {
    title: "Guided Pathway",
    bestFor: "Organizations ready to move through Safety, Sandbox, and Skills.",
    body: "A structured process for leaders and teams who need more than a workshop but are not yet ready for custom systems.",
    includes: [
      "Leadership alignment",
      "Safety framework",
      "Guided experimentation",
      "Team training",
    ],
    cta: "Explore the Pathway",
    href: "/the-path",
  },
  {
    title: "Solutions Partnership",
    bestFor: "Organizations ready to build on a human foundation.",
    body: "A deeper partnership for organizations that have established clarity and are ready to develop workflows, assistants, or systems.",
    includes: [
      "Workflow discovery",
      "Custom AI assistant design",
      "Integration planning",
      "Ongoing refinement",
    ],
    cta: "Talk With Us",
    href: "/contact",
  },
] as const;

function EngagementOptionsSection() {
  return (
    <section className="bg-section py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-8">
        <div className="mx-auto mb-16 max-w-[760px] text-center">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
            Ways to engage
          </p>
          <h2 className="mb-6 font-serif-display text-4xl italic text-foreground md:text-5xl">
            Start where your organization actually is.
          </h2>
          <p className="font-sans text-lg leading-relaxed text-muted-foreground">
            Some organizations need a first conversation. Others need a guided safety process, team training, or
            implementation support. Movemental helps you take the next faithful step.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {ENGAGEMENT_OPTIONS.map((option) => (
            <Link
              key={option.title}
              href={option.href}
              className="group flex flex-col border border-border bg-background p-10 transition-colors hover:bg-card"
              aria-label={`${option.title} — ${option.cta}`}
            >
              <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Best for
              </p>
              <h3 className="mb-3 font-serif-display text-2xl text-foreground">{option.title}</h3>
              <p className="mb-4 font-sans text-sm font-medium text-foreground">{option.bestFor}</p>
              <p className="mb-6 font-sans text-sm leading-relaxed text-muted-foreground">{option.body}</p>
              <p className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Includes
              </p>
              <ul className="mb-8 space-y-2 font-sans text-sm text-muted-foreground">
                {option.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-primary" aria-hidden>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1 font-sans text-[10px] font-semibold uppercase tracking-widest text-primary transition-colors group-hover:text-primary-dim">
                {option.cta}
                <ArrowRight className="size-3.5 shrink-0" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Scenarios                                                                  */
/* -------------------------------------------------------------------------- */

function ScenariosSection() {
  return (
    <section className="border-y border-border bg-elevated py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-8">
        <h2 className="mx-auto mb-16 max-w-[720px] text-center font-serif-display text-4xl italic text-foreground">
          What if we&apos;re not starting with Safety?
        </h2>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {[
            {
              label: "Scenario A",
              title: "If you have written and ratified governance",
              body: "We review your existing framework for structural integrity against current AI realities. If robust, you may proceed directly to the Sandbox phase to begin building your portfolio of proof.",
            },
            {
              label: "Scenario B",
              title: "If you have explored use cases informally",
              body: "Informal exploration often creates shadow IT risks. We pause to formalize Safety, then rapidly categorize your existing explorations into a structured Sandbox environment to measure actual ROI.",
            },
            {
              label: "Scenario C",
              title: "If you have urgent deployment pressure",
              body: "We deploy an accelerated parallel path: establishing foundational governance (Safety) concurrently with a highly contained, single-use-case Sandbox to relieve pressure without compromising structural integrity.",
            },
          ].map((s) => (
            <div key={s.label} className="space-y-4">
              <h4 className="mb-4 border-b border-border pb-4 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
                {s.label}
              </h4>
              <h3 className="font-serif-display text-2xl text-foreground">{s.title}</h3>
              <p className="font-sans text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Institutional engagements                                                  */
/* -------------------------------------------------------------------------- */

function InstitutionalSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[720px] px-8 text-center">
        <h2 className="mb-8 font-serif-display text-4xl italic text-foreground">
          Institutional engagements run on a different timeline.
        </h2>
        <p className="mb-16 font-sans text-lg text-muted-foreground">
          For complex organizations, consortiums, and national bodies, the path remains sequential, but the scale
          demands architectural precision at every stage.
        </p>
        <div className="space-y-8 border-t border-border pt-8 text-left">
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h4 className="font-serif-display text-xl text-foreground">Institutional Safety</h4>
            <span className="font-sans text-muted-foreground">$7,500</span>
          </div>
          <div className="flex items-baseline justify-between border-b border-border pb-4">
            <h4 className="font-serif-display text-xl text-foreground">Network Sandbox</h4>
            <span className="font-sans text-muted-foreground">$60,000</span>
          </div>
          <div className="flex items-baseline justify-between pb-4">
            <h4 className="font-serif-display text-xl text-foreground">Solutions Integration</h4>
            <span className="font-sans text-muted-foreground">$300k - $500k+</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Boundaries — migrated from /work-with-us                                   */
/* -------------------------------------------------------------------------- */

const BOUNDARIES = [
  {
    title: "We do not start with software.",
    body: "Tools come after safety, clarity, and capability.",
  },
  {
    title: "We do not replace human judgment.",
    body: "AI can support leadership, but it cannot carry responsibility.",
  },
  {
    title: "We do not offer generic AI hype.",
    body: "Your organization’s mission, people, and context determine what is appropriate.",
  },
  {
    title: "We do not treat efficiency as the highest good.",
    body: "Efficiency matters, but it must serve formation, trust, and mission.",
  },
] as const;

function BoundariesSection() {
  return (
    <section className="bg-section py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mx-auto mb-16 max-w-[760px] text-center">
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-widest text-primary">
            Boundaries
          </p>
          <h2 className="mb-6 font-serif-display text-4xl italic text-foreground md:text-5xl">
            Movemental is not here to make your organization chase AI.
          </h2>
          <p className="font-sans text-lg leading-relaxed text-muted-foreground">
            We are not interested in faster adoption for its own sake. We help leaders make wise decisions in the
            right order.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {BOUNDARIES.map((b) => (
            <article key={b.title} className="bg-background p-10">
              <h3 className="mb-3 font-serif-display text-2xl text-foreground">{b.title}</h3>
              <p className="font-sans text-base leading-relaxed text-muted-foreground">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing CTA                                                                */
/* -------------------------------------------------------------------------- */

function ClosingCtaSection() {
  return (
    <section className="bg-inverse-surface py-24 text-center text-inverse-foreground md:py-32">
      <div className="mx-auto max-w-[720px] px-8">
        <div className="mb-6 font-sans text-xs font-semibold uppercase tracking-widest text-inverse-muted">
          BEGIN THE PATH
        </div>
        <h2 className="mb-12 font-serif-display text-5xl italic">
          The path is sequential because the work is sequential.
        </h2>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link
            href="/field-guides/safety"
            className="bg-inverse-foreground px-10 py-4 font-sans text-xs font-semibold uppercase tracking-wider text-inverse-surface transition-colors hover:bg-card"
          >
            Read the Field Guide
          </Link>
          <Link
            href="/contact"
            className="border border-inverse-border px-10 py-4 font-sans text-xs font-semibold uppercase tracking-wider text-inverse-foreground transition-colors hover:border-inverse-muted"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
