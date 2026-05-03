import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

import { SafetyContent } from '@/components/path/stages/SafetyContent';
import { SandboxContent } from '@/components/path/stages/SandboxContent';
import { SkillsContent } from '@/components/path/stages/SkillsContent';
import { SolutionsContent } from '@/components/path/stages/SolutionsContent';

interface SegmentPathwayProps {
  audience: 'churches' | 'nonprofits' | 'institutions';
}

const commonDeliverables = {
  safety: [
    "AI Use & Trust Charter",
    "Roles & Decision Rights",
    "Data Hygiene Audit",
    "AI Risk Register",
    "Acceptable Use Policy"
  ],
  sandbox: [
    "Facilitated discovery sprints",
    "Private sandbox environment",
    "Use Case Discovery Framework",
    "Use Case Scoring Rubric",
    "Use Case Portfolio"
  ],
  skills: [
    "The Movemental AI Wisdom course",
    "Up to 15 participant seats",
    "LMS-hosted recipe library",
    "Facilitator Track",
    "Pre/post capability assessments"
  ],
  solutions: [
    "Integration: Ingest intelligence",
    "Activation: Native AI workflows",
    "Transformation: Adaptive training",
    "Multiplication: Strategic linking"
  ]
};

const segmentData = {
  churches: {
    heroTitle: "The Pathway, tailored for Churches",
    paragraphs: [
      "Churches face an AI question their tradition didn't anticipate. The technology is here, the staff has questions, the congregation has opinions, and the elder board needs a position. We help you start where it matters: a charter your leadership can sign, a sandbox where staff can experiment without theological or pastoral risk, eight weeks of formation in AI wisdom for the people who'll lead this for years, and — when you're ready — a digital infrastructure rebuild that integrates your sermon archive, your member care, your formation pathways, and your communications into one coherent intelligence layer.",
      "Most churches we work with begin at Safety Documentation because the governance question is loudest. Some begin at Sandbox Discovery because the staff is already experimenting and needs a structured environment. The Pathway works either way."
    ],
    stops: [
      { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'A charter your elder board can sign.', deliverables: commonDeliverables.safety, href: '/pathway/foundations' },
      { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Pastoral and operational use cases proven safe.', deliverables: commonDeliverables.sandbox, href: '/pathway/lab' },
      { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'Staff trained to lead AI work without losing the plot.', deliverables: commonDeliverables.skills, href: '/training' },
      { num: '04', name: 'Solutions Deployment', duration: '8-12 weeks', price: 'from $30K', outcome: 'Sermons, formation, member care, and communications, integrated.', deliverables: commonDeliverables.solutions, href: '/technology' }
    ],
    faqs: [
      { q: "Will this conflict with our theology around discernment, presence, and pastoral care?", a: "No. The Pathway is designed precisely so AI serves pastoral work rather than replacing it. Foundations specifically codifies where AI must not go." },
      { q: "What if our staff isn't technical?", a: "Most aren't. The Pathway assumes that. Fluency is built for non-technical staff to become competent — not engineers, leaders." },
      { q: "Do we have to do all four stages?", a: "No. Most begin at Foundations or Lab. Many continue. None are forced." }
    ]
  },
  nonprofits: {
    heroTitle: "The Pathway, tailored for Nonprofits",
    paragraphs: [
      "Mission-driven nonprofits face a sharper version of the AI question because the stakes of getting it wrong are personal. Donor data is sacred. Beneficiary data is sacred. Theological or organizational integrity, where it applies, is non-negotiable. We help you start with governance that respects that, move into a Lab where your team can identify the specific use cases that serve your mission rather than warp it, build the AI fluency your staff needs to lead the work themselves, and — when the foundation is ready — integrate the digital infrastructure that lets your mission compound rather than dilute.",
      "Most nonprofits we work with begin at Safety Documentation because boards want clarity before staff experiments. Some begin at Sandbox Discovery because the executive director is already piloting and needs a structured way to evaluate."
    ],
    stops: [
      { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'Donor and beneficiary data, governed and protected.', deliverables: commonDeliverables.safety, href: '/pathway/foundations' },
      { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Mission-aligned use cases, validated.', deliverables: commonDeliverables.sandbox, href: '/pathway/lab' },
      { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'A team that can lead AI work without compromising the mission.', deliverables: commonDeliverables.skills, href: '/training' },
      { num: '04', name: 'Solutions Deployment', duration: '8-12 weeks', price: 'from $30K', outcome: 'Programs, donors, communications, integrated and multiplied.', deliverables: commonDeliverables.solutions, href: '/technology' }
    ],
    faqs: [
      { q: "How do you protect beneficiary and donor data?", a: "The Lab sandbox is privacy-protected and publishing-prevented by design. Foundations codifies the data handling standards before anything touches a model." },
      { q: "Can we afford this?", a: "The full Pathway is $65,000. A single comparable engagement at a Big Four consultancy starts at $250,000 and doesn't include the platform." },
      { q: "What if we're already using ChatGPT informally?", a: "That's exactly when Foundations matters most. Informal use without a charter is the most common path to a problem." }
    ]
  },
  institutions: {
    heroTitle: "The Pathway, tailored for Institutions",
    paragraphs: [
      "Seminaries, training networks, and denominational bodies face the AI question on two timelines simultaneously: their own institutional adoption, and what they teach the next generation of leaders about AI. We help you address both — governance for your institution, a Lab that doubles as a learning artifact for your students or member organizations, AI fluency formation that you can extend to your network, and a Build engagement that integrates your training material, your member-org relationships, and your scholarly output into a multiplied intelligence layer.",
      "Institutions typically benefit most from the full Pathway, because the same architecture you adopt internally becomes the architecture you can teach. Many of our institutional clients also become referral partners for the churches and nonprofits in their network."
    ],
    stops: [
      { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'Institutional charter and a teachable governance framework.', deliverables: commonDeliverables.safety, href: '/pathway/foundations' },
      { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Use cases proven, plus a living teaching artifact.', deliverables: commonDeliverables.sandbox, href: '/pathway/lab' },
      { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'Your staff and your students learning the same wisdom.', deliverables: commonDeliverables.skills, href: '/training' },
      { num: '04', name: 'Solutions Deployment', duration: '8-12 weeks', price: 'from $30K', outcome: 'Curriculum, network, and scholarship, integrated as infrastructure.', deliverables: commonDeliverables.solutions, href: '/technology' }
    ],
    faqs: [
      { q: "Can we white-label or extend this to the organizations we serve?", a: "Yes. Many of our institutional engagements include extension rights or referral structures." },
      { q: "Does this work for accredited programs?", a: "Yes. Fluency includes assessment, certification, and credentialing structures compatible with accredited learning environments." },
      { q: "What does the Build phase look like for a multi-entity institution?", a: "Multi-entity Build engagements are quoted custom under our Network Engagements structure, typically starting at $60,000 and scaling by scope." }
    ]
  }
};

export function SegmentPathway({ audience }: SegmentPathwayProps) {
  const data = segmentData[audience];

  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !meterRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const sections = containerRef.current.querySelectorAll('.stage-panel');
      sections.forEach((section, index) => {
        const secRect = section.getBoundingClientRect();
        if (secRect.top <= viewportHeight * 0.5 && secRect.bottom >= viewportHeight * 0.5) {
          setActiveStage(index);
        }
      });

      const totalHeight = Math.max(1, rect.height - viewportHeight);
      const currentScroll = Math.max(0, -rect.top);
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      
      meterRef.current.style.height = `${progress}%`;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);
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

  const StageComponents = [SafetyContent, SandboxContent, SkillsContent, SolutionsContent];

  return (
    <>
      <section className="band-default pt-24 pb-12 md:pt-32 border-b border-border">
        <Container>
          <Reveal>
            <h1 className="font-serif-display italic text-4xl md:text-5xl lg:text-6xl mb-8 max-w-4xl text-foreground">
              {data.heroTitle}
            </h1>
            <div className="space-y-6 text-lg md:text-xl text-foreground/80 max-w-4xl leading-relaxed mb-12">
              {data.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="text-sm text-muted-foreground italic mb-16 max-w-4xl">
              Most organizations enter at Foundations or Lab. The order matters; the entry point depends on where you already are.
            </div>

            {/* Deliverables Above the Fold */}
            <div className="mt-12 bg-section border border-border rounded-2xl p-8 md:p-10 mb-8 max-w-6xl mx-auto">
               <h3 className="font-serif-display text-2xl italic mb-8">What are the outcomes?</h3>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {data.stops.map((stop, i) => (
                   <div key={i} className="flex flex-col h-full">
                     <div className="text-xs uppercase tracking-widest font-semibold text-primary mb-2">Stage {stop.num}</div>
                     <h4 className="font-medium text-foreground mb-4">{stop.name}</h4>
                     
                     <div className="flex gap-2 flex-wrap text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                       <span className="bg-background px-2 py-1 rounded">{stop.duration}</span>
                       <span className="bg-background px-2 py-1 rounded">{stop.price}</span>
                     </div>
                     
                     <div className="text-sm text-foreground mb-6 font-medium leading-relaxed flex-grow">
                       {stop.outcome}
                     </div>

                     <div className="mb-6">
                       <h5 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-3">Key Deliverables</h5>
                       <ul className="space-y-2">
                         {stop.deliverables.map((item, j) => (
                           <li key={j} className="text-xs text-foreground/80 flex items-start">
                             <span className="text-primary mr-2 mt-0.5" aria-hidden="true">—</span>
                             <span className="leading-tight">{item}</span>
                           </li>
                         ))}
                       </ul>
                     </div>

                     {stop.href && (
                        <Link to={stop.href} className="text-primary text-sm font-semibold hover:opacity-80 transition-opacity inline-flex items-center mt-auto">
                          View details <ArrowUpRight className="ml-1 w-3 h-3" />
                        </Link>
                     )}
                   </div>
                 ))}
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CORE LEFT/RIGHT STRUCTURE - RESTORED TO STORY COMPONENTS */}
      <section className="band-section bg-background border-b border-border" id="pathway-details">
        <div className="max-w-[1200px] px-4 sm:px-6 lg:px-12 mx-auto w-full" ref={containerRef}>
          <div className="grid grid-cols-1 min-[960px]:grid-cols-[33%_1fr] gap-10 min-[960px]:gap-12 lg:gap-16">
            
            {/* LEFT SIDE: Sticky Rail */}
            <div className="hidden min-[960px]:block h-full relative" aria-label="Path stages">
              <div className="sticky top-32 bg-section border border-border rounded-card p-8 flex gap-8">
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
                          aria-label={`Jump to stage ${data.stops[i].num}`}
                        />
                      ))}
                    </div>
                 </div>

                 {/* Step Card info */}
                 <div className="flex flex-col justify-center relative z-10 w-full">
                    <div className="flex gap-1 mb-6">
                      {[0, 1, 2, 3].map(dot => (
                        <div key={dot} className={cn("w-1.5 h-1.5 rounded-full transition-colors duration-300", dot === activeStage ? "bg-primary" : "bg-border")} />
                      ))}
                    </div>
                    <div className="text-xs uppercase tracking-widest font-semibold text-foreground/50 mb-2 transition-all">Stage {data.stops[activeStage].num} of 04</div>
                    <h3 className="text-3xl font-serif-display italic mb-6 transition-all">{data.stops[activeStage].name}</h3>
                    
                    <div key={activeStage} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <p className="text-[1.0625rem] leading-relaxed text-foreground font-medium mb-6">{data.stops[activeStage].outcome}</p>
                      
                      {data.stops[activeStage].href && (
                        <Link to={data.stops[activeStage].href!} className="text-primary text-sm font-bold uppercase tracking-wider inline-flex items-center hover:opacity-80 transition-opacity">
                          View details <ArrowUpRight className="ml-1 w-4 h-4" />
                        </Link>
                      )}
                    </div>
                 </div>
              </div>
            </div>

            {/* RIGHT SIDE: Scrollable Story Panels */}
            <div className="flex flex-col">
               {data.stops.map((stop, i) => {
                 const Content = StageComponents[i];
                 return (
                   <article key={i} className="stage-panel min-h-[70vh] border-b border-border py-16 lg:py-24 last:border-b-0 last:min-h-[50vh]">
                      <div className="flex items-center gap-4 mb-10 md:hidden">
                         <span className="text-sm uppercase tracking-widest font-semibold text-foreground/60">
                            Stage {stop.num} of 04 <span className="mx-2 text-border">/</span> <em className="text-foreground shrink-0">{stop.name}</em>
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

      <section className="band-section bg-section py-20 md:py-32">
         <Container>
            <Reveal>
              <h2 className="font-serif-display text-3xl md:text-4xl italic mb-12 text-foreground">
                Questions from {audience}
              </h2>
              <div className="max-w-4xl space-y-8">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="bg-card border border-border p-8 rounded-2xl">
                    <h3 className="font-medium text-lg md:text-xl text-foreground mb-4">{faq.q}</h3>
                    <p className="text-muted-foreground leading-relaxed text-[1.0625rem]">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              {audience === 'institutions' && (
                <div className="mt-12 bg-primary/5 border border-primary/20 p-8 rounded-2xl max-w-4xl">
                  <h3 className="font-semibold text-xl text-foreground mb-3">Network Engagements</h3>
                  <p className="text-primary/90 leading-relaxed text-[1.0625rem] mb-6">
                    For denominations, training networks, and multi-site organizations, Build extends across entities — shared governance, linked platforms, federated intelligence. These engagements are quoted per conversation. Most start at $60,000 and scale with scope.
                  </p>
                  <a href="/contact" className="btn-pill btn-pill--primary inline-flex text-sm">Talk about a Network Engagement</a>
                </div>
              )}
            </Reveal>
         </Container>
      </section>
    </>
  );
}
