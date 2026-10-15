import Link from "next/link";

import { getArticleBody } from "@/components/research/article-bodies";
import { getArticle } from "@/lib/articles";
import {
  FINDINGS_HERO,
  FINDINGS_STAT_PANELS,
  FINDINGS_TRUST_CHARTS,
  MASTER_SOURCES,
  RESEARCH_ITEMS,
  type ResearchItem,
} from "@/lib/research/data";

import { MV_ROUTES, articleHref } from "@/components/mv/routes";

import { MvArrow, MvBackArrow, MvPageHeader } from "./page-header";
import { Hl, kindLabel, ResearchRowItem } from "./research-row";
import { LoadArchiveRows, PaperActions } from "./research-client";
import { MvToc } from "./toc";

/**
 * The research pages on Paper (boards: Kept pages · Research, Research paper, Findings, Sources).
 * Copy and data are unchanged from the Ink Band versions; only the chrome and layout moved.
 */

export function ResearchIndex() {
  return (
    <div className="mv-wrap">
      <MvPageHeader
        eyebrow="Field notes · Research"
        title="The research behind the work."
        deck="Original papers on AI, trust, and the organizations whose credibility is on the line. Read here and cite freely. Printable from any paper; PDF bundles ship later."
      >
        <p className="mv-ph-meta">
          <span>All sources verified &amp; peer-reviewed.</span>
        </p>
      </MvPageHeader>
      <ul className="mv-ix">
        {RESEARCH_ITEMS.map((item) => (
          <ResearchRowItem key={item.slug} item={item} />
        ))}
        <LoadArchiveRows />
      </ul>
    </div>
  );
}

export function ResearchPaper({ item }: { item: ResearchItem }) {
  const companion = item.slug === "seo-geo-discoverability" ? getArticle("linking-strategy-eeat-geo-playbook") : undefined;
  return (
    <div className="mv-wrap mv-rd mv-rd--rail">
      <MvToc label="Contents" items={(item.sections ?? []).map((s) => ({ id: s.id, text: s.label }))} />
      <article>
        <Link className="mv-back" href={MV_ROUTES.research}>
          <MvBackArrow /> Research
        </Link>
        <header className="mv-rd-head">
          <p className="mv-kicker">{kindLabel(item)}</p>
          <h1 className="mv-rd-title">{item.title}</h1>
          {item.subtitle ? <p className="mv-rd-deck">{item.subtitle}</p> : null}
          <p className="mv-ph-meta">
            <span>By Movemental</span>
            <span>{item.sourceCount} sources</span>
            <span>{item.readMin} min read</span>
          </p>
        </header>
        <div className="mv-read mv-read--research">{getArticleBody(item)}</div>
        <PaperActions title={item.title} />
        {companion ? (
          <div className="mv-related">
            <p className="mv-kicker">Companion article</p>
            <Link className="mv-related-link" href={articleHref(companion.slug)}>
              {companion.title} <span>{companion.readTime}</span>
            </Link>
          </div>
        ) : null}
        <div className="mv-related">
          <p className="mv-kicker">Sources &amp; claims</p>
          <Link className="mv-related-link" href={MV_ROUTES.footnotes}>
            Browse the footnotes registry <span>→</span>
          </Link>
        </div>
      </article>
      <aside className="mv-rd-rail" aria-label="Sources">
        <p className="mv-rd-rail-label">Sources</p>
        {item.sources?.length ? (
          item.sources.map((s) => (
            <div key={s.index} className="mv-rd-rail-item" data-dim={s.dim ? "true" : undefined}>
              <span className="mv-rd-rail-n">{s.index}</span>
              <span>{s.title}</span>
            </div>
          ))
        ) : (
          <p className="mv-rd-rail-item">The full source list for this piece is being compiled.</p>
        )}
        <Link className="mv-back mv-back--sm" href={MV_ROUTES.sources}>
          View all sources →
        </Link>
      </aside>
    </div>
  );
}

