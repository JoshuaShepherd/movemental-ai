"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";

import { Container } from "@/components/studio/Container";
import { Reveal } from "@/components/studio/Reveal";

const steps: { id: string; title: string; body: string }[] = [
  {
    id: "01",
    title: "Recipes",
    body: "Identify and document specific, testable use cases. These recipes outline the precise inputs, expected outputs, and the business hypothesis being tested.",
  },
  {
    id: "02",
    title: "Experiment",
    body: "Execute the recipes within the isolated sandbox environment. Focus on speed and iteration, adjusting prompts and parameters to find the edges of the capability.",
  },
  {
    id: "03",
    title: "Log the value",
    body: "Quantify the results. Did it save time? Did it improve quality? Document the tangible outcomes of the experiment to build a case for broader adoption.",
  },
  {
    id: "04",
    title: "Open visibility",
    body: "Share the findings openly across the organization. Transparency prevents duplicated effort and sparks new ideas in adjacent teams.",
  },
  {
    id: "05",
    title: "Governance review",
    body: "Formal evaluation of the experiment's outcomes against organizational risk and strategic alignment.",
  },
];

const prerequisites = [
  "Clear definition of success metrics for each recipe.",
  "Approval from InfoSec on the isolated sandbox environment.",
  "Commitment from leadership to review the findings openly.",
];

export function SandboxPage() {
  useEffect(() => {
    document.title = "Sandbox Discovery | Movemental";
  }, []);

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container width="narrow" className="max-w-4xl lg:max-w-[56rem]">
        <Reveal>
          <header className="mb-24 max-w-4xl md:mb-32">
            <span className="mb-6 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Stage 02</span>
            <h1 className="mb-8 font-serif-display text-6xl font-medium tracking-tight text-foreground md:text-7xl">Sandbox Discovery</h1>
            <p className="max-w-3xl text-balance font-sans text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Run a small set of approved experiments without sensitive data, and capture what you learn somewhere leadership can actually see it.
            </p>
          </header>
        </Reveal>
      </Container>

      <section className="mb-32 bg-section py-16 md:py-24">
        <Container className="max-w-5xl lg:max-w-[56rem]">
          <Reveal>
            <h2 className="mb-12 font-serif-display text-4xl italic text-foreground">The Sandbox pact</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-24">
              <div className="relative pl-6">
                <div className="absolute bottom-0 left-0 top-0 w-px bg-primary/20" aria-hidden />
                <h3 className="mb-4 font-serif-display text-2xl font-medium text-foreground">
                  1. Nothing made in the sandbox gets published.
                </h3>
                <p className="leading-relaxed text-muted-foreground text-sm md:text-base">
                  The purpose of the sandbox is learning, not production. Code written here, models refined here, and prompts tested here are strictly prototypes. This boundary gives your team permission to fail fast without the risk of accidental deployment.
                </p>
              </div>
              <div className="relative pl-6 md:border-l md:border-transparent">
                <div className="absolute bottom-0 left-0 top-0 w-px bg-primary/20 md:hidden" aria-hidden />
                <h3 className="mb-4 font-serif-display text-2xl font-medium text-foreground">
                  2. Private information stays private — by process, not by promise.
                </h3>
                <p className="leading-relaxed text-muted-foreground text-sm md:text-base">
                  No PII, no sensitive client data, no unreleased financials enter the sandbox environment. We rely on strict data sanitization and mock datasets so organizational integrity stays intact even when experiments break.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="max-w-5xl lg:max-w-[56rem] pb-24">
        <Reveal>
          <div className="mb-16">
            <h2 className="mb-4 font-serif-display text-4xl font-medium text-foreground">How the experiment runs</h2>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">8-week timeline</p>
          </div>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={`group -mx-2 flex flex-col gap-8 px-4 py-8 md:flex-row md:px-6 ${i < steps.length - 1 ? "border-b border-border" : ""} hover:bg-section/80 transition-colors rounded-lg`}
              >
                <div className="w-full shrink-0 pt-1 md:w-32">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Step {s.id}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="mb-2 font-serif-display text-2xl text-foreground transition-colors group-hover:text-primary">{s.title}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  {s.id === "05" && (
                    <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span>
                          <strong className="text-foreground">Green:</strong> Approved for wider pilot or restricted production use.
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="size-2 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden />
                        <span>
                          <strong className="text-foreground">Yellow:</strong> Promising, but requires further refinement or risk mitigation.
                        </span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="size-2 shrink-0 rounded-full bg-foreground" aria-hidden />
                        <span>
                          <strong className="text-foreground">Red:</strong> Unviable due to cost, risk, or lack of value. Terminate experiment.
                        </span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <section className="border-y border-border bg-card py-16 text-center md:py-20">
        <Container>
          <Reveal>
            <blockquote className="mx-auto max-w-3xl text-balance font-serif-display text-3xl italic text-primary md:text-4xl">
              &quot;What you walk away with is a recipe book your organization actually agreed on.&quot;
            </blockquote>
          </Reveal>
        </Container>
      </section>

      <Container className="max-w-5xl lg:max-w-[56rem] pt-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 border-t border-border pt-16 md:grid-cols-2 md:gap-24">
            <div>
              <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Required before proceeding</h4>
              <ul className="space-y-4 text-sm text-foreground">
                {prerequisites.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">If you skip this stage</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bypassing the sandbox invites technical debt and unacceptable risk. Untested recipes in production often lead to data leaks, hallucinated outputs on client-facing work, and a rapid erosion of trust in the technology across the organization. You will build solutions nobody agreed upon.
              </p>
            </div>
          </div>

          <div className="mt-20 flex flex-col gap-6 border-t border-border pt-12 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Discovery runs on a disciplined cadence. Standard engagement adapts by scope — talk through yours on a quick call.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/pathway/safety" className="btn-pill btn-pill--ghost">
                ← Stage 01: Safety
              </Link>
              <Link href="/contact?interest=sandbox-discovery" className="btn-pill btn-pill--primary">
                Start a Sandbox
              </Link>
              <Link href="/pathway/skills" className="btn-pill btn-pill--ghost">
                Stage 03: Skills →
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
