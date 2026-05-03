import { assessmentResponses } from "@/lib/db/schema";
import {
  AssessmentResponsesSelectSchema,
  AssessmentResponsesInsertSchema,
  AssessmentResponsesUpdateSchema,
  AssessmentResponsesFiltersSchema,
  type AssessmentResponses,
  type AssessmentResponsesCreate,
  type AssessmentResponsesUpdate,
  type AssessmentResponsesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssessmentResponsesService extends SimplifiedService<
  typeof assessmentResponses,
  AssessmentResponses,
  AssessmentResponsesCreate,
  AssessmentResponsesUpdate,
  AssessmentResponsesFilters
> {
  constructor() {
    super(
      assessmentResponses,
      AssessmentResponsesSelectSchema,
      AssessmentResponsesInsertSchema,
      AssessmentResponsesUpdateSchema,
      AssessmentResponsesFiltersSchema,
    );
  }
}

export const assessmentResponsesService = new AssessmentResponsesService();
