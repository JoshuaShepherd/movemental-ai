import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Movemental Path overview — migrated from static HTML (four stages, pricing bands).
 * Uses site chrome from root layout; semantic tokens only.
 */
export function PathwayOverviewTemplate() {
  return (
    <div className="bg-background text-foreground">
      <div className="pt-24 md:pt-28">
        {/* Hero */}
        <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-8 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:gap-16">
          <div className="flex flex-col justify-center space-y-8 lg:col-span-7">
            <h1 className="font-serif-display text-5xl italic leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Four stages, in the order that makes them work.
            </h1>
            <p className="max-w-[640px] font-sans text-lg leading-relaxed text-muted-foreground md:text-xl">
              Most organizations begin with Safety… Safety. Sandbox. Skills. Solutions. In that order.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Link
                href="/pathway/safety"
                className="bg-primary px-8 py-4 text-center font-sans text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary-dim"
              >
                Begin with Safety
              </Link>
              <Link
                href="/field-guide/safety"
                className="border border-border px-8 py-4 text-center font-sans text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-input"
              >
                Read the Field Guide first
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

        {/* Why the order matters */}
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

        {/* Four stages cards */}
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

        {/* Scenarios */}
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

        {/* Institutional */}
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

        {/* Closing CTA */}
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
                href="/pathway/safety"
                className="bg-inverse-foreground px-10 py-4 font-sans text-xs font-semibold uppercase tracking-wider text-inverse-surface transition-colors hover:bg-card"
              >
                Begin with Safety
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
      </div>
    </div>
  );
}
