import type { CaseStudyContent, CaseStudySection } from "@/components/case-study/types";

const SKIP_SECTION_IDS = new Set(["context", "shared-pattern"]);

/** Sections rendered inside the long-form case study column (drops legacy framing). */
export function audienceOfferCaseStudySections(content: CaseStudyContent): CaseStudySection[] {
  return content.sections.filter((s) => !SKIP_SECTION_IDS.has(s.id));
}
