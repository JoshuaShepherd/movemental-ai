import { exercises } from "@/lib/db/schema";
import {
  ExercisesSelectSchema,
  ExercisesInsertSchema,
  ExercisesUpdateSchema,
  ExercisesFiltersSchema,
  type Exercises,
  type ExercisesCreate,
  type ExercisesUpdate,
  type ExercisesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ExercisesService extends SimplifiedService<
  typeof exercises,
  Exercises,
  ExercisesCreate,
  ExercisesUpdate,
  ExercisesFilters
> {
  constructor() {
    super(
      exercises,
      ExercisesSelectSchema,
      ExercisesInsertSchema,
      ExercisesUpdateSchema,
      ExercisesFiltersSchema,
    );
  }
}

export const exercisesService = new ExercisesService();
