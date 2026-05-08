"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

const churchReasons: { num: string; title: string; citation?: string }[] = [
  { num: "01", title: "The Shadow-AI Gap Is Already Your Reality.", citation: "Citation: lifeway_april_2026" },
  { num: "02", title: "Voice Cloning Is an Active Threat to Members — Not a Future Headline.", citation: "Citations: lifeway_april_2026, fbi_warning_2026" },
  { num: "03", title: "Pastoral Care and the Pulpit Are Not Generic Content Categories." },
  { num: "04", title: "Most Churches Need Less Than They Think.", citation: "Citation: exponential_next_2026" },
];

const churchStages: { num: string; name: string; body: string }[] = [
  {
    num: "01",
    name: "Safety",
    body: "Establish foundational guardrails. Define acceptable use, data privacy baselines, and boundaries for pastoral voice impersonation before adopting tools.",
  },
  {
    num: "02",
    name: "Sandbox",
    body: "Controlled experimentation. Pilot specific workflows within safety boundaries — without exposing the congregation.",
  },
  {
    num: "03",
    name: "Skills",
    body: "Staff-wide literacy beyond basic prompting — model bias, theological implications of outputs, human pastoral presence.",
  },
  {
    num: "04",
    name: "Solutions",
    body: "Strategic deployment — systems only where they enhance human ministry without replacing care or theological discernment.",
  },
];

const nonprofitReasons: { num: string; title: string; body: string }[] = [
  { num: "01", title: "Governance Gap", body: "Many nonprofits lack the governance structures to adopt AI safely." },
  { num: "02", title: "Donor Trust", body: "Donors expect transparency and ethical use of AI in operations." },
  { num: "03", title: "Beneficiary Safety", body: "Beneficiary data must be protected from misuse or bias." },
  { num: "04", title: "Less is More", body: "Most nonprofits need less complex AI solutions than they realize." },
];

const nonprofitPathStages: { title: string; body: string }[] = [
  {
    title: "Stage 1: Safety",
    body: "Establish foundational guardrails. Define acceptable use, data handling, and beneficiary protection before any tools are deployed.",
  },
  {
    title: "Stage 2: Sandbox",
    body: "Controlled experimentation. Test closed-loop AI on non-critical administrative tasks to gauge impact and risk.",
  },
  {
    title: "Stage 3: Skills",
    body: "Develop organizational literacy. Train staff on prompting, bias detection, and ethical oversight in your mission context.",
  },
  {
    title: "Stage 4: Solutions",
    body: "Strategic deployment. Implement workflows that increase mission impact without compromising human-centric care.",
  },
];

const nonprofitArtifacts = [
  "AI Use Charter",
  "Acceptable Use Policy",
  "Data Handling Standards",
  "Disclosure Standard",
  "Care Boundaries",
  "Impersonation Response Plan",
  "Constituent Communication",
];

const institutionReasons: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "Dual mandate",
    body: "You answer the AI question for your institution and for every leader you form — sequencing matters for both audiences.",
  },
  {
    num: "02",
    title: "Teaching artifact",
    body: "Governance is not only compliance; it becomes curriculum your network can adopt without improvising from scratch.",
  },
  {
    num: "03",
    title: "Scholarship and optics",
    body: "Accreditation, boards, and public trust require documentation that matches the seriousness of the subject.",
  },
  {
    num: "04",
    title: "Network scale",
    body: "What you prove in Sandbox and deploy in Solutions can extend — with rights and structure — across member entities.",
  },
];

type Audience = "churches" | "nonprofits" | "institutions";

