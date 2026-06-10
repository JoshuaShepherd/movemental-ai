import type { ReadinessQuestion, ReadinessSection } from "@/lib/sandboxlive/readiness-intake-sections";
import { MENTAL_MODEL_OTHER_OPTION } from "@/lib/sandboxlive/readiness-intake-sections";

import { YOUTHFRONT_ORG_SLUG } from "@/lib/legal/agreement-catalog";

export { YOUTHFRONT_ORG_SLUG };

const YOUTHFRONT_HIDDEN_QUESTION_IDS = new Set(["time_per_week", "best_time"]);

/** Whether a question should render for this org (slug from `organizations.slug`). */
export function shouldShowReadinessQuestion(
  questionId: string,
  organizationSlug: string | null | undefined,
): boolean {
  const slug = organizationSlug?.trim().toLowerCase() ?? "";
  if (slug === YOUTHFRONT_ORG_SLUG && YOUTHFRONT_HIDDEN_QUESTION_IDS.has(questionId)) {
    return false;
  }
  return true;
}

/** Questions visible in the current section given org rules and conditional fields. */
export function visibleReadinessQuestions(
  section: ReadinessSection,
  answers: Record<string, unknown>,
  organizationSlug: string | null | undefined,
): ReadinessQuestion[] {
  return section.questions.filter((q) => {
    if (!shouldShowReadinessQuestion(q.id, organizationSlug)) return false;
    if (q.id === "mental_model_other" && answers.mental_model !== MENTAL_MODEL_OTHER_OPTION) {
      return false;
    }
    return true;
  });
}