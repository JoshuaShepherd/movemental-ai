import React, { useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import { Container } from '@/components/Container';
import { SectionHead } from '@/components/SectionHead';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FOUNDERS = [
  {
    initials: 'BB',
    name: 'Brad Brisco',
    role: 'CEO & Co-founder',
    location: 'United States',
    image: '/images/voices/brad-brisco.webp',
    bio: 'Brad Brisco occupies a narrow, high-leverage corridor: missional theology spoken fluently inside institutional evangelicalism. He leads multiplication strategy for NAMB / Send Network, transforming how congregations imagine sending, planting, and multiplying at national scale.',
    credentials: [
      'NAMB / Send Network multiplication strategies director',
      'Thirty-plus years practitioner-theologian',
      'Five-book arc on missional practice',
      'Missional theology ↔ evangelical systems translator'
    ],
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'Books', href: '#' }
    ]
  },
  {
    initials: 'AH',
    name: 'Alan Hirsch',
    role: 'Chief Missiologist & Co-founder',
    location: 'Six continents',
    image: '/images/voices/alan-hirsch.webp',
    bio: 'Alan Hirsch is the Australian-born missiologist behind The Forgotten Ways (mDNA) and the APEST / 5Q movement—frameworks adopted across denominations, planting networks, and seminaries. He coined the term movemental.',
    credentials: [
      'Forgotten Ways and APEST architect',
      'Twenty-book published corpus',
      'Serial founder: 100Movements, Forge, etc.',
      '150,000+ assessments across platforms'
    ],
    links: [
      { label: 'Website', href: '#' },
      { label: '100Movements', href: '#' }
    ]
  },
  {
    initials: 'JS',
    name: 'Joshua Shepherd',
    role: 'CTO & Founder',
    location: 'United States',
    image: '/images/voices/josh-shepherd.webp',
    bio: 'Josh Shepherd leads Movemental as majority builder-owner—architecture, product ethics, and shipped code. His credible trail runs through long-horizon formation, multi-city nonprofit systems, and demonstrated enterprise digital leadership.',
    credentials: [
      'Movemental founder, CEO, engineer',
      'Mission House Network founder',
      'QuadW cohort LMS architect',
      'Constructed live Hirsch and Brisco tenants'
    ],
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'LinkedIn', href: '#' }
    ]
  }
];

export function TeamPage() {
  useEffect(() => {
    document.title = "Team | Movemental";
  }, []);

  return (
    <div className="team-page">
      <section className="band-midnight hero" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">The team</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              Three people. <em dangerouslySetInnerHTML={{__html: 'One posture.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              Brad Brisco, Alan Hirsch, and Joshua Shepherd. Movement leadership, missional theology, and the infrastructure to hold both.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link to="/contact" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Start a conversation</Link>
              <Link to="/voices" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">See trusted voices</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Founders"
              display={<>The people <em dangerouslySetInnerHTML={{__html: 'holding the pen'}} />.</>}
              lede="Each carries decades of work in missional leadership, AI infrastructure, or both. None of us pretend the other two are unnecessary."
            />
            
            <div className="space-y-16 lg:space-y-24 mt-16">
               {FOUNDERS.map((person, i) => (
                  <article key={i} className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr] gap-8 md:gap-12">
                     <div className="flex flex-col gap-4">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-section ring-1 ring-border shrink-0">
                           <img src={person.image} alt={person.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name='+encodeURI(person.name)+'&size=400&background=F3EFEA'; }} />
                        </div>
                        <div>
                           <h3 className="font-serif-display text-2xl italic text-foreground mb-1">{person.name}</h3>
                           <p className="text-sm font-medium uppercase tracking-wider text-primary mb-1">{person.role}</p>
                           <p className="text-sm text-ink-soft">{person.location}</p>
                        </div>
                     </div>
                     
                     <div className="border-t border-border pt-6 md:border-t-0 md:pt-0">
                        <p className="text-[1.0625rem] leading-[1.75] text-muted-foreground mb-8 max-w-2xl">{person.bio}</p>
                        
                        <h4 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-4">Credentials & Context</h4>
                        <ul className="space-y-2 mb-8 text-[0.98rem] text-muted-foreground">
                           {person.credentials.map((cred, j) => (
                              <li key={j} className="flex items-start"><span className="text-primary mr-3 mt-1">•</span>{cred}</li>
                           ))}
                        </ul>
                        
                        <div className="flex flex-wrap gap-6 border-t border-border-soft pt-6">
                           {person.links.map((link, j) => (
                              <a href={link.href} key={j} className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-sm font-medium text-foreground transition-colors hover:border-foreground">
                                 {link.label}
                                 <ArrowRight className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden />
                              </a>
                           ))}
                        </div>
                     </div>
                  </article>
               ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section">
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-[280px_1fr] gap-8 md:gap-12">
               <div>
                  <span className="section-eyebrow mb-4">How we lead</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">We do not pretend AI is a tools problem. It is a leadership problem that comes with tools.</p>
               </div>
               <div>
                  <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-12 max-w-3xl text-foreground">
                     The same Sequence we ask of you, <em className="font-serif-display italic tracking-[-0.01em]">we walk ourselves</em>.
                  </h2>
                  
                  <ol className="list-none p-0 space-y-8 max-w-2xl">
                     <li className="relative pl-8">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        <strong className="block text-foreground text-lg mb-1">Safety.</strong>
                        <span className="text-muted-foreground text-[1.02rem] leading-relaxed">We protect client data fiercely via architecture, not just agreement. We never use client inputs to train our own models.</span>
                     </li>
                     <li className="relative pl-8">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        <strong className="block text-foreground text-lg mb-1">Sandbox.</strong>
                        <span className="text-muted-foreground text-[1.02rem] leading-relaxed">We build inside secure, isolated environments. We test breaking points before we ever recommend them to you.</span>
                     </li>
                     <li className="relative pl-8">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        <strong className="block text-foreground text-lg mb-1">Skills.</strong>
                        <span className="text-muted-foreground text-[1.02rem] leading-relaxed">We continuously refine our own fluency. We study how models drift and boundaries blur so we can teach you how to spot it.</span>
                     </li>
                     <li className="relative pl-8">
                        <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        <strong className="block text-foreground text-lg mb-1">Solutions.</strong>
                        <span className="text-muted-foreground text-[1.02rem] leading-relaxed">The infrastructure we use to deliver your read-backs and assessments is built on the same architecture we recommend.</span>
                     </li>
                  </ol>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Beyond the team"
              display={<>The work is held by <em dangerouslySetInnerHTML={{__html: 'more than three of us'}} />.</>}
              lede="Every robust missional idea is pressure-tested by a community. We actively lean on the Trusted Voices ecosystem to keep the framing honest and accurate across different contexts."
            />
            
            <p className="border-l-2 border-foreground pl-5 max-w-[50ch] text-[1.0625rem] leading-[1.75] text-foreground font-medium py-2 my-10">
               <Link to="/voices" className="group inline-flex items-center gap-1.5 border-b border-border pb-0.5 text-foreground hover:border-foreground transition-colors">
                  See trusted voices
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
               </Link>
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <span className="section-eyebrow text-inverse-foreground/80 flex justify-center items-center gap-2 mb-6">
              If this resonates
            </span>
            <h2 className="display mb-8">
              We would like to hear <em dangerouslySetInnerHTML={{__html: 'what you are facing'}} />.
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              A thirty-minute call to see if there is a fit and if the timing is right.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Start a conversation</Link>
              <Link to="/field-guide" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Read the field guide</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
