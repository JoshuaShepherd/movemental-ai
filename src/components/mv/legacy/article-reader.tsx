import Link from "next/link";
import type { ReactNode } from "react";
import { Children, isValidElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { Article } from "@/lib/articles";
import { getArticle } from "@/lib/articles";
import { getResearchItem } from "@/lib/research/data";
import { slugifyHeading } from "@/lib/slugify-heading";

import { MV_ROUTES, articleHref, researchHref } from "@/components/mv/routes";

import { MvToc } from "./toc";
import { MvBackArrow } from "./page-header";

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return Children.toArray(node).map(textOf).join("");
}

/** Article reader on Paper (board: Kept pages · Article). Body, copy and order are unchanged. */
export function ArticleReader({ article, relatedSlugs }: { article: Article; relatedSlugs: readonly string[] }) {
  // Headings get the ids the TOC was built with (same slug rule, same de-duplication).
  const seen = new Set<string>();
  const idFor = (children: ReactNode) => {
    const base = slugifyHeading(textOf(children).replace(/[*_`]/g, "").trim());
    let id = base;
    let n = 1;
    while (seen.has(id)) id = `${base}-${n++}`;
    seen.add(id);
    return id || undefined;
  };

  const researchSlugs = article.topics.includes("ai-credibility")
    ? ["ai-credibility-crisis", "seo-geo-discoverability"]
    : article.topics.includes("content-strategy")
      ? ["seo-geo-discoverability"]
      : [];
  const research = researchSlugs.map((s) => getResearchItem(s)).filter((i): i is NonNullable<typeof i> => !!i);
  const related = relatedSlugs.map((s) => getArticle(s)).filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <div className="mv-wrap mv-rd">
      <MvToc label="Contents" items={article.toc} />
      <article>
        <Link className="mv-back" href={MV_ROUTES.articles}>
          <MvBackArrow /> Articles
        </Link>
        <header className="mv-rd-head">
          <p className="mv-kicker">{article.eyebrow}</p>
          <h1 className="mv-rd-title">{article.title}</h1>
          {article.deck ? <p className="mv-rd-deck">{article.deck}</p> : null}
          <p className="mv-ph-meta">
            <span>{article.author}</span>
            <span>{article.readTime}</span>
            {article.publishedAt ? <span>{article.publishedAt.slice(0, 10)}</span> : null}
          </p>
        </header>
        <div className="mv-read">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 id={idFor(children)}>{children}</h2>,
              h3: ({ children }) => <h3 id={idFor(children)}>{children}</h3>,
              table: ({ children }) => (
                <div className="mv-read-table">
                  <table>{children}</table>
                </div>
              ),
            }}
          >
            {article.body}
          </ReactMarkdown>
        </div>
        {research.length ? (
          <div className="mv-related">
            <p className="mv-kicker">Related research</p>
            {research.map((r) => (
              <Link key={r.slug} className="mv-related-link" href={researchHref(r.slug)}>
                {r.title} <span>Research</span>
              </Link>
            ))}
          </div>
        ) : null}
        {related.length ? (
          <div className="mv-related">
            <p className="mv-kicker">Related articles</p>
            {related.map((a) => (
              <Link key={a.slug} className="mv-related-link" href={articleHref(a.slug)}>
                {a.title} <span>{a.readTime}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </article>
      <div />
    </div>
  );
}
