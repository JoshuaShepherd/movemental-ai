"use client";

import React, { useEffect } from 'react';
import Link from "next/link";

import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';

export function SandboxPage() {
  useEffect(() => {
    document.title = "Sandbox Discovery | Movemental";
  }, []);

  const deliverables = [
    "Pre-engagement team assessment",
    "Four weeks of facilitated discovery sprints",
    "Private sandbox environment access",
    "Weekly facilitated working sessions (2 hours)",
    "Use Case Discovery Framework",
    "Use Case Scoring Rubric",
    "Candidate Use Case Briefs (8-14)",
    "Use Case Portfolio (ready to fund or kill)",
    "Post-engagement capability assessment",
    "Living Case Study artifact",
  ];

  const faqs = [
    {
      q: "Why four weeks?",
      a: "Shorter isn't enough time to surface non-obvious use cases. Longer leads to fatigue. Four weeks provides enough pressure to focus and enough space to experiment.",
    },
    {
      q: "Who sits in the Sandbox?",
      a: "A cross-functional team of 4 to 8 people. You need operators, creatives, and at least one skeptic. We facilitate.",
    },
    {
      q: "What happens to the data we put in the sandbox?",
      a: "The sandbox is privacy-protected and publishing-prevented. Models running here do not use your data for training. It is the safest place for your team to play.",
    },
  ];

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary/70 mb-4 block">Stage 02</span>
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl italic mb-6 text-foreground">
              Sandbox Discovery
            </h1>
            <p className="lede text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
              Find what&apos;s worth building. Prove it. Document the cost of getting it wrong.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Link href="/contact?interest=sandbox-discovery" className="btn-pill btn-pill--primary">Start a Sandbox</Link>
            </div>
            <div className="flex gap-4 items-center text-sm font-medium uppercase tracking-widest text-foreground">
              <span>4 Weeks</span>
              <span className="text-primary">•</span>
              <span>$15,000</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">Standard engagement. Timeline and scope adapt to your situation.</p>
          </div>
        </Reveal>
      </Container>

      <section className="bg-section py-20 border-y border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl">
              <div>
                <h2 className="font-serif-display text-3xl italic mb-6">Why this stage matters</h2>
                <div className="space-y-4 text-[1.0625rem] text-muted-foreground leading-relaxed">
                  <p>
                    Most organizations buy AI tools and then look for problems to solve with them. It usually results in scattered experiments, mild amusement, and abandoned software licenses.
                  </p>
                  <p>
                    We do the opposite. Your team finds the problems worth solving, proves the value in a secure environment, and documents the risk — before anyone signs a procurement contract. The outcome is a structured portfolio of use cases, scored by impact and risk, ready for a funding decision.
                  </p>
                </div>
              </div>
              <div className="bg-card border border-border p-8 rounded-2xl">
                <h3 className="font-semibold text-lg text-foreground mb-6">What&apos;s included</h3>
                <ul className="space-y-3">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex gap-3 text-[1.0625rem] text-muted-foreground"><span className="text-primary">—</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
         <Container>
            <Reveal>
              <h2 className="font-serif-display text-3xl md:text-4xl italic mb-12 text-foreground max-w-3xl">
                Questions about Sandbox Discovery
              </h2>
              <div className="max-w-4xl space-y-8">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl">
                    <h3 className="font-medium text-lg md:text-xl text-foreground mb-4">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[1.0625rem]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </Reveal>
         </Container>
      </section>

      <section className="bg-primary/5 py-20 border-t border-primary/20">
        <Container>
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">What happens next</span>
              <h2 className="font-serif-display text-3xl italic mb-6">Equip the whole organization.</h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                The Sandbox proves what&apos;s possible for a small team. Skills Development scales that capability across the organization so everyone shares the same language.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/pathway/skills" className="btn-pill btn-pill--ghost">Explore Stage 03: Skills Development</Link>
                <Link href="/contact?interest=sandbox-discovery" className="btn-pill btn-pill--primary">Ready to start a Sandbox?</Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
