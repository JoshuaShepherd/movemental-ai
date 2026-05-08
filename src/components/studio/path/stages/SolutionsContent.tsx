"use client";

import React from 'react';
import { stageMeta, customAiBuildBlueprint, solutionsProduces, solutionsWhyMatters, solutionsArc } from '@/data/shared-path-data';

export function SolutionsContent() {
  return (
    <div className="prose max-w-none text-foreground/80 text-lg leading-relaxed space-y-12">
      <div>
        <p className="font-serif-display text-3xl md:text-4xl leading-tight mb-8 text-foreground/90" dangerouslySetInnerHTML={{ __html: stageMeta[3].sentence }} />
        
        <p className="mb-10 text-xl" dangerouslySetInnerHTML={{ __html: `Solutions is the stage where the technology finally becomes central — <strong>but not first.</strong> By this point, your organization has clarified its boundaries, tested real use cases, trained its people, and learned where AI creates value without compromising trust.` }} />
        
        <div className="bg-card p-6 md:p-8 rounded-card border border-border mb-12 relative overflow-hidden">
           <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary" />
           <div className="flex flex-col gap-6 font-serif-display text-2xl md:text-3xl text-foreground">
              <div className="opacity-60 flex gap-3 text-lg md:text-2xl"><span className="uppercase tracking-eyebrow text-xs font-sans font-bold mt-2.5">Not:</span> "What AI tool should we buy?"</div>
              <div className="text-primary flex gap-3"><span className="uppercase tracking-eyebrow text-xs font-sans font-bold mt-2.5 text-foreground">But:</span> <em dangerouslySetInnerHTML={{ __html: `"What should we build around the way our organization actually works?"` }} /></div>
           </div>
        </div>
        
        <div className="mt-12 bg-section p-8 rounded-card border border-border">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
               <div className="text-xs font-semibold text-primary uppercase tracking-eyebrow mb-4">The custom AI build blueprint</div>
               <p className="mb-8 font-medium">A custom AI solution is designed around six things.</p>
               
               <div className="grid gap-4">
                  {customAiBuildBlueprint.map((item) => (
                     <div key={item.num} className="bg-card p-5 rounded-lg border border-border flex gap-4">
                        <div className="font-serif-display text-2xl text-primary/40 font-bold shrink-0">{item.num}</div>
                        <div>
                           <div className="font-bold text-foreground mb-1">{item.name}</div>
                           <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            
            <div className="lg:col-span-2 space-y-12">
               <div>
                  <div className="text-xs font-semibold text-primary uppercase tracking-eyebrow mb-6">What this can produce</div>
                  <ul className="space-y-3 m-0 p-0 list-none text-sm">
                     {solutionsProduces.map((item, i) => (
                        <li key={i} className="flex"><span className="text-primary font-bold mr-3">✓</span> {item}</li>
                     ))}
                  </ul>
               </div>
               
               <div className="bg-card p-6 rounded-lg border border-border">
                  <div className="text-xs font-semibold text-foreground uppercase tracking-eyebrow mb-4">Why this matters</div>
                  <ol className="space-y-4 m-0 p-0 list-decimal list-inside text-sm text-muted-foreground">
                     {solutionsWhyMatters.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                     ))}
                  </ol>
               </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-10 mt-10">
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {solutionsArc.map((arc, i) => (
                   <div key={i}>
                      <div className="font-bold text-foreground mb-2">{arc.verb}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{arc.desc}</div>
                   </div>
                ))}
             </div>
             
             <p className="mt-10 font-serif-display text-2xl text-center border-t border-border pt-10">
                When this works, the organization stops re-explaining itself to itself.
             </p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border">
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">Required before proceeding</h4>
           <ul className="space-y-3 m-0 list-none p-0 text-base">
             {stageMeta[3].doneWhen.map((req, j) => (
               <li key={j} className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> {req}</li>
             ))}
           </ul>
        </div>
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">If you skip this stage</h4>
           <div className="bg-background border border-border p-6 rounded-lg text-base">
              <p className="flex items-start m-0"><span className="text-primary/60 mr-3 mt-0.5">—</span> <span dangerouslySetInnerHTML={{ __html: stageMeta[3].watchFor.replace('If Solutions are rushed, ', '') }} /></p>
           </div>
        </div>
      </div>
    </div>
  );
}
