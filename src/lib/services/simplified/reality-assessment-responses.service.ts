import { realityAssessmentResponses } from "@/lib/db/schema";
import {
  RealityAssessmentResponsesSelectSchema,
  RealityAssessmentResponsesInsertSchema,
  RealityAssessmentResponsesUpdateSchema,
  RealityAssessmentResponsesFiltersSchema,
  type RealityAssessmentResponses,
  type RealityAssessmentResponsesCreate,
  type RealityAssessmentResponsesUpdate,
  type RealityAssessmentResponsesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class RealityAssessmentResponsesService extends SimplifiedService<
  typeof realityAssessmentResponses,
  RealityAssessmentResponses,
  RealityAssessmentResponsesCreate,
  RealityAssessmentResponsesUpdate,
  RealityAssessmentResponsesFilters
> {
  constructor() {
    super(
      realityAssessmentResponses,
      RealityAssessmentResponsesSelectSchema,
      RealityAssessmentResponsesInsertSchema,
      RealityAssessmentResponsesUpdateSchema,
      RealityAssessmentResponsesFiltersSchema,
    );
  }
}

export const realityAssessmentResponsesService = new RealityAssessmentResponsesService();
