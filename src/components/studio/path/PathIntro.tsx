"use client";

import React from 'react';
import { Reveal } from '@/components/studio/Reveal';
import { Container } from '@/components/studio/Container';
import { stageMeta } from '@/data/shared-path-data';

export function PathIntro() {
  return (
    <section className="band-default" aria-labelledby="path-intro-title">
      <Container>
        <Reveal>
          <span className="section-eyebrow">The Movemental AI Path</span>
          <h1 id="path-intro-title" className="display mb-8 max-w-3xl">
            One commitment <em>per stage</em> — before you move on.
          </h1>
          <p className="lede mb-16">
            Most organizations that adopt AI well take the same four steps, in order. Each one protects the next. Scroll to see what has to be true before your organization can move on.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-card overflow-hidden" aria-label="Path overview">
            {stageMeta.map((stage) => (
              <a key={stage.num} href={`#stage-${stage.num}`} className="bg-card p-6 md:p-8 hover:bg-section transition-colors flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset group">
                <h3 className="text-2xl font-serif-display italic mb-3 group-hover:text-primary transition-colors">{stage.name}</h3>
                <p className="text-sm text-foreground/80 mt-auto leading-relaxed">{stage.mapDesc}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
