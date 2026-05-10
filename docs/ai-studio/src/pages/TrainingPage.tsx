import React, { useEffect, useState } from 'react';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export function TrainingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Fluency Training | Movemental";
  }, []);

  const curriculum = [
    { num: "01", title: "Wisdom Before Tools", extract: "Frameworks for deciding what AI should and shouldn't do in your work." },
    { num: "02", title: "Voice and Integrity", extract: "Training models on your material without losing your voice." },
    { num: "03", title: "The Recipe Library", extract: "Structured prompting patterns that produce reliable output." },
    { num: "04", title: "Agentic Workflows", extract: "Designing multi-step AI work that delivers real outcomes." },
    { num: "05", title: "Knowledge as Infrastructure", extract: "Treating your organization's knowledge as a queryable layer." },
    { num: "06", title: "Relational Intelligence", extract: "AI patterns for member care, community, and networks." },
    { num: "07", title: "Risk and Repair", extract: "When AI gets it wrong, how to notice, recover, and learn." },
    { num: "08", title: "The Practitioner's Path", extract: "Becoming the person in your org who leads this work." }
  ];

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-16">
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl italic mb-6">
              AI fluency, taught the way it should be.
            </h1>
            <p className="lede text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
              Eight weeks of structured practice on your own material, with people who&apos;ll be doing this work alongside you for years. Available as a facilitated cohort or as a self-paced license for your whole organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact?interest=Fluency%20Cohort" className="btn-pill btn-pill--primary">Start a Cohort</Link>
              <Link to="/contact?interest=Fluency%20Self-Paced" className="btn-pill btn-pill--ghost">License the Curriculum</Link>
            </div>
          </div>
        </Reveal>
      </Container>
      
      <section className="bg-section py-20 border-y border-border">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-card border border-border p-8 md:p-10 rounded-2xl flex flex-col">
                <h3 className="font-serif-display text-3xl italic mb-2 text-foreground">Fluency Cohort</h3>
                <p className="text-muted-foreground mb-6">Eight weeks. Your team becomes the people who can actually do this.</p>
                <div className="font-semibold text-2xl text-primary mb-8">$15,000</div>
                <ul className="space-y-4 text-[1.0625rem] text-muted-foreground mb-8 flex-grow">
                  <li className="flex gap-3 text-foreground"><span className="text-primary">—</span> 8-week facilitated cohort</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Up to 15 seats (more at $1,200 ea)</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Weekly 2-hour live sessions</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Full LMS access + recipes</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Movemental AI Practitioner Certification</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Cohort connection with peer orgs</li>
                </ul>
                <div className="text-sm font-semibold uppercase tracking-widest text-primary/70 border-t border-border pt-4">Best for: Teams ready for intensity</div>
              </div>
              
              <div className="bg-background border border-border p-8 md:p-10 rounded-2xl flex flex-col">
                <h3 className="font-serif-display text-3xl italic mb-2 text-foreground">Fluency Self-Paced</h3>
                <p className="text-muted-foreground mb-6">The same curriculum, on your team&apos;s schedule.</p>
                <div className="font-semibold text-2xl text-primary mb-8">$4,800 <span className="text-muted-foreground text-[1.0625rem] font-normal">/year</span></div>
                <ul className="space-y-4 text-[1.0625rem] text-muted-foreground mb-8 flex-grow">
                  <li className="flex gap-3 text-foreground"><span className="text-primary">—</span> Annual license, self-paced</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Unlimited seats within your org</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Optional cohort kick-off pass ($2,500)</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Full LMS access + recipes</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Self-paced equivalent certification</li>
                  <li className="flex gap-3"><span className="text-primary opacity-50">—</span> Cohort network not included (upgrade available)</li>
                </ul>
                <div className="text-sm font-semibold uppercase tracking-widest text-primary/70 border-t border-border pt-4">Best for: Distributed teams, rolling onboarding</div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif-display text-4xl italic mb-6">The Curriculum</h2>
              <p className="text-xl text-muted-foreground">Eight modules covering the practical, the theological, and the operational reality of AI.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {curriculum.map((mod, i) => (
                <div key={i} className="bg-section/50 border border-border p-6 rounded-2xl flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-widest text-primary/70 mb-4">{mod.num}</span>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{mod.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{mod.extract}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-primary/5 border-y border-primary/10">
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif-display text-4xl italic mb-6">Outcomes you can measure</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="bg-background rounded-full p-1 mt-1 text-primary shadow-sm"><div className="w-2 h-2 rounded-full bg-current"></div></div>
                    <p className="text-[1.0625rem] text-foreground/80 leading-relaxed">Pre/post capability assessments show typical participants moving from beginner to confident-practitioner level on the Movemental capability rubric within 8 weeks.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-background rounded-full p-1 mt-1 text-primary shadow-sm"><div className="w-2 h-2 rounded-full bg-current"></div></div>
                    <p className="text-[1.0625rem] text-foreground/80 leading-relaxed">2 to 4 internal team members per organization complete the Facilitator Track and become certified to extend the work.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-background rounded-full p-1 mt-1 text-primary shadow-sm"><div className="w-2 h-2 rounded-full bg-current"></div></div>
                    <p className="text-[1.0625rem] text-foreground/80 leading-relaxed">Participating teams launch an average of 3 to 6 active AI workflows tied to organizational priorities by week 8.</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-background rounded-full p-1 mt-1 text-primary shadow-sm"><div className="w-2 h-2 rounded-full bg-current"></div></div>
                    <p className="text-[1.0625rem] text-foreground/80 leading-relaxed">Cohort participants connect with peer organizations doing parallel work, creating a working network beyond the program.</p>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-video bg-background border border-border rounded-xl overflow-hidden group cursor-pointer" onClick={() => window.open('https://alanhirsch.com', '_blank')}>
                {/* @TODO replace with real video or modal */}
                <div className="absolute inset-0 bg-muted/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-primary/90 text-primary-foreground p-4 rounded-full flex gap-3 items-center group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg border border-border">
                    <p className="font-medium text-foreground">See a live cohort lesson</p>
                    <p className="text-sm text-muted-foreground">Tour the LMS</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-sm text-muted-foreground text-center italic">Standard pricing. Custom and white-label arrangements available for institutional partners.</div>
          </Reveal>
        </Container>
      </section>

      <Container className="py-20 md:py-32 text-center max-w-2xl mx-auto">
        <Reveal>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <Link to="/contact?interest=Fluency%20Cohort" className="btn-pill btn-pill--primary">Start a Cohort conversation</Link>
            <Link to="/contact?interest=Fluency%20Self-Paced" className="btn-pill btn-pill--ghost">License the curriculum</Link>
          </div>
          <button onClick={() => window.alert('PDF download logic would be hooked up here')} className="text-sm text-primary hover:underline underline-offset-4 mt-4 inline-block">Download the syllabus (PDF)</button>
        </Reveal>
      </Container>
    </div>
  );
}
