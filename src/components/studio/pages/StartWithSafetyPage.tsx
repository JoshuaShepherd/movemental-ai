"use client";

import React, { useEffect } from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";
import { ShieldCheck, Lock, Eye, MessageSquare, Compass, CheckCircle2 } from 'lucide-react';

export function StartWithSafetyPage() {
  useEffect(() => {
    document.title = "Start with Safety | Movemental";
  }, []);

  return (
    <div className="start-with-safety-page">
      <section className="band-midnight hero hero--fold" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Start with Safety</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              Before your organization adopts more AI, <br /><em dangerouslySetInnerHTML={{__html: 'establish the ground rules.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              Safety is the first stage of the Movemental Sequence. It protects your data, your people, and your mission before experimentation ever begins.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link href="/contact" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Begin the Safety Step</Link>
              <a href="#foundation" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">See What Safety Includes</a>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="reframe">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Safety is not stalling"
              display={<>Safety is what makes <em dangerouslySetInnerHTML={{__html: 'wise adoption possible.'}} /></>}
              lede="Without safety, experimentation is just liability."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-12">
              Many leaders avoid setting AI policy because they feel they don't understand the technology well enough yet. But setting boundaries does not require technical mastery—it requires organizational clarity.
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 border-t border-border pt-12">
               <div>
                  <h3 className="text-xl font-medium text-foreground mb-6">Without Safety</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-destructive font-bold mr-3">✕</span>Shadow IT spreads as staff use unvetted tools.</li>
                    <li className="flex items-start"><span className="text-destructive font-bold mr-3">✕</span>Sensitive congregational or donor data is fed into public models.</li>
                    <li className="flex items-start"><span className="text-destructive font-bold mr-3">✕</span>Trust fractures when the community discovers undisclosed AI use.</li>
                  </ul>
               </div>
               <div>
                  <h3 className="text-xl font-medium text-foreground mb-6">With Safety</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">✓</span>Clear boundaries empower staff to experiment confidently.</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">✓</span>Data governance is secured at the architectural level.</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">✓</span>Relational trust is protected through transparent oversight.</li>
                  </ul>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="foundation">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The safety foundation"
              display={<>Five areas every organization should <em dangerouslySetInnerHTML={{__html: 'clarify first.'}} /></>}
              lede="We build an explicit, written posture around these pillars."
            />
            
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-12">
               <div className="bg-card p-8 border border-border rounded-xl">
                  <ShieldCheck strokeWidth={1.5} className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Acceptable Use</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Where is AI explicitly prohibited? Where is it encouraged? Vague guidelines like "use it wisely" are not sufficient.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <Lock strokeWidth={1.5} className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Data Boundaries</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Strict categorization of what data (PII, pastoral notes, donor records) can never touch an external LLM.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <Eye strokeWidth={1.5} className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Human Oversight</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Mandating human-in-the-loop validation for any output that represents the organization or affects people.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <MessageSquare strokeWidth={1.5} className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Voice and Trust</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Deciding what communication must remain organically human to preserve the organization's relational authenticity.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl md:col-span-2 lg:col-span-1 lg:max-w-md">
                  <Compass strokeWidth={1.5} className="w-10 h-10 text-primary mb-6" />
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Ethical and Theological Guardrails</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Stating clearly what the organization believes about human dignity in an automated age.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="diagnostic">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Quick diagnostic"
              display={<>How safe is your <em dangerouslySetInnerHTML={{__html: 'current AI usage?'}} /></>}
              lede="If you cannot answer yes to these questions, your organization is currently carrying unmanaged risk."
            />
            
            <div className="bg-section p-8 md:p-12 rounded-card border border-border max-w-3xl">
               <ul className="space-y-6">
                  <li className="flex items-start">
                     <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-4 mt-0.5" />
                     <span className="text-[1.0625rem] text-foreground font-medium">Does your staff know exactly which tools are approved and which are banned?</span>
                  </li>
                  <li className="flex items-start">
                     <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-4 mt-0.5" />
                     <span className="text-[1.0625rem] text-foreground font-medium">Do you have a policy that explicitly prevents sensitive data from being used to train public AI models?</span>
                  </li>
                  <li className="flex items-start">
                     <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-4 mt-0.5" />
                     <span className="text-[1.0625rem] text-foreground font-medium">Is there a clear rule about when AI-generated content must be disclosed to your community?</span>
                  </li>
                  <li className="flex items-start">
                     <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mr-4 mt-0.5" />
                     <span className="text-[1.0625rem] text-foreground font-medium">Have you paused to align your AI posture with your core theology or mission statement?</span>
                  </li>
               </ul>
            </div>
            
            <p className="mt-8 text-muted-foreground text-sm italic max-w-3xl">If your answers are mostly "No" or "I don't know," a Movemental Safety Session is the highest leverage move you can make today.</p>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="outputs">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-16">
               <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 max-w-3xl text-foreground">
                  The outputs of a <em className="font-serif-display italic tracking-normal">Safety engagement</em>.
               </h2>
               <p className="lede">What you walk away with when we complete the Safety stage.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-card p-6 border-t-[3px] border-primary shadow-sm rounded-b-lg">
                  <h4 className="font-semibold text-foreground mb-2">Contextualized Acceptable Use Policy</h4>
                  <p className="text-sm text-muted-foreground">Not a generic template, but a policy mapped to your specific organizational friction points.</p>
               </div>
               <div className="bg-card p-6 border-t-[3px] border-primary shadow-sm rounded-b-lg">
                  <h4 className="font-semibold text-foreground mb-2">Executive Alignment</h4>
                  <p className="text-sm text-muted-foreground">The senior team leaves with a shared vocabulary and a unified, defensible posture.</p>
               </div>
               <div className="bg-card p-6 border-t-[3px] border-primary shadow-sm rounded-b-lg">
                  <h4 className="font-semibold text-foreground mb-2">Data Classification Matrix</h4>
                  <p className="text-sm text-muted-foreground">A clear mapping of what data requires complete isolation and what is safe for general tools.</p>
               </div>
               <div className="bg-card p-6 border-t-[3px] border-primary shadow-sm rounded-b-lg">
                  <h4 className="font-semibold text-foreground mb-2">Theological/Missional Rubric</h4>
                  <p className="text-sm text-muted-foreground">A framework for evaluating future tools against your core beliefs.</p>
               </div>
               <div className="bg-card p-6 border-t-[3px] border-primary shadow-sm rounded-b-lg">
                  <h4 className="font-semibold text-foreground mb-2">Approved Vendor List</h4>
                  <p className="text-sm text-muted-foreground">Initial clearance of tools that meet enterprise data privacy standards.</p>
               </div>
               <div className="bg-card p-6 border-t-[3px] border-primary shadow-sm rounded-b-lg">
                  <h4 className="font-semibold text-foreground mb-2">Communication Brief</h4>
                  <p className="text-sm text-muted-foreground">Language to communicate your AI posture clearly to your board, staff, and community.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="path">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Safety first — but not the end"
              display={<>Safety is the foundation for <em dangerouslySetInnerHTML={{__html: 'everything that follows.'}} /></>}
              lede="Once safety is established, you can move rapidly."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-12">
               Safety secures the perimeter. The remaining stages of the full AI Stewardship Sequence focus on building capacity and solving real problems inside that perimeter.
            </p>
            
            <div className="grid gap-4 max-w-3xl mb-12">
               <div className="flex bg-section rounded-lg p-4 border border-border">
                  <span className="text-primary font-bold mr-4">01</span>
                  <div>
                     <strong className="text-foreground block mb-1">Safety</strong>
                     <span className="text-sm text-muted-foreground">Establish boundaries and mitigate risk.</span>
                  </div>
               </div>
               <div className="flex p-4 border-l-2 border-border ml-6 opacity-60">
                  <span className="text-muted-foreground font-bold mr-4">02</span>
                  <div>
                     <strong className="text-foreground block mb-1">Sandbox</strong>
                     <span className="text-sm text-muted-foreground">Test safely in contained environments.</span>
                  </div>
               </div>
               <div className="flex p-4 border-l-2 border-border ml-6 opacity-60">
                  <span className="text-muted-foreground font-bold mr-4">03</span>
                  <div>
                     <strong className="text-foreground block mb-1">Skills</strong>
                     <span className="text-sm text-muted-foreground">Practical capability and judgment formation.</span>
                  </div>
               </div>
               <div className="flex p-4 border-l-2 border-border ml-6 opacity-60">
                  <span className="text-muted-foreground font-bold mr-4">04</span>
                  <div>
                     <strong className="text-foreground block mb-1">Solutions</strong>
                     <span className="text-sm text-muted-foreground">Deploying systemic, missional impact.</span>
                  </div>
               </div>
            </div>
            
            <Link href="/field-guide" className="btn-pill btn-pill--ghost">See the full path</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <h2 className="display mb-8">
              Start with the step that <em dangerouslySetInnerHTML={{__html: 'makes every other step safer.'}} />
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Stop guessing. Baseline your risk and set your policy now.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Begin the Safety Step</Link>
              <Link href="/contact" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Talk With Us</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
