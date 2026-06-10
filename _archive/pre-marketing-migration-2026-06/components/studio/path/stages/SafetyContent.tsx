"use client";

import React from 'react';
import { stageMeta, safetyQuickItems, safetyChecklistRows } from '@/data/shared-path-data';

export function SafetyContent() {
  return (
    <div className="prose max-w-none text-foreground/80 text-lg leading-relaxed space-y-12">
      <div>
        <p className="font-serif-display text-3xl md:text-4xl leading-tight mb-8 text-foreground/90" dangerouslySetInnerHTML={{ __html: stageMeta[0].sentence }} />
        
        <div className="mt-12 bg-section p-8 rounded-card border border-border">
          <div className="text-xs font-semibold text-primary uppercase tracking-eyebrow mb-4">Safety checklist</div>
          <h4 className="text-xl font-medium text-foreground mb-4 m-0">The governance baseline.</h4>
          <p className="mb-8">Before staff use AI on real work, leadership needs a clear governance baseline. These are the essential pieces that make AI use safe enough to begin.</p>
          
          <ul className="space-y-3 mb-8 list-none p-0">
            {safetyQuickItems.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary/60 mr-4 font-mono font-medium">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <details className="group [&_summary::-webkit-details-marker]:hidden border border-border rounded-card bg-card overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between p-6 text-foreground font-semibold hover:bg-muted/50 transition-colors">
              <span className="flex items-center gap-4">
                <span>View full 14-item checklist</span>
                <span className="bg-muted px-2 py-0.5 rounded text-xs font-medium text-muted-foreground uppercase tracking-eyebrow">14 items</span>
              </span>
              <span className="relative flex h-5 w-5 shrink-0 items-center justify-center text-xl font-medium text-muted-foreground group-open:rotate-45 transition-transform duration-300">+</span>
            </summary>
            
            <div className="p-6 md:p-8 bg-card border-t border-border">
              <div className="space-y-10">
                {safetyChecklistRows.map((row) => (
                  <div key={row.index} className="border-l-2 border-primary/20 pl-6 py-1">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-serif-display text-lg text-primary">{row.index}.</span>
                      <h5 className="font-semibold text-lg text-foreground m-0">{row.name}</h5>
                    </div>
                    <details className="mt-2 group/sub [&_summary::-webkit-details-marker]:hidden">
                      <summary className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        An &quot;A&quot; grade looks like
                      </summary>
                      <div className="mt-4 text-[0.95rem] text-muted-foreground bg-section p-5 rounded-lg border border-border leading-relaxed" dangerouslySetInnerHTML={{ __html: row.example }} />
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border">
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">Required before proceeding</h4>
           <ul className="space-y-3 m-0 list-none p-0 text-base">
             {stageMeta[0].doneWhen.map((req, j) => (
               <li key={j} className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> {req}</li>
             ))}
           </ul>
        </div>
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">If you skip this stage</h4>
           <div className="bg-background border border-border p-6 rounded-lg text-base">
              <p className="flex items-start m-0"><span className="text-primary/60 mr-3 mt-0.5">—</span> <span dangerouslySetInnerHTML={{ __html: stageMeta[0].watchFor.replace('If Safety is skipped, ', '') }} /></p>
           </div>
        </div>
      </div>
    </div>
  );
}
