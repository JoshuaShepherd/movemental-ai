"use client";

import React, { useEffect } from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function EvidencePage() {
  useEffect(() => {
    document.title = "Evidence | Movemental";
  }, []);

  return (
    <div className="evidence-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Evidence</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              Proof looks different in a <em dangerouslySetInnerHTML={{__html: 'new category.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              The reality of the moment, the coherence of the system, the work already happening, and the people behind it — without hype, without invented metrics.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link href="/start-with-safety" className="btn-pill btn-pill--primary">Start with Safety</Link>
              <Link href="/contact" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Talk With Us</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="reality">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The reality"
              display={<>This is <em dangerouslySetInnerHTML={{__html: 'not a hypothetical problem.'}} /></>}
              lede="This is not a hypothetical problem."
            />
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
               <div className="bg-card p-8 border border-border rounded-xl">
                  <h3 className="text-xl font-medium text-foreground mb-4">Shadow IT is expanding daily.</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Your staff is using AI to draft emails, summarize meetings, and generate content. If you haven&apos;t set the boundaries, the boundaries are being set by individual discretion.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <h3 className="text-xl font-medium text-foreground mb-4">Data is vulnerable.</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Pastoral care notes, internal strategy, and donor profiles are being pasted into public LLMs. The liability is quiet, but it is real.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <h3 className="text-xl font-medium text-foreground mb-4">Trust is fragile.</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Congregations and donors are highly sensitive to authenticity. Discovering undisclosed AI use fractures relational trust faster than almost any other misstep.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <h3 className="text-xl font-medium text-foreground mb-4">Theology is embedded.</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">Large Language Models are not neutral processors; they are worldviews encoded in statistics. Using them unreflectively imports foreign theology into the heart of your mission.</p>
               </div>
            </div>
            
            <p className="text-lg font-medium text-foreground border-l-2 border-primary pl-6 py-2 max-w-3xl">
               The proof that a framework is needed is the friction you correspond to already feel.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="system">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The framework"
              display={<>Clarity is evidence in a chaotic space.</>}
              lede="Clarity is evidence in a chaotic space."
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
               <div className="bg-card p-6 border-l-4 border-foreground">
                  <h4 className="text-foreground mb-2">Safety</h4>
                  <p className="text-xs text-muted-foreground">Create boundaries. Protect data.</p>
               </div>
               <div className="bg-card p-6 border-l-4 border-foreground/70">
                  <h4 className="text-foreground mb-2">Sandbox</h4>
                  <p className="text-xs text-muted-foreground">Experiment in isolated security.</p>
               </div>
               <div className="bg-card p-6 border-l-4 border-foreground/40">
                  <h4 className="text-foreground mb-2">Skills</h4>
                  <p className="text-xs text-muted-foreground">Form human judgment.</p>
               </div>
               <div className="bg-card p-6 border-l-4 border-foreground/20">
                  <h4 className="text-foreground mb-2">Solutions</h4>
                  <p className="text-xs text-muted-foreground">Deploy systemic impact.</p>
               </div>
            </div>
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-12">
               Our conviction is that skipping or reversing stages on the Movemental Path is what causes failure. Rushing to Solutions without Safety causes breaches.
            </p>

            <div className="grid md:grid-cols-2 gap-px bg-border rounded-card overflow-hidden mb-12 max-w-4xl">
               <div className="bg-card p-8">
                  <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-destructive mb-4">Out of order</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed block">Focusing on tools first leads to fragmented adoption, ethical oversights, and data vulnerabilities.</p>
               </div>
               <div className="bg-card p-8">
                  <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-primary mb-4">In order</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed block">Establishing a foundation of safety and sandbox testing creates the freedom to build real skills and robust solutions calmly.</p>
               </div>
            </div>
            
            <Link href="/pathway" className="btn-pill btn-pill--ghost">See the full path</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="practice">
         <Container>
            <Reveal>
               <SectionHead 
                  eyebrow="In practice"
                  display={<>This is already being worked out in real organizations.</>}
                  lede="This is already being worked out in real organizations."
               />
               <div className="grid md:grid-cols-3 gap-8">
                 <div className="bg-section p-8 rounded-xl border border-border">
                    <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-ink-soft mb-6 border-b border-border-soft pb-4">Nonprofit Executive Teams</h3>
                    <p className="text-[0.98rem] leading-relaxed text-foreground">Locking down acceptable use policies that protect donor confidentiality before implementing AI-driven qualitative grant analysis.</p>
                 </div>
                 <div className="bg-section p-8 rounded-xl border border-border">
                    <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-ink-soft mb-6 border-b border-border-soft pb-4">Church Planters</h3>
                    <p className="text-[0.98rem] leading-relaxed text-foreground">Using secure sandboxes to map demographic data while explicitly drawing theological red-lines around pastoral care communication.</p>
                 </div>
                 <div className="bg-section p-8 rounded-xl border border-border">
                    <h3 className="text-sm font-semibold uppercase tracking-eyebrow text-ink-soft mb-6 border-b border-border-soft pb-4">Seminary Faculties</h3>
                    <p className="text-[0.98rem] leading-relaxed text-foreground">Aligning institutional AI posture across diverse academic disciplines to craft coherent syllabus expectations for students.</p>
                 </div>
               </div>
            </Reveal>
         </Container>
      </section>

      <section className="band-section" id="people">
         <Container>
            <Reveal>
               <SectionHead 
                  eyebrow="Credibility"
                  display={<>Built by movement leaders, not just technologists.</>}
                  lede="Built by movement leaders, not just technologists."
               />
               <div className="grid md:grid-cols-3 gap-8 border-t border-border pt-12 mb-12">
                  <div>
                     <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Theological depth</h3>
                     <p className="text-[0.98rem] leading-relaxed text-muted-foreground">Led by Alan Hirsch and Brad Brisco, ensuring that the integration of technology never sacrifices missional movement dynamics.</p>
                  </div>
                  <div>
                     <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Technical reality</h3>
                     <p className="text-[0.98rem] leading-relaxed text-muted-foreground">Architected by Joshua Shepherd, ensuring that ethical policies are backed by literal, functional data constraints.</p>
                  </div>
                  <div>
                     <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Ecosystem validation</h3>
                     <p className="text-[0.98rem] leading-relaxed text-muted-foreground">Pressure-tested continuously by our network of Movement Leaders—practitioners actively executing on the ground.</p>
                  </div>
               </div>
               <Link href="/about" className="btn-pill btn-pill--ghost">Meet the founders</Link>
            </Reveal>
         </Container>
      </section>

      <section className="band-default" id="building-in-public">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Posture"
              display={<>We are not pretending <em dangerouslySetInnerHTML={{__html: 'this is solved.'}} /></>}
              lede="We are not pretending this is solved."
            />
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-8">
               If a consultancy promises you they have the final answer to how AI will shape religion and philanthropy, they are lying. Movemental&apos;s highest evidence of integrity is our commitment to building in public, alongside the organizations we serve.
            </p>
            <p className="text-xl md:text-2xl font-serif-display italic text-foreground max-w-3xl">
               Authority comes from sustained, honest engagement — not from appearing certain.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <h2 className="display mb-8">
              This is what <em dangerouslySetInnerHTML={{__html: 'responsible AI leadership'}} /> looks like.
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Clear. Sequenced. Missional.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/start-with-safety" className="btn-pill btn-pill--primary">Start with Safety</Link>
              <Link href="/contact" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Talk With Us</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
