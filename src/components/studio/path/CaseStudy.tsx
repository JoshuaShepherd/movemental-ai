"use client";

import React from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { caseStudies } from '@/data/path-data';
import { CaseStudyNarrative } from '@/components/studio/CaseStudyNarrative';

export function CaseStudy({ audience }: { audience: 'churches' | 'nonprofits' | 'institutions' }) {
  const data = caseStudies[audience].copy;
  
  return (
    <section className="band-default relative" id="case-study" aria-labelledby="case-title">
      <Container>
        <Reveal>
          <span className="section-eyebrow">Case Study</span>
          <h2 id="case-title" className="text-3xl md:text-5xl font-medium tracking-tight mb-16">
            How this looks in practice
          </h2>
          
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-24 mb-16">
             <div className="prose max-w-none">
                 <p className="font-serif-display italic text-3xl md:text-4xl text-primary leading-snug border-l-4 border-primary pl-6 mb-12 py-2">
                    "{data.PullQuote}"
                 </p>
                 
                 <h3 className="text-2xl font-semibold mb-6">Why this worked</h3>
                 <div className="space-y-8">
                   {data.WhyThisWorked.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-baseline gap-3 mb-2">
                           <span className="font-serif-display text-xl text-border/80">0{i+1}</span>
                           <h4 className="font-bold text-lg m-0">{item.title}</h4>
                        </div>
                        <p className="text-foreground/80 pl-8 m-0">{item.description}</p>
                      </div>
                   ))}
                 </div>
             </div>
             
             <div>
                <div className="grid grid-cols-1 gap-px bg-border rounded-card overflow-hidden">
                   {data.Stats.map((stat, i) => (
                      <div key={i} className="bg-section p-6 text-center flex flex-col justify-center">
                         <div className="text-3xl md:text-4xl font-semibold mb-2">{stat.value}</div>
                         <div className="text-sm uppercase tracking-wider text-foreground/60">{stat.label}</div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
          
          <details className="group [&_summary::-webkit-details-marker]:hidden border-border bg-card mt-8 overflow-hidden rounded-xl border shadow-ambient" open>
            <summary className="flex cursor-pointer items-center justify-between p-6 md:px-8 text-foreground font-semibold hover:bg-muted/50 transition-colors border-b border-border">
              <span className="text-lg">Read the full case study</span>
               <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <span className="absolute h-0.5 w-4 bg-foreground transition-transform duration-300 group-open:rotate-180" />
                  <span className="absolute h-4 w-0.5 bg-foreground transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
               </span>
            </summary>
            <div className="p-6 md:p-8 lg:p-12">
               <CaseStudyNarrative audience={audience} />
            </div>
          </details>
        </Reveal>
      </Container>
    </section>
  );
}
