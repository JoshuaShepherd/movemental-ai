"use client";

import React, { useEffect } from 'react';
import { Container } from '@/components/studio/Container';
import { Reveal } from '@/components/studio/Reveal';
import Link from "next/link";
import { Play, ArrowUpRight } from 'lucide-react';

export function TechnologyPage() {
  useEffect(() => {
    document.title = "Build Technology | Movemental";
  }, []);

  const capabilities = [
    {
      title: "Custom Agentic CMS",
      desc: "A content management system that doesn't just store your material — it understands it, repurposes it, translates it, and deploys it across surfaces. Trained on your voice, governed by your standards."
    },
    {
      title: "Integrated LMS with Cohort Architecture",
      desc: "Course delivery that adapts to who's receiving it. Cohort tools, facilitator dashboards, AI-assisted course creation grounded in your existing material."
    },
    {
      title: "Relational Intelligence (CRM)",
      desc: "Your audience, donors, members, and networks held in a single intelligence layer. Queryable, segmentable, agentic."
    },
    {
      title: "AI Lab",
      desc: "A trained interface to your full body of work. Queries, generation, and exploration grounded in your IP, not the open internet."
    },
    {
      title: "Network Linking",
      desc: "Strategic connection between peer organizations, leaders, and training networks — making each member of the network more credible, not less."
    }
  ];

  const buildPhases = [
    { phase: "Integration", what: "Knowledge ingested, structured, governed", time: "Weeks 1–3" },
    { phase: "Activation", what: "Custom CMS/LMS/CRM built and tuned to your voice", time: "Weeks 3–8" },
    { phase: "Transformation", what: "Informational and relational intelligence converge", time: "Weeks 8–10" },
    { phase: "Multiplication", what: "Network linking with peer organizations activated", time: "Weeks 10–12" }
  ];

  return (
    <div className="pt-24 pb-20 md:pt-32">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-12">
            <h1 className="font-serif-display text-5xl md:text-6xl lg:text-7xl italic mb-6">
              Your fragmented intelligence, integrated.
            </h1>
            <p className="lede text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
              A full agentic platform — content, knowledge, learning, and relationships, in one coherent infrastructure. Built for movements, denominations, networks, and the institutions that train them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link href="/contact?interest=Build" className="btn-pill btn-pill--primary">Book a live walkthrough</Link>
              <a href="https://alanhirsch.com" target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill--ghost">
                See a live build <ArrowUpRight className="w-4 h-4 ml-1 inline" />
              </a>
            </div>
            
            <div className="relative w-full aspect-video bg-muted/20 border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <Play className="w-12 h-12 mb-4 text-primary opacity-50" />
                <span className="text-sm font-medium">Hero Walkthrough Loop</span>
                <span className="text-xs mt-2 px-6 text-center">Cinematic MP4 demonstrating dashboard, workflow, AI lab, CMS.</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
      
      <section className="bg-section py-20 md:py-28 mt-20 border-y border-border">
        <Container>
          <Reveal>
            <h2 className="font-serif-display text-4xl italic mb-12">What we build</h2>
            <div className="space-y-12 max-w-5xl">
              {capabilities.map((cap, i) => (
                <div key={i} className="grid md:grid-cols-2 gap-8 items-center bg-background border border-border rounded-2xl overflow-hidden p-6 md:p-8">
                  <div className="aspect-video bg-muted/20 rounded-xl border border-border flex items-center justify-center text-sm text-muted-foreground relative group cursor-pointer" onClick={() => window.open('https://alanhirsch.com', '_blank')}>
                    Demo Loop: {cap.title}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/50">
                      <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium shadow-sm">See it live</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{cap.title}</h3>
                    <p className="text-[1.0625rem] leading-relaxed text-muted-foreground mb-4">{cap.desc}</p>
                    <button className="text-sm font-semibold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors inline-flex items-center">Watch the walkthrough <Play className="w-3 h-3 ml-1 fill-current" /></button>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="font-serif-display text-4xl italic mb-4">Live builds you can visit.</h2>
              <p className="text-xl text-muted-foreground">These are real, active platforms running on the Movemental stack. Click through and see what's possible.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl">
              <a href="https://alanhirsch.com" target="_blank" rel="noopener noreferrer" className="block group">
                <div className="aspect-[16/10] bg-muted/20 border border-border rounded-xl overflow-hidden mb-6 relative">
                  <div className="absolute inset-x-0 top-0 h-1 bg-primary/20"></div>
                  <div className="absolute right-4 top-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-[0.65rem] font-bold uppercase tracking-wider text-primary border border-border flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-primary relative"><div className="absolute inset-0 bg-primary rounded-full animate-ping"></div></div> Live Build</div>
                  
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    screenshot_alanhirsch.webp
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2 text-foreground group-hover:text-primary transition-colors">alanhirsch.com</h3>
                <p className="text-muted-foreground mb-3">The flagship build. Custom dashboard, full Content Library, AI Lab, integrated Pathways, course delivery, and CMS. Active and in daily use.</p>
                <span className="text-sm font-medium text-primary flex items-center">Visit live <ArrowUpRight className="w-3 h-3 ml-1" /></span>
                <p className="text-xs text-muted-foreground italic mt-2">This is a live, active platform — not a sandbox demo.</p>
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-foreground text-background py-20 px-4 md:px-0 rounded-3xl mx-4 lg:mx-12 overflow-hidden relative">
        <Container>
          <Reveal>
            <div className="max-w-4xl grid md:grid-cols-2 gap-12 items-center mx-auto">
              <div>
                <h2 className="font-serif-display text-4xl italic mb-6">Why this stack</h2>
                <div className="space-y-4 text-[1.0625rem] text-background/80 leading-relaxed">
                  <p>
                    The Movemental stack is built agentic-native. Most "AI-enabled" platforms layer AI on top of legacy CMS, LMS, and CRM systems that were designed before generative models existed. The architectures don't fit. The integrations leak. The promise underdelivers. We started from a different place: build the integrated intelligence layer first, then expose it through the surfaces — content management, learning delivery, relationship management — that your organization actually uses.
                  </p>
                  <p>
                    The result is a platform where your knowledge compounds rather than scatters. Where your content trains your AI rather than competing with it. Where your audience, your members, and your peers are connected through infrastructure that makes each more credible, not less. The same architecture we built for Alan Hirsch, tuned to your work and yours alone.
                  </p>
                </div>
              </div>
              <div className="bg-background/5 border border-background/10 p-8 rounded-2xl">
                <table className="w-full text-sm text-left align-top">
                  <thead>
                    <tr className="border-b border-background/10">
                      <th className="py-3 font-medium text-background/50">Phase</th>
                      <th className="py-3 font-medium text-background/50">What happens</th>
                      <th className="py-3 font-medium text-background/50 text-right">Typical timing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-background/10 text-background/90">
                    {buildPhases.map((b, i) => (
                      <tr key={i}>
                        <td className="py-4 pr-4 font-semibold">{b.phase}</td>
                        <td className="py-4 pr-4">{b.what}</td>
                        <td className="py-4 text-right tabular-nums whitespace-nowrap">{b.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 text-center text-xs text-background/50 italic border-t border-background/10 pt-4">Standard 8-to-12-week build. Network Engagements scale by scope.</div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="bg-card border border-border p-8 md:p-12 rounded-2xl max-w-3xl mx-auto text-center">
              <h2 className="font-serif-display text-3xl italic mb-8">Pricing Transparency</h2>
              <div className="space-y-4 mb-10 text-[1.0625rem]">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-medium">Single-organization Build</span>
                  <span className="font-semibold text-primary">from $30,000</span>
                </div>
                <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center py-3 border-b border-border gap-2">
                  <span className="font-medium text-left">Network Engagements <span className="block text-sm text-muted-foreground font-normal">Denominations, training networks, multi-site orgs</span></span>
                  <span className="font-semibold text-primary whitespace-nowrap">from $60,000<br/><span className="text-xs text-muted-foreground font-normal">Quoted by conversation</span></span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium">Ongoing platform subscription</span>
                  <span className="font-semibold text-primary">$2,000–$8,000/mo</span>
                </div>
              </div>
              <Link href="/contact?interest=Build" className="btn-pill btn-pill--primary inline-flex text-sm">Talk about a Build</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <Container className="pb-20 md:pb-32 text-center max-w-2xl mx-auto">
        <Reveal>
          <Link href="/contact?interest=Walkthrough" className="btn-pill btn-pill--primary text-lg px-8 py-4 mb-4">Book a 30-minute live walkthrough</Link>
          <p className="text-muted-foreground italic">You'll see the actual platform in action. No slides.</p>
        </Reveal>
      </Container>
    </div>
  );
}
