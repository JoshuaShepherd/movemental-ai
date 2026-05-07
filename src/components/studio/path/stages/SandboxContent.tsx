"use client";

import React from 'react';
import { stageMeta } from '@/data/shared-path-data';

export function SandboxContent() {
  return (
    <div className="prose max-w-none text-foreground/80 text-lg leading-relaxed space-y-12">
      <div>
        <p className="font-serif-display text-3xl md:text-4xl leading-tight mb-8 text-foreground/90" dangerouslySetInnerHTML={{ __html: stageMeta[1].sentence }} />
        
        <div className="mt-12 bg-section p-8 rounded-card border border-border">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">The Sandbox pact</div>
          <p className="mb-8 font-medium text-foreground">Sandbox is not "everyone try whatever you want." It is structured experimentation inside boundaries. Two rules make it safe enough to actually learn from. If either one is missing, the experiment doesn't run yet.</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border">
               <div className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Rule 01</div>
               <h5 className="text-lg font-bold text-foreground mb-3 mt-0">Nothing made in the sandbox gets published.</h5>
               <p className="text-sm m-0 text-muted-foreground">While experiments are running, AI-generated work doesn't leave the organization. Not to donors, not to the public, not to the people you serve. The sandbox is for learning what works — not for shipping it. Anything that ships goes through a separate approval step after the experiment is done.</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
               <div className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Rule 02</div>
               <h5 className="text-lg font-bold text-foreground mb-3 mt-0">Private information stays private — by process, not by promise.</h5>
               <p className="text-sm m-0 text-muted-foreground">Before any experiment runs, you have a real, trained procedure for keeping sensitive information out of AI tools. Not a memo people skim — an actual process every staff member has been walked through. If a privacy breach is even possible, the experiment doesn't run yet.</p>
            </div>
          </div>
          
          <p className="mb-10 text-muted-foreground">With both rules in place, your team is free to actually explore — to find where AI saves time on tedious work, helps generate revenue, or raises the quality of what you produce. Those three places are where most of the value lives.</p>
          
          <div className="border-t border-border pt-10">
             <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-6">How the experiment runs</div>
             <p className="mb-8 font-medium">An eight-week structured process for finding, documenting, and reviewing AI use cases that fit your organization.</p>
             
             <div className="space-y-8">
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 01 — Recipes:</h6>
                  <p className="text-sm m-0">Movemental brings a starting list of proven AI use cases — across fundraising, communications, programs, and operations. Your team picks the ones worth testing for your organization.</p>
                </div>
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 02 — Experiment:</h6>
                  <p className="text-sm m-0">Each use case gets a designated owner and runs as a structured experiment, using anonymized examples or made-up data. No real donors, no real client records, no real financials.</p>
                </div>
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 03 — Log the value:</h6>
                  <p className="text-sm m-0">Every experiment is logged in one shared place — what was tried, what worked, and what kind of value it produced (time saved, revenue generated, or quality improved). AI helps assess the value; a human reviews every entry.</p>
                </div>
                <div className="pl-6 border-l-2 border-border relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 04 — Open visibility:</h6>
                  <p className="text-sm m-0">The whole organization can see the running list. Anyone on staff can flag an ethical or trust concern on any use case — no special training, no permission needed.</p>
                </div>
                <div className="pl-6 border-l-2 border-transparent relative">
                  <div className="absolute w-3 h-3 bg-card border-2 border-primary rounded-full -left-[7px] top-1" />
                  <h6 className="font-bold text-foreground mt-0 mb-2">Step 05 — Governance review:</h6>
                  <p className="text-sm mb-4">At the end of the eight weeks, your decision group reviews each use case — its value, and any concerns staff flagged — and assigns one of three lights:</p>
                  
                  <ul className="list-none m-0 space-y-3 bg-card border border-border rounded-lg p-5">
                     <li className="flex gap-4 text-sm"><div className="w-4 h-4 rounded-full bg-status-go mt-0.5 shrink-0" /><span className="leading-tight"><strong className="text-foreground font-semibold">Green light</strong> — Clear value, no concerns. Ready to use across the team.</span></li>
                     <li className="flex gap-4 text-sm"><div className="w-4 h-4 rounded-full bg-status-caution mt-0.5 shrink-0" /><span className="leading-tight"><strong className="text-foreground font-semibold">Yellow light</strong> — Real value, but only with specific guardrails — <em dangerouslySetInnerHTML={{ __html: "used this way, and only this way." }} /></span></li>
                     <li className="flex gap-4 text-sm"><div className="w-4 h-4 rounded-full bg-status-stop mt-0.5 shrink-0" /><span className="leading-tight"><strong className="text-foreground font-semibold">Red light</strong> — Off the table. Added to the "never" list, alongside the boundaries from Safety.</span></li>
                  </ul>
                </div>
             </div>
             
             <p className="mt-8 font-serif-display italic text-2xl text-foreground m-0">What you walk away with is a recipe book your organization actually agreed on.</p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-border">
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">Required before proceeding</h4>
           <ul className="space-y-3 m-0 list-none p-0 text-base">
             {stageMeta[1].doneWhen.map((req, j) => (
               <li key={j} className="flex items-start"><span className="text-primary font-bold mr-3">✓</span> {req}</li>
             ))}
           </ul>
        </div>
        <div>
           <h4 className="font-sans font-semibold text-sm mb-4 text-foreground uppercase tracking-wider">If you skip this stage</h4>
           <div className="bg-background border border-border p-6 rounded-lg text-base">
              <p className="flex items-start m-0"><span className="text-primary/60 mr-3 mt-0.5">—</span> <span dangerouslySetInnerHTML={{ __html: stageMeta[1].watchFor.replace('If Sandbox is skipped, ', '') }} /></p>
           </div>
        </div>
      </div>
    </div>
  );
}
