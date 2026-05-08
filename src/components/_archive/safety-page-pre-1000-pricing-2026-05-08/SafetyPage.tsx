"use client";

import { BarChart3, Check, FileText, Eye, Mic, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

const fivePillars = [
  {
    title: "Acceptable Use",
    body: "Defining explicitly what is permitted and what is strictly prohibited. The baseline document for institutional clarity.",
    Icon: FileText,
  },
  {
    title: "Data Boundaries",
    body: "Securing proprietary institutional knowledge from public ingestion. Establishing closed-loop architectural perimeters.",
    Icon: ShieldCheck,
  },
  {
    title: "Human Oversight",
    body: "Mandating human-in-the-loop protocols for all externally facing outputs. The final arbiter of intent and tone.",
    Icon: Eye,
  },
  {
    title: "Voice and Trust",
    body: "Calibrating models to reflect institutional tone while ensuring total transparency about machine generation with constituents.",
    Icon: Mic,
  },
  {
    title: "Ethical Guardrails",
    body: "Aligning output with core theological or institutional values. Preventing bias and enforcing objective operational integrity.",
    Icon: Scale,
  },
];

const ledgerProduces = [
  { title: "Policy Framework", body: "A comprehensive, board-ready document outlining acceptable AI utilization across all departmental verticals." },
  { title: "Data Guardrails", body: "Technical specifications defining precisely what internal data can be processed, mapped against privacy compliance." },
  { title: "Oversight Protocol", body: "The established chain of command for reviewing AI-generated outputs before they reach public consumption." },
  { title: "Trust Manifesto", body: "Public-facing verbiage communicating your institution's transparent stance on AI integration to your constituents." },
  { title: "Ethical Ledger", body: "A documented rubric ensuring AI utilization aligns explicitly with the core values and mission of the organization." },
  { title: "Training Syllabus", body: "The curriculum required to upskill staff on these new protocols, moving from shadow IT to sanctioned capability." },
  { title: "Implementation Roadmap", body: "The sequential timeline mapping exactly how these artifacts are deployed and enforced across the next two quarters." },
];

const includedChecklist = [
  "AI Use & Trust Charter",
  "Acceptable Use Policy (AUP)",
  "Prohibited Use Cases List",
  "Data Privacy & Handling Addendum",
  "Vendor Evaluation Matrix",
  "Employee AI Disclosure Form",
  "Incident Response Protocol (AI Specific)",
  "AI Committee Formation Guide",
  "Tool Approval Workflow",
  "Shadow IT Amnesty Memo",
  "Baseline Training Requirements",
  "Review & Revision Schedule",
  "Charter Adoption Checklist",
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Do we really need 14 documents?",
    a: "Yes. Each serves a distinct operational, legal, or cultural purpose. A generalized AI policy is too vague to enforce. This granular suite provides specific guidance for IT (Vendor Matrix), HR (Training Requirements), and staff (AUP).",
  },
  {
    q: "Is this just legal boilerplate?",
    a: "No. While legally informed, these documents are designed to be read, understood, and operationalized by your workforce. They are written in plain language to foster trust, not just mitigate liability.",
  },
  {
    q: "Who needs to be involved?",
    a: "Typically, a working group comprising leadership, IT/Security, HR, and Legal/Compliance. We facilitate the alignment sessions to ensure these distinct perspectives are synthesized into a coherent policy suite.",
  },
];

