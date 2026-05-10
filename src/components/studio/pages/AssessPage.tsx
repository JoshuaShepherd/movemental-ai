"use client";

import React, { useEffect } from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";
import { IntegrityDiagnosticForm } from '@/components/studio/IntegrityDiagnosticForm';

const MEASURES = [
  { num: '01', title: 'Path integrity', body: 'Are we building solutions before we have established safety?' },
  { num: '02', title: 'Posture clarity', body: 'Do our people know what we believe about AI, or just what tools we bought?' },
  { num: '03', title: 'Refusal capacity', body: 'Do we have criteria for saying no?' },
  { num: '04', title: 'Sandbox truth', body: 'Are we experimenting in contained spaces, or risking real data?' },
  { num: '05', title: 'Formation, not training', body: 'Are we forming our people to use AI, or just teaching them prompts?' },
  { num: '06', title: 'Solution restraint', body: 'Are we trying to solve every problem with AI, or only the right ones?' }
];

export function AssessPage() {
  useEffect(() => {
    document.title = "Integrity Diagnostic | Movemental";
  }, []);

  return (
    <div className="assess-page">
      <section className="band-midnight hero" aria-labelledby="assess-hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Movemental Path · Integrity Diagnostic</span>
            <h1 id="assess-hero-h1" className="display hero-headline max-w-5xl">
              Where is your organization <em dangerouslySetInnerHTML={{__html: 'actually'}} /> starting?
            </h1>
            <p className="hero-subhead lede text-inverse-foreground/80 mb-10 max-w-3xl">
              A short diagnostic for senior leaders who suspect their AI conversation is further along than their AI posture is. Forty-five minutes to complete with two or three colleagues in the room. A six-page read-back inside five business days, read with you on a thirty-minute call.
            </p>
            <div className="hero-actions flex flex-wrap gap-4 mb-16">
              <a href="#begin" className="btn-pill btn-pill--primary">Take the diagnostic</a>
              <Link href="/field-guide" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Read the field guide first</Link>
            </div>
            
            <div className="border-l-2 border-inverse-border pl-6 max-w-[36ch]">
               <span className="text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground/60 mb-2 block">No score, no benchmark</span>
               <p className="text-sm text-inverse-foreground/80 leading-relaxed">The diagnostic produces a narrative, not a number. See the editorial note below.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="measures">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Six dimensions"
              display={<>Six honest questions, <em dangerouslySetInnerHTML={{__html: 'in order'}} />.</>}
              lede="The diagnostic walks the same Movemental Path as the engagement: Safety, Sandbox, Skills, Solutions — broken into six readable dimensions, each with its own short section."
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border rounded-card overflow-hidden">
              {MEASURES.map((measure) => (
                 <div key={measure.num} className="bg-card p-10 flex flex-col gap-5 hover:bg-section transition-colors duration-300">
                    <span className="text-sm font-semibold uppercase tabular-nums tracking-widest text-primary/70">{measure.num}</span>
                    <h3 className="font-serif-display text-3xl italic text-foreground">{measure.title}</h3>
                    <p className="text-muted-foreground text-[1.0625rem] leading-relaxed">{measure.body}</p>
                 </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="preview">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Take the diagnostic"
              display={<>Forty-five minutes, six sections, <em dangerouslySetInnerHTML={{__html: 'no scoring'}} />.</>}
              lede="Twenty-two multiple-choice questions across six sections, plus an optional 'show your work' note for each. Nothing is timed. Nothing is scored. The point is to make the conversation more honest, not to rank your organization."
            />
            
            <div className="bg-card w-full mt-10">
               <IntegrityDiagnosticForm />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="readback">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The read-back"
              display={<>A six-page narrative, <em dangerouslySetInnerHTML={{__html: 'not a number'}} />.</>}
              lede="You complete the diagnostic. We read it. Within five business days, you receive a written read-back and a calendar invite for a thirty-minute call to walk it."
            />
            
            <ol className="list-decimal pl-5 space-y-6 max-w-3xl text-foreground font-medium text-lg marker:text-ink-soft">
               <li className="pl-4">
                 <strong className="block text-foreground mb-2">The read-back document</strong>
                 <span className="font-normal text-muted-foreground text-base">Six pages of written feedback based on your responses. No score, no benchmark, no rank.</span>
               </li>
               <li className="pl-4">
                 <strong className="block text-foreground mb-2">A thirty-minute call</strong>
                 <span className="font-normal text-muted-foreground text-base">Founder reads document with you. If we misread context, we revise it.</span>
               </li>
               <li className="pl-4">
                 <strong className="block text-foreground mb-2">A short list of next moves</strong>
                 <span className="font-normal text-muted-foreground text-base">Three things we would focus on first. Often &quot;do less, slower&quot; or &quot;you are further along than you think.&quot;</span>
               </li>
               <li className="pl-4">
                 <strong className="block text-foreground mb-2">Permission to share it</strong>
                 <span className="font-normal text-muted-foreground text-base">Send it to the board, circulate to the team, or rewrite a section if needed to be useful internally.</span>
               </li>
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="not-this">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="What this is not"
              display={<>The line, <em dangerouslySetInnerHTML={{__html: 'on the page'}} />.</>}
            />
            
            <aside className="border border-border-soft bg-background p-8 rounded-card max-w-3xl">
               <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-4 block">Editorial note</span>
               <div className="prose max-w-none text-muted-foreground text-[0.98rem] leading-relaxed">
                  <p><strong>This is not a maturity model.</strong> It is not a benchmark against peers, a quantifiable index, or a score to report to a board. The outputs are purely qualitative.</p>
                  <p>All inputs are held confidentially by Movemental&apos;s founders. We do not aggregate your responses into industry reports without explicit permission, and we do not use your data to train public models.</p>
               </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="when">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Where this sits"
              display={<>Before the first proposal, <em dangerouslySetInnerHTML={{__html: 'not after'}} />.</>}
            />
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-10">
              The diagnostic is the first step of an engagement, or it can be taken independently to test organizational alignment. Taking it requires no commitment to further work.
            </p>
            <Link href="/field-guide" className="btn-pill btn-pill--ghost">Read the field guide for the full Sequence</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="faq">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Common questions"
              display={<>What leaders ask <em dangerouslySetInnerHTML={{__html: 'before they take it'}} />.</>}
            />
            
            <div className="max-w-3xl space-y-4 mb-12">
               {[
                 { q: 'Does this cost anything?', a: 'No. The Integrity Diagnostic is free for organizations.' },
                 { q: 'Can our board take it?', a: 'Yes. Often, having board members or elders take the diagnostic alongside executive staff reveals important gaps in alignment.' },
                 { q: 'Can we take it more than once?', a: 'Yes. Taking it at the start of an AI journey and returning to it a year later is a good way to measure qualitative shifts in culture.' },
                 { q: 'Is the data confidential?', a: 'Strictly. We do not use diagnostic submissions for lead generation, nor do we sell the data. It is read by a human partner and used to scope your read-back.' },
                 { q: 'Why isn\'t there a public leaderboard?', a: 'Because benchmarking AI readiness encourages organizations to optimize for the score rather than taking the time required for actual formation.' },
                 { q: 'What if we are not ready to take it?', a: 'Read the Field Guide instead. It provides the same framework without the expectation of providing answers.' }
               ].map((faq, i) => (
                 <details key={i} className="group bg-card border border-border rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 hover:border-primary/30">
                    <summary className="cursor-pointer font-medium p-6 md:p-8 flex justify-between items-center text-foreground group-open:border-b group-open:border-border select-none text-lg">
                       {faq.q}
                       <span className="text-2xl transform group-open:rotate-45 transition-transform duration-300 font-light text-muted-foreground group-hover:text-primary">+</span>
                    </summary>
                    <div className="p-6 md:p-8 text-muted-foreground bg-section/30 text-[1.0625rem] leading-relaxed">
                       {faq.a}
                    </div>
                 </details>
               ))}
            </div>
            
            <Link href="/faq" className="btn-pill btn-pill--ghost">See the full FAQ</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center" id="cta">
        <Container width="narrow">
          <Reveal>
            <span className="section-eyebrow text-inverse-foreground/80 flex justify-center items-center gap-2 mb-6">
              When you are ready
            </span>
            <h2 className="display mb-8">
              Forty-five minutes. <em dangerouslySetInnerHTML={{__html: 'Six honest questions'}} />.
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Two or three colleagues in the room. No score. A six-page read-back inside a week, read with you on a thirty-minute call.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#begin" className="btn-pill btn-pill--primary">Take the diagnostic</a>
              <Link href="/contact" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Start a conversation first</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
