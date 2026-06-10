import { Fragment } from "react";

import type { ProseBlock, CaseStudySection } from "./types";

/**
 * `<CaseStudyProse />` — renders one structured section as long-form
 * editorial prose. Uses the project's `.article-prose` utility class for
 * baseline typography (serif italic display, hairline rules, pill-numbered
 * ordered lists). Section heading carries a pinned anchor for TOC links.
 */
export function CaseStudyProse({ section }: { section: CaseStudySection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-h`}
      className="case-study-section scroll-mt-[calc(var(--site-chrome-total,4.25rem)+1.5rem)]"
    >
      {section.eyebrow ? (
        <p className="text-[0.72rem] font-semibold uppercase tracking-eyebrow text-muted-foreground mb-3">
          {section.eyebrow}
        </p>
      ) : null}
      <h2
        id={`${section.id}-h`}
        className="font-serif italic text-foreground text-[clamp(1.85rem,3vw,2.6rem)] leading-[1.1] tracking-[-0.02em] mb-8"
      >
        {section.heading}
      </h2>

      <div className="article-prose max-w-(--prose-max)">
        {section.body.map((block, i) => (
          <Fragment key={i}>{renderBlock(block)}</Fragment>
        ))}
      </div>
    </section>
  );
}

function renderBlock(block: ProseBlock) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "lede":
      return (
        <p className="case-study-lede">
          <span className="font-medium text-foreground">{block.text}</span>
        </p>
      );
    case "h3":
      return (
        <h3 id={block.id} className={block.id ? "scroll-mt-[calc(var(--site-chrome-total,4.25rem)+1.5rem)]" : undefined}>
          {block.text}
        </h3>
      );
    case "h4":
      return <h4>{block.text}</h4>;
    case "ul":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    case "blockquote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.attribution ? <cite>{block.attribution}</cite> : null}
        </blockquote>
      );
    case "rule":
      return <hr />;
    case "callout":
      return (
        <aside className="case-study-callout">
          {block.label ? (
            <p className="case-study-callout__label">{block.label}</p>
          ) : null}
          <p className="case-study-callout__title">{block.title}</p>
          <ul className="case-study-callout__list">
            {block.body.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </aside>
      );
  }
}
