import { courseOutcomes } from "@/lib/db/schema";
import {
  CourseOutcomesSelectSchema,
  CourseOutcomesInsertSchema,
  CourseOutcomesUpdateSchema,
  CourseOutcomesFiltersSchema,
  type CourseOutcomes,
  type CourseOutcomesCreate,
  type CourseOutcomesUpdate,
  type CourseOutcomesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseOutcomesService extends SimplifiedService<
  typeof courseOutcomes,
  CourseOutcomes,
  CourseOutcomesCreate,
  CourseOutcomesUpdate,
  CourseOutcomesFilters
> {
  constructor() {
    super(
      courseOutcomes,
      CourseOutcomesSelectSchema,
      CourseOutcomesInsertSchema,
      CourseOutcomesUpdateSchema,
      CourseOutcomesFiltersSchema,
    );
  }
}

export const courseOutcomesService = new CourseOutcomesService();
