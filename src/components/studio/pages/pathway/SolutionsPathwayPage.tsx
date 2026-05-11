"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/studio/Container";
import { PathwayStageRail } from "@/components/pathway/pathway-stage-rail";
import { Reveal } from "@/components/studio/Reveal";
import { ToolkitCover } from "@/components/toolkit/ToolkitCover";
import { ToolkitDownloadForm } from "@/components/toolkit/ToolkitDownloadForm";
import { proofRows } from "@/components/sections/home/home-data";

const DEPLOYMENT_CONFIGURATIONS = [
  {
    name: "Tool optimization",
    description:
      "For organizations whose Sandbox surfaced high-value use cases that do not require new infrastructure. We configure enterprise AI tools (Claude Enterprise, Microsoft Copilot-class tools) with custom skills, prompts, recipe libraries, and integrations specific to your work.",
    rightWhen:
      "Sandbox produced a clear set of use cases that fit within existing tools, and your team has the Skills capacity to operate them.",
    price: "From: $30,000",
  },
  {
    name: "Composed application",
    description:
      "A focused web workflow built on Movemental's application stack for a targeted process — donor communications, content production, member care, curriculum development — that exceeds what tool-level optimization can handle.",
    rightWhen:
      "Sandbox surfaced a high-value workflow that needs custom interface, integration, or governance scaffolding beyond what existing tools allow.",
    price: "From: $60,000",
  },
  {
    name: "Content and intelligence platform",
    description:
      "Your archives — sermons, curricula, program documentation, faculty writing, media — converted into structured, queryable, AI-grounded corpora that your staff and constituents can use.",
    rightWhen:
      "Your organization has substantial intellectual or institutional content that should be findable and AI-accessible without losing fidelity to its source.",
    price: "From: $120,000",
  },
  {
    name: "Full platform tenant",
    description:
      "A dedicated tenant on Movemental's platform combining content pipeline, learning surfaces, governed agents, and CRM-class infrastructure for organizations whose Sandbox surfaced platform-scale opportunity and whose Skills capacity can operate it.",
    rightWhen:
      "Multiple workflows would benefit from shared infrastructure, and your team is ready to operate at platform scale.",
    price: "From: $240,000",
  },
  {
    name: "Network deployment",
    description:
      "For institutions, denominations, training networks, and federated organizations that need to propagate shared governance and compounding capability across member organizations without duplicating fifty disconnected AI experiments.",
    rightWhen:
      "You operate at the institutional or network scale and need shared infrastructure across many member organizations.",
    price: "From: $300,000",
  },
  {
    name: "Hybrid",
    description:
      "Combinations scoped honestly when reality crosses neat categories. Most institutional engagements are some form of hybrid.",
    rightWhen: "Your situation does not fit a single configuration, and we should scope together.",
    price: "Scoped per engagement.",
  },
] as const;

const WHY_PILLARS = [
  {
    title: "Built on the foundation",
    body:
      "Every Solutions deployment is configured to the seven decisions from Safety, the adjudicated use cases from Sandbox, and the formed capacity from Skills. We do not build deployments for organizations that have skipped stages, because the deployment becomes a liability rather than a capability.",
  },
  {
    title: "Owned by your team",
    body:
      "Solutions succeeds when your organization can propose, deploy, operate, and retire AI use cases on its own staff. If we remain the cognitive owner after the support window, the deployment was purchased rather than built. The handoff is the point.",
  },
  {
    title: "Governed by working policy",
    body:
      "The seven decisions from Safety are wired into the deployment itself — disclosure standards, data handling, named refusals, incident response. The deployment cannot operate outside the governance because the governance is part of the configuration.",
  },
] as const;

