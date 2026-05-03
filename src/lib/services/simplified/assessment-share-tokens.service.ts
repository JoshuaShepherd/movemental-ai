import { assessmentShareTokens } from "@/lib/db/schema";
import {
  AssessmentShareTokensSelectSchema,
  AssessmentShareTokensInsertSchema,
  AssessmentShareTokensUpdateSchema,
  AssessmentShareTokensFiltersSchema,
  type AssessmentShareTokens,
  type AssessmentShareTokensCreate,
  type AssessmentShareTokensUpdate,
  type AssessmentShareTokensFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssessmentShareTokensService extends SimplifiedService<
  typeof assessmentShareTokens,
  AssessmentShareTokens,
  AssessmentShareTokensCreate,
  AssessmentShareTokensUpdate,
  AssessmentShareTokensFilters
> {
  constructor() {
    super(
      assessmentShareTokens,
      AssessmentShareTokensSelectSchema,
      AssessmentShareTokensInsertSchema,
      AssessmentShareTokensUpdateSchema,
      AssessmentShareTokensFiltersSchema,
    );
  }
}

export const assessmentShareTokensService = new AssessmentShareTokensService();
