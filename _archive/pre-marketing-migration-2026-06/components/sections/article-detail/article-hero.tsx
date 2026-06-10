import Link from "next/link";

import { Container, Display, Section } from "@/components/primitives";
import { SeriesPositionBadge } from "@/components/sections/article-cards";
import type { Article } from "@/lib/articles";
import { CANON_SECTION_META, SERIES_META } from "@/lib/articles-collections";
import type { ArticleShape } from "@/lib/articles-schema";

function shapeCollection(shape: ArticleShape): { label: string; href: string } | null {
  switch (shape) {
    case "canon":
      return { label: "Canon", href: "/articles/canon" };
    case "guide":
      return { label: "Guides", href: "/articles/guides" };
    case "playbook":
      return { label: "Playbooks", href: "/articles/playbooks" };
    case "field-guide":
    case "case-study":
    case "methodology":
      return { label: "Methodology", href: "/articles/methodology" };
    case "sandbox":
      return { label: "Sandbox", href: "/articles/sandbox" };
    case "ai-note":
    case "story":
    default:
      return null;
  }
}

export function ArticleHero({ article, canonTotal = 23 }: { article: Article; canonTotal?: number }) {
  const collection = shapeCollection(article.shape);

  return (
    <Section variant="midnight" spacing="lg" as="header" className="pt-28 md:pt-32">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-[0.78rem] text-inverse-foreground/55"
        >
          <Link href="/" className="font-medium text-inverse-foreground/65 hover:text-inverse-foreground">
            Movemental
          </Link>
          <span aria-hidden="true" className="mx-2 opacity-40">/</span>
          <Link
            href="/articles"
            className="font-medium text-inverse-foreground/65 hover:text-inverse-foreground"
          >
            Articles
          </Link>
          {collection ? (
            <>
              <span aria-hidden="true" className="mx-2 opacity-40">/</span>
              <Link
                href={collection.href}
                className="font-medium text-inverse-foreground/65 hover:text-inverse-foreground"
              >
                {collection.label}
              </Link>
            </>
          ) : null}
          <span aria-hidden="true" className="mx-2 opacity-40">/</span>
          <span aria-current="page">{article.title}</span>
        </nav>

        <span className="mb-4 inline-block rounded-full bg-inverse-foreground/10 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.14em] text-inverse-foreground/90 uppercase">
          {article.eyebrow}
        </span>

        {article.shape === "canon" && article.canonSection && article.canonOrder != null ? (
          <SeriesPositionBadge
            kind="Canon"
            label={CANON_SECTION_META[article.canonSection].title}
            position={article.canonOrder}
            total={canonTotal}
            inverse
            className="mb-6"
          />
        ) : null}

        {article.series && article.seriesOrder != null && article.shape !== "canon" ? (
          <SeriesPositionBadge
            kind="Series"
            label={SERIES_META[article.series].title}
            position={article.seriesOrder}
            total={Math.max(article.seriesOrder, 9)}
            inverse
            className="mb-6"
          />
        ) : null}

        <Display
          as="h1"
          size="lg"
          className="mb-6 max-w-[22ch] text-balance text-inverse-foreground"
        >
          {article.title}
        </Display>

        {article.deck ? (
          <p className="mb-8 max-w-[54ch] text-lg leading-snug text-inverse-foreground/75">
            {article.deck}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-inverse-foreground/65">
          <span>
            By <strong className="font-semibold text-inverse-foreground">{article.author}</strong>
          </span>
          {article.publishedAt ? (
            <>
              <span aria-hidden="true" className="opacity-35">·</span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </>
          ) : null}
          <span aria-hidden="true" className="opacity-35">·</span>
          <span>{article.readTime}</span>
        </div>
      </Container>
    </Section>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(d);
  } catch {
    return iso;
  }
}
