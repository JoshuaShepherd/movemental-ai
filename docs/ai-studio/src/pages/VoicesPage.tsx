import React, { useEffect } from 'react';
import { Reveal } from '@/components/Reveal';
import { Container } from '@/components/Container';
import { SectionHead } from '@/components/SectionHead';
import { Link } from 'react-router-dom';

const VOICES_LIST = [
  { name: 'Alan Hirsch', descriptor: 'Forgotten Ways and APEST architect; twenty books; Forge and 100 Movements; 150k+ assessments; coined movemental.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/alan-hirsch.webp', note: 'Alan Hirsch is the Australian-born missiologist behind The Forgotten Ways (mDNA) and the APEST / 5Q movement—frameworks adopted across denominations, planting networks, and seminaries. Serial founder (Forge, 100Movements, etc.), twenty-book corpus, and co-architect of practices now assessed over 150,000 times. He named the posture this platform carries: movemental.' },
  { name: 'Brad Brisco', descriptor: 'NAMB / Send Network multiplication strategies director; covocational ministry; five books; missional theology ↔ evangelical systems translator.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/brad-brisco.webp', note: 'Brad Brisco leads multiplication strategy for NAMB Send Network, translating Newbigin–Bosch–Hirsch-grade missional theology into Southern Baptist planting systems without diluting it into slogans. Five-book arc on missional practice—three co-authored with Lance Ford. Thirty-plus years practitioner-theologian; Forge America and Sentralized orbit.' },
  { name: 'JR Woodward', descriptor: 'V3 Church Planting national director; Manchester PhD powers scholar; published IVP books; Missio Alliance co-founder.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/jr-woodward.webp', note: 'JR Woodward leads V3 Church Planting Movement nationally while integrating grassroots planting with academic rigor: University of Manchester Ph.D. feeding The Scandal of Leadership. Co-founded Missio Alliance and Praxis Gathering; IVP Book of the Year recognition (The Church as Movement); adjunct practitioner-scholar.' },
  { name: 'Liz Rios', descriptor: 'Afro-Boricua theologian; Passion2Plant founder; Lilly-funded Púlpito Fellows; Fuller adjunct; Sojourners board; Need to Know contributor.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/liz-rios.webp', note: 'Rev. Dr. Liz Rios is an Afro-Boricua theologian-practitioner with 35+ years in ministry. She founded Passion2Plant—the only national BIPOC-woman-led church planting network in the United States—and directs Púlpito Fellows. Fuller Seminary adjunct; Sojourners board; contributor to Need to Know. Mujerista voice with operator-grade cohort discipline.' },
  { name: 'Rowland Smith', descriptor: 'Forge America director; Pando Collective founder; Pulpit Rock mission pastor; Red Skies curator; DMiss scholar.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/rowland-smith.webp', note: 'Dr. Leo Rowland Smith directs Forge America nationally while founding The Pando Collective Front Range micro-church network and serving Pastor of Missional Culture at The Church at Pulpit Rock. Author of Life Out Loud; curator-editor of Red Skies multi-author volume. Adjunct across Fuller, Denver Seminary, Grand Canyon University.' },
  { name: 'Lucas Pulley', descriptor: 'Underground Network Movements Director; fourteen-plus years microchurch; Tampa neighborhood practitioner; Fuller MGL; mathematics-trained systems thinking.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/lucas-pulley.webp', note: 'Lucas Pulley helps lead Underground Network from the movements-translocal lane—supporting 100+ Tampa microchurches—while still pastoring a neighborhood house church. 14+ years decentralized church multiplication. Fuller Master of Global Leadership; BA pure mathematics—systems-native practitioner voice Exponential and Missio Alliance circuits recognize.' },
  { name: 'Tim Catchim', descriptor: 'Permanent Revolution co-author with Hirsch; Trimtab APEST coach; OneLife Nashville team leader; IVP-published movemental practitioner.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/tim-catchim.webp', note: 'Tim Catchim co-authored The Permanent Revolution and the Permanent Revolution Playbook with Alan Hirsch (IVP)—core texts translating APEST into twenty-first-century ecclesial imagination. Founder of Trimtab coaching (APEST application, cohort learning), Team Leader at OneLife movemental church plant. Multi-vocational entrepreneur-practitioner.' },
  { name: 'Rob Wegner', descriptor: 'Kansas City Underground founder; Microchurch NEXT co-director; Starfish and the Spirit co-author; eight-book multiplication bibliography.', image: 'https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/voices/rob-wegner.webp', note: 'Rob Wegner founded Kansas City Underground (95+ microchurches, 110+ missionaries) and co-directs Microchurch NEXT at Exponential. Co-authored The Starfish and the Spirit with Alan Hirsch and Lance Ford. Eight books across Zondervan / Exponential catalogs bridge mega-church formation and decentralized movement leadership.' }
];

