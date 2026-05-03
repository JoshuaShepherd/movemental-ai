import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { Container } from '@/components/Container';

export function PathClosingCta() {
  return (
    <section className="band-midnight relative overflow-hidden" aria-labelledby="closing-cta-title" id="closing-cta">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--inverse-surface)_0%,_#000_100%)] opacity-80 pointer-events-none" />
      <Container className="relative z-10 text-center">
        <Reveal>
          <span className="section-eyebrow text-inverse-foreground/80 flex justify-center items-center gap-2 mb-8">
            The path
          </span>
          
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mb-12 text-sm md:text-base uppercase tracking-widest font-semibold text-inverse-foreground/60" aria-label="The four stages">
             <span>01 Safety</span>
             <span className="text-inverse-border font-light">|</span>
             <span>02 Sandbox</span>
             <span className="text-inverse-border font-light">|</span>
             <span>03 Skills</span>
             <span className="text-inverse-border font-light">|</span>
             <span>04 Solutions</span>
          </div>
          
          <h2 id="closing-cta-title" className="display mb-8 max-w-4xl mx-auto">
             The path is consistent. The work <em>becomes specific.</em>
          </h2>
          <p className="lede text-inverse-foreground/80 mx-auto mb-16 max-w-3xl">
             Every organization moves through the same basic sequence. The difference appears in the details: the risks you carry, the people you train, the use cases you approve, and the systems you decide to build.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Start a Conversation</Link>
            <Link to="/path" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Explore the Full Path</Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
