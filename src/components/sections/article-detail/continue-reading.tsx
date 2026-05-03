import Link from "next/link";

import { Container, Eyebrow, Section, SurfaceCard } from "@/components/primitives";
import type { ArticleSummary } from "@/lib/articles";

export function ContinueReading({
  articles,
  heading = "More from the Movemental library",
}: {
  articles: ArticleSummary[];
  heading?: string;
}) {
  if (!articles.length) return null;
  return (
    <Section variant="section" spacing="sm">
      <Container>
        <Eyebrow className="mb-2">Continue reading</Eyebrow>
        <h2 className="mb-9 max-w-[28ch] text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-semibold tracking-[-0.02em] text-balance text-foreground">
          {heading}
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <SurfaceCard asChild tone="on-section" className="h-full">
                <article className="flex h-full flex-col gap-2">
                  <span className="text-[0.68rem] font-semibold tracking-[0.14em] text-primary uppercase">
                    {article.eyebrow}
                  </span>
                  <h3 className="text-base leading-snug font-semibold tracking-[-0.01em]">
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {article.deck ?? article.excerpt}
                  </p>
                  <span className="mt-auto pt-2 text-xs text-muted-foreground">
                    {article.readTime}
                  </span>
                </article>
              </SurfaceCard>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
