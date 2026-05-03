import { dualIntelligenceAssessments } from "@/lib/db/schema";
import {
  DualIntelligenceAssessmentsSelectSchema,
  DualIntelligenceAssessmentsInsertSchema,
  DualIntelligenceAssessmentsUpdateSchema,
  DualIntelligenceAssessmentsFiltersSchema,
  type DualIntelligenceAssessments,
  type DualIntelligenceAssessmentsCreate,
  type DualIntelligenceAssessmentsUpdate,
  type DualIntelligenceAssessmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class DualIntelligenceAssessmentsService extends SimplifiedService<
  typeof dualIntelligenceAssessments,
  DualIntelligenceAssessments,
  DualIntelligenceAssessmentsCreate,
  DualIntelligenceAssessmentsUpdate,
  DualIntelligenceAssessmentsFilters
> {
  constructor() {
    super(
      dualIntelligenceAssessments,
      DualIntelligenceAssessmentsSelectSchema,
      DualIntelligenceAssessmentsInsertSchema,
      DualIntelligenceAssessmentsUpdateSchema,
      DualIntelligenceAssessmentsFiltersSchema,
    );
  }
}

export const dualIntelligenceAssessmentsService = new DualIntelligenceAssessmentsService();
