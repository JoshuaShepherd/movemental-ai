import { assessmentCheckpoints } from "@/lib/db/schema";
import {
  AssessmentCheckpointsSelectSchema,
  AssessmentCheckpointsInsertSchema,
  AssessmentCheckpointsUpdateSchema,
  AssessmentCheckpointsFiltersSchema,
  type AssessmentCheckpoints,
  type AssessmentCheckpointsCreate,
  type AssessmentCheckpointsUpdate,
  type AssessmentCheckpointsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssessmentCheckpointsService extends SimplifiedService<
  typeof assessmentCheckpoints,
  AssessmentCheckpoints,
  AssessmentCheckpointsCreate,
  AssessmentCheckpointsUpdate,
  AssessmentCheckpointsFilters
> {
  constructor() {
    super(
      assessmentCheckpoints,
      AssessmentCheckpointsSelectSchema,
      AssessmentCheckpointsInsertSchema,
      AssessmentCheckpointsUpdateSchema,
      AssessmentCheckpointsFiltersSchema,
    );
  }
}

export const assessmentCheckpointsService = new AssessmentCheckpointsService();
