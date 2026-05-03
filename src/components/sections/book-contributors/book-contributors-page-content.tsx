import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import { Container, Section } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { AudienceLabel } from "@/components/sections/audience-concept";
import { getAllChapters } from "@/lib/book";
import { getContributorsList } from "@/lib/book-data";

const STATEMENTS: { num: string; title: string; body: string }[] = [
  {
    num: "01",
    title: "It makes participation visible.",
    body: "Before the writing is fully live, this layer signals that Movemental is already being shaped by real contributors with real bodies of work.",
  },
  {
    num: "02",
    title: "It locates authority in relationship.",
    body: "The goal is not to market personalities. It is to show that ideas are being carried by identifiable people in public, relational, and accountable ways.",
  },
  {
    num: "03",
    title: "It creates continuity for what comes next.",
    body: "As contributor writing goes live, this layer becomes the quiet bridge between names, bodies of work, and the shared world those works inhabit.",
  },
];

const COMING_ITEMS = [
  "The Two Equal Errors",
  "Formation Cannot Remain Accidental",
  "Building Coherence Before Scale",
] as const;

/** Contributors — Concept Modern shell (`docs/html/contributor-layer.html`). */
export async function BookContributorsPageContent() {
  let contributors: {
    name: string;
    title?: string;
    chapterTitle: string;
    type: "question" | "feedback" | "criticism";
    date: string;
  }[] = [];

  try {
    const raw = await getContributorsList();
    const chapters = getAllChapters();
    contributors = raw.map((r) => ({
      name: r.name,
      title: r.title,
      chapterTitle: chapters.find((c) => c.slug === r.chapterSlug)?.title ?? r.chapterSlug,
      type: r.type,
      date: r.date,
    }));
  } catch {
    contributors = [];
  }

  return (
    <div data-contributors="concept-modern" className="text-pretty">
      <Section variant="default" spacing="lg" className="scroll-mt-(--site-chrome-total) pt-6 md:pt-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,3.5fr)] lg:items-start lg:gap-12">
            <div>
              <RevealOnScroll>
                <AudienceLabel>Current contributors</AudienceLabel>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.06}>
                <h1 className="mt-2 max-w-[22ch] text-balance text-display text-foreground">
                  A growing body of thought, carried by real people.
                </h1>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.1} className="mt-6 max-w-[54ch] space-y-4 text-[1.05rem] leading-relaxed text-muted-foreground">
                <p>
                  Movemental is built with leaders, writers, and practitioners whose work has been formed in public, in
                  community, and over time.
                </p>
                <p>
                  This is not a directory of influencers.
                  <br />
                  It is a visible layer of participation inside a larger body of work still being gathered, connected,
                  and published.
                </p>
                <p className="text-sm text-ink-soft">
                  Current contributors include movement leaders, pastors, builders, and practitioners working at the
                  intersection of formation, mission, institutions, and AI.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.16} className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="#contributors">
                    Explore contributors
                    <ArrowRight className="ml-1 size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href="#writing-bridge">Read the writing</Link>
                </Button>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.12}>
              <aside
                className="border border-border bg-card px-5 py-6 text-sm leading-relaxed text-muted-foreground"
                aria-label="Layer status"
              >
                <p className="text-label font-medium uppercase tracking-eyebrow text-ink-soft">Current layer</p>
                <p className="mt-2 font-medium text-foreground">In formation · coming into view</p>
              </aside>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section id="approach" variant="section" spacing="lg" aria-labelledby="orient-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <RevealOnScroll>
                <AudienceLabel>Framing</AudienceLabel>
              </RevealOnScroll>
              <RevealOnScroll delaySec={0.06}>
                <h2 id="orient-title" className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground">
                  Why contributors appear this way
                </h2>
              </RevealOnScroll>
            </div>
            <RevealOnScroll delaySec={0.1} className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>Movemental does not treat contributors as testimonials, logos, or proof points in a funnel.</p>
              <p>
                They appear here the way they will increasingly appear across the platform: as authors, as voices, as
                participants in a shared body of thought.
              </p>
              <p>The point is not to announce who matters. The point is to make participation visible.</p>
              <p className="border-l-2 border-foreground pl-4 font-serif text-[1.15rem] font-normal italic text-foreground">
                Authority is not claimed here. It becomes visible through the work.
              </p>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section id="contributors" variant="default" spacing="lg" aria-labelledby="contrib-title">
        <Container>
          <RevealOnScroll>
            <AudienceLabel>Layer</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2 id="contrib-title" className="mt-2 text-h2 text-foreground">
              Current contributors
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.1} className="mt-4 max-w-[60ch] text-muted-foreground">
            <p>
              The network is still taking shape. Listed below are readers credited in the margin when their questions,
              critiques, or feedback shaped a revision.
            </p>
          </RevealOnScroll>

          {contributors.length > 0 ? (
            <ul className="mt-12 list-none space-y-0 border-y border-border p-0">
              {contributors.map((c, i) => (
                <li key={`${c.name}-${c.chapterTitle}-${i}`} className="border-b border-border last:border-b-0">
                  <RevealOnScroll delaySec={0.03 * (i % 8)}>
                    <div className="grid gap-4 py-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:py-8">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-section text-sm font-semibold text-foreground"
                        aria-hidden
                      >
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        {c.title ? <p className="text-xs text-ink-soft">{c.title}</p> : null}
                        <p className="mt-2 text-sm text-muted-foreground">
                          {c.type === "question"
                            ? "Asked a question"
                            : c.type === "criticism"
                              ? "Offered a critique"
                              : "Offered feedback"}{" "}
                          on <span className="font-medium text-foreground">{c.chapterTitle}</span> · {c.date}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                </li>
              ))}
            </ul>
          ) : (
            <RevealOnScroll delaySec={0.12} className="mt-12 border border-border bg-card px-8 py-10 text-center">
              <p className="text-lg font-medium text-foreground">No credited margin contributors yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                This page will populate as readers use the margin on published chapters. Start with the book home.
              </p>
              <Button asChild className="mt-6" size="lg">
                <Link href="/book">Start reading</Link>
              </Button>
            </RevealOnScroll>
          )}

          <RevealOnScroll delaySec={0.08} className="mt-10 text-sm text-ink-soft">
            <p>This is a current layer, not a final roster.</p>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section variant="section" spacing="lg" aria-labelledby="statements-title">
        <Container>
          <RevealOnScroll>
            <AudienceLabel>Purpose</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2 id="statements-title" className="mt-2 text-h2 text-foreground">
              What this layer does
            </h2>
          </RevealOnScroll>
          <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
            {STATEMENTS.map((s, i) => (
              <RevealOnScroll key={s.num} delaySec={0.05 * i}>
                <p className="text-label font-medium tabular-nums tracking-eyebrow text-ink-soft">{s.num}</p>
                <h3 className="mt-2 font-serif text-[clamp(1.2rem,2vw,1.45rem)] font-normal italic text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="writing-bridge" variant="default" spacing="lg">
        <Container>
          <RevealOnScroll>
            <AudienceLabel>In view</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2 className="mt-2 max-w-[28ch] text-balance text-h2 text-foreground">Writing is coming into view</h2>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.1} className="mt-6 max-w-[60ch] space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>Contributor writing is being gathered, structured, and prepared for publication.</p>
            <p>What appears here first is not volume. It is coherence.</p>
            <p>
              As pieces go live, this layer will connect each contributor to their writing, pathways, and longer body of
              work.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.14} className="mt-10 border border-border bg-card p-6">
            <p className="text-label font-medium uppercase tracking-eyebrow text-ink-soft">Coming soon</p>
            <ul className="mt-4 divide-y divide-border">
              {COMING_ITEMS.map((title) => (
                <li key={title} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="font-medium text-foreground">{title}</span>
                  <span className="shrink-0 text-xs text-ink-soft">Coming soon</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section id="closing" variant="section" spacing="lg">
        <Container width="narrow">
          <RevealOnScroll>
            <AudienceLabel>Closing</AudienceLabel>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.06}>
            <h2 className="mt-2 text-balance text-h2 text-foreground">A network carried through the work</h2>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.1} className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>Movemental is not building a public leaderboard. It is building a body of thought people can actually follow.</p>
            <p>
              Contributors appear here not as endorsements, but as participants in something being written, tested, and
              carried together.
            </p>
          </RevealOnScroll>
          <RevealOnScroll delaySec={0.14} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/articles">
                Explore writing
                <ArrowRight className="ml-1 size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/contact">Start with clarity</Link>
            </Button>
          </RevealOnScroll>
        </Container>
      </Section>
    </div>
  );
}
