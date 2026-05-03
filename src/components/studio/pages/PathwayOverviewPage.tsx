"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';
import Link from "next/link";
import { PathwayComponent } from '@/components/studio/PathwayComponent';

const commonDeliverables = {
  safety: [
    "AI Use & Trust Charter (organization-specific, mission-aligned)",
    "Roles & Decision Rights matrix",
    "Data Hygiene Audit",
    "AI Risk Register specific to the sector",
    "Acceptable Use Policy for staff and contractors",
    "Vendor Evaluation Framework",
    "Sector-Specific AI Boundaries document",
    "Data Handling Standards (Donor, Member, or Beneficiary)",
    "Incident Response Protocol",
    "Staff Communication Kit",
    "Board Briefing Document",
    "90-Day Readiness Roadmap",
    "Charter Adoption Checklist"
  ],
  sandbox: [
    "Pre-engagement team assessment",
    "Six weeks of facilitated discovery sprints",
    "Private sandbox environment access",
    "Weekly facilitated working sessions",
    "Use Case Discovery Framework",
    "Use Case Scoring Rubric",
    "Use Case Portfolio (ready to fund or kill)",
    "Post-engagement capability assessment",
    "Living Case Study artifact"
  ],
  skills: [
    "The Movemental AI Wisdom course (8-week cohort)",
    "Up to 15 participant seats included",
    "Weekly in-person or live-virtual teaching sessions",
    "LMS-hosted recipe library (refreshed quarterly)",
    "Practice modules tied exactly to use cases from the Lab",
    "Facilitator Track (2-4 internal staff certified as leaders)",
    "Pre/post capability assessments",
    "Lifetime access to course library",
    "Cohort connection with peer organizations",
    "Movemental AI Practitioner credential"
  ],
  solutions: [
    "Integration: Ingest and organize informational and relational intelligence",
    "Activation: Native AI workflows tuned to your organization",
    "Transformation: Adaptive training and compounding content features",
    "Multiplication: Strategic linking with peer organizations and networks"
  ]
};