export function VoicesPage() {
  useEffect(() => {
    document.title = "Movemental Voices | Movemental";
  }, []);

  return (
    <div className="voices-page">
      <section className="band-midnight hero hero--fold" aria-labelledby="hero-h1">
        <Container>
          <Reveal>
            <span className="section-eyebrow">Movemental Voices</span>
            <h1 id="hero-h1" className="display hero-headline max-w-4xl">
              Leaders helping <em dangerouslySetInnerHTML={{__html: 'shape this moment.'}} />
            </h1>
            <p className="hero-subhead lede lede--regular text-inverse-foreground/80 mb-10 max-w-3xl">
              Movemental is a growing conversation among leaders navigating AI, formation, and mission in real time.
            </p>
            <div className="hero-actions flex flex-wrap gap-4">
              <Link to="/contact" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Start a Conversation</Link>
              <Link to="/path" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Explore the Path</Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="what-voices-means">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Not endorsements. Not a logo wall."
              display={<>These are leaders <em dangerouslySetInnerHTML={{__html: 'joining the conversation.'}} /></>}
              lede="To be clear: the leaders on this page are not customers, sponsors, or board members of Movemental. They are practitioners whose judgment we trust."
            />
            
            <p className="prose max-w-[640px] text-[1.0625rem] leading-[1.75] text-muted-foreground mb-16">
              Their presence matters because navigating AI is fundamentally a leadership and formation challenge, not just a technical one. We shape our frameworks by listening to them.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 pl-6 md:pl-0">
               <div className="relative group">
                  <div className="hidden md:block absolute top-[11px] -left-6 w-3 h-px bg-border group-hover:w-4 group-hover:bg-primary transition-all"></div>
                  <h3 className="font-serif-display text-3xl italic mb-3 text-foreground group-hover:text-primary transition-colors">Conversation over promotion</h3>
                  <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">They lend their names not to endorse a consulting product, but to signify that this conversation is worth having.</p>
               </div>
               <div className="relative border-t border-border pt-6 md:border-t-0 md:pt-0 group">
                  <div className="hidden md:block absolute top-[11px] -left-6 w-3 h-px bg-border group-hover:w-4 group-hover:bg-primary transition-all"></div>
                  <h3 className="font-serif-display text-3xl italic mb-3 text-foreground group-hover:text-primary transition-colors">Formation over hype</h3>
                  <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">These are leaders who consistently prioritize human formation and missional integrity over rapid efficiency.</p>
               </div>
               <div className="relative border-t border-border pt-6 md:border-t-0 md:pt-0 group">
                  <div className="hidden md:block absolute top-[11px] -left-6 w-3 h-px bg-border group-hover:w-4 group-hover:bg-primary transition-all"></div>
                  <h3 className="font-serif-display text-3xl italic mb-3 text-foreground group-hover:text-primary transition-colors">Shared discernment</h3>
                  <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">We actively bring our architectural models to them to make sure they hold up in reality.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="featured-voices">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Early voices"
              display={<>A growing circle <em dangerouslySetInnerHTML={{__html: 'of leaders.'}} /></>}
              lede="Every movement starts with zero. We launched with none. This group is expanding as the work expands."
            />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
               {VOICES_LIST.map((voice, i) => (
                  <div key={i} className="group bg-card rounded-2xl overflow-hidden ring-1 ring-border/40 flex flex-col h-full hover:ring-primary/30 transition-all duration-300 shadow-sm hover:shadow-md cursor-default">
                     <div className="aspect-[4/5] bg-section w-full relative overflow-hidden mb-0">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-multiply"></div>
                        <img src={voice.image} alt={voice.name} referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105 relative z-0" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name='+encodeURI(voice.name)+'&size=400&background=F3EFEA'; }} />
                     </div>
                     <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 bg-card">
                        <h3 className="font-serif-display text-3xl italic text-foreground mb-2 group-hover:text-primary transition-colors">{voice.name}</h3>
                        <p className="text-xs uppercase tracking-widest font-semibold text-primary/80 mb-5 pb-5 border-b border-border/60">{voice.descriptor}</p>
                        <p className="text-[0.98rem] text-muted-foreground leading-relaxed mt-auto">{voice.note}</p>
                     </div>
                  </div>
               ))}
            </div>
            
            <p className="text-center text-[0.98rem] text-ink-soft italic font-serif-display text-xl w-full">
              More voices are joining as the conversation develops.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="band-default" id="why-voices-matter">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="Why voices matter"
              display={<>AI credibility cannot be carried by <em dangerouslySetInnerHTML={{__html: 'one person alone.'}} /></>}
              lede="Movemental is led by three founders, but the architecture of trust requires a broader ecosystem."
            />
            
            <div className="grid md:grid-cols-3 gap-8 border-t border-border pt-12">
               <div>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Trust is relational</h3>
                  <p className="text-[0.98rem] leading-relaxed text-muted-foreground">In an environment of extreme uncertainty, an organization looks to leaders they already know to see how they are engaging.</p>
               </div>
               <div>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Wisdom is distributed</h3>
                  <p className="text-[0.98rem] leading-relaxed text-muted-foreground">No single consultancy can see every edge case. We rely on practitioners to tell us where our models break in specific contexts.</p>
               </div>
               <div>
                  <h3 className="font-serif-display text-2xl italic mb-3 text-foreground">Movements are carried by people</h3>
                  <p className="text-[0.98rem] leading-relaxed text-muted-foreground">We are ultimately trying to change how an entire sector adopts technology. That only happens if the sector&apos;s own leaders own the conversation.</p>
               </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-section" id="the-conversation">
        <Container>
          <Reveal>
            <SectionHead 
              eyebrow="The shared question"
              display={<>How do we lead through AI without losing <em dangerouslySetInnerHTML={{__html: 'what makes us human?'}} /></>}
              lede="This is the thread that unites the voices here. They recognize the inevitability of the technology, but refuse to let it dictate their theology or mission."
            />
            
            <div className="max-w-[640px]">
               <p className="text-[1.0625rem] text-foreground mb-6 font-medium">The conversation includes:</p>
               
               <ul className="grid sm:grid-cols-2 gap-4 mb-10 text-[0.98rem] text-muted-foreground">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>AI and formation</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>AI and trust</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>AI and organizational leadership</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>AI and theology</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>AI and mission</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>AI and human responsibility</li>
               </ul>
               
               <p className="border-l-2 border-primary pl-5 py-2 font-serif-display italic text-2xl text-foreground">
                  This is not a finished answer. It is a serious conversation taking shape.
               </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-midnight final-cta text-center">
        <Container width="narrow">
          <Reveal>
            <h2 className="display mb-8">
              Join the conversation by taking the <em dangerouslySetInnerHTML={{__html: 'first responsible step.'}} />
            </h2>
            <p className="lede text-inverse-foreground/80 mx-auto mb-10">
              Start with safety. Build capability. Lead with clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/start-with-safety" className="btn-pill bg-[#FDFBF7] text-[#101828] hover:bg-[#E5E0D8]">Start with Safety</Link>
              <Link to="/contact" className="btn-pill border border-inverse-border text-inverse-foreground hover:bg-inverse-foreground/10">Start a Conversation</Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
