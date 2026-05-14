import { CaseStudy } from "./CaseStudy";
import type { AudienceConfig } from "./data/audiences";
import { PathClosingCta } from "./PathClosingCta";
import { PathFootnote } from "./PathFootnote";
import { PathIntro } from "./PathIntro";
import { PathStickySection } from "./PathStickySection";

/**
 * PathExperience — orchestrates the entire audience page.
 *
 * Body content (Safety / Sandbox / Skills / Solutions) is shared across the
 * three audiences; only the case study and footer audience-tag come from
 * the `audience` prop. See `data/audiences.ts`.
 *
 * Structure:
 *   PathIntro        (eyebrow + display + lede + StageMap)
 *   PathStickySection (33%/66% sticky-rail experience — `"use client"`)
 *   PathClosingCta   (midnight band, mini-map + CTAs)
 *   CaseStudy        (audience-specific story)
 *   PathFootnote     (audience-tagged wrap-up; sits above the global SiteFooter)
 */
export function PathExperience({ audience }: { audience: AudienceConfig }) {
  return (
    <>
      <PathIntro />
      <PathStickySection />
      <PathClosingCta />
      <CaseStudy data={audience.caseStudy} />
      <PathFootnote audienceLabel={audience.footerLabel} />
    </>
  );
}