const PHASES = [
  {
    eyebrow: "PHASE 01",
    title: "Scoping (typical 2-3 weeks)",
    body:
      "We translate Sandbox findings and your specific operational context into a Solutions Brief. Configuration choice, integrations, owners, timeline, price. Signed before build begins. No build work happens against verbal scope.",
  },
  {
    eyebrow: "PHASE 02",
    title: "Build (typical 4 weeks to 6 months)",
    body:
      "Engineering against the Brief. Real workflows, not demo theater. Milestone testing with your team at each stage. Configurations and content are tuned as your team interacts with the build.",
  },
  {
    eyebrow: "PHASE 03",
    title: "Deployment (typical 2-4 weeks)",
    body:
      "Progressive go-live. Your formed staff lead the expansion across the organization. Documentation, role-based training, governance integration. The deployment becomes operational while we are still in the room.",
  },
  {
    eyebrow: "PHASE 04",
    title: "Support window (typical 90 days)",
    body:
      "Tuning against reality. Handling surprises honestly. Your team learns to operate without us. At the end of the window, the engagement transitions to a subscription, retainer, or full handoff as agreed.",
  },
] as const;

const PRICING_INCLUDED = [
  "Solutions Brief (signed scoping document)",
  "Configured working deployment to your specifications",
  "Integration with the seven Safety decisions and Skills capacity",
  "Safety, Sandbox, and Skills complete before build begins — stable foundation for configuration",
  "Phased build with synchronous testing at each stage",
  "Documentation and role-based training",
  "90-day operational support window",
  "Transition path to subscription, retainer, or full handoff",
] as const;

const PRICING_NOT_INCLUDED = [
  "Build work without a signed Solutions Brief",
  "Configurations not supported by the upstream stages",
  "Replacement of the Skills cohort or platform license",
  "Indefinite operational ownership by Movemental",
  "Software licenses or tools from third-party vendors",
] as const;

const WHO_BEGIN = [
  "You have completed Safety, Sandbox, and Skills, and your team has the formed capacity to operate what we will build.",
  "Your Sandbox surfaced specific high-value use cases or workflows that justify the deployment investment.",
  "You have a senior leader who will own the engagement and one or more formed staff who will operate the deployment.",
  "You are committed to the deployment outliving any individual staff member, including the senior leader who signed for it.",
  "You want the AI work integrated into how your organization actually runs, not bolted on as a separate system.",
] as const;

const WHO_WAIT = [
  "You have not yet completed the prior stages. Solutions on top of skipped stages produces deployments that fail in ways that look like the technology and are actually the foundation.",
  "You are looking for AI deployment without governance. Solutions is governance-wired by definition; if you want ungoverned deployment, choose a different vendor.",
  "Your team does not have the formed capacity to operate what would be built. Skipping Skills produces vendor dependency, not organizational capability.",
  "You expect Movemental to remain the cognitive owner after deployment. We design ourselves out of the work; if you want indefinite operational dependency, choose a different vendor.",
  "You want the largest configuration available because you can afford it. The right configuration is the one that fits what Sandbox surfaced, not the one that fits the budget.",
] as const;

