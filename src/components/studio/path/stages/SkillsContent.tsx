"use client";

import React from 'react';
import { stageMeta, formationWeeks, lessonTypes, formationMarkers } from '@/data/shared-path-data';

export function SkillsContent() {
  return (
    <div className="prose max-w-none text-foreground/80 text-lg leading-relaxed space-y-12">
      <div>
        <p className="font-serif-display text-3xl md:text-4xl leading-tight mb-8 text-foreground/90" dangerouslySetInnerHTML={{ __html: stageMeta[2].sentence }} />
        
        <div className="mt-12 bg-section p-8 rounded-card border border-border">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">The deliverable</div>
          <h4 className="text-xl font-medium text-foreground mb-2 m-0">AI Wisdom & Maturity</h4>
          <p className="text-sm font-medium text-muted-foreground mb-6"><strong className="text-foreground">Eight weeks</strong> · Live cohort · Customizable for your organization</p>
          
          <p className="mb-8" dangerouslySetInnerHTML={{ __html: `Training teaches people how to use tools. Formation teaches people how to carry responsibility when the tool is in the room. <strong>This course gives staff practical AI skills while forming the judgment, review habits, and shared language needed to use AI responsibly.</strong>` }} />
          
          <p className="font-serif-display italic text-2xl text-primary border-l-4 border-primary pl-6 py-2 mb-10">
             "What you are building is not a faster team. It is a wiser one."
          </p>
          
          <div className="border-t border-border pt-10 mb-10">
             <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">The eight-week arc</div>
             <div className="grid gap-4">
                {formationWeeks.map((week) => (
                   <div key={week.week} className="bg-card p-5 rounded-lg border border-border grid md:grid-cols-[100px_200px_1fr] gap-4 items-start">
                      <div className="font-mono text-xs font-semibold text-primary uppercase tracking-widest mt-1">{week.week}</div>
                      <div className="font-semibold text-foreground">{week.name}</div>
                      <div className="text-[0.95rem] text-muted-foreground leading-relaxed">{week.description}</div>
                   </div>
                ))}
             </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 border-t border-border pt-10">
             <div>
                <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">Inside each week</div>
                <ul className="space-y-4 m-0 p-0 list-none text-[0.95rem]">
                   {lessonTypes.map((type, i) => (
                      <li key={i} className="flex flex-col">
                         <span className="font-bold text-foreground">{type.name}</span>
                         <span className="text-muted-foreground">{type.desc}</span>
                      </li>
                   ))}
                </ul>
             </div>
             <div>
                <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">What people walk away with</div>
                <ul className="space-y-3 m-0 p-0 list-none text-[0.95rem]">
                   {formationMarkers.map((marker, i) => (
                      <li key={i} className="flex items-start">
                         <span className="text-primary mr-3 mt-1 font-bold text-xs uppercase tracking-widest">{i + 1}.</span>
                         <span dangerouslySetInnerHTML={{ __html: marker }} />
                      </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border">
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">Required before proceeding</h4>
           <ul className="space-y-3 m-0 list-none p-0 text-base">
             {stageMeta[2].doneWhen.map((req, j) => (
               <li key={j} className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> {req}</li>
             ))}
           </ul>
        </div>
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">If you skip this stage</h4>
           <div className="bg-background border border-border p-6 rounded-lg text-base">
              <p className="flex items-start m-0"><span className="text-primary/60 mr-3 mt-0.5">—</span> <span dangerouslySetInnerHTML={{ __html: stageMeta[2].watchFor.replace('If Skills is skipped, ', '') }} /></p>
           </div>
        </div>
      </div>
    </div>
  );
}
