import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Reveal, Section } from "@/components/primitives";
import { COMMITTED_VOICES, VOICES_HUB_PATH } from "@/lib/committed-voices";
import { cn } from "@/lib/utils";

import { AboutToolkitTrigger } from "./about-toolkit-trigger";

/**
 * /about — A company built by movement leaders, for movement leaders.
 *
 * Originally rebuilt from archived Stitch HTML (sources removed from the repo).
 * Template-fidelity pass approved 2026-05-09; replaces the prior AI-generated
 * "late-2025 discovery" narrative archived under
 * `_archive/about-page-pre-rewrite-2026-05-09/`).
 *
 * Voice principles (apply across every section):
 *   - No banned consultant vocabulary (leverage / unlock / transform / etc.).
 *   - Italic emphasis only where semantically meaningful (book titles,
 *     framework names, key terms being defined).
 *   - The narrative does the work; section headings name what the section is.
 *
 * Movement Voices in §5 are sourced from `src/lib/committed-voices.ts` so
 * additions to the canonical roster appear here automatically.
 */

type FounderLink = { label: string; href: string };

type Founder = {
  name: string;
  /** Single italic display-serif letter rendered in the placeholder tile. */
  letter: "B" | "A" | "J";
  role: string;
  location: string;
  bio: React.ReactNode;
  credentials: readonly React.ReactNode[];
  links: readonly FounderLink[];
};

const FOUNDERS: readonly Founder[] = [
  {
    name: "Brad Brisco",
    letter: "B",
    role: "Co-founder & CEO",
    location: "United States",
    bio: (
      <>
        Brad has led church planting strategy at the North American Mission Board for over a decade
        and is one of the most-respected voices in the missional church movement in North America.
        He has authored and co-authored multiple books on missional ecclesiology, including{" "}
        <em>The Missional Quest</em> and <em>Missional Essentials</em>. Brad&apos;s relationships
        across senior pastors, church planters, and denominational leaders are how Movemental&apos;s
        warm-distribution model became possible.
      </>
    ),
    credentials: [
      "North American Mission Board / Send Network leadership",
      "Multiple-book arc on missional practice and church planting",
      "Practitioner-theologian bridging institutional evangelicalism and missional theology",
      "Long-standing relationships across denominations and planting networks",
    ],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/brad-brisco/" },
      { label: "Books", href: "https://www.amazon.com/Brad-Brisco/e/B00GUZGOX2" },
    ],
  },
  {
    name: "Alan Hirsch",
    letter: "A",
    role: "Co-founder & Chief Missiologist",
    location: "Six continents",
    bio: (
      <>
        Alan is the missiologist behind <em>The Forgotten Ways</em> and the APEST and 5Q
        frameworks, which have been adopted across denominations, planting networks, and seminaries
        on six continents. He coined the term <em>Movemental</em>. His missiological depth shapes
        the theological foundation of Movemental&apos;s path: that human formation must precede
        technological deployment, and that a movement is held together by the credibility of its
        practitioners, not by the platforms that distribute them.
      </>
    ),
    credentials: [
      <>
        <em>The Forgotten Ways</em> and APEST architect
      </>,
      "Twenty-book published corpus",
      "Founder of Forge Mission Training Network, 5Q, Movement Leaders Collective, 100Movements",
      "Frameworks adopted across denominations and seminaries globally",
    ],
    links: [
      { label: "alanhirsch.org", href: "https://alanhirsch.org" },
      { label: "100Movements", href: "https://www.100movements.com" },
    ],
  },
  {
    name: "Joshua Shepherd",
    letter: "J",
    role: "Founder & CTO",
    location: "United States",
    bio: (
      <>
        Josh is the technical founder behind Movemental&apos;s platform. He came into this work
        from inside it, having spent years as a Methodist pastor and then as a founder and leader
        of a neomonastic, communal, mission-driven nonprofit where he and his wife lived alongside
        roughly a hundred young adults at a time. The digital work emerged later, from inside that
        ministry — a way to tell its stories, then a way to amplify others&apos; stories, then a
        platform that could hold a network. Bilingual in English and Spanish.
      </>
    ),
    credentials: [
      "Founder, CTO, and majority equity holder",
      "Architect of Movemental's multi-tenant AI-native platform",
      "Background in pastoral ministry, communal nonprofit leadership, and digital infrastructure for movement organizations",
      "Bilingual facilitator across English-speaking and Spanish-speaking contexts",
    ],
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/joshuajshepherd/",
      },
      { label: "GitHub", href: "https://github.com/joshuajshepherd" },
    ],
  },
];

