import { realityAssessmentPredictions } from "@/lib/db/schema";
import {
  RealityAssessmentPredictionsSelectSchema,
  RealityAssessmentPredictionsInsertSchema,
  RealityAssessmentPredictionsUpdateSchema,
  RealityAssessmentPredictionsFiltersSchema,
  type RealityAssessmentPredictions,
  type RealityAssessmentPredictionsCreate,
  type RealityAssessmentPredictionsUpdate,
  type RealityAssessmentPredictionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class RealityAssessmentPredictionsService extends SimplifiedService<
  typeof realityAssessmentPredictions,
  RealityAssessmentPredictions,
  RealityAssessmentPredictionsCreate,
  RealityAssessmentPredictionsUpdate,
  RealityAssessmentPredictionsFilters
> {
  constructor() {
    super(
      realityAssessmentPredictions,
      RealityAssessmentPredictionsSelectSchema,
      RealityAssessmentPredictionsInsertSchema,
      RealityAssessmentPredictionsUpdateSchema,
      RealityAssessmentPredictionsFiltersSchema,
    );
  }
}

export const realityAssessmentPredictionsService = new RealityAssessmentPredictionsService();
