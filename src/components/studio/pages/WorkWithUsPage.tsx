"use client";

import React, { useEffect } from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function WorkWithUsPage() {
  useEffect(() => {
    document.title = "Work With Movemental | Movemental";
  }, []);

  return (
    <div className="work-with-us-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Work with Movemental</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              A guided path for organizations ready to <em dangerouslySetInnerHTML={{__html: 'lead AI with clarity.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              Move beyond scattered policy conversations and fragmented tool adoption. Build real capability across your leadership.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Talk With Us</Link>
              <Link href="/start-with-safety" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Start with Safety</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="fit">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Fit"
              display={<>This is for leaders carrying <em dangerouslySetInnerHTML={{__html: 'real responsibility.'}} /></>}
              lede="Every robust missional idea is pressure-tested by a community."
            />
            
            <div className="grid md:grid-cols-3 gap-6">
               <Link href="/churches" className="group bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Churches</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed mb-6">Navigating adoption while protecting theological fidelity and human formation.</p>
                  <span className="text-primary font-medium group-hover:underline text-sm inline-flex items-center gap-1.5">Read the church path</span>
               </Link>
               <Link href="/nonprofits" className="group bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Nonprofits</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed mb-6">Scaling impact safely without compromising donor trust or mission integrity.</p>
                  <span className="text-primary font-medium group-hover:underline text-sm inline-flex items-center gap-1.5">Read the nonprofit path</span>
               </Link>
               <Link href="/institutions" className="group bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Institutions</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed mb-6">Guiding faculties and operational staff through rigorous policy and capability building.</p>
                  <span className="text-primary font-medium group-hover:underline text-sm inline-flex items-center gap-1.5">Read the institutional path</span>
               </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="model">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="How we work"
              display={<>We do not start with tools. We start with <em dangerouslySetInnerHTML={{__html: 'leadership clarity.'}} /></>}
              lede="The Movemental Path creates a predictable container for unpredictable technology."
            />
            
            <div className="grid md:grid-cols-4 gap-4 mb-12">
               <div className="bg-card p-6 border border-border rounded-xl">
                 <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-3 block">01</span>
                 <h4 className="font-medium text-foreground mb-2">Listen</h4>
                 <p className="text-sm text-muted-foreground">Map where you actually are.</p>
               </div>
               <div className="bg-card p-6 border border-border rounded-xl">
                 <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-3 block">02</span>
                 <h4 className="font-medium text-foreground mb-2">Clarify</h4>
                 <p className="text-sm text-muted-foreground">Establish boundaries and safety.</p>
               </div>
               <div className="bg-card p-6 border border-border rounded-xl">
                 <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-3 block">03</span>
                 <h4 className="font-medium text-foreground mb-2">Equip</h4>
                 <p className="text-sm text-muted-foreground">Build the internal capacity to discern.</p>
               </div>
               <div className="bg-card p-6 border border-border rounded-xl">
                 <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-3 block">04</span>
                 <h4 className="font-medium text-foreground mb-2">Build</h4>
                 <p className="text-sm text-muted-foreground">Implement restrained solutions.</p>
               </div>
            </div>
            
            <Link href="/path" className="btn-pill btn-pill--ghost">See the full path</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="first-step">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The first step"
              display={<>Most organizations begin with a <em dangerouslySetInnerHTML={{__html: 'Safety Session.'}} /></>}
              lede="A concentrated engagement to baseline your risk, capture your current usage, and draft the policies you need to operate responsibly."
            />
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 border-t border-border pt-12 mb-12">
               <div>
                  <h3 className="text-lg font-medium text-foreground mb-6">What we look at</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Hidden shadow IT and current vulnerability.</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Theological and ethical red lines.</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Data security protocols and vendor lock-in.</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-lg font-medium text-foreground mb-6">What you leave with</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>A drafted acceptable use policy.</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Clear roles regarding human oversight.</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>A foundation ready to handle sandbox testing.</li>
                  </ul>
               </div>
            </div>
            
            <Link href="/start-with-safety" className="btn-pill btn-pill--primary">Begin with Safety</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="options">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Ways to engage"
              display={<>Start where your organization <em dangerouslySetInnerHTML={{__html: 'actually is.'}} /></>}
              lede="We structure engagements to match your pacing and readiness."
            />
            
            <div className="grid lg:grid-cols-3 gap-6">
               <div className="bg-card border border-border p-8 rounded-card flex flex-col">
                  <h3 className="font-serif-display text-2xl italic mb-2 text-foreground">Safety Session</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-12">Establish immediate guardrails and baseline policy.</p>
                  
                  <div className="mb-6 flex-grow">
                     <p className="text-xs uppercase tracking-eyebrow font-semibold text-foreground mb-3">Best for</p>
                     <p className="text-sm text-muted-foreground mb-6">Organizations that know they are exposed and need immediate structural clarity.</p>
                     
                     <p className="text-xs uppercase tracking-eyebrow font-semibold text-foreground mb-3">Includes</p>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Policy drafting workshop</li>
                        <li>• Acceptable Use template</li>
                        <li>• Executive briefing</li>
                     </ul>
                  </div>
                  
                  <Link href="/contact" className="btn-pill btn-pill--ghost w-full text-center mt-auto">Discuss a Safety Session</Link>
               </div>
               
               <div className="bg-card border-2 border-primary/20 p-8 rounded-card flex flex-col relative">
                  <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary text-primary-foreground text-[0.65rem] font-bold uppercase tracking-eyebrow px-3 py-1 rounded-full">Most common</div>
                  <h3 className="font-serif-display text-2xl italic mb-2 text-foreground">Guided Pathway</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-12">Walk the entire Movemental Path with direct facilitation.</p>
                  
                  <div className="mb-6 flex-grow">
                     <p className="text-xs uppercase tracking-eyebrow font-semibold text-foreground mb-3">Best for</p>
                     <p className="text-sm text-muted-foreground mb-6">Organizations ready to build internal capability across multiple departments or ministries.</p>
                     
                     <p className="text-xs uppercase tracking-eyebrow font-semibold text-foreground mb-3">Includes</p>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Diagnostics and readbacks</li>
                        <li>• Facilitated sandbox design</li>
                        <li>• Capability and skill formation</li>
                     </ul>
                  </div>
                  
                  <Link href="/contact" className="btn-pill btn-pill--primary w-full text-center mt-auto bg-foreground text-background">Explore Guided Pathway</Link>
               </div>
               
               <div className="bg-card border border-border p-8 rounded-card flex flex-col">
                  <h3 className="font-serif-display text-2xl italic mb-2 text-foreground">Solutions Partnership</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 h-12">Custom systemic integration after safety is established.</p>
                  
                  <div className="mb-6 flex-grow">
                     <p className="text-xs uppercase tracking-eyebrow font-semibold text-foreground mb-3">Best for</p>
                     <p className="text-sm text-muted-foreground mb-6">Mature organizations that have completed the Movemental Path and need architectural help.</p>
                     
                     <p className="text-xs uppercase tracking-eyebrow font-semibold text-foreground mb-3">Includes</p>
                     <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Tech stack evaluation</li>
                        <li>• Custom agent/workflow mapping</li>
                        <li>• Theological alignment review</li>
                     </ul>
                  </div>
                  
                  <Link href="/contact" className="btn-pill btn-pill--ghost w-full text-center mt-auto">Discuss Solutions</Link>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="outcomes">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Outcomes"
              display={<>The goal is not AI activity. The goal is <em dangerouslySetInnerHTML={{__html: 'organizational clarity.'}} /></>}
              lede="You don't need more isolated tools. You need a coherent organizational posture."
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               <div className="border-t border-border pt-6">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Clarity over anxiety</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Replace vague fears about technology with structured, actionable frameworks.</p>
               </div>
               <div className="border-t border-border pt-6">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Mission alignment</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Ensure tools serve your missional goals, rather than allowing tools to drift your mission.</p>
               </div>
               <div className="border-t border-border pt-6">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Protected trust</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Maintain the relational equity you&apos;ve built with your community by using technology transparently.</p>
               </div>
               <div className="border-t border-border pt-6">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Calibrated capability</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Develop internal fluency that matches your actual operational needs, not industry hype.</p>
               </div>
               <div className="border-t border-border pt-6">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Architectural confidence</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Know exactly where your data is going and why.</p>
               </div>
               <div className="border-t border-border pt-6">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Empowered teams</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Give staff the boundaries they need to experiment without fear of crossing ethical lines.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="boundaries">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Boundaries"
              display={<>Movemental is not here to make your organization <em dangerouslySetInnerHTML={{__html: 'chase AI.'}} /></>}
              lede="We operate with clear constraints."
            />
            
            <div className="grid sm:grid-cols-2 gap-px bg-border rounded-card overflow-hidden">
               <div className="bg-card p-8 md:p-12">
                  <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2"><span className="text-destructive font-bold">✕</span> We don&apos;t sell software</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Our advice is financially decoupled from the tools you choose to adopt.</p>
               </div>
               <div className="bg-card p-8 md:p-12">
                  <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2"><span className="text-destructive font-bold">✕</span> We don&apos;t push speed</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">We will actively advise you to slow down if your adoption outpaces your formation.</p>
               </div>
               <div className="bg-card p-8 md:p-12">
                  <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2"><span className="text-destructive font-bold">✕</span> We don&apos;t build generic solutions</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">We build architectures specific to the unique constraints of mission-driven spaces.</p>
               </div>
               <div className="bg-card p-8 md:p-12">
                  <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2"><span className="text-destructive font-bold">✕</span> We don&apos;t replace discernment</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">AI cannot replace human pastoral care, leadership instinct, or missiology.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <h2 className="display mb-8">
              Ready to take the <em dangerouslySetInnerHTML={{__html: 'first responsible step?'}} />
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Start the conversation. Let&apos;s find your baseline.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Talk With Us</Link>
              <Link href="/start-with-safety" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Start with Safety</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
