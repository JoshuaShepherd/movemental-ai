/**
 * Case-study content model. Authored in plain TS objects so the structure is
 * grep-able and easy to edit. Rendered by `<CaseStudyProse />`.
 */

export type ProseBlock =
  | { type: "p"; text: string }
  | { type: "lede"; text: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "h4"; text: string }
  | { type: "ul"; items: ReadonlyArray<string> }
  | { type: "ol"; items: ReadonlyArray<string> }
  | { type: "blockquote"; text: string; attribution?: string }
  | { type: "rule" }
  | {
      type: "callout";
      label?: string;
      title: string;
      body: ReadonlyArray<string>;
    };

export type CaseStudySection = {
  /** kebab-case anchor; used for #hash links and TOC scroll-spy */
  id: string;
  /** Short label for the sidebar TOC */
  navLabel: string;
  /** Heading rendered above the section in the article body */
  heading: string;
  /** Optional eyebrow rendered above the heading (e.g. "Stage 01") */
  eyebrow?: string;
  body: ReadonlyArray<ProseBlock>;
};

export type CaseStudyHero = {
  /** "Movemental for Churches" */
  title: string;
  /** Short kicker line above the title (e.g. "For organizational leaders") */
  kicker: string;
  /** A 1–2 sentence supporting line below the title */
  lede: string;
};

export type CaseStudyContent = {
  audience: "churches" | "nonprofits" | "institutions";
  hero: CaseStudyHero;
  sections: ReadonlyArray<CaseStudySection>;
};
