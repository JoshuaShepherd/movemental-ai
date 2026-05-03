import type { Metadata } from "next";
import Link from "next/link";

import { Container, Section } from "@/components/primitives";
import { AudienceLabel, AudienceSerifEm } from "@/components/sections/audience-concept";
import { ArticleCard, ShelfHeader } from "@/components/sections/article-cards";
import { toArticleSummary } from "@/lib/articles";
import { listPlaybooks } from "@/lib/articles-collections";
import { canonicalPageUrl } from "@/lib/site-url";

const title = "Playbooks";
const description =
  "Audience-specific Movemental integration playbooks — movement leader, nonprofit, church, institution.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalPageUrl("/articles/playbooks") },
  openGraph: {
    url: canonicalPageUrl("/articles/playbooks"),
    title: `${title} — Movemental`,
    description,
    type: "website",
  },
};

export default function PlaybooksPage() {
  const playbooks = listPlaybooks();

  return (
    <div data-articles="playbooks" className="text-pretty">
      <Section
        variant="default"
        spacing="sm"
        className="scroll-mt-(--site-chrome-total) pt-8 md:pt-12"
      >
        <Container>
          <nav aria-label="Breadcrumb" className="mb-6 text-[0.78rem] text-muted-foreground">
            <Link href="/articles" className="font-medium text-foreground underline-offset-4 hover:underline">Articles</Link>
            <span aria-hidden className="mx-2 opacity-40">/</span>
            <span aria-current="page">Playbooks</span>
          </nav>
          <AudienceLabel>Playbooks</AudienceLabel>
          <h1 className="mt-2 max-w-[24ch] text-balance text-display text-foreground">
            One playbook per <AudienceSerifEm>audience</AudienceSerifEm>.
          </h1>
          <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-muted-foreground">
            Each playbook walks a specific kind of organization through the AI Stewardship Sequence — shaped by the constraints, decisions, and stakeholders it actually carries.
          </p>
        </Container>
      </Section>

      <Section variant="section" spacing="sm" className="scroll-mt-(--site-chrome-total)">
        <Container>
          <ShelfHeader
            title="By audience"
            count={playbooks.length}
            deck="Read the one that names you — or the one nearest what you're facing right now."
          />
          <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {playbooks.map((article) => (
              <li key={article.slug} className="h-full">
                <ArticleCard article={toArticleSummary(article)} variant="default" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section variant="default" spacing="sm">
        <Container>
          <p className="text-sm text-muted-foreground">
            Not sure which fits?{" "}
            <Link href="/contact" className="font-medium text-foreground underline-offset-4 hover:underline">
              Say a sentence about your organization
            </Link>{" "}
            and we&rsquo;ll point you at the right starting piece.
          </p>
        </Container>
      </Section>
    </div>
  );
}