type Commitment = {
  number: string;
  title: string;
  body: React.ReactNode;
};

const COMMITMENTS: readonly Commitment[] = [
  {
    number: "01",
    title: "Shared missional DNA",
    body: (
      <>
        Movement leaders who join Movemental share what Alan Hirsch named{" "}
        <em>missional DNA</em> — a centrality of Christ, a posture of mission, a theology of
        incarnation, and the disciplines of formation that follow from those. This is the tacit
        ground that makes everything else possible. It is not branded or marketed. It is what makes
        the commitments below coherent.
      </>
    ),
  },
  {
    number: "02",
    title: "Scenius over guru",
    body: (
      <>
        Movemental is built on the conviction that movement leaders sharpen each other in ways
        that do not happen alone. Joining the platform is a commitment to participate in{" "}
        <em>scenius</em> — a peer network in which leaders refine, amplify, and recommend each
        other&apos;s work. The infrastructure makes this possible in ways that simply do not
        happen offline, and that have not happened even for our most-networked founders online
        before now.
      </>
    ),
  },
  {
    number: "03",
    title: "Mutual credibility",
    body: (
      <>
        Movement leaders who join Movemental commit to amplifying each other&apos;s existing
        credibility — the credibility built over decades of offline human work, prior to AI. Each
        leader&apos;s voice is strengthened by the fact that other trusted voices have publicly
        recognized and recommended that voice. This commitment to mutual recommendation is what
        makes the network more credible than any individual platform could be on its own.
      </>
    ),
  },
  {
    number: "04",
    title: "Transparent, mature AI use",
    body: (
      <>
        Movement leaders who join Movemental commit to using AI in ways that are honest and
        modeled. We do not use AI to author content under our names. We use AI as infrastructure —
        to make our work findable, to extend our reach, to surface what is in our existing corpus,
        and to support the operational work of running our platforms. The distinction between
        authorship and infrastructure matters, and we model it publicly so that the people we
        serve can see that another way of using AI is available.
      </>
    ),
  },
  {
    number: "05",
    title: "A redemptive business",
    body: (
      <>
        Movement leaders who join Movemental commit to a business model that flips the historically
        extractive logic of publication. The traditional model — institutional gatekeepers
        retaining the majority of an author&apos;s revenue in exchange for marketing and
        distribution — was structurally necessary in an era when readers had no other way to
        discover credible authors. We propose that one hundred movement leaders mutually
        recommending each other can constitute a credibility infrastructure that surpasses any
        publisher, and that the revenue this generates flows back to the leaders who built the
        credibility in the first place. The path this opens for the next generation of
        covocational movement leaders, smaller in audience but no less called, is part of why we
        say this work explicitly rather than leaving it implicit.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Founder card placeholder — warm cream tile + single italic letter. */
/* ------------------------------------------------------------------ */
function FounderTile({ letter, name }: { letter: string; name: string }) {
  return (
    <div
      role="img"
      aria-label={`Editorial portrait placeholder for ${name}`}
      className={cn(
        "relative aspect-square w-full overflow-hidden",
        // Warm cream paper ramp drawn from the production token chain
        // (background → section → surface-highest). The radial-gradient
        // utilities aren't first-class in Tailwind v4, so we use an inline
        // CSS variable wrapper.
        "bg-[radial-gradient(120%_120%_at_30%_25%,var(--background)_0%,var(--section)_60%,var(--surface-highest)_100%)]",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_60%,rgba(25,21,15,0.04)_100%)]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center select-none",
          "font-serif italic font-normal leading-none tracking-tight",
          "text-foreground/15",
          "text-[clamp(120px,18vw,220px)]",
        )}
      >
        {letter}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Founder arrow link — small text + transitioning arrow.             */
/* ------------------------------------------------------------------ */
function FounderArrowLink({ href, label }: FounderLink) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={cn(
        "group/arrow inline-flex items-center gap-1.5 rounded-sm text-sm font-medium",
        "text-foreground/90 hover:text-foreground",
        "border-b border-foreground/15 pb-0.5 transition-colors hover:border-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 transition-transform group-hover/arrow:translate-x-1"
        strokeWidth={1.5}
      />
    </Link>
  );
}

/** About — production editorial page (original Stitch HTML sources removed from repo). */
export function AboutPageContent() {
  return (
    <div className="text-pretty">
      {/* ============================================================ */}
      {/* Section 1 — Hero                                              */}
      {/* ============================================================ */}
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="about-hero-title"
        className="band-midnight scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container width="default" className="max-w-5xl">
          <Reveal>
            <p className="mb-8 text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
              About Movemental
            </p>
            <h1
              id="about-hero-title"
              className="mb-10 max-w-[20ch] font-serif text-5xl font-medium leading-[1.05] tracking-display text-inverse-foreground md:text-6xl lg:text-7xl"
            >
              A company built by movement leaders, for movement leaders.
            </h1>
            <p className="max-w-160 text-lg leading-relaxed text-inverse-muted md:text-xl">
              Movemental exists because three people who had spent decades in mission-driven work
              together{" "}
              
                saw something coming and decided to build the answer themselves.
              
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 2 — The founders                                      */}
      {/* ============================================================ */}
      <Section variant="default" spacing="lg" aria-labelledby="about-founders-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                The founders
              </p>
              <h2
                id="about-founders-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                Three people, one company.
              </h2>
              <p className="mt-8 max-w-160 text-lg leading-relaxed text-muted-foreground">
                Each founder carries decades of work in missional leadership, theological
                scholarship, or digital infrastructure for movement organizations. The team came
                together for a specific reason at a specific moment, which the section below
                explains.
              </p>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={i * 80}>
                <article aria-labelledby={`founder-${f.letter.toLowerCase()}`}>
                  <FounderTile letter={f.letter} name={f.name} />
                  <h3
                    id={`founder-${f.letter.toLowerCase()}`}
                    className="mt-7 font-serif text-3xl italic font-normal leading-[1.15] tracking-tight text-foreground"
                  >
                    {f.name}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium text-foreground">{f.role}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{f.location}</p>
                  <p className="mt-5 text-base leading-relaxed text-foreground">{f.bio}</p>

                  <div className="mt-7">
                    <p className="mb-3 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                      Credentials &amp; context
                    </p>
                    <ul className="space-y-2 text-[15px] leading-relaxed text-foreground">
                      {f.credentials.map((line, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span aria-hidden="true" className="select-none text-muted-foreground">
                            —
                          </span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                    {f.links.map((link) => (
                      <FounderArrowLink key={link.label} {...link} />
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 3 — The story                                         */}
      {/* ============================================================ */}
      <Section
        variant="section"
        spacing="lg"
        aria-labelledby="about-story-title"
        className="border-t border-border"
      >
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                How Movemental came to exist
              </p>
              <h2
                id="about-story-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                It started with a question Josh sent to Brad <em>in mid-2024.</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 max-w-(--prose-max) space-y-[1.4em] text-[17px] leading-[1.75] text-foreground">
              <p>
                Josh was a long-time reader of two missional voices he considered formative — Brad
                Brisco&apos;s work in church planting and missional ecclesiology, and Alan
                Hirsch&apos;s work on the framework that gives Movemental its name. Brad was
                already in his life directly, serving on the board of the neomonastic nonprofit
                Josh and his wife had founded, where they lived alongside young adults in extended
                communal residency. Alan came into Josh&apos;s life first through reading, then
                through ministries that taught Alan&apos;s work explicitly, and only later through
                digital work that began to remediate Alan&apos;s content into forms the internet
                could carry.
              </p>

              <p>
                In mid-2024, Josh reached out to Brad with a question. Generative AI was reaching
                mass adoption. The implications for mission-driven organizations were starting to
                surface, and so were the concerns — about authorship, about formation, about the
                pressure these tools were going to place on the trust missional work depends on.
                Josh wrote to Brad and asked, in effect, are you seeing this. Brad was. The
                conversation extended.
              </p>

              <blockquote className="my-[2.25em] border-l border-border pl-7 font-serif text-[clamp(22px,2.4vw,28px)] italic font-normal leading-[1.45] tracking-tight text-foreground">
                What started as a check-in among three people who had been circling each
                other&apos;s work for years became a sustained conversation about authorship,
                formation, and what to build.
              </blockquote>

              <p>
                Over the next two years, what started as a check-in among three people who had
                been circling each other&apos;s work for years became a sustained conversation
                about three intersecting questions. What does AI mean for authorship — for the
                integrity of voice, for the difference between thinking and producing? What does
                AI mean for formation — for the way leaders are shaped, for what tools make of
                their users? And what would it look like to build, for Alan specifically, a
                digital platform that could hold his work in ways his existing organizations and
                partners had not been able to?
              </p>

              <p>
                Alan came to trust that Josh might be the right person to build that platform.
                Josh came to want to build, for Alan, what the largest digital agency would have
                built if Alan had gone to one. As the platform took shape, a recognition arrived
                that did not arrive all at once but in stages. What was being built for Alan would
                also serve Brad, with adjustments. What served Brad and Alan would serve other
                movement leaders whose situations were structurally similar. And eventually, more
                recently, what served movement leaders would also serve organizations — churches,
                nonprofits, institutions — because their underlying technological needs were
                ultimately the same as the leaders who shape and serve them.
              </p>

              <p>
                Movemental is what came of those recognitions. The platform is what makes the
                methodology operational at scale. Brad and Alan are co-founders not as advisors
                lending names to a tech founder&apos;s deck, but as the people whose decades of
                work define the substance of what the company exists to protect. Josh is the
                person who saw what was coming, asked the right two people to build it with him,
                and shipped the platform that made the answer real.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 4 — Five commitments                                  */}
      {/* ============================================================ */}
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="about-commitments-title"
        className="band-midnight"
      >
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
                What movement leaders commit to
              </p>
              <h2
                id="about-commitments-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-inverse-foreground md:text-5xl"
              >
                Five commitments that bind this network.
              </h2>
              <p className="mt-8 max-w-160 text-lg leading-relaxed text-inverse-muted">
                Movement leaders who join Movemental share more than a platform. They make five
                specific commitments to each other and to the people their work serves. These
                commitments are not slogans. They shape every line of code Movemental ships and
                every artifact the path facilitates.
              </p>
            </div>
          </Reveal>

          <ol className="mt-16 list-none p-0">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.number} delay={i * 60} as="li">
                <div
                  className={cn(
                    "grid grid-cols-12 gap-6 py-9 md:gap-10",
                    i > 0 && "border-t border-inverse-border",
                  )}
                >
                  <div className="col-span-12 md:col-span-2">
                    <span
                      aria-hidden="true"
                      className="font-serif italic font-normal leading-none tracking-tight text-inverse-foreground/55 text-[clamp(36px,4vw,52px)]"
                    >
                      {c.number}
                    </span>
                  </div>
                  <div className="col-span-12 max-w-176 md:col-span-10">
                    <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight text-inverse-foreground md:text-[28px]">
                      {c.title}
                    </h3>
                    <p className="mt-4 text-[17px] leading-relaxed text-inverse-foreground/80">
                      {c.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <p className="mt-16 max-w-176 font-serif text-[17px] italic font-normal leading-relaxed text-status-caution md:text-[19px]">
              These commitments are not aspirational. They are operational, and they shape the
              architecture of the platform itself.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 5 — Voices already participating                      */}
      {/* ============================================================ */}
      <Section variant="default" spacing="lg" aria-labelledby="about-voices-title">
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-muted-foreground">
                Beyond the founders
              </p>
              <h2
                id="about-voices-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-foreground md:text-5xl"
              >
                The work is held by more than three of us.
              </h2>
              <p className="mt-8 max-w-160 text-lg leading-relaxed text-muted-foreground">
                Movemental&apos;s first cohort of Movement Voices includes leaders whose decades of
                work in missional infrastructure, theological scholarship, and movement leadership
                shape what we build and how we facilitate. The list is not a marketing roster. It
                is the actual community whose work the platform is being built to hold.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <ul
              className="mt-16 grid list-none grid-cols-1 gap-x-12 gap-y-2 p-0 md:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {COMMITTED_VOICES.map((voice) => (
                <li key={voice.slug} className="border-t border-border">
                  <Link
                    href={`${VOICES_HUB_PATH}/${voice.slug}`}
                    className={cn(
                      "block py-7 transition-colors",
                      "focus-visible:outline-none focus-visible:bg-section/60",
                    )}
                  >
                    <p className="font-serif text-2xl font-normal leading-tight tracking-tight text-foreground">
                      {voice.displayName}
                    </p>
                    <p className="mt-1.5 text-sm leading-snug text-muted-foreground">
                      {voice.role}
                    </p>
                    <p className="mt-3.5 max-w-[36ch] text-[15px] leading-snug text-foreground">
                      {voice.shortTagline}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-14">
              <Link
                href={VOICES_HUB_PATH}
                className={cn(
                  "group/arrow inline-flex items-center gap-2 rounded-sm text-sm font-medium",
                  "text-foreground/90 hover:text-foreground",
                  "border-b border-foreground/15 pb-0.5 transition-colors hover:border-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                See all Movement Voices
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 transition-transform group-hover/arrow:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ============================================================ */}
      {/* Section 6 — Closing                                           */}
      {/* ============================================================ */}
      <Section
        variant="midnight"
        spacing="lg"
        aria-labelledby="about-closing-title"
        className="band-midnight"
      >
        <Container width="default" className="max-w-7xl">
          <Reveal>
            <div className="max-w-176">
              <p className="mb-6 text-[0.78rem] font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
                If this resonates
              </p>
              <h2
                id="about-closing-title"
                className="font-serif text-4xl font-medium leading-tight tracking-display text-inverse-foreground md:text-5xl"
              >
                We would value a conversation.
              </h2>
              <p className="mt-8 max-w-152 text-lg leading-relaxed text-inverse-muted">
                Movemental works through conversation. If you lead a mission-driven organization,
                advise or fund movement leaders, or are a movement leader yourself wondering
                whether this network is one you should join — reach out. The conversation is 30
                minutes. We listen, ask honest questions, and tell you whether the path or the
                network is the right fit for where you are.
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" className="btn-pill btn-pill--primary">
                  Start a conversation
                </Link>
                <Link href="/field-guide" className="btn-pill btn-pill--ghost">
                  Read the field guide
                </Link>
              </div>

              <p className="mt-10 font-serif text-base italic font-normal text-inverse-foreground/55">
                Or download the free Safety toolkit. Sixteen pages. Read it in an evening.
              </p>
              <div className="mt-3">
                <AboutToolkitTrigger source="about-closing" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
