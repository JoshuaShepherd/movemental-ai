import { checkpointQuestions } from "@/lib/db/schema";
import {
  CheckpointQuestionsSelectSchema,
  CheckpointQuestionsInsertSchema,
  CheckpointQuestionsUpdateSchema,
  CheckpointQuestionsFiltersSchema,
  type CheckpointQuestions,
  type CheckpointQuestionsCreate,
  type CheckpointQuestionsUpdate,
  type CheckpointQuestionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CheckpointQuestionsService extends SimplifiedService<
  typeof checkpointQuestions,
  CheckpointQuestions,
  CheckpointQuestionsCreate,
  CheckpointQuestionsUpdate,
  CheckpointQuestionsFilters
> {
  constructor() {
    super(
      checkpointQuestions,
      CheckpointQuestionsSelectSchema,
      CheckpointQuestionsInsertSchema,
      CheckpointQuestionsUpdateSchema,
      CheckpointQuestionsFiltersSchema,
    );
  }
}

export const checkpointQuestionsService = new CheckpointQuestionsService();
