import { courseLessons } from "@/lib/db/schema";
import {
  CourseLessonsSelectSchema,
  CourseLessonsInsertSchema,
  CourseLessonsUpdateSchema,
  CourseLessonsFiltersSchema,
  type CourseLessons,
  type CourseLessonsCreate,
  type CourseLessonsUpdate,
  type CourseLessonsFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseLessonsService extends SimplifiedService<
  typeof courseLessons,
  CourseLessons,
  CourseLessonsCreate,
  CourseLessonsUpdate,
  CourseLessonsFilters
> {
  constructor() {
    super(
      courseLessons,
      CourseLessonsSelectSchema,
      CourseLessonsInsertSchema,
      CourseLessonsUpdateSchema,
      CourseLessonsFiltersSchema,
    );
  }
}

export const courseLessonsService = new CourseLessonsService();