export function SafetyPage() {
  useEffect(() => {
    document.title = "Safety Documentation | Movemental";
  }, []);

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <section className="border-b border-border bg-background py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 lg:grid-cols-12">
              <div className="flex flex-col lg:col-span-8 lg:col-start-3">
                <span className="mb-6 block text-sm font-semibold uppercase tracking-eyebrow text-muted-foreground">Stage 01</span>
                <h1 className="mb-8 font-serif-display text-6xl italic leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-8xl">
                  Safety Documentation
                </h1>
                <p className="mb-8 max-w-3xl font-serif-display text-2xl leading-snug text-foreground/90 md:text-3xl">
                  Your AI policy, governance, and human readiness — drafted in two weeks.
                </p>
                <div className="mb-12 flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <Link href="/contact?interest=safety-documentation" className="btn-pill btn-pill--primary px-8 py-4 text-center">
                    Start with Safety
                  </Link>
                  <p className="text-sm text-muted-foreground">Standard engagement. Timeline and scope adapt to your situation.</p>
                </div>
                <div className="w-full border-t border-border pt-4 text-[10px] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  2 Weeks · $5,000
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
              <div className="flex flex-col gap-12 lg:col-span-7">
                <h2 className="font-serif-display text-4xl italic tracking-tight text-foreground">Why this stage matters</h2>
                <div className="max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    Organizations spend months arguing in circles about artificial intelligence. Committees are formed, abstract risks are debated, and momentum dies. Safety Documentation cuts through this paralysis by providing a definitive, structural baseline for what is allowed, what is prohibited, and who is responsible.
                  </p>
                  <p>
                    We draft the entire suite in two weeks. You don&apos;t need endless discovery; you need a starting point. Once these guardrails are codified, the real work of testing tools and transforming workflows can begin securely.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="border-t border-primary/30 bg-section p-8">
                    <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-eyebrow text-muted-foreground">Before you start</h3>
                    <p className="text-sm leading-relaxed text-foreground">
                      You need executive buy-in for establishing baseline AI rules and a designated point of contact for review cycles.
                    </p>
                  </div>
                  <div className="border-t border-primary/30 bg-section p-8">
                    <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-eyebrow text-muted-foreground">You&apos;re finished when</h3>
                    <p className="text-sm leading-relaxed text-foreground">
                      The full documentation suite is delivered, reviewed, and signed off by key stakeholders, ready for immediate operational deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-section py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto mb-16 flex max-w-7xl flex-col items-baseline justify-between gap-6 md:flex-row">
              <h2 className="font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl">Five pillars of Safety.</h2>
              <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">The structural defense</p>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fivePillars.map(({ title, body, Icon }) => (
                <div key={title} className="flex min-h-[300px] flex-col justify-between bg-card p-10">
                  <Icon className="mb-6 size-8 text-primary" aria-hidden />
                  <div>
                    <h3 className="mb-4 font-serif-display text-2xl text-foreground">{title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
              <Link
                href="/assess"
                className="flex min-h-[300px] flex-col items-center justify-center bg-card p-10 text-center transition-colors hover:bg-section"
              >
                <BarChart3 className="mb-4 size-10 text-primary" aria-hidden />
                <h3 className="mb-2 font-serif-display text-2xl text-foreground">Take the AI Assessment</h3>
                <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                  Evaluate your readiness <span aria-hidden>→</span>
                </p>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
              <div className="lg:col-span-7">
                <h2 className="mb-16 font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl">What Safety produces.</h2>
                <div className="mb-12 border-b border-primary/30 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">The core artifacts of record</span>
                </div>
                <div className="flex flex-col">
                  {ledgerProduces.map((row) => (
                    <div
                      key={row.title}
                      className="group flex flex-col border-b border-border py-8 transition-colors hover:bg-section md:flex-row"
                    >
                      <div className="mb-4 font-serif-display text-2xl text-foreground md:mb-0 md:w-1/3">{row.title}</div>
                      <div className="text-muted-foreground md:w-2/3 md:pl-4">{row.body}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="h-full bg-section p-10">
                  <h3 className="mb-8 border-b border-border pb-4 font-serif-display text-2xl italic text-foreground">What&apos;s included</h3>
                  <ul className="flex flex-col">
                    {includedChecklist.map((item) => (
                      <li key={item} className="flex items-center gap-3 border-b border-border/60 py-4 text-sm text-foreground">
                        <Check className="size-4 shrink-0 text-primary" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-section py-20 md:py-28" id="engagement-levels">
        <Container>
          <Reveal>
            <h2 className="mx-auto mb-20 max-w-7xl text-center font-serif-display text-4xl italic tracking-tight text-foreground md:text-5xl">
              Three ways to complete Safety.
            </h2>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col justify-between border-t border-primary/30 bg-card p-10 transition-colors hover:bg-section">
                <div>
                  <span className="mb-6 block text-[10px] font-semibold uppercase tracking-eyebrow text-muted-foreground">Self-guided</span>
                  <h3 className="mb-4 font-serif-display text-3xl text-foreground">Field Guide</h3>
                  <p className="mb-8 min-h-[6rem] text-muted-foreground">The foundational reading required to understand the landscape. Access the raw theory.</p>
                  <div className="mb-12 text-xs font-semibold uppercase tracking-eyebrow text-foreground">Free access</div>
                </div>
                <Link href="/field-guide" className="w-full border border-border py-4 text-center text-xs font-semibold uppercase tracking-eyebrow hover:border-primary">
                  Read the Field Guide
                </Link>
              </div>
              <div className="relative flex flex-col justify-between bg-card p-10">
                <div className="absolute left-0 top-0 h-1 w-full bg-primary" aria-hidden />
                <div className="pt-2">
                  <span className="mb-6 block text-[10px] font-semibold uppercase tracking-eyebrow text-primary">Accelerated toolkit</span>
                  <h3 className="mb-4 font-serif-display text-3xl text-foreground">AI-assisted Safety product</h3>
                  <p className="mb-8 min-h-[6rem] text-muted-foreground">
                    Utilize our proprietary toolset to draft your artifacts faster. The fastest path to a documented baseline.
                  </p>
                  <div className="mb-12 text-xs font-semibold uppercase tracking-eyebrow text-foreground">
                    $1,997 <span className="ml-1 lowercase tracking-normal opacity-50">one-time</span>
                  </div>
                </div>
                <Link href="/contact?interest=safety-accelerated" className="btn-pill btn-pill--primary w-full justify-center py-4">
                  Purchase access
                </Link>
              </div>
              <div className="flex flex-col justify-between border-t border-primary/30 bg-card p-10 transition-colors hover:bg-section">
                <div>
                  <span className="mb-6 block text-[10px] font-semibold uppercase tracking-eyebrow text-muted-foreground">Consultative</span>
                  <h3 className="mb-4 font-serif-display text-3xl text-foreground">Facilitated MVP engagement</h3>
                  <p className="mb-8 min-h-[6rem] text-muted-foreground">
                    Two weeks. One leadership meeting. We execute the heavy lifting to deliver a bespoke safety perimeter for your specific context.
                  </p>
                  <div className="mb-12 text-xs font-semibold uppercase tracking-eyebrow text-foreground">
                    $2,500 <span className="ml-1 lowercase tracking-normal opacity-50">engagement fee</span>
                  </div>
                </div>
                <Link href="/contact?interest=safety-facilitated" className="w-full bg-foreground py-4 text-center text-xs font-semibold uppercase tracking-eyebrow text-background hover:opacity-90">
                  Schedule intake
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-section py-12">
        <Container>
          <div className="mx-auto aspect-[21/9] max-w-5xl bg-muted" aria-hidden>
            {/* Stitch export used remote boardroom imagery; tonal placeholder until on-brand photography is wired. */}
          </div>
          <p className="mx-auto mt-4 max-w-5xl text-right text-[10px] font-semibold uppercase tracking-eyebrow text-muted-foreground">
            Exemplar architectural space
          </p>
        </Container>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 md:px-16 md:py-28">
        <Reveal>
          <h2 className="mb-16 text-center font-serif-display text-4xl italic text-foreground">Questions about Safety Documentation</h2>
          <div className="flex flex-col">
            {faqs.map((faq) => (
              <div key={faq.q} className="flex flex-col gap-4 border-b border-border py-8">
                <h3 className="text-lg font-medium text-foreground">{faq.q}</h3>
                <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="band-midnight border-b border-inverse-border pb-24 pt-20 md:pt-32">
        <Container>
          <Reveal>
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 border-b border-inverse-border pb-24 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-inverse-muted">What happens next</span>
              <h2 className="font-serif-display text-5xl tracking-tight text-inverse-foreground">Move from theory to practice.</h2>
              <p className="max-w-2xl text-lg leading-relaxed text-inverse-foreground/80">
                Once governance is established and constraints are clear, the next step is safely testing the technology against your actual work. Sandbox Discovery is ready.
              </p>
              <div className="mt-8 flex flex-col gap-6 sm:flex-row">
                <Link href="/contact?interest=safety-documentation" className="btn-pill bg-background px-8 py-4 text-foreground hover:bg-muted">
                  Ready to start Safety?
                </Link>
                <Link href="/pathway/sandbox" className="inline-flex items-center justify-center border border-inverse-border px-8 py-4 text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground hover:border-inverse-foreground">
                  Explore Stage 02: Sandbox Discovery
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-24 flex max-w-4xl flex-col gap-16 text-left md:flex-row">
              <div className="md:w-1/3 md:border-t md:border-inverse-border md:pt-6">
                <h2 className="font-serif-display text-3xl italic tracking-tight text-inverse-foreground">The cost of not doing this work.</h2>
              </div>
              <div className="md:w-2/3 space-y-6 text-lg leading-relaxed text-inverse-foreground/80">
                <p>
                  Organizations avoiding formalized Safety are operating with extreme fragility. Shadow AI isn&apos;t merely a technological issue; it is a profound governance failure.
                </p>
                <p>
                  When staff adopt AI without organizational guidance and guardrails, proprietary or private data leaks into public models. AI output is published without review. Most critically, community trust—the currency of churches and nonprofits—is compromised invisibly.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-section py-12">
        <Container>
          <div className="flex flex-col items-center justify-between gap-10 border-t border-border pt-12 md:flex-row">
            <span className="text-sm text-muted-foreground text-center md:text-left">Stage 02 → Sandbox Discovery</span>
            <Link href="/pathway/sandbox" className="btn-pill btn-pill--ghost">
              Continue the pathway
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
