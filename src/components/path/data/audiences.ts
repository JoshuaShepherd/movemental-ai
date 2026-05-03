/**
 * Audience configuration — drives the path-sticky page for nonprofits,
 * churches, and institutions.
 *
 * The body content (Safety / Sandbox / Skills / Solutions) is shared across
 * all three audiences and lives in `shared.ts`. Only the case study and the
 * footer audience-tag differ; those live in `case-study.<audience>.ts` and
 * are wired together here into one `AudienceConfig`.
 */

import type { CaseStudyConfig } from "./case-study-types";

export type AudienceSlug = "nonprofits" | "churches" | "institutions";

export type AudienceConfig = {
  /** Stable slug — used for ids / data attributes. */
  slug: AudienceSlug;
  /** Footer audience-tag, e.g. "For nonprofit leaders.". Italic serif. */
  footerLabel: string;
  /** Case-study payload — see `case-study-types.ts`. */
  caseStudy: CaseStudyConfig;
};

import { nonprofitsCaseStudy } from "./case-study.nonprofits";
import { churchesCaseStudy } from "./case-study.churches";
import { institutionsCaseStudy } from "./case-study.institutions";

export const nonprofitsAudience: AudienceConfig = {
  slug: "nonprofits",
  footerLabel: "For nonprofit leaders.",
  caseStudy: nonprofitsCaseStudy,
};

export const churchesAudience: AudienceConfig = {
  slug: "churches",
  footerLabel: "For church leaders.",
  caseStudy: churchesCaseStudy,
};

export const institutionsAudience: AudienceConfig = {
  slug: "institutions",
  footerLabel: "For institutional leaders.",
  caseStudy: institutionsCaseStudy,
};
