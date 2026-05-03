import { assessmentResults } from "@/lib/db/schema";
import {
  AssessmentResultsSelectSchema,
  AssessmentResultsInsertSchema,
  AssessmentResultsUpdateSchema,
  AssessmentResultsFiltersSchema,
  type AssessmentResults,
  type AssessmentResultsCreate,
  type AssessmentResultsUpdate,
  type AssessmentResultsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssessmentResultsService extends SimplifiedService<
  typeof assessmentResults,
  AssessmentResults,
  AssessmentResultsCreate,
  AssessmentResultsUpdate,
  AssessmentResultsFilters
> {
  constructor() {
    super(
      assessmentResults,
      AssessmentResultsSelectSchema,
      AssessmentResultsInsertSchema,
      AssessmentResultsUpdateSchema,
      AssessmentResultsFiltersSchema,
    );
  }
}

export const assessmentResultsService = new AssessmentResultsService();
