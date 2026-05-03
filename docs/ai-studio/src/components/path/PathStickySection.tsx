import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { stageMeta } from '@/data/shared-path-data';

import { SafetyContent } from './stages/SafetyContent';
import { SandboxContent } from './stages/SandboxContent';
import { SkillsContent } from './stages/SkillsContent';
import { SolutionsContent } from './stages/SolutionsContent';

export function PathStickySection() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !meterRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate active stage based on scroll
      const sections = containerRef.current.querySelectorAll('.stage-panel');
      sections.forEach((section, index) => {
        const secRect = section.getBoundingClientRect();
        // If the top of the section is somewhat in the middle of the screen
        if (secRect.top <= viewportHeight * 0.5 && secRect.bottom >= viewportHeight * 0.5) {
          setActiveStage(index);
        }
      });

      // Calculate progress for the meter
      const totalHeight = Math.max(1, rect.height - viewportHeight);
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      
      meterRef.current.style.height = `${progress}%`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJump = (index: number) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = document.querySelectorAll('.stage-panel');
    if (sections[index]) {
      sections[index].scrollIntoView({ 
        block: 'start', 
        behavior: prefersReducedMotion ? 'auto' : 'smooth' 
      });
    }
  };

  const StageComponent = [SafetyContent, SandboxContent, SkillsContent, SolutionsContent];

  return (
    <section className="band-section" id="path" aria-labelledby="path-section-title">
      <h2 id="path-section-title" className="sr-only">The four stages of the Movemental AI Path</h2>
      <div className="max-w-[1200px] px-4 sm:px-6 lg:px-12 mx-auto w-full" ref={containerRef}>
        <div className="grid grid-cols-1 min-[960px]:grid-cols-[33%_1fr] gap-10 min-[960px]:gap-12 lg:gap-16">
          
          {/* PathRail (left, sticky) */}
          <div className="hidden min-[960px]:block h-full relative" aria-label="Path stages">
            <div className="sticky top-32 bg-section border border-border rounded-card p-8 flex gap-8">
               {/* Radial overlay mock */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none rounded-card" />
               
               {/* PathMeter */}
               <div className="relative w-1 bg-border rounded-full h-[400px] flex-shrink-0">
                  <div ref={meterRef} className="absolute top-0 left-0 w-full bg-foreground rounded-full transition-all duration-100 ease-linear" style={{ height: '0%' }} />
                  <div className="absolute inset-0 flex flex-col justify-between items-center z-10 py-1">
                    {[0, 1, 2, 3].map(i => (
                      <button 
                        key={i}
                        onClick={() => handleJump(i)}
                        className={cn("w-4 h-4 rounded-full border-2 bg-section transition-colors", activeStage >= i ? "border-foreground" : "border-border hover:border-foreground/40")}
                        aria-label={`Jump to ${stageMeta[i].name}`}
                      />
                    ))}
                  </div>
               </div>
               
               {/* StepCard */}
               <div className="flex flex-col justify-center relative z-10 w-full">
                  <div className="flex gap-1 mb-6">
                    {[0, 1, 2, 3].map(dot => (
                      <div key={dot} className={cn("w-1.5 h-1.5 rounded-full transition-colors duration-300", dot === activeStage ? "bg-primary" : "bg-border")} />
                    ))}
                  </div>
                  <div className="text-xs uppercase tracking-widest font-semibold text-foreground/50 mb-2 transition-all">Stage {stageMeta[activeStage].num} of 04</div>
                  <h3 className="text-3xl font-serif-display italic mb-6 transition-all">{stageMeta[activeStage].name}</h3>
                  
                  <div key={activeStage} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-lg leading-relaxed text-foreground font-medium mb-6">{stageMeta[activeStage].tagline}</p>
                    
                    <a href={`#stage-${stageMeta[activeStage].num}`} className="text-primary text-sm font-bold uppercase tracking-wider inline-flex items-center hover:opacity-80 transition-opacity">
                      Read requirements <ArrowUpRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Panels (right, scrollable) */}
          <div className="flex flex-col">
             {stageMeta.map((stage, i) => {
                const Content = StageComponent[i];
                return (
                  <article key={i} id={`stage-${stage.num}`} className="stage-panel min-h-[90vh] border-b border-border py-16 lg:py-24 last:border-b-0 last:min-h-[70vh]">
                     <div className="flex items-center gap-4 mb-10 md:hidden">
                       <span className="text-sm uppercase tracking-widest font-semibold text-foreground/60">
                          Stage {stage.num} of 04 <span className="mx-2 text-border">/</span> <em className="text-foreground">{stage.name}</em>
                       </span>
                     </div>
                     <Content />
                  </article>
                );
             })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
