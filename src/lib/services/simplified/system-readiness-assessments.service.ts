import { systemReadinessAssessments } from "@/lib/db/schema";
import {
  SystemReadinessAssessmentsSelectSchema,
  SystemReadinessAssessmentsInsertSchema,
  SystemReadinessAssessmentsUpdateSchema,
  SystemReadinessAssessmentsFiltersSchema,
  type SystemReadinessAssessments,
  type SystemReadinessAssessmentsCreate,
  type SystemReadinessAssessmentsUpdate,
  type SystemReadinessAssessmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SystemReadinessAssessmentsService extends SimplifiedService<
  typeof systemReadinessAssessments,
  SystemReadinessAssessments,
  SystemReadinessAssessmentsCreate,
  SystemReadinessAssessmentsUpdate,
  SystemReadinessAssessmentsFilters
> {
  constructor() {
    super(
      systemReadinessAssessments,
      SystemReadinessAssessmentsSelectSchema,
      SystemReadinessAssessmentsInsertSchema,
      SystemReadinessAssessmentsUpdateSchema,
      SystemReadinessAssessmentsFiltersSchema,
    );
  }
}

export const systemReadinessAssessmentsService = new SystemReadinessAssessmentsService();
