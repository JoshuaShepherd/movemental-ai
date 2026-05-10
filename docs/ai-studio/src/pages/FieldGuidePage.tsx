import React, { useEffect } from 'react';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { Link } from 'react-router-dom';

export function FieldGuidePage() {
  useEffect(() => {
    document.title = "The AI Stewardship Sequence | Movemental";
  }, []);

  return (
    <div className="field-guide-page bg-background text-foreground">
      <section className="pt-24 lg:pt-32 pb-16 border-b border-border">
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-[1fr_20rem] gap-12 fg-hero">
               <div>
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">A field guide for organizational leaders</span>
                  <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
                     The <em dangerouslySetInnerHTML={{__html: 'AI Stewardship Sequence.'}} />
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-12">
                     A four-stage architecture—Safety, Sandbox, Skills, Solutions—designed specifically to help mission-driven organizations adopt AI without fracturing relational trust or compromising theological and ethical integrity.
                  </p>
                  
                  <nav className="fg-toc flex flex-col sm:flex-row gap-6 text-sm font-medium border-t border-b border-border py-4 mb-8">
                     <a href="#stage-safety" className="hover:text-primary transition-colors flex items-center gap-2">
                        <span className="text-muted-foreground">01</span> Safety
                     </a>
                     <a href="#stage-sandbox" className="hover:text-primary transition-colors flex items-center gap-2">
                        <span className="text-muted-foreground">02</span> Sandbox
                     </a>
                     <a href="#stage-skills" className="hover:text-primary transition-colors flex items-center gap-2">
                        <span className="text-muted-foreground">03</span> Skills
                     </a>
                     <a href="#stage-solutions" className="hover:text-primary transition-colors flex items-center gap-2">
                        <span className="text-muted-foreground">04</span> Solutions
                     </a>
                     <a href="#order" className="hover:text-primary transition-colors ml-auto border-l pl-6 border-border hidden md:block">
                        A note on order
                     </a>
                  </nav>
               </div>
               
               <div className="hidden lg:block">
                  <div className="aspect-[3/4] bg-section border border-border shadow-md rounded-xl flex items-center justify-center p-8 text-center relative overflow-hidden">
                     {/* Placeholder cover figure (TODO artwork) */}
                     <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                     <p className="text-muted-foreground text-sm uppercase tracking-widest font-semibold font-serif-display italic relative z-10">[ Artwork Placeholder ]</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4 hero-proof">
                     <span className="uppercase tracking-widest font-semibold">Reading time</span>
                     <span>Fifteen minutes</span>
                  </div>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 border-b border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-[20rem_1fr] gap-12 lg:gap-24 split-row">
               <aside className="border-t-[3px] border-primary pt-4 md:border-none md:pt-0">
                  <h2 className="text-2xl font-serif-display italic text-foreground mb-4">
                     A path through this moment that <em dangerouslySetInnerHTML={{__html: 'holds the mission together.'}} />
                  </h2>
               </aside>
               <div className="prose prose-neutral max-w-none text-muted-foreground text-[1.125rem] leading-[1.8]">
                  <p className="mb-6">
                     You are leading an organization where the principal asset is not software, but trust. The people you serve—congregants, donors, students, beneficiaries—do not remain with you because of your operational efficiency. They remain because of relational equity and missional integrity.
                  </p>
                  <p>
                     Most AI advice assumes that rapid scaling is the only imperative. But if adopting a new tool breaks the relational fabric of your organization, the tool has failed, regardless of the hours it saved. This guide offers a slower, more durable path.
                  </p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="stage-safety" className="band-section py-24 border-b border-border bg-section">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-[20rem_1fr] gap-12 lg:gap-24">
               <aside>
                  <div className="sticky top-24 border-t border-border pt-6 mt-2">
                     <span className="text-5xl font-serif-display font-medium text-foreground block mb-4">01</span>
                     <h3 className="text-xl font-medium mb-6">Safety</h3>
                     <div className="space-y-4 text-sm">
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Primary Roles</strong>
                           <p className="text-muted-foreground">Executive team, board, risk management.</p>
                        </div>
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Outputs</strong>
                           <p className="text-muted-foreground">Acceptable Use Policy, Data Boundary Map, Theological Rubric.</p>
                        </div>
                     </div>
                  </div>
               </aside>
               
               <div className="prose prose-neutral max-w-none text-muted-foreground text-[1.0625rem] leading-[1.8]">
                  <p className="mb-6 text-foreground font-medium text-xl">
                     Safety is the architectural layer that makes subsequent experimentation possible without risking the mission.
                  </p>
                  <p className="mb-6">
                     Before teaching your staff how to prompt engineering, you must draw red lines. What data is strictly isolated? Where does human oversight remain mandatory? What decisions can an algorithm never make?
                  </p>
                  
                  <div className="pl-6 border-l-2 border-primary my-8 italic">
                     <p className="mb-2"><em>Does this model train on our private inputs?</em></p>
                     <p className="mb-2"><em>Are we submitting pastoral care notes to a public LLM?</em></p>
                     <p><em>How does automated communication affect our theological view of human presence?</em></p>
                  </div>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">Contextual Application</h4>
                  <p className="mb-6">
                     For a <strong>Church</strong>, safety means distinguishing between using AI to coordinate volunteer schedules and strictly prohibiting AI from drafting pastoral care responses. For a <strong>Nonprofit</strong>, safety ensures donor profiles remain walled off from third-party model training. For an <strong>Institution</strong>, safety establishes clear syllabus expectations regarding academic integrity.
                  </p>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">The Non-Negotiable Rules</h4>
                  <ul className="mb-8 pl-5 list-none space-y-3">
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> No PII (Personally Identifiable Information) enters non-enterprise public models.</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> A human remains in the loop for all external-facing communication.</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> The organization transparently discloses where AI shapes its core outputs.</li>
                  </ul>
                  
                  <p className="bg-card p-6 rounded-lg border border-border shadow-sm text-sm">
                     <strong>If you skip Safety:</strong> Staff will use consumer tools anyway (shadow IT), creating massive data leaks and risking devastating fractures in community trust when discovered.
                  </p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="stage-sandbox" className="py-24 border-b border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-[20rem_1fr] gap-12 lg:gap-24">
               <aside>
                  <div className="sticky top-24 border-t border-border pt-6 mt-2">
                     <span className="text-5xl font-serif-display font-medium text-foreground block mb-4">02</span>
                     <h3 className="text-xl font-medium mb-6">Sandbox</h3>
                     <div className="space-y-4 text-sm">
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Primary Roles</strong>
                           <p className="text-muted-foreground">Department leads, operations, communications.</p>
                        </div>
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Outputs</strong>
                           <p className="text-muted-foreground">Vetted software list, mapped workflows, baseline fluency.</p>
                        </div>
                     </div>
                  </div>
               </aside>
               
               <div className="prose prose-neutral max-w-none text-muted-foreground text-[1.0625rem] leading-[1.8]">
                  <p className="mb-6 text-foreground font-medium text-xl">
                     A sandbox is not a live deployment. It is an isolated, secure environment where tools can be pressure-tested without live impact.
                  </p>
                  <p className="mb-6">
                     You cannot buy a centralized AI solution effectively if your leaders do not yet understand what AI is actually capable of. The Sandbox Phase is a dedicated season — typically 4 to 8 weeks — where a cross-functional team is given secure, enterprise-grade access and asked to intentionally try to break workflows.
                  </p>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">Pilot vs. Sandbox</h4>
                  <p className="mb-6">
                     A pilot implies an impending rollout. A sandbox implies experimentation where the expected outcome might be &quot;we shouldn&apos;t use this tool at all.&quot; Sandboxes lower the stakes, allowing staff to evaluate vendor claims aggressively rather than passively accepting them.
                  </p>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">The Sandbox Season Goals</h4>
                  <ul className="mb-8 pl-5 list-none space-y-3">
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Test specific narrative or data tasks against multiple models (Claude, ChatGPT, etc) to observe variations in flattened language.</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Map the exact operational friction points that cost your heavy-lifters the most time.</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Discover where the AI hallucinates regarding your specific organizational vocabulary.</li>
                  </ul>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="stage-skills" className="band-section py-24 border-b border-border bg-section">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-[20rem_1fr] gap-12 lg:gap-24">
               <aside>
                  <div className="sticky top-24 border-t border-border pt-6 mt-2">
                     <span className="text-5xl font-serif-display font-medium text-foreground block mb-4">03</span>
                     <h3 className="text-xl font-medium mb-6">Skills</h3>
                     <div className="space-y-4 text-sm">
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Primary Roles</strong>
                           <p className="text-muted-foreground">All operational and creative staff.</p>
                        </div>
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Outputs</strong>
                           <p className="text-muted-foreground">Prompt libraries, discernment frameworks, organizational capacity.</p>
                        </div>
                     </div>
                  </div>
               </aside>
               
               <div className="prose prose-neutral max-w-none text-muted-foreground text-[1.0625rem] leading-[1.8]">
                  <p className="mb-6 text-foreground font-medium text-xl">
                     Software training teaches you which buttons to press. Skill formation teaches you what the buttons actually mean.
                  </p>
                  <p className="mb-6">
                     We strongly differentiate between training and formation. Training assumes the tool is neutral. Formation assumes the tool will shape your staff&apos;s mindset over time, so the staff must be equipped to push back. The Skills stage equips your team to view AI not as an oracle providing truth, but as an intern requiring editing, oversight, and direction.
                  </p>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">Forming Judgments</h4>
                  <p className="mb-6">
                     The core skill is discernment: knowing when a task is too relationally intimate, too theologically complex, or too contextually nuanced to delegate to statistics. Staff must learn to detect &quot;flattened&quot; language—the generically agreeable but vacuous tone characteristic of unedited AI output.
                  </p>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">Organizational Shapes</h4>
                  <p className="mb-6">
                     As skills develop, the very structure of your teams might shift.
                  </p>
                  <ul className="mb-8 pl-5 list-none space-y-3">
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Writers become editors, orchestrating drafts and protecting voice.</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Administrators become analysts, guiding data synthesis rather than typing it.</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Pastors and care workers clarify their unique human mandate against automated efficiencies.</li>
                  </ul>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="stage-solutions" className="py-24 border-b border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-[20rem_1fr] gap-12 lg:gap-24">
               <aside>
                  <div className="sticky top-24 border-t border-border pt-6 mt-2">
                     <span className="text-5xl font-serif-display font-medium text-foreground block mb-4">04</span>
                     <h3 className="text-xl font-medium mb-6">Solutions</h3>
                     <div className="space-y-4 text-sm">
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Primary Roles</strong>
                           <p className="text-muted-foreground">IT, leadership, engineering partners.</p>
                        </div>
                        <div>
                           <strong className="block text-foreground mb-1 uppercase tracking-wider text-xs">Outputs</strong>
                           <p className="text-muted-foreground">Architectural deployment, custom agents, integrated workflows.</p>
                        </div>
                     </div>
                  </div>
               </aside>
               
               <div className="prose prose-neutral max-w-none text-muted-foreground text-[1.0625rem] leading-[1.8]">
                  <p className="mb-6 text-foreground font-medium text-xl">
                     Only once the boundaries are secure, the testing complete, and the human judgment formed do we embed systemic technical solutions.
                  </p>
                  <p className="mb-6">
                     The reason Solutions is the final stage is that an automated workflow deployed without safety causes a breach, and deployed without skills causes quiet disaster. But deployed correctly at stage four, Solutions provide massive, scalable missional traction.
                  </p>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">Named Refusals</h4>
                  <p className="mb-6">
                     A mature organization knows not only what it will build, but what it officially refuses to build. We document &quot;Named Refusals&quot;—explicit boundaries where the organization formally rejects a technological capability (e.g., &quot;We will never deploy an AI chatbot to handle first-touch crisis care&quot;).
                  </p>
                  
                  <h4 className="text-foreground font-medium mt-8 mb-4">Integration Reality</h4>
                  <ul className="mb-8 pl-5 list-none space-y-3">
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Connecting local context (your previous sermons, grants, curriculum) securely to enterprise models (RAG).</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Deploying automated qualitative analysis over vast amounts of survey or community feedback data.</li>
                     <li className="flex"><span className="text-primary font-bold mr-3">•</span> Standardizing tooling across the organization to eliminate the fragmentation of shadow IT.</li>
                  </ul>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="order" className="band-default py-24">
        <Container>
          <Reveal>
             <div className="max-w-4xl mx-auto">
                <span className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 block">A note on order</span>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-6">
                   Why the order is <em dangerouslySetInnerHTML={{__html: 'load-bearing.'}} />
                </h2>
                <p className="text-xl text-muted-foreground mb-12">
                   The Sequence is structural, not a buffet. You cannot pick and choose the timing.
                </p>
                
                <div className="flex flex-col md:flex-row gap-12">
                   <div className="md:w-1/3">
                      <div className="bg-card p-6 border-l-4 border-primary rounded-r-lg shadow-sm text-sm italic text-foreground">
                         If you remember nothing else, remember that Safety must precede Solutions, and Sandbox must precede Skills.
                      </div>
                   </div>
                   
                   <div className="md:w-2/3 prose prose-neutral text-muted-foreground text-[1.0625rem]">
                      <p className="mb-8">
                         When leaders feel urgency, they attempt to run all four stages in parallel. They mandate acceptable use policies on Monday while signing enterprise software contracts on Tuesday. This collapses the very foundation they are trying to build.
                      </p>
                      
                      <blockquote className="pull-quote pl-6 border-l-2 border-border italic text-xl text-foreground font-serif-display my-8 mb-4">
                         &quot;Technology scales whatever it is handed. If you hand it organizational ambiguity, it will scale chaos. If you hand it theological clarity, it will scale mission.&quot;
                      </blockquote>
                      <cite className="block text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-8 pl-6">— Movemental, the field guide</cite>
                      
                      <p className="mb-6">
                         The speed of the Sequence depends entirely on the size of the organization. A church of 200 can run the Sequence in three weeks. A global NGO will take eight months. But the order applies uniformly to both.
                      </p>
                      <p>
                         Do not rush the foundation. The peace that comes from knowing your data is secure and your staff is aligned is worth the momentary delay of rapid tool adoption.
                      </p>
                   </div>
                </div>
             </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center py-24 border-t border-border">
        <Container width="narrow">
          <Reveal>
            <span className="section-eyebrow">If this resonates</span>
            <h2 className="display mb-8">
              We would like to <em dangerouslySetInnerHTML={{__html: 'walk this Sequence with you.'}} />
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              The framework works best when guided by practitioners who understand the nuance of missional spaces.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Start a conversation</Link>
              <Link to="/voices" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">See trusted voices</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