export function SolutionsPathwayPage() {
  useEffect(() => {
    document.title = "Solutions — Stage 04 of the Movemental Path | Movemental";
  }, []);

  return (
    <div className="solutions-pathway-page rounded-none pb-20 md:pb-28">
      <div className="pt-24 md:pt-28">
        <PathwayStageRail variant="solutions" />
      </div>

      {/* Section 2 — Hero */}
      <section className="border-b border-border bg-section py-16 md:py-24" aria-labelledby="solutions-hero-title">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="space-y-8 lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Stage 04 — Solutions
                </p>
                <h1
                  id="solutions-hero-title"
                  className="font-serif-display text-[clamp(2.25rem,5vw,4.5rem)] italic leading-[0.95] tracking-tight text-foreground"
                >
                  AI integrated into how your organization actually runs, owned by formed people, governed by working
                  policy.
                </h1>
                <p className="max-w-[40rem] text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Solutions is where AI moves from explored to deployed. The work is scoped per engagement because the
                  right deployment depends on what your organization learned in Sandbox, what your team can lead from
                  Skills, and what your specific operational context requires. We build the deployment that fits — not
                  the deployment our last customer needed.
                </p>
                <p className="max-w-[36rem] font-serif-display text-xl italic leading-snug text-foreground md:text-2xl">
                  From $30,000. Scoped per conversation. Built on the foundation the prior three stages have established.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Link
                    href="/contact?interest=solutions"
                    className="inline-flex items-center justify-center rounded-full bg-inverse-surface px-8 py-4 text-center text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground hover:opacity-90"
                  >
                    Begin Solutions
                  </Link>
                  <Link href="/field-guide" className="btn-pill btn-pill--ghost px-8 py-4 text-base">
                    Read the Field Guide first
                  </Link>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  Solutions builds on Safety, Sandbox, and Skills. If you have not yet completed those stages,{" "}
                  <Link href="/pathway" className="font-medium text-primary underline underline-offset-4 hover:text-primary-dim">
                    start with the path
                  </Link>{" "}
                  so we can route you correctly.
                </p>
              </div>

              <aside className="border border-border bg-background lg:col-span-5">
                <div className="border-b border-border p-6 md:p-8">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    What this produces
                  </p>
                  <p className="mt-4 font-serif-display text-[clamp(1.5rem,2.5vw,2rem)] italic leading-snug text-foreground">
                    Working AI inside your organization, configured to your work and held by your governance.
                  </p>
                </div>
                <ul className="divide-y divide-border">
                  {[
                    ["01", "Solutions Brief (scoping document)"],
                    ["02", "Working deployment configured to your work"],
                    ["03", "Operational handoff to your formed team"],
                  ].map(([num, label]) => (
                    <li key={num} className="flex gap-4 px-6 py-5 md:px-8">
                      <span className="w-8 shrink-0 font-serif-display text-lg italic text-pathway-accent">{num}</span>
                      <span className="text-sm leading-relaxed text-foreground">{label}</span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-border px-6 py-5 text-sm italic leading-relaxed text-muted-foreground md:px-8">
                  The configuration depends on what your organization needs. The architecture beneath every Solutions
                  deployment is the same.
                </p>
              </aside>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 3 */}
      <section className="border-b border-border bg-background py-16 md:py-24" aria-labelledby="solutions-why-last-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Why this stage comes last
              </p>
              <h2
                id="solutions-why-last-title"
                className="mt-4 font-serif-display text-[clamp(2rem,4vw,3.25rem)] italic leading-tight text-foreground"
              >
                Solutions is not where value is first created. It is where value is made durable.
              </h2>
              <p className="mt-6 max-w-[45rem] text-lg leading-relaxed text-muted-foreground">
                Sandbox and Skills create organizational value. Solutions makes it durable — survivable across staff
                turnover, vendor churn, and model upgrades. Three commitments make Solutions deployments different from
                typical technology rollouts.
              </p>
              <div className="mt-14 grid grid-cols-1 gap-12 border-t border-border pt-12 md:grid-cols-3 md:gap-10 md:pt-14">
                {WHY_PILLARS.map((p, i) => (
                  <article key={p.title}>
                    <p className="text-xs font-semibold uppercase tracking-eyebrow text-pathway-accent">
                      Pillar {["i", "ii", "iii"][i]}
                    </p>
                    <h3 className="mt-3 font-serif-display text-xl italic text-foreground">{p.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 4 — Configurations */}
      <section
        className="border-b border-border bg-surface-highest py-16 md:py-24"
        aria-labelledby="solutions-config-title"
      >
        <Container>
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Deployment configurations
              </p>
              <h2
                id="solutions-config-title"
                className="mt-4 font-serif-display text-[clamp(2rem,4vw,3.25rem)] italic leading-tight text-foreground"
              >
                A spectrum of deployments, calibrated to what your organization actually needs.
              </h2>
              <p className="mt-6 max-w-[45rem] text-lg leading-relaxed text-muted-foreground">
                Solutions is not a single product. It is a family of deployment configurations, scoped per engagement
                based on what Sandbox surfaced and what Skills produced. Most organizations should buy lower on this
                spectrum than their ambitions suggest. The most common failure mode in AI deployment is reaching for
                platform-scale work before the upstream foundation can support it.
              </p>
              <ol className="mt-14 divide-y divide-border border-t border-border">
                {DEPLOYMENT_CONFIGURATIONS.map((c, idx) => (
                  <li key={c.name} className="py-10 first:pt-8">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                      Configuration {String(idx + 1).padStart(2, "0")} — {c.name}
                    </p>
                    <p className="mt-4 max-w-4xl text-base leading-relaxed text-foreground">{c.description}</p>
                    <p className="mt-4 max-w-4xl text-sm leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">Right when:</span> {c.rightWhen}
                    </p>
                    <p className="mt-4 font-serif-display text-lg italic text-pathway-accent">{c.price}</p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 5 — Produces */}
      <section className="border-b border-border bg-background py-16 md:py-24" aria-labelledby="solutions-produces-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                What this stage produces
              </p>
              <h2
                id="solutions-produces-title"
                className="mt-4 font-serif-display text-[clamp(2rem,4vw,3.25rem)] italic leading-tight text-foreground"
              >
                A working deployment, owned by your team, ready to outlast any one staff member.
              </h2>
              <p className="mt-6 max-w-[45rem] text-lg leading-relaxed text-muted-foreground">
                Every Solutions engagement, regardless of configuration, produces three deliverables. The specifics vary
                by configuration; the architecture beneath them does not.
              </p>
              <div className="mt-14 grid grid-cols-1 border border-border md:grid-cols-2">
                <article className="border-b border-border p-8 md:border-r md:border-b-0">
                  <span className="font-serif-display text-4xl italic text-pathway-accent">01</span>
                  <h3 className="mt-4 font-serif-display text-[clamp(1.35rem,2vw,1.75rem)] italic text-foreground">
                    Solutions Brief
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    The scoping document signed before any build work begins. Translates Sandbox findings into the
                    specific deployment configuration: integrations, owners, timeline, milestones, price. Becomes the
                    source of truth for the engagement.
                  </p>
                  <p className="mt-6 text-sm font-medium text-foreground">The Brief is signed. The build follows.</p>
                </article>
                <article className="border-b border-border p-8 md:border-b-0">
                  <span className="font-serif-display text-4xl italic text-muted-foreground">02</span>
                  <h3 className="mt-4 font-serif-display text-[clamp(1.35rem,2vw,1.75rem)] italic text-foreground">
                    Working deployment
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    The actual configured AI infrastructure deployed against your organization&apos;s work. Built in
                    milestones with synchronous testing at each stage, not handed over as a finished product. The work
                    is built with you.
                  </p>
                  <p className="mt-6 text-sm font-medium text-foreground">The deployment is what you bought.</p>
                </article>
                <article className="border-t border-border p-8 md:border-r md:border-t-0">
                  <span className="font-serif-display text-4xl italic text-muted-foreground">03</span>
                  <h3 className="mt-4 font-serif-display text-[clamp(1.35rem,2vw,1.75rem)] italic text-foreground">
                    Operational handoff
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Documentation, training, role-based access setup, and the operational support window (typically 90
                    days) during which we tune against reality and prepare your team to operate without us. After the
                    window closes, your team owns the work.
                  </p>
                  <p className="mt-6 text-sm font-medium text-foreground">The handoff is the point.</p>
                </article>
                <article className="border-t border-border bg-inverse-surface p-8 text-inverse-foreground md:border-t-0">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-inverse-muted">
                    Governance wired in
                  </p>
                  <h3 className="mt-4 font-serif-display text-[clamp(1.35rem,2vw,1.75rem)] italic">
                    Every deployment carries the seven decisions inside it.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-inverse-muted">
                    Solutions deployments are configured against the Safety decisions. Disclosure, data handling, named
                    refusals, incident response — these are not separate documents the deployment ignores. They are
                    wired into how the system operates, monitored, and held accountable.
                  </p>
                </article>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 6 — Phases */}
      <section className="border-b border-border bg-background py-16 md:py-24" aria-labelledby="solutions-work-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">How the work happens</p>
              <h2
                id="solutions-work-title"
                className="mt-4 font-serif-display text-[clamp(2rem,4vw,3.25rem)] italic leading-tight text-foreground"
              >
                Four phases. Timeline depends on configuration.
              </h2>
              <p className="mt-6 max-w-[45rem] text-lg leading-relaxed text-muted-foreground">
                Solutions engagements run between eight weeks and nine months, depending on configuration complexity and
                content readiness. The four-phase shape holds across all configurations; only the duration of each phase
                changes.
              </p>
              <div className="mt-14 grid grid-cols-1 gap-10 border-t border-border pt-12 md:grid-cols-4 md:gap-8 md:pt-14">
                {PHASES.map((ph) => (
                  <article key={ph.eyebrow}>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-pathway-accent">
                      {ph.eyebrow}
                    </p>
                    <h3 className="mt-3 font-serif-display text-lg italic text-foreground">{ph.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{ph.body}</p>
                  </article>
                ))}
              </div>
              <p className="mx-auto mt-14 max-w-[40rem] border-t border-border pt-10 text-base italic leading-relaxed text-muted-foreground">
                The facilitator must disappear. Solutions succeeds when your team can propose, deploy, operate, and
                retire AI use cases without us. If we are still cognitive owners after the support window, the
                engagement failed regardless of how working the deployment is.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 7 — Pull quote */}
      <section className="border-b border-border bg-section py-16 md:py-24" aria-labelledby="solutions-quote-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-5xl border-l-2 border-pathway-accent pl-6 md:pl-10">
              <p className="text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">From the field</p>
              <blockquote>
                <p
                  id="solutions-quote-title"
                  className="mt-6 font-serif-display text-[clamp(1.75rem,3.5vw,3rem)] italic leading-tight text-foreground"
                >
                  The deployment they built is now boring to us, which is the highest compliment I can pay it. Our team
                  uses it without thinking about whether it is AI. It just does the work. The governance is invisible
                  because it is everywhere. That is what we paid for.
                </p>
              </blockquote>
              <p className="mt-8 max-w-xl border-t border-border pt-6 text-sm text-muted-foreground">
                COO, mid-size denomination
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 8 — Pricing */}
      <section className="border-b border-border bg-background py-16 md:py-24" aria-labelledby="solutions-cost-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">What it costs</p>
              <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                <div className="md:col-span-2">
                  <h2
                    id="solutions-cost-title"
                    className="font-serif-display text-[clamp(2rem,4vw,3rem)] italic leading-tight text-foreground"
                  >
                    From thirty thousand. Scoped per engagement. Priced honestly against what we will actually build.
                  </h2>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-serif-display text-3xl italic text-foreground md:text-4xl">From $30,000</p>
                  <p className="mt-1 font-serif-display text-xl italic text-muted-foreground">Configuration-dependent</p>
                  <p className="mt-4 text-[0.65rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    USD · Scoped timeline per engagement
                  </p>
                </div>
              </div>
              <hr className="mt-10 border-border" />
              <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-pathway-accent">
                    What&apos;s included (varies by configuration)
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                    {PRICING_INCLUDED.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="shrink-0 font-medium text-pathway-accent" aria-hidden>
                          +
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-eyebrow text-foreground">
                    What&apos;s not included
                  </h3>
                  <ul className="mt-6 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
                    {PRICING_NOT_INCLUDED.map((item) => (
                      <li key={item} className="flex gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0">
                        <span className="shrink-0 text-foreground/40" aria-hidden>
                          —
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 9 — Who */}
      <section className="border-b border-border bg-surface-highest py-16 md:py-24" aria-labelledby="solutions-who-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">Who this is for</p>
              <h2
                id="solutions-who-title"
                className="mt-4 max-w-[52rem] font-serif-display text-[clamp(2rem,4vw,3.25rem)] italic leading-tight text-foreground"
              >
                Begin here, or wait — depending on where you actually are.
              </h2>
              <div className="mt-14 grid grid-cols-1 gap-12 border-t border-border pt-12 md:grid-cols-2 md:gap-16 md:pt-14">
                <div>
                  <h3 className="font-serif-display text-xl italic text-foreground">Begin here if…</h3>
                  <ul className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-foreground">
                    {WHO_BEGIN.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 bg-pathway-accent" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif-display text-xl italic text-muted-foreground">Wait if…</h3>
                  <ul className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
                    {WHO_WAIT.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 bg-border" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 10 — Movement voices */}
      <section className="border-b border-border bg-background py-16 md:py-24" aria-labelledby="solutions-voices-title">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-6xl">
              <p className="text-center text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Movement voices
              </p>
              <h2
                id="solutions-voices-title"
                className="mx-auto mt-4 max-w-3xl text-center font-serif-display text-[clamp(2rem,4vw,3rem)] italic leading-tight text-foreground"
              >
                Built with trusted movement voices.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
                Not built in isolation from the field it serves. Movemental is shaped in conversation with leaders
                whose public work it is built to carry.
              </p>
              <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
                {proofRows.map((row) => (
                  <article key={row.name} className="border border-border bg-card p-6">
                    <p className="text-lg font-semibold tracking-tight text-foreground">{row.name}</p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-eyebrow text-pathway-accent">
                      {row.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{row.blurb}</p>
                  </article>
                ))}
              </div>
              <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">
                <Link href="/voices" className="font-medium text-primary underline underline-offset-4 hover:text-primary-dim">
                  See Movement Voices
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 11 — Field guide */}
      <section className="border-b border-border bg-section py-16 md:py-28" aria-labelledby="solutions-field-guide-title">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
              <div className="order-2 mx-auto w-full max-w-lg lg:order-1 lg:col-span-5 lg:mx-0">
                <ToolkitCover />
              </div>
              <div className="order-1 lg:order-2 lg:col-span-7">
                <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Read before you commit
                </p>
                <h2
                  id="solutions-field-guide-title"
                  className="mt-4 font-serif-display text-[clamp(2rem,4vw,3.25rem)] italic leading-tight text-foreground"
                >
                  Start with the Field Guide.
                </h2>
                <p className="mt-8 max-w-[30rem] text-lg leading-relaxed text-muted-foreground">
                  It Starts With Safety is a sixteen-page Field Guide that walks through the full Movemental Path. If you
                  are considering Solutions, the Field Guide will help you see whether your organization is ready, or
                  whether earlier stages need attention first. The Field Guide is free, and we would rather route you
                  correctly than build a deployment your foundation cannot hold.
                </p>
                <div className="mt-10 max-w-xl">
                  <ToolkitDownloadForm
                    source="solutions-pathway-page"
                    variant="page"
                    layout="inline"
                    disclaimer={
                      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                        We use your email only to send the PDF and occasional Path-related updates. Unsubscribe anytime.
                      </p>
                    }
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Section 12 — Closing */}
      <section className="band-midnight border-b border-inverse-border" aria-labelledby="solutions-closing-title">
        <Container className="relative z-10">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-pathway-accent">Begin Solutions</p>
              <h2
                id="solutions-closing-title"
                className="mx-auto mt-6 font-serif-display text-[clamp(2.25rem,5vw,4.5rem)] italic leading-[0.95] text-inverse-foreground"
              >
                The deployment that fits, owned by your team, governed by your policy. Begin the conversation.
              </h2>
              <p className="mx-auto mt-8 max-w-[40rem] text-lg leading-relaxed text-inverse-muted">
                Solutions is scoped per engagement because the right deployment depends on what your organization has
                learned and what your team can lead. The first conversation is diagnostic — we listen, ask honest
                questions, and tell you whether Solutions is the right next step or whether earlier stages need
                attention first.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <Link href="/contact?interest=solutions" className="btn-pill btn-pill--primary px-8 py-4 text-base">
                  Start a conversation
                </Link>
                <Link href="/field-guide" className="btn-pill btn-pill--ghost px-8 py-4 text-base">
                  Read the Field Guide first
                </Link>
              </div>
              <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-inverse-foreground/55">
                From $30,000. Scoped per engagement. Built to outlast any one staff member, vendor, or model upgrade.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border bg-section py-12">
        <Container>
          <div className="flex flex-col items-stretch justify-between gap-10 md:flex-row md:items-center">
            <Link href="/pathway/skills" className="group flex flex-col gap-2 text-muted-foreground hover:text-foreground">
              <span className="text-xs font-semibold uppercase tracking-eyebrow">Previous stage</span>
              <span className="font-serif-display inline-flex items-center gap-2 text-2xl italic transition-all group-hover:translate-x-0.5">
                <ArrowRight className="size-6 rotate-180" aria-hidden />
                Stage 03 — Skills
              </span>
            </Link>
            <div className="hidden h-16 w-px bg-border md:block" aria-hidden />
            <Link href="/pathway" className="group flex flex-col items-end gap-2 text-muted-foreground hover:text-foreground md:text-right">
              <span className="text-xs font-semibold uppercase tracking-eyebrow">Full path</span>
              <span className="font-serif-display inline-flex items-center gap-2 text-2xl italic transition-all group-hover:translate-x-0.5">
                Movemental Path overview
                <ArrowRight className="size-6" aria-hidden />
              </span>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
