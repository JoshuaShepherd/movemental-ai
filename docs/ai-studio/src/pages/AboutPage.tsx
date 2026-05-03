import React, { useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import { Container } from '@/components/Container';
import { SectionHead } from '@/components/SectionHead';
import { Link } from 'react-router-dom';

export function AboutPage() {
  useEffect(() => {
    document.title = "About | Movemental";
  }, []);

  return (
    <div className="about-page">
      <section className="band-midnight hero hero--fold" aria-labelledby="about-hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">About Movemental</span>
            <h1 id="about-hero-h1" className="display hero-headline max-w-4xl">
              We build technology and frameworks for <em dangerouslySetInnerHTML={{__html: 'mission-driven work.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              Movemental exists to help churches, nonprofits, and institutions navigate AI as a leadership and formation challenge—not just a technical one.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="origin">
        <Container>
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div>
                <SectionHead 
                  eyebrow="The origin" 
                  display={<>This did not <em dangerouslySetInnerHTML={{__html: 'start with AI.'}} /></>}
                />
              </div>
              <div className="prose max-w-none text-[1.0625rem] leading-[1.75] text-muted-foreground pt-2">
                <p className="text-[1.2rem] leading-[1.6] mb-6 text-foreground font-medium">
                  Our frameworks were shaped by years of work inside the kind of organizations where trust, formation, and mission are not features—they are the work itself.
                </p>
                <p className="mb-6">
                  When generative AI arrived, it did not create new concerns for these organizations. It exposed and accelerated existing ones: the temptation to substitute efficiency for presence, the risks of centralized authority, and the challenge of scaling care without losing humanity.
                </p>
                <p>
                  Most organizations are told they have two choices: breathless adoption or fearful avoidance. Movemental exists to build the <strong>third path</strong>.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="core-beliefs">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Our Doctrine" 
              display={<>Technology <em dangerouslySetInnerHTML={{__html: 'must be governed.'}} /></>}
              lede="The principles that dictate how we build software, design frameworks, and train leaders."
            />
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12">
              <div className="relative border-t border-border pt-8 group">
                <div className="text-sm font-bold text-primary mb-4 tracking-widest uppercase">01</div>
                <h3 className="text-2xl font-serif-display italic mb-3 text-foreground">Amplification, not replacement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We build AI systems to amplify human capability and preserve unique organizational voice, never to replace the relational work of leadership or pastoral care.
                </p>
              </div>
              
              <div className="relative border-t border-border pt-8 group">
                <div className="text-sm font-bold text-primary mb-4 tracking-widest uppercase">02</div>
                <h3 className="text-2xl font-serif-display italic mb-3 text-foreground">Scenius over genius</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We reject the guru model. True credibility is inspectable, collaborative, and grounded in the ecosystem. Our platform elevates network intelligence over isolated celebrity.
                </p>
              </div>

              <div className="relative border-t border-border pt-8 group">
                <div className="text-sm font-bold text-primary mb-4 tracking-widest uppercase">03</div>
                <h3 className="text-2xl font-serif-display italic mb-3 text-foreground">Formation before efficiency</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Before adopting any tool, we ask what the tool makes of the user. Success is measured by how people grow within safe boundaries, not merely by how fast work is produced.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="platform">
        <Container>
          <Reveal>
            <div className="bg-card border border-border rounded-card p-10 md:p-16 lg:p-20 text-center max-w-5xl mx-auto overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <span className="section-eyebrow">The Platform</span>
                <h2 className="font-serif-display italic text-3xl md:text-4xl text-foreground mb-6 max-w-2xl mx-auto">
                  A structured sequence for responsible adoption.
                </h2>
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  We translate dense missional theology and ethical constraints into literal code and policy. The Movemental sequence moves organizations safely from initial policy to scaled solutions.
                </p>
                <Link to="/field-guide" className="btn-pill btn-pill--primary inline-flex">
                  Explore the Sequence
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
