import { realityAssessmentSessions } from "@/lib/db/schema";
import {
  RealityAssessmentSessionsSelectSchema,
  RealityAssessmentSessionsInsertSchema,
  RealityAssessmentSessionsUpdateSchema,
  RealityAssessmentSessionsFiltersSchema,
  type RealityAssessmentSessions,
  type RealityAssessmentSessionsCreate,
  type RealityAssessmentSessionsUpdate,
  type RealityAssessmentSessionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class RealityAssessmentSessionsService extends SimplifiedService<
  typeof realityAssessmentSessions,
  RealityAssessmentSessions,
  RealityAssessmentSessionsCreate,
  RealityAssessmentSessionsUpdate,
  RealityAssessmentSessionsFilters
> {
  constructor() {
    super(
      realityAssessmentSessions,
      RealityAssessmentSessionsSelectSchema,
      RealityAssessmentSessionsInsertSchema,
      RealityAssessmentSessionsUpdateSchema,
      RealityAssessmentSessionsFiltersSchema,
    );
  }
}

export const realityAssessmentSessionsService = new RealityAssessmentSessionsService();
