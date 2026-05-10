"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function WhoWeServePage() {
  useEffect(() => {
    document.title = "Who we serve | Movemental";
  }, []);

  return (
    <div className="who-we-serve-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Who we serve</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              Three organizations, <em dangerouslySetInnerHTML={{__html: 'one Path.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              We guide churches, nonprofits, and institutions through the identical Movemental Path, mapping it directly to their distinct operational realities.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link href="/field-guide" className="btn-pill btn-pill--primary">Read the field guide</Link>
              <Link href="/contact" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Start a conversation</Link>
            </div>
            <div className="mt-12 flex items-center gap-3 border-t border-inverse-border/30 pt-6 max-w-2xl">
               <span className="text-inverse-foreground/60 text-sm font-medium uppercase tracking-eyebrow">A note on language:</span>
               <Link href="/movement-leaders" className="text-inverse-foreground hover:text-inverse-foreground text-sm font-medium hover:underline flex items-center gap-1 group">
                 See the definition of Movement Leaders
                 <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
               </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="shared">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The common shape"
              display={<>Different organizations, the <em dangerouslySetInnerHTML={{__html: 'same starting state.'}} /></>}
              lede="Regardless of tax status, mission-driven organizations face the same structural vulnerabilities when encountering AI."
            />
            
            <div className="grid md:grid-cols-2 gap-6 mt-12">
               <div className="bg-card p-8 border border-border rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-4 block">Shared 01</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Relational Equity</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Unlike B2B companies, your primary capital is trust. Undisclosed or reckless use of automation risks fracturing your relationship with your congregation or donor base.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-4 block">Shared 02</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Constrained Resources</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">You cannot afford dedicated AI engineering teams. You need structural safety protocols that operational staff can uphold without high technical barriers.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-4 block">Shared 03</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">The &quot;Shadow IT&quot; Reality</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">Your staff is already using consumer LLMs to draft emails and write reports. If you haven&apos;t set the boundaries, they are currently guessing.</p>
               </div>
               <div className="bg-card p-8 border border-border rounded-xl">
                  <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-4 block">Shared 04</span>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Higher Stakes for Formation</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed">You are in the business of forming humans, not just delivering services. Your tools must never short-circuit the actual work of human care.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="differs">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="What the organization shapes"
              display={<>The Movemental Path holds. The work inside it is <em dangerouslySetInnerHTML={{__html: 'shaped by who you are.'}} /></>}
              lede="While the order—Safety, Sandbox, Skills, Solutions—applies to everyone, the content of those stages changes radically."
            />
            
            <div className="overflow-x-auto mt-12 bg-card rounded-xl border border-border">
               <table role="table" className="w-full min-w-[800px] text-left border-collapse">
                  <thead>
                     <tr className="border-b border-border bg-section">
                        <th className="p-6 font-semibold w-[20%] text-foreground/70 uppercase tracking-wider text-xs">Stage Focus</th>
                        <th className="p-6 font-semibold w-[26%] text-foreground">Churches</th>
                        <th className="p-6 font-semibold w-[26%] text-foreground">Nonprofits</th>
                        <th className="p-6 font-semibold w-[26%] text-foreground">Institutions</th>
                     </tr>
                  </thead>
                  <tbody className="bg-card text-[0.98rem]">
                     <tr className="border-b border-border">
                        <th scope="row" className="p-6 font-medium text-muted-foreground border-r border-border">Safety boundaries protect...</th>
                        <td className="p-6 text-muted-foreground">Pastoral notes, giving data, and the authenticity of the pulpit voice.</td>
                        <td className="p-6 text-muted-foreground">Donor profiles, grant strategy, and vulnerable beneficiary data.</td>
                        <td className="p-6 text-muted-foreground">Student records, intellectual property, and research data.</td>
                     </tr>
                     <tr className="border-b border-border">
                        <th scope="row" className="p-6 font-medium text-muted-foreground border-r border-border">Red lines focus on...</th>
                        <td className="p-6 text-muted-foreground">Maintaining incarnational theology and embodied pastoral care.</td>
                        <td className="p-6 text-muted-foreground">Protecting donor equity and maintaining programmatic integrity.</td>
                        <td className="p-6 text-muted-foreground">Preserving academic rigor and standardizing assessment integrity.</td>
                     </tr>
                     <tr>
                        <th scope="row" className="p-6 font-medium text-muted-foreground border-r border-border">Solutions scale...</th>
                        <td className="p-6 text-muted-foreground">Discipleship infrastructure and communication workflows.</td>
                        <td className="p-6 text-muted-foreground">Grant reporting, donor analytics, and impact tracking.</td>
                        <td className="p-6 text-muted-foreground">Cross-departmental policy enforcement and operational consistency.</td>
                     </tr>
                  </tbody>
               </table>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="audiences">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The three audience pages"
              display={<>Open the page that <em dangerouslySetInnerHTML={{__html: 'names you correctly.'}} /></>}
              lede="Each path leads you through the same four stages, but contextualized to your specific friction points."
            />
            
            <div className="grid md:grid-cols-3 gap-6 mt-12 bg-section p-2 rounded-xl">
               <Link href="/nonprofits" className="bg-card border border-border hover:border-primary p-8 rounded-lg group">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Nonprofits</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed mb-8">For executives balancing rapid scale with rigorous donor trust and compliance.</p>
                  <span className="text-primary font-medium text-sm border-b border-primary/30 group-hover:border-primary pb-0.5 inline-block">Read the nonprofit path →</span>
               </Link>
               <Link href="/churches" className="bg-card border border-border hover:border-primary p-8 rounded-lg group">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Churches</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed mb-8">For pastors protecting theological depth while equipping staff to lead efficiently.</p>
                  <span className="text-primary font-medium text-sm border-b border-primary/30 group-hover:border-primary pb-0.5 inline-block">Read the church path →</span>
               </Link>
               <Link href="/institutions" className="bg-card border border-border hover:border-primary p-8 rounded-lg group">
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Institutions</h3>
                  <p className="text-[0.98rem] text-muted-foreground leading-relaxed mb-8">For leaders standardizing policy across faculties, departments, and operations.</p>
                  <span className="text-primary font-medium text-sm border-b border-primary/30 group-hover:border-primary pb-0.5 inline-block">Read the institutional path →</span>
               </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="movement-leaders">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Adjacent to this page, not on it"
              display={<>Movement leaders are <em dangerouslySetInnerHTML={{__html: 'not a fourth card.'}} /></>}
              lede="They are the ecosystem wrapping around these organizations."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-8">
               Movement leaders—authors, denominational heads, network leaders, and strategists—do not typically fall neatly into the operational categories above. They sit adjacent to the organizations, translating theological and missional urgency down to the ground.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border max-w-[640px]">
               <Link href="/movement-leaders" className="btn-pill btn-pill--ghost">Read the definition</Link>
               <Link href="/voices" className="btn-pill btn-pill--ghost">See the trusted voices</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <h2 className="display mb-8">
              When you have read the right page
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              The Sequence is the same. <em dangerouslySetInnerHTML={{__html: 'The work is yours.'}} />
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Start a conversation</Link>
              <Link href="/assess" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Take the diagnostic</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
