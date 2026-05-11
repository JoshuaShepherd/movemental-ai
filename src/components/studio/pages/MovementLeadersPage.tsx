"use client";

import React, { useEffect } from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { SectionHead } from '@/components/studio/SectionHead';
import Link from "next/link";

export function MovementLeadersPage() {
  useEffect(() => {
    document.title = "Movement leaders | Movemental";
  }, []);

  return (
    <div className="movement-leaders-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Movement Voices · Definition</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              What we mean by <em dangerouslySetInnerHTML={{__html: 'movement leader'}} />.
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              What we mean by movement leader. Practitioners whose discipleship of place and people gives weight to
              whatever Movemental publishes —{" "}
              an ecosystem layer, not a fourth audience.
            </p>
            <div className="hero-actions flex flex-wrap gap-4 mb-16">
              <Link href="/voices" className="btn-pill btn-pill--primary">See the named voices</Link>
              <Link href="/field-guides" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Read the field guide</Link>
            </div>

            <div className="border-l-2 border-inverse-border pl-6 max-w-[40ch]">
               <span className="text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground/60 mb-2 block">Editorial posture</span>
               <p className="text-sm text-inverse-foreground/80 leading-relaxed">This page is descriptive, not recruiting. There is no form below it, by design.</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="definition">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The definition"
              display={<>Three things <em dangerouslySetInnerHTML={{__html: 'at once'}} />.</>}
              lede="A movement leader is necessarily a missiological originator, a steward of a tradition, and a witness in practice."
            />
            
            <div className="grid md:grid-cols-3 gap-6">
               <div className="bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-4 text-foreground">Missiological Originator</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed">Someone translating orthodox theology into new cultural frontiers, rather than merely repeating inherited forms.</p>
               </div>
               <div className="bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-4 text-foreground">Steward of Tradition</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed">Carrying responsibility for the theological and ethical boundaries of a community, denomination, or decentralized network.</p>
               </div>
               <div className="bg-card border border-border p-8 rounded-card hover:-translate-y-0.5 transition-transform">
                  <h3 className="font-serif-display text-2xl italic mb-4 text-foreground">Practitioner Witness</h3>
                  <p className="text-muted-foreground text-[0.98rem] leading-relaxed">Doing the work in a specific place with specific people. Their authority comes from practice, not just publishing.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="ecosystem">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Where this fits"
              display={<>An ecosystem layer, <em dangerouslySetInnerHTML={{__html: 'not a funnel'}} />.</>}
              lede="Movemental engages three direct audiences: churches, nonprofits, and institutions."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-12">
              Movement leaders do not constitute an audience for our consulting practice. The consulting certainty required to promise &rsquo;safe AI adoption&rsquo; is fundamentally distinct from the exploratory discernment of movement leadership. Mashing them together diminishes both.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 bg-background p-8 md:p-12 rounded-card border border-border">
               <div>
                  <h3 className="font-serif-display text-2xl italic mb-6 text-foreground">How an audience layer works</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Buys engagements</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Answers to a board or elder body</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Walks the Sequence</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Carries the work forward by example</li>
                  </ul>
               </div>
               <div>
                  <h3 className="font-serif-display text-2xl italic mb-6 text-foreground">How an ecosystem layer works</h3>
                  <ul className="space-y-4 text-[0.98rem] text-muted-foreground">
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Reads and criticizes the work in public</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Translates the work to their network</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Lends judgment to edges we cannot see</li>
                    <li className="flex items-start"><span className="text-primary mr-3 mt-1 font-bold">•</span>Calls us when we misname a theological risk</li>
                  </ul>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="fit">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Who reads this page well"
              display={<>Three signs this work fits the <em dangerouslySetInnerHTML={{__html: 'shape of your practice'}} />.</>}
              lede="Practitioner fit, not application criteria. There is nothing to apply to."
            />
            
            <ol className="list-decimal pl-5 space-y-6 max-w-3xl text-foreground font-medium text-lg marker:text-ink-soft">
               <li className="pl-4">
                 <strong className="block text-foreground mb-1">Your name carries weight in a specific discourse.</strong>
                 <span className="font-normal text-muted-foreground text-base leading-relaxed">Not because of platform algorithms, but because of sustained contribution to a defined theological or missiological conversation.</span>
               </li>
               <li className="pl-4">
                 <strong className="block text-foreground mb-1">Your judgment is cited by others.</strong>
                 <span className="font-normal text-muted-foreground text-base leading-relaxed">Other leaders look to your framing of cultural or technological shifts before setting their own course.</span>
               </li>
               <li className="pl-4">
                 <strong className="block text-foreground mb-1">You are not looking for a consulting roster.</strong>
                 <span className="font-normal text-muted-foreground text-base leading-relaxed">You are interested in shaping the architecture of how faith organizations adopt technology, not acting as a sales agent.</span>
               </li>
            </ol>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="voices">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Movement Voices"
              display={<>Where these names are <em dangerouslySetInnerHTML={{__html: 'visible'}} />.</>}
              lede="Our named ecosystem lives on the Movement Voices page."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-10">
              There is no open roster and no form to nominate someone. The list is curated slowly and deliberately by the Movemental founders. It is an editable list—voices are added as the conversation expands and changes shape.
            </p>
            
            <Link href="/voices" className="btn-pill btn-pill--ghost">See the trusted voices</Link>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="boundary">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="What this page is not"
              display={<>The line, <em dangerouslySetInnerHTML={{__html: 'on the page'}} />.</>}
              lede="We define this clearly because mission drift happens at the boundaries."
            />
            
            <aside className="border border-border-soft bg-card p-8 rounded-card max-w-3xl relative overflow-hidden">
               <span className="text-xs font-semibold uppercase tracking-eyebrow text-ink-soft mb-4 block relative z-10">Editorial note</span>
               <div className="prose max-w-none text-muted-foreground text-[0.98rem] leading-relaxed relative z-10 flex flex-col gap-4">
                  <p><strong>Movement leaders do not buy from Movemental.</strong> We do not offer special pricing, certification programs, or &quot;movement-level&quot; product tiers.</p>
                  
                  <p>If we build surfaces for this group in the future, they will be editorial surfaces (roundtables, anthologies, structured critiques) — not consulting products.</p>
                  
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border-soft">
                     <Link href="/voices" className="text-primary font-medium hover:underline inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Movement Voices page</Link>
                     <Link href="/who-we-serve" className="text-primary font-medium hover:underline inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span> Who we serve</Link>
                  </div>
               </div>
            </aside>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <span className="section-eyebrow text-inverse-foreground/80 flex justify-center items-center gap-2 mb-6">
              If you came here to talk to us
            </span>
            <h2 className="display mb-8">
              Talk to us as practitioners, <em dangerouslySetInnerHTML={{__html: 'not as candidates'}} />.
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Movemental is an organization in motion. If you want to critique the architecture, read early drafts, or push back on a premise, use the same contact door everyone else uses. We read everything. There is no separate track.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-pill btn-pill--primary">Start a conversation</Link>
              <Link href="/field-guides" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Read the field guide</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
