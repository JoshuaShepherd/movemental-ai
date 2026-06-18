import { safetyQuestions } from "@/lib/db/schema";
import {
  SafetyQuestionsSelectSchema,
  SafetyQuestionsInsertSchema,
  SafetyQuestionsUpdateSchema,
  SafetyQuestionsFiltersSchema,
  type SafetyQuestions,
  type SafetyQuestionsCreate,
  type SafetyQuestionsUpdate,
  type SafetyQuestionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class SafetyQuestionsService extends SimplifiedService<
  typeof safetyQuestions,
  SafetyQuestions,
  SafetyQuestionsCreate,
  SafetyQuestionsUpdate,
  SafetyQuestionsFilters
> {
  constructor() {
    super(
      safetyQuestions,
      SafetyQuestionsSelectSchema,
      SafetyQuestionsInsertSchema,
      SafetyQuestionsUpdateSchema,
      SafetyQuestionsFiltersSchema,
    );
  }
}

export const safetyQuestionsService = new SafetyQuestionsService();
