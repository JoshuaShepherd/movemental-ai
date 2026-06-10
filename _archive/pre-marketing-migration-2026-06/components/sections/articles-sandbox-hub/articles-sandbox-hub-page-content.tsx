import Link from "next/link";

import {
  ArrowLink,
  Container,
  Display,
  Eyebrow,
  Prose,
  Reveal,
  Section,
  SurfaceCard,
} from "@/components/primitives";
import { groupSandboxCanonByLayer, listSandboxCanonHubEntries } from "@/lib/sandbox-canon";

function humanizeLayer(layer: string) {
  return layer.replace(/-/g, " ");
}

export function ArticlesSandboxHubPageContent() {
  const entries = listSandboxCanonHubEntries();
  const canonCount = entries.length;
  const byLayer = groupSandboxCanonByLayer(entries);
  const layerOrder = Array.from(byLayer.keys()).sort((a, b) => {
    const minA = Math.min(...(byLayer.get(a) ?? []).map((e) => e.order));
    const minB = Math.min(...(byLayer.get(b) ?? []).map((e) => e.order));
    return minA - minB;
  });

  return (
    <>
      <Section variant="midnight" spacing="lg">
        <Container>
          <Reveal>
            <Eyebrow className="mb-4 text-inverse-foreground/70">Sandbox canon</Eyebrow>
            <Display size="lg" className="max-w-4xl text-balance">
              {canonCount} articles, <em>one season design</em>
            </Display>
            <Prose className="mt-6 max-w-2xl text-lg text-inverse-foreground/80 [&_p]:text-inverse-foreground/80">
              <p>
                These pieces are the public argument behind the Sandbox Season. Read them in order below, or jump to
                the offering when you are ready to talk about a twelve-week facilitated season.
              </p>
            </Prose>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services/sandbox-season"
                className="inline-flex items-center gap-2 rounded-full bg-inverse-foreground px-6 py-3 text-sm font-medium text-inverse-surface transition-transform hover:-translate-y-0.5"
              >
                Sandbox Season
              </Link>
              <Link
                href="/articles/the-purpose-of-sandbox"
                className="inline-flex items-center gap-2 border-b border-inverse-foreground/40 pb-0.5 text-sm font-medium text-inverse-foreground hover:border-inverse-foreground"
              >
                How Sandbox fits the AI Stewardship Sequence
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <Eyebrow className="mb-4">Reading order</Eyebrow>
              <Display size="md" as="h2" className="text-balance">
                Grouped by sandbox layer
              </Display>
              <Prose className="mt-4">
                <p>
                  Each file carries ordered frontmatter so the hub can sort. Within a layer, read ascending order. The
                  purpose-of-sandbox essay (canon #15) still anchors how Sandbox sits inside the wider staircase.
                </p>
              </Prose>
            </div>
          </Reveal>

          <div className="space-y-14">
            {layerOrder.map((layer) => {
              const group = byLayer.get(layer) ?? [];
              if (group.length === 0) return null;
              return (
                <Reveal key={layer}>
                  <div className="mb-6">
                    <h2 className="font-serif text-[clamp(1.35rem,2.4vw,1.75rem)] font-normal italic tracking-[-0.005em] text-foreground">
                      {humanizeLayer(layer)}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {group.length} piece{group.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    {group
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                        <SurfaceCard key={item.href} tone="on-background" className="h-full gap-3">
                          <span className="text-[0.72rem] font-medium uppercase tracking-eyebrow text-ink-soft">
                            Order {item.order}
                          </span>
                          <h3 className="text-[1.05rem] font-medium leading-snug text-foreground">{item.title}</h3>
                          <div className="mt-auto pt-2">
                            <ArrowLink href={item.href}>Read</ArrowLink>
                          </div>
                        </SurfaceCard>
                      ))}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mx-auto mt-16 max-w-xl rounded-2xl bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Prefer the methodology map first? It points here without repeating the articles.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <ArrowLink href="/methodology">Open methodology map</ArrowLink>
                <ArrowLink href="/methodology/eight-patterns" tone="foreground">
                  Eight patterns (visual)
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