export function ResearchFindingsPage() {
  return (
    <div className="mv-wrap">
      <MvPageHeader eyebrow={FINDINGS_HERO.eyebrow} title={FINDINGS_HERO.title} deck={<Hl text={FINDINGS_HERO.lede} />}>
        <p className="mv-ph-meta">
          <span>{FINDINGS_HERO.marginNote}</span>
        </p>
      </MvPageHeader>
      <section className="mv-fstats" aria-label="Adoption statistics">
        {FINDINGS_STAT_PANELS.map((s) => (
          <div className="mv-fstat" key={s.copy}>
            <p className="mv-fstat-nums">
              <span className="mv-fstat-a">{s.primary}</span>
              <span className="mv-fstat-vs">vs</span>
              <span className="mv-fstat-b">{s.secondary}</span>
            </p>
            <p className="mv-fstat-copy">{s.copy}</p>
            <p className="mv-fstat-src">{s.source}</p>
          </div>
        ))}
      </section>
      <section className="mv-trust" aria-labelledby="trust-title">
        <h2 id="trust-title" className="mv-dk-h2">
          The Trust Deficit
        </h2>
        <p className="mv-dk-intro">
          While adoption accelerates quietly, constituents remain skeptical. Transparency is emerging as the primary differentiator for institutions.
        </p>
        <div className="mv-bars">
          {FINDINGS_TRUST_CHARTS.map((b) => (
            <div className="mv-tbar" key={b.label}>
              <div className="mv-tbar-top">
                <p className="mv-tbar-label">{b.label}</p>
                <p className="mv-tbar-value">{b.value}%</p>
              </div>
              <div className="mv-tbar-track" role="img" aria-label={`${b.value} percent bar chart`}>
                <div className="mv-tbar-fill" data-tone={b.tone} style={{ width: `${b.value}%` }} />
              </div>
              <p className="mv-tbar-src">{b.source}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="mv-page-end">
        <Link className="mv-btn-ink" href={MV_ROUTES.researchFlagship}>
          Read the full paper →
        </Link>
      </div>
    </div>
  );
}

export function ResearchSourcesPage() {
  return (
    <div className="mv-wrap">
      <MvPageHeader eyebrow="Verifiable" title="Every claim, sourced." deck="We’re the company that argues for verifiability. So here’s ours.">
        <p className="mv-fine">
          Three layers, kept separate: <strong>empirical</strong> claims (prevalence, adoption, survey shares) carry source, date, and sample size;{" "}
          <strong>ethical</strong> and pastoral conclusions draw on separate reasoning; <strong>advocacy</strong> framing (Movemental’s thesis,
          formation-before-deployment) is labeled as argument, not as survey fact. Percentages from different studies are not interchangeable — see the
          findings page for paired comparisons only.
        </p>
        <p className="mv-fine">
          For Movemental’s full source-quality rubric (evidence vs. formation language, question router, maintenance cadence), see{" "}
          <em>authoritative-sources-ai-nonprofits-faith-formation</em> in the graded-high research corpus (maintainer reference, not a public reader).
        </p>
      </MvPageHeader>
      <ul className="mv-ix">
        {MASTER_SOURCES.map((s) => {
          const inner = (
            <>
              <span className="mv-src-n">{s.index}</span>
              <span className="mv-ix-main">
                <span className="mv-ix-title mv-ix-title--sm">{s.title}</span>
                <span className="mv-ix-meta">{s.meta}</span>
                {s.callout ? <span className="mv-src-callout">{s.callout}</span> : null}
              </span>
              {s.url ? <MvArrow /> : <span />}
            </>
          );
          return (
            <li key={s.index}>
              {s.url ? (
                <a className="mv-ix-row mv-ix-row--src" href={s.url} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div className="mv-ix-row mv-ix-row--src">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mv-fine mv-page-end">Sources current as of mid-2026. Verify against each provider before relying on them.</p>
    </div>
  );
}
