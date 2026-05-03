import { courses } from "@/lib/db/schema";
import {
  CoursesSelectSchema,
  CoursesInsertSchema,
  CoursesUpdateSchema,
  CoursesFiltersSchema,
  type Courses,
  type CoursesCreate,
  type CoursesUpdate,
  type CoursesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CoursesService extends SimplifiedService<
  typeof courses,
  Courses,
  CoursesCreate,
  CoursesUpdate,
  CoursesFilters
> {
  constructor() {
    super(
      courses,
      CoursesSelectSchema,
      CoursesInsertSchema,
      CoursesUpdateSchema,
      CoursesFiltersSchema,
    );
  }
}

export const coursesService = new CoursesService();
