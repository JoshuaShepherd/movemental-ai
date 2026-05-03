import { assessmentQuestions } from "@/lib/db/schema";
import {
  AssessmentQuestionsSelectSchema,
  AssessmentQuestionsInsertSchema,
  AssessmentQuestionsUpdateSchema,
  AssessmentQuestionsFiltersSchema,
  type AssessmentQuestions,
  type AssessmentQuestionsCreate,
  type AssessmentQuestionsUpdate,
  type AssessmentQuestionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class AssessmentQuestionsService extends SimplifiedService<
  typeof assessmentQuestions,
  AssessmentQuestions,
  AssessmentQuestionsCreate,
  AssessmentQuestionsUpdate,
  AssessmentQuestionsFilters
> {
  constructor() {
    super(
      assessmentQuestions,
      AssessmentQuestionsSelectSchema,
      AssessmentQuestionsInsertSchema,
      AssessmentQuestionsUpdateSchema,
      AssessmentQuestionsFiltersSchema,
    );
  }
}

export const assessmentQuestionsService = new AssessmentQuestionsService();