const overviewPathwayStops = [
  { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'Your AI policy, drafted and board-ready.', deliverables: commonDeliverables.safety },
  { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Use cases proven, risks documented.', deliverables: commonDeliverables.sandbox },
  { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'Your team trained to lead this work.', deliverables: commonDeliverables.skills },
  { num: '04', name: 'Solutions Deployment', duration: '8-12 weeks', price: 'from $30,000', outcome: 'Your intelligence integrated, activated, multiplied.', deliverables: commonDeliverables.solutions }
];

export function PathwayOverviewPage() {
  useEffect(() => {
    document.title = "The Pathway | Movemental";
  }, []);

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-16">
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl italic mb-6">
              The Pathway
            </h1>
            <p className="lede text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We rebuild the human layer first — governance, capability, and shared language — then build the technology that compounds rather than corrodes.
            </p>
          </div>
          <PathwayComponent stops={overviewPathwayStops} />
        </Reveal>
      </Container>
      
      <section className="band-default bg-section py-20 md:py-28 mt-20">
        <Container>
          <Reveal>
            <div className="max-w-4xl">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 border-b border-border pb-4">Why this order</h2>
              <div className="space-y-6 text-[1.125rem] md:text-xl text-foreground/90 leading-relaxed">
                <p>
                  When AI lands on top of a fragmented organization — scattered knowledge, unclear decision rights, mixed signals about what's safe to share, and no shared vocabulary for risk — it doesn't help. It accelerates the fragmentation. The organization moves faster, but in more directions. The leaders who said yes to AI start to feel like they invited a problem they don't know how to name.
                </p>
                <p>
                  The way out is not slower AI. It's earlier human work. Safety Documentation, Sandbox Discovery, and Skills Development are not pre-AI hesitation; they're the work that makes the AI investment compound rather than corrode. Skip them and you'll spend the next two years undoing damage. Do them and Solutions Deployment is the easiest decision your board makes that year.
                </p>
                <p>
                  We tell you this up front because most vendors won't. Their incentive is to sell you the chatbot today. Ours is to build something that lasts long enough to be worth what you'll spend on it.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28 border-y border-border">
        <Container>
          <Reveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-serif-display italic mb-10 text-center">What you'd pay elsewhere</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card border border-border p-8 rounded-2xl col-span-2">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-4 font-semibold text-sm uppercase tracking-wider text-muted-foreground">Service</th>
                        <th className="py-4 font-semibold text-sm uppercase tracking-wider text-primary">Movemental</th>
                        <th className="py-4 font-semibold text-sm uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Big 4 Consultancy</th>
                        <th className="py-4 font-semibold text-sm uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Boutique AI</th>
                      </tr>
                    </thead>
                    <tbody className="text-[1.0625rem] divide-y divide-border">
                      <tr>
                        <td className="py-4 text-foreground font-medium">AI governance/policy</td>
                        <td className="py-4 text-primary font-medium">$5,000 in 2 weeks</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$40K–$80K in 8–12w</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$20K–$40K in 6w</td>
                      </tr>
                      <tr>
                        <td className="py-4 text-foreground font-medium">Use case discovery</td>
                        <td className="py-4 text-primary font-medium">$15,000 in 4 weeks</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$100K+ in 10w</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$50K+ in 8w</td>
                      </tr>
                      <tr>
                        <td className="py-4 text-foreground font-medium">AI fluency training</td>
                        <td className="py-4 text-primary font-medium">$4,800–$15,000</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$50K+ package</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$25K+ for similar</td>
                      </tr>
                      <tr>
                        <td className="py-4 text-foreground font-medium">Custom platform build</td>
                        <td className="py-4 text-primary font-medium">from $30,000</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$250K+</td>
                        <td className="py-4 text-muted-foreground hidden sm:table-cell">$100K+</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="py-4 font-semibold text-foreground px-2">Full pathway</td>
                        <td className="py-4 font-semibold text-primary px-2">$65,000</td>
                        <td className="py-4 font-semibold text-muted-foreground hidden sm:table-cell px-2">$400K+</td>
                        <td className="py-4 font-semibold text-muted-foreground hidden sm:table-cell px-2">$200K+</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="mt-8 text-sm text-muted-foreground italic">
                    We are not cheaper because we are smaller. We are cheaper because the work is built agentically and the pathway is integrated. Each engagement compounds with the next instead of starting from zero.
                  </p>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 p-8 rounded-2xl relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest py-1 px-3 rounded-full">The Bundle</span>
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-4">Bundled Commitment Offer</h3>
                  <p className="text-muted-foreground leading-relaxed text-[1.0625rem] mb-6">
                    Commit to the full Pathway upfront and engage all four Mile Markers under a single agreement.
                  </p>
                  <div className="font-semibold text-xl text-primary mb-2">
                    <span className="font-serif-display italic text-4xl">$58,500</span>
                  </div>
                  <p className="text-foreground/80 font-medium mb-6">— a 10% reduction on the standalone total.</p>
                  <p className="text-sm text-foreground/70 mb-8">Most committed Pathway engagements complete in 6 to 9 months.</p>
                  
                  <Link href="/contact" className="btn-pill btn-pill--primary text-center">Discuss a full Pathway engagement</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-section py-20 mt-20 border-y border-border">
        <Container>
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif-display text-3xl italic text-foreground mb-4">Network Engagements</h2>
              <p className="text-lg text-muted-foreground mb-8">
                For denominations, training networks, and multi-site organizations, Build extends across entities — shared governance, linked platforms, federated intelligence. These engagements are quoted per conversation. Most start at $60,000 and scale with scope.
              </p>
              <Link href="/contact" className="btn-pill btn-pill--ghost text-sm">Talk about a Network Engagement</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-28 text-center max-w-2xl mx-auto">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif-display text-4xl italic mb-6">Talk to us about the full Pathway</h2>
            <p className="text-muted-foreground text-lg mb-10">
              Whether you are ready to commit to the full sequence or just want to start with a conversation about Foundations, the next step is a quick discovery call.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/pathway/foundations" className="btn-pill btn-pill--primary">Start with Safety Documentation</Link>
              <Link href="/contact" className="btn-pill btn-pill--ghost">Talk to us about the full Pathway</Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
