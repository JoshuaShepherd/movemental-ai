import { assessments } from "@/lib/db/schema";
import {
  AssessmentsSelectSchema,
  AssessmentsInsertSchema,
  AssessmentsUpdateSchema,
  AssessmentsFiltersSchema,
  type Assessments,
  type AssessmentsCreate,
  type AssessmentsUpdate,
  type AssessmentsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssessmentsService extends SimplifiedService<
  typeof assessments,
  Assessments,
  AssessmentsCreate,
  AssessmentsUpdate,
  AssessmentsFilters
> {
  constructor() {
    super(
      assessments,
      AssessmentsSelectSchema,
      AssessmentsInsertSchema,
      AssessmentsUpdateSchema,
      AssessmentsFiltersSchema,
    );
  }
}

export const assessmentsService = new AssessmentsService();
