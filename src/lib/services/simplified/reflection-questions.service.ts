import { reflectionQuestions } from "@/lib/db/schema";
import {
  ReflectionQuestionsSelectSchema,
  ReflectionQuestionsInsertSchema,
  ReflectionQuestionsUpdateSchema,
  ReflectionQuestionsFiltersSchema,
  type ReflectionQuestions,
  type ReflectionQuestionsCreate,
  type ReflectionQuestionsUpdate,
  type ReflectionQuestionsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class ReflectionQuestionsService extends SimplifiedService<
  typeof reflectionQuestions,
  ReflectionQuestions,
  ReflectionQuestionsCreate,
  ReflectionQuestionsUpdate,
  ReflectionQuestionsFilters
> {
  constructor() {
    super(
      reflectionQuestions,
      ReflectionQuestionsSelectSchema,
      ReflectionQuestionsInsertSchema,
      ReflectionQuestionsUpdateSchema,
      ReflectionQuestionsFiltersSchema,
    );
  }
}

export const reflectionQuestionsService = new ReflectionQuestionsService();
