import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/Container';
import { caseStudies } from '@/data/path-data';
import { stageMeta } from '@/data/shared-path-data';

export function PathFootnote({ audience }: { audience: 'churches' | 'nonprofits' | 'institutions' }) {
  const label = caseStudies[audience].audienceLabel;
  return (
    <aside className="band-midnight py-12" aria-label="Page wrap-up">
      <Container>
        <div className="flex flex-col md:flex-row gap-12 justify-between border-b border-inverse-border pb-12 mb-8">
           <div className="max-w-sm">
             <div className="font-serif-display text-2xl mb-4">Movemental</div>
             <p className="text-sm text-inverse-foreground/80 leading-relaxed">
               The four-stage AI path for organizations that move at the speed of trust.
             </p>
           </div>
           
           <div className="flex gap-12 md:gap-24">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-6 text-inverse-foreground/60">The Path</h4>
                <ul className="space-y-3 text-sm">
                  {stageMeta.map((s) => (
                    <li key={s.num}><a href={`#stage-${s.num}`} className="hover:text-primary transition-colors">{s.name}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold mb-6 text-inverse-foreground/60">Go further</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link to="/contact" className="hover:text-primary transition-colors">Start a conversation</Link></li>
                  <li><a href="#case-study" className="hover:text-primary transition-colors">Read the case study</a></li>
                  <li><Link to="/path" className="hover:text-primary transition-colors">The full path</Link></li>
                  <li><Link to="/" className="hover:text-primary transition-colors">Movemental.com</Link></li>
                </ul>
              </div>
           </div>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-inverse-foreground/60">
           <div className="font-serif-display italic text-lg">{label}</div>
           <div>© {new Date().getFullYear()} Movemental · The Movemental AI Path</div>
        </div>
      </Container>
    </aside>
  );
}