export function StitchEditorialAudience({ audience }: { audience: Audience }) {
  if (audience === "churches") {
    return (
      <div className="stitch-editorial-audience">
        <section className="py-16 md:py-24" id="hero">
          <Container>
            <Reveal>
              <div className="max-w-4xl">
                <h1 className="mb-10 font-serif-display text-6xl leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
                  Movemental for <em className="italic text-muted-foreground">Churches.</em>
                </h1>
                <p className="max-w-3xl text-xl font-light leading-relaxed text-muted-foreground md:text-2xl">
                  Movemental guides churches through a four-stage path for wise AI adoption.
                </p>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="bg-section py-20 md:py-28" id="reasons">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-16 max-w-3xl font-serif-display text-4xl tracking-tight text-foreground md:mb-20 md:text-5xl lg:text-6xl">
                  Four documented reasons to lead AI governance now in your church.
                </h2>
                <div className="grid grid-cols-1 gap-x-20 gap-y-16 border-t border-border pt-8 md:grid-cols-2 md:gap-y-24 md:pt-12">
                  {churchReasons.map((r) => (
                    <div key={r.num} className="border-t border-border pt-8">
                      <span className="mb-8 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{r.num}</span>
                      <h3 className="mb-6 font-serif-display text-3xl italic leading-snug text-foreground">{r.title}</h3>
                      {r.citation ? (
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">{r.citation}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="py-16 md:py-24 lg:pb-32" id="path">
          <Container>
            <Reveal>
              <div className="mx-auto max-w-5xl">
                <h2 className="mb-10 font-serif-display text-5xl tracking-tight text-foreground lg:text-6xl">The Movemental AI Path</h2>
                <p className="mb-14 max-w-4xl font-serif-display text-2xl italic leading-snug text-muted-foreground lg:text-3xl">
                  Four stages — Safety, Sandbox, Skills, Solutions — in order. The same path, applied to church reality.
                </p>
                <div className="flex flex-col">
                  {churchStages.map((row, i) => (
                    <div
                      key={row.num}
                      className={`flex flex-col gap-6 border-t border-border py-12 transition-colors md:flex-row md:items-center ${i === churchStages.length - 1 ? "border-b border-border" : ""}`}
                    >
                      <div className="md:w-1/4">
                        <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Stage {row.num}</span>
                        <h3 className="font-serif-display text-4xl text-foreground">{row.name}</h3>
                      </div>
                      <div className="md:w-3/4 md:pl-8">
                        <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground">{row.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </div>
    );
  }

  if (audience === "nonprofits") {
    return (
      <div className="stitch-editorial-audience">
        <section className="border-b border-border py-16 md:py-24" id="hero">
          <Container>
            <Reveal>
              <div className="mx-auto flex max-w-[56rem] flex-col gap-8 md:gap-12">
                <h1 className="font-serif-display text-5xl font-normal leading-[1.05] tracking-tight text-foreground md:text-7xl">
                  Movemental for <span className="italic text-primary">Nonprofits.</span>
                </h1>
                <div className="flex max-w-[600px] flex-col gap-6 border-l border-border pl-6 md:pl-8">
                  <p className="font-sans text-xl font-medium leading-snug text-foreground md:text-2xl">
                    Your mission is not generic. Your AI response shouldn&apos;t be either.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    Movemental guides mission-driven nonprofits through a four-stage path for adopting AI without compromising donor trust, beneficiary safety, or mission integrity.
                  </p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border bg-section py-20 md:py-28" id="reasons">
          <Container>
            <Reveal>
              <div className="mx-auto flex max-w-[56rem] flex-col gap-16">
                <div className="flex flex-col gap-4 border-l border-border pl-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">01. Context</span>
                  <h2 className="font-serif-display text-4xl leading-tight text-foreground md:text-5xl">Four documented reasons to lead AI governance now.</h2>
                </div>
                <div className="flex w-full flex-col border-t border-border">
                  {nonprofitReasons.map((row) => (
                    <div
                      key={row.num}
                      className="flex flex-col gap-4 border-b border-border py-8 md:flex-row md:gap-12"
                    >
                      <span className="font-serif-display text-2xl text-muted-foreground md:w-12">{row.num}</span>
                      <div className="flex flex-1 flex-col gap-4 md:flex-row md:gap-8">
                        <h3 className="w-full text-lg font-semibold text-foreground md:w-1/3">{row.title}</h3>
                        <p className="w-full text-base leading-relaxed text-muted-foreground md:w-2/3">{row.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border py-16 md:py-24" id="path">
          <Container>
            <Reveal>
              <div className="mx-auto flex max-w-[56rem] flex-col gap-16">
                <div className="flex flex-col gap-4 border-l border-border pl-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">02. Methodology</span>
                  <h2 className="font-serif-display text-4xl leading-tight text-foreground md:text-5xl">The Movemental AI Path</h2>
                  <p className="max-w-xl text-lg text-muted-foreground">
                    Four stages — Safety, Sandbox, Skills, Solutions — in order. The same path applied to mission-driven reality.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2 md:gap-y-16">
                  {nonprofitPathStages.map((s) => (
                    <div key={s.title} className="flex flex-col gap-4">
                      <h3 className="font-serif-display text-2xl text-foreground">{s.title}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="border-b border-border py-16 md:py-24" id="artifacts">
          <Container>
            <Reveal>
              <div className="mx-auto flex max-w-[56rem] flex-col gap-12">
                <div className="flex flex-col gap-4 border-l border-border pl-6">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">03. Deliverables</span>
                  <h2 className="font-serif-display text-4xl leading-tight text-foreground md:text-5xl">Safety produces seven artifacts.</h2>
                  <p className="max-w-xl text-lg text-muted-foreground">Tangible governance documents tailored for nonprofit operations.</p>
                </div>
                <ul className="flex flex-col">
                  {nonprofitArtifacts.map((a, idx) => (
                    <li
                      key={a}
                      className="flex items-center justify-between border-b border-border py-6 text-lg font-medium text-foreground transition-colors hover:border-primary group"
                    >
                      <span>
                        {idx + 1}. {a}
                      </span>
                      <ArrowRight className="size-5 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </Container>
        </section>

        <section className="band-midnight py-24 md:py-32" id="begin">
          <Container>
            <Reveal>
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 text-center">
                <h2 className="font-serif-display text-5xl leading-tight text-inverse-foreground md:text-6xl">
                  Ready to lead your organization{" "}
                  <span className="italic text-primary">forward?</span>
                </h2>
                <div className="flex w-full flex-col justify-center gap-4 pt-4 md:flex-row md:flex-wrap">
                  <Link href="/contact?interest=for-nonprofits" className="btn-pill bg-background px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground hover:bg-muted">
                    Schedule consultation
                  </Link>
                  <Link href="/field-guide" className="border border-inverse-border px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-inverse-foreground hover:border-inverse-foreground inline-flex justify-center rounded-full">
                    Read the manifesto
                  </Link>
                  <Link href="/pathway" className="border border-inverse-border px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-inverse-foreground hover:border-inverse-foreground inline-flex justify-center rounded-full">
                    View pricing context
                  </Link>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      </div>
    );
  }

  /* institutions */
  return (
    <div className="stitch-editorial-audience">
      <section className="border-b border-border py-16 md:py-24" id="hero">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <span className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">For institutions</span>
              <h1 className="mb-8 font-serif-display text-5xl leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Your institution is being asked to lead on AI —{" "}
                <em className="italic text-muted-foreground">internally</em> and <em className="italic text-muted-foreground">externally</em>.
              </h1>
              <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Seminaries, training networks, and denominational bodies answer the AI question twice: for governance on campus, and for the leaders you form. Movemental sequences Safety, Sandbox, Skills, and Solutions so both layers stay coherent.
              </p>
              <p className="mt-8 border-l-2 border-primary pl-6 text-[1.0625rem] font-medium leading-relaxed text-foreground">
                Step 1 is the human work. We won&apos;t build solutions on top of an institution that hasn&apos;t done it — ours or yours.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-section py-16 md:py-24" id="reasons">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 font-serif-display text-4xl text-foreground md:text-5xl">Why sequencing matters here</h2>
              <div className="grid gap-10 border-t border-border pt-10 md:grid-cols-2">
                {institutionReasons.map((r) => (
                  <div key={r.num} className="border-t border-border pt-6">
                    <span className="mb-4 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{r.num}</span>
                    <h3 className="mb-4 font-serif-display text-2xl italic text-foreground">{r.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{r.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
