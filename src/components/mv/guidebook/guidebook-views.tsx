import Link from "next/link";

import { MV_ROUTES, guidebookChapterHref, mapStageHref } from "../routes";
import {
  CHAPTERS,
  EDITIONS,
  type EditionSlug,
  PARTS,
  POLICY_EXAMPLE,
  chapterBySlug,
  editionFor,
  partOf,
} from "./guidebook";

/** Guidebook index and chapter reader. Board: Guidebook. Copy verbatim. */

function EditionBar({ current, hrefFor }: { current: EditionSlug; hrefFor: (slug: EditionSlug) => string }) {
  return (
    <div className="mv-edbar">
      <div role="group" aria-label="Edition" className="mv-wrap mv-edbar-inner">
        <span className="mv-caption mv-muted" style={{ marginRight: 6 }}>
          Edition
        </span>
        {EDITIONS.map((e) => (
          <Link
            key={e.slug}
            className="mv-pick"
            style={{ fontSize: 14.5 }}
            href={hrefFor(e.slug)}
            aria-current={e.slug === current ? "page" : undefined}
          >
            {e.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

const withEdition = (base: string, ed: EditionSlug) => (ed === "nonprofit" ? base : `${base}?edition=${ed}`);

export function GuidebookIndex({ edition }: { edition?: string }) {
  const ed = editionFor(edition);
  const first = CHAPTERS.find((c) => c.written)!;
  return (
    <>
      <EditionBar current={ed.slug} hrefFor={(s) => withEdition(MV_ROUTES.guidebook, s)} />
      <section className="mv-wrap mv-stack" style={{ paddingTop: 80, paddingBottom: 56, gap: 20 }}>
        <p className="mv-small mv-muted">The guidebook · {ed.label} edition</p>
        <h1 className="mv-h1" style={{ maxWidth: 1000 }}>
          The whole method, in the open
        </h1>
        <p className="mv-reading-lg mv-soft" style={{ maxWidth: 700, fontSize: 21 }}>
          Everything a capable team needs to resolve and respond on its own. No account, no form,
          nothing held back. Inside the Map, the same chapters sit beside the work they describe.
        </p>
        <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", paddingTop: 6 }}>
          <Link className="mv-pill" href={guidebookChapterHref(first.slug, ed.slug === "nonprofit" ? undefined : ed.slug)}>
            Start reading
          </Link>
          {/* TODO(S04-guidebook-new): "Download the … edition as a PDF" once an edition PDF exists. */}
        </div>
      </section>
      <section className="mv-wrap" style={{ paddingBottom: 96 }}>
        <p className="mv-caption mv-muted" style={{ marginBottom: 14 }}>
          Chapters are published as they are written.
        </p>
        <div className="mv-parts">
          {PARTS.map((p) => (
            <div key={p.title} className="mv-stack" style={{ padding: "26px 0 30px", borderTop: "1px solid var(--mv-ink)", gap: 6 }}>
              <p className="mv-muted" style={{ fontSize: 13.5 }}>
                {p.label}
              </p>
              <h2 className="mv-h3--sm" style={{ marginBottom: 8 }}>
                {p.title}
              </h2>
              <ol style={{ listStyle: "none", padding: 0 }}>
                {p.chapters.map((c) => (
                  <li key={c.slug}>
                    {c.written ? (
                      <Link className="mv-chapter-row" data-written="true" href={guidebookChapterHref(c.slug, ed.slug === "nonprofit" ? undefined : ed.slug)}>
                        <span>{c.n}</span>
                        <span>{c.title}</span>
                      </Link>
                    ) : (
                      <span className="mv-chapter-row" data-written="false">
                        <span>{c.n}</span>
                        <span>{c.title}</span>
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ChapterLink({ slug, edition, children, className, current }: {
  slug: string;
  edition: EditionSlug;
  children: React.ReactNode;
  className: string;
  current?: boolean;
}) {
  const c = chapterBySlug(slug)!;
  if (!c.written) return <span className={`${className} mv-muted`}>{children}</span>;
  return (
    <Link
      className={className}
      href={guidebookChapterHref(slug, edition === "nonprofit" ? undefined : edition)}
      aria-current={current ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

/** Chapter 6 · Policy, the one chapter written on the board. */
export function PolicyChapter({ edition }: { edition?: string }) {
  const ed = editionFor(edition);
  const part = partOf("policy");
  const i = CHAPTERS.findIndex((c) => c.slug === "policy");
  const prev = CHAPTERS[i - 1]!;
  const next = CHAPTERS[i + 1]!;
  return (
    <>
      <EditionBar current={ed.slug} hrefFor={(s) => withEdition(guidebookChapterHref("policy"), s)} />
      <div className="mv-wrap mv-reader">
        <nav aria-label="Chapters in this part" className="mv-toc">
          <Link className="mv-link-target mv-muted" style={{ fontSize: 14.5 }} href={withEdition(MV_ROUTES.guidebook, ed.slug)}>
            All chapters
          </Link>
          <p className="mv-muted" style={{ fontSize: 13.5, margin: "8px 0 4px" }}>
            {part.label} · {part.title}
          </p>
          {part.chapters.map((c) => (
            <ChapterLink
              key={c.slug}
              slug={c.slug}
              edition={ed.slug}
              className="mv-toc-item"
              current={c.slug === "policy"}
            >
              <span>
                {c.n} · {c.title}
              </span>
            </ChapterLink>
          ))}
        </nav>
        <article className="mv-prose">
          <p className="mv-muted" style={{ fontFamily: "var(--mv-font-ui)", fontSize: 14.5, marginBottom: 10 }}>
            Chapter 6 · {ed.label} edition
          </p>
          <h1 className="mv-h2 mv-h2--lg" style={{ marginBottom: 28 }}>
            Policy: what people may and may not do
          </h1>
          <p>
            A policy is the part of the charter people will actually consult. It answers a practical
            question for someone at a desk on an ordinary Tuesday: may I do this with AI, here, with
            this information?
          </p>
          <p>
            Write it from what your people resolved and what the Reality Assessment found. A policy
            that ignores how people already work will be ignored in return.
          </p>
          <p>
            Most good policies do three things. They name what is allowed, so people stop guessing.
            They name what is never allowed, with the reason, so the line holds under pressure. And
            they say who to ask when something falls in between.
          </p>
          <h2>Start with what is never allowed</h2>
          <p>
            Begin with the refusals, because they are the hardest to agree on and the easiest to
            lose. A refusal is a commitment, and you will cite it when a vendor or a deadline argues
            for an exception.
          </p>
          <figure className="mv-fig" style={{ margin: "4px 0 28px", gap: 8 }}>
            <figcaption className="mv-muted" style={{ fontSize: 13 }}>
              An example from a {ed.label.toLowerCase()} charter
            </figcaption>
            <p className="mv-reading" style={{ fontSize: 18.5, lineHeight: 1.5 }}>
              {POLICY_EXAMPLE[ed.slug]}
            </p>
          </figure>
          <h2>Then say what is allowed</h2>
          <p>
            Name the tools people may use and the kinds of work they may help with. Be specific
            enough that someone new could follow it on their first day.
          </p>
          <h2>Say who decides the rest</h2>
          <p>
            Something will always fall between the lines. Name the person or small group who answers
            those questions, and how quickly they will answer. Their decisions go into the Rules at
            the next review.
          </p>
          <aside className="mv-donow">
            <p style={{ fontSize: 15, fontWeight: 500 }}>Do this now</p>
            <p className="mv-reading" style={{ fontSize: 18, lineHeight: 1.55 }}>
              Open Policy in your Map. The agent drafts from your people’s Resolutions and marks every
              line by where it came from. Settle the refusals first, then the rest.
            </p>
            <Link className="mv-link-target" style={{ alignSelf: "flex-start" }} href={mapStageHref("decide")}>
              Open the Map
            </Link>
          </aside>
          <nav
            aria-label="Previous and next chapter"
            className="mv-two"
            style={{ gap: 24, marginTop: 48, paddingTop: 20, borderTop: "1px solid var(--mv-rule)" }}
          >
            <ChapterLink slug={prev.slug} edition={ed.slug} className="mv-stack">
              <span className="mv-muted" style={{ fontSize: 13.5 }}>
                Previous
              </span>
              <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 24 }}>
                {prev.n} · {prev.title}
              </span>
            </ChapterLink>
            <ChapterLink slug={next.slug} edition={ed.slug} className="mv-stack">
              <span className="mv-muted" style={{ fontSize: 13.5, textAlign: "right" }}>
                Next
              </span>
              <span style={{ fontFamily: "var(--mv-font-display)", fontSize: 24, textAlign: "right" }}>
                {next.n} · {next.title}
              </span>
            </ChapterLink>
          </nav>
        </article>
      </div>
    </>
  );
}
