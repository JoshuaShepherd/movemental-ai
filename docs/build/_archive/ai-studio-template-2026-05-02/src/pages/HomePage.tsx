import React from 'react';
import { Reveal } from '@/components/Reveal';
import { Container } from '@/components/Container';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PathwayComponent } from '@/components/PathwayComponent';
import { VOICES } from '@/data/home-data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const homePathwayStops = [
  { num: '01', name: 'Safety Documentation', duration: '2 weeks', price: '$5,000', outcome: 'Your AI policy, drafted and board-ready.', href: '/pathway/foundations' },
  { num: '02', name: 'Sandbox Discovery', duration: '4 weeks', price: '$15,000', outcome: 'Use cases proven, risks documented.', href: '/pathway/lab' },
  { num: '03', name: 'Skills Development', duration: '8 weeks', price: 'from $4,800/yr', outcome: 'Your team trained to lead this work.', href: '/training' },
  { num: '04', name: 'Solutions Deployment', duration: '8–12 weeks', price: 'from $30,000', outcome: 'Your intelligence integrated, activated, multiplied.', href: '/technology' }
];

function HeroFold() {
  return (
    <section className="band-midnight pt-24 pb-20 md:pt-32 md:pb-28" aria-labelledby="hero-h1">
      <Container>
        <Reveal>
          <h1 id="hero-h1" className="font-serif-display italic text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] text-inverse-foreground mb-8 max-w-5xl">
            AI built on a broken organization breaks the organization faster.
          </h1>
          <p className="text-xl md:text-2xl text-inverse-foreground/80 leading-relaxed mb-10 max-w-4xl">
            We rebuild the human layer first — governance, capability, and shared language — then build the technology that compounds rather than corrodes. A four-stop pathway for churches, nonprofits, and the institutions that train them.
          </p>
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Link to="/contact" className="btn-pill bg-inverse-foreground text-inverse-surface hover:bg-inverse-muted font-semibold px-8 py-4 text-base transition-colors">Start with a conversation</Link>
            <a href="#pathway" className="font-medium text-base text-inverse-foreground hover:text-inverse-foreground/80 transition-colors underline-offset-4 hover:underline px-6 py-4">See the Pathway</a>
          </div>
          <p className="text-sm text-inverse-foreground/60 max-w-4xl italic">
            Trusted by Alan Hirsch, Brad Brisco, Hugh Halter, JR Woodward, Dave Ferguson, Roland Smith, Tim Catchim, Liz Rios, and the organizations they lead.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function WhyThisOrderFold() {
  return (
    <section className="band-default bg-background py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="max-w-4xl">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-primary mb-8 border-b border-border pb-4">Why this order, and why we say so</h2>
            <div className="space-y-6 text-[1.125rem] md:text-xl text-foreground/90 leading-relaxed">
              <p>
                When AI lands on top of a fragmented organization — scattered knowledge, unclear decision rights, mixed signals about what's safe to share, and no shared vocabulary for risk — it doesn't help. It accelerates the fragmentation. The organization moves faster, but in more directions. The leaders who said yes to AI start to feel like they invited a problem they don't know how to name.
              </p>
              <p>
                The way out is not slower AI. It's earlier human work. Foundations, Lab, and Fluency are not pre-AI hesitation; they're the work that makes the AI investment compound rather than corrode. Skip them and you'll spend the next two years undoing damage. Do them and Build is the easiest decision your board makes that year.
              </p>
              <p>
                We tell you this up front because most vendors won't. Their incentive is to sell you the chatbot today. Ours is to build something that lasts long enough to be worth what you'll spend on it.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PathwayFold() {
  return (
    <section className="band-section bg-section py-20 md:py-28" id="pathway">
      <Container>
        <Reveal>
          <div className="mb-12">
            <h2 className="font-serif-display text-4xl md:text-5xl italic text-foreground mb-4">The Pathway</h2>
          </div>
          
          <PathwayComponent stops={homePathwayStops} />
          
          <div className="mt-8 flex flex-col md:flex-row items-baseline justify-between gap-4">
            <div className="text-[1.0625rem] text-muted-foreground italic">
              Most organizations enter at Foundations or Lab. The order matters; the entry point depends on where you already are.
            </div>
            <div className="text-sm text-foreground/70 bg-background/50 px-4 py-2 rounded-md">
              Timelines reflect agentic-native delivery. Traditional consultancies quote 3 to 6 times longer for comparable scope.
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function DemoTeaserFold() {
  return (
    <section className="band-default bg-section py-20 md:py-28 border-y border-border">
      <Container>
        <Reveal>
          <div className="max-w-4xl mb-12">
            <h2 className="font-serif-display text-4xl md:text-5xl italic text-foreground mb-6">
              See what we build.
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-10 max-w-3xl">
              A live look at platforms we've shipped — including alanhirsch.com, fully active with a custom dashboard, content library, AI Lab, and integrated learning pathways. Built agentically. Yours can be too.
            </p>
            
            <div className="aspect-video bg-background border border-border rounded-xl overflow-hidden mb-8 relative flex items-center justify-center">
              {/* @TODO: Replace with actual MP4 loop */}
              <div className="absolute inset-0 bg-muted/30"></div>
              <div className="z-10 flex flex-col items-center">
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">Video Walkthrough Setup</span>
                <p className="mt-2 text-sm text-muted-foreground text-center px-4">Insert cinematic MP4 loop here (e.g. dashboard, content library, AI lab query)</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Link to="/technology" className="btn-pill btn-pill--primary">Explore the technology</Link>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Or visit a live build:</span>
                <a href="https://alanhirsch.com" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center">
                  alanhirsch.com <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function SegmentCardsFold() {
  return (
    <section className="band-default bg-background py-20 md:py-28">
      <Container>
         <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Reveal delay={0}>
              <div className="bg-card border border-border p-8 rounded-2xl h-full flex flex-col hover:border-primary/30 transition-colors">
                <h3 className="font-serif-display text-3xl italic mb-4 text-foreground">For Churches</h3>
                <p className="text-[1.0625rem] leading-relaxed text-muted-foreground mb-8 flex-grow">
                  For congregations and church-planting movements navigating AI without losing pastoral integrity.
                </p>
                <Link to="/for-churches" className="text-sm font-semibold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors inline-flex items-center">
                  Pathway for Churches <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </Reveal>
            
            <Reveal delay={100}>
              <div className="bg-card border border-border p-8 rounded-2xl h-full flex flex-col hover:border-primary/30 transition-colors">
                <h3 className="font-serif-display text-3xl italic mb-4 text-foreground">For Nonprofits</h3>
                <p className="text-[1.0625rem] leading-relaxed text-muted-foreground mb-8 flex-grow">
                  For mission-driven nonprofits where AI must serve the work, not warp it.
                </p>
                <Link to="/for-nonprofits" className="text-sm font-semibold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors inline-flex items-center">
                  Pathway for Nonprofits <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-card border border-border p-8 rounded-2xl h-full flex flex-col hover:border-primary/30 transition-colors">
                <h3 className="font-serif-display text-3xl italic mb-4 text-foreground">For Institutions</h3>
                <p className="text-[1.0625rem] leading-relaxed text-muted-foreground mb-8 flex-grow">
                  For seminaries, training networks, and denominational bodies preparing the next generation.
                </p>
                <Link to="/for-institutions" className="text-sm font-semibold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors inline-flex items-center">
                  Pathway for Institutions <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </Reveal>
         </div>
      </Container>
    </section>
  );
}

function CredibilityFold() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const founders = [
    { name: 'Brad Brisco', title: 'NAMB / Send Network multiplication strategies director; covocational ministry; five books; missional theology ↔ evangelical systems translator.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/brad-brisco.webp' },
    { name: 'Alan Hirsch', title: 'Forgotten Ways and APEST architect; twenty books; Forge and 100 Movements; 150k+ assessments; coined movemental.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/alan-hirsch.webp' },
    { name: 'Joshua Shepherd', title: 'Movemental founder, CEO, engineer; Mission House Network; QuadW cohort LMS; live Hirsch and Brisco tenants.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/josh-shepherd.webp' }
  ];

  return (
    <section className="band-default border-t border-border" id="credibility" aria-labelledby="credibility-heading">
      <Container>
        <Reveal>
          <span className="section-eyebrow">Credibility</span>
          <h2 id="credibility-heading" className="display mb-6 max-w-3xl">
            Built with and shaped by <em>movement leaders.</em>
          </h2>
          <p className="lede mb-8">
            Movemental is a growing conversation among leaders navigating AI, formation, and mission in real time.
          </p>
          <p className="text-foreground/80 max-w-2xl mb-16 text-[1.0625rem]">
            Credibility in an AI-saturated world is increasingly relational.
          </p>
        </Reveal>
        
        <Reveal delay={100}>
          <div className="mb-20">
            <span className="text-sm uppercase tracking-widest font-semibold mb-6 block border-b border-border pb-4">Founders</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {founders.map((f, i) => (
                <div key={i} className="group">
                  <div className="aspect-[4/5] bg-section rounded-2xl mb-6 overflow-hidden ring-1 ring-border">
                    <img src={f.image} alt={f.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name='+encodeURI(f.name)+'&size=400&background=F3EFEA'; }} />
                  </div>
                  <h4 className="font-serif-display text-2xl italic mb-2">{f.name}</h4>
                  <p className="text-[0.98rem] leading-relaxed text-muted-foreground">{f.title}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="relative">
            <div className="flex justify-between items-end mb-8 border-b border-border pb-4">
              <span className="text-sm uppercase tracking-widest font-semibold">Voices</span>
              <div className="flex gap-2">
                <button onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })} className="p-2 border border-border rounded-full hover:bg-section transition-colors" aria-label="Previous">
                  <ChevronLeft className="w-5 h-5"/>
                </button>
                <button onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })} className="p-2 border border-border rounded-full hover:bg-section transition-colors" aria-label="Next">
                  <ChevronRight className="w-5 h-5"/>
                </button>
              </div>
            </div>
            
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {VOICES.map((v, i) => (
                <div key={i} className="min-w-[280px] max-w-[320px] snap-start group cursor-default">
                  <div className="aspect-[4/5] bg-section rounded-2xl mb-6 overflow-hidden ring-1 ring-border">
                    <img src={v.image} alt={v.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name='+encodeURI(v.name)+'&size=400&background=F3EFEA'; }} />
                  </div>
                  <h4 className="font-serif-display text-2xl italic mb-2">{v.name}</h4>
                  <p className="text-sm text-foreground/60 leading-relaxed">{v.title}</p>
                </div>
              ))}
            </div>
            
            <Link to="/voices" className="inline-flex items-center text-sm font-semibold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors mt-6">
              See all voices <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="band-midnight text-center py-32" id="cta" aria-labelledby="final-cta-heading">
      <Container width="narrow">
        <Reveal>
          <h2 id="final-cta-heading" className="font-serif-display italic text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-inverse-foreground">
            You don't need to master AI.<br />
            You need a clear path for leading through it.
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link to="/contact" className="btn-pill bg-inverse-foreground text-inverse-surface hover:bg-inverse-muted font-semibold px-8 py-4 text-lg transition-colors">Start a Conversation</Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="home-page">
      <HeroFold />
      <WhyThisOrderFold />
      <PathwayFold />
      <DemoTeaserFold />
      <SegmentCardsFold />
      <CredibilityFold />
      <FinalCta />
    </div>
  );
}

