import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Section } from "@/components/primitives";
import { AudienceLabel, AudienceSerifEm } from "@/components/sections/audience-concept";
import { ArticleCard, ShelfHeader } from "@/components/sections/article-cards";
import { toArticleSummary } from "@/lib/articles";
import {
  TOPIC_META,
  listByTopic,
} from "@/lib/articles-collections";
import type { Topic } from "@/lib/articles-schema";
import { TOPICS } from "@/lib/articles-schema";
import { canonicalPageUrl } from "@/lib/site-url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): Array<{ slug: Topic }> {
  return TOPICS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!TOPICS.includes(slug as Topic)) return { title: "Topic not found" };
  const meta = TOPIC_META[slug as Topic];
  const url = canonicalPageUrl(`/articles/topic/${slug}`);
  return {
    title: `${meta.title} · Topic`,
    description: meta.deck,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${meta.title} — Movemental`,
      description: meta.deck,
      type: "website",
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  if (!TOPICS.includes(slug as Topic)) notFound();
  const topic = slug as Topic;
  const items = listByTopic(topic);
  if (!items.length) notFound();
  const meta = TOPIC_META[topic];

  return (
    <div data-articles="topic" className="text-pretty">
      <Section
        variant="default"
        spacing="sm"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.78rem] text-muted-foreground">
            <Link href="/articles" className="font-medium text-foreground underline-offset-4 hover:underline">Articles</Link>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span>Topic</span>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span aria-current="page">{meta.title}</span>
          </nav>
          <AudienceLabel>Topic</AudienceLabel>
          <h1 className="mt-2 max-w-[26ch] text-balance text-display text-foreground">
            <AudienceSerifEm>{meta.title}</AudienceSerifEm>
          </h1>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">{meta.deck}</p>
        </Container>
      </Section>

      <Section variant="section" spacing="sm" className="scroll-mt-(--site-chrome-total)">
        <Container>
          <ShelfHeader title="All pieces" count={items.length} />
          <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {items.map((article) => (
              <li key={article.slug} className="h-full">
                <ArticleCard article={toArticleSummary(article)} variant="default" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </div>
  );
}
