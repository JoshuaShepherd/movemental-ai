import { exerciseCompletions } from "@/lib/db/schema";
import {
  ExerciseCompletionsSelectSchema,
  ExerciseCompletionsInsertSchema,
  ExerciseCompletionsUpdateSchema,
  ExerciseCompletionsFiltersSchema,
  type ExerciseCompletions,
  type ExerciseCompletionsCreate,
  type ExerciseCompletionsUpdate,
  type ExerciseCompletionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ExerciseCompletionsService extends SimplifiedService<
  typeof exerciseCompletions,
  ExerciseCompletions,
  ExerciseCompletionsCreate,
  ExerciseCompletionsUpdate,
  ExerciseCompletionsFilters
> {
  constructor() {
    super(
      exerciseCompletions,
      ExerciseCompletionsSelectSchema,
      ExerciseCompletionsInsertSchema,
      ExerciseCompletionsUpdateSchema,
      ExerciseCompletionsFiltersSchema,
    );
  }
}

export const exerciseCompletionsService = new ExerciseCompletionsService();
