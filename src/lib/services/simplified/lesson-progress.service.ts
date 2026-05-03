import { lessonProgress } from "@/lib/db/schema";
import {
  LessonProgressSelectSchema,
  LessonProgressInsertSchema,
  LessonProgressUpdateSchema,
  LessonProgressFiltersSchema,
  type LessonProgress,
  type LessonProgressCreate,
  type LessonProgressUpdate,
  type LessonProgressFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class LessonProgressService extends SimplifiedService<
  typeof lessonProgress,
  LessonProgress,
  LessonProgressCreate,
  LessonProgressUpdate,
  LessonProgressFilters
> {
  constructor() {
    super(
      lessonProgress,
      LessonProgressSelectSchema,
      LessonProgressInsertSchema,
      LessonProgressUpdateSchema,
      LessonProgressFiltersSchema,
    );
  }
}

export const lessonProgressService = new LessonProgressService();
