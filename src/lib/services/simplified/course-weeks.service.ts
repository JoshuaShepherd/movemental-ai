import { courseWeeks } from "@/lib/db/schema";
import {
  CourseWeeksSelectSchema,
  CourseWeeksInsertSchema,
  CourseWeeksUpdateSchema,
  CourseWeeksFiltersSchema,
  type CourseWeeks,
  type CourseWeeksCreate,
  type CourseWeeksUpdate,
  type CourseWeeksFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CourseWeeksService extends SimplifiedService<
  typeof courseWeeks,
  CourseWeeks,
  CourseWeeksCreate,
  CourseWeeksUpdate,
  CourseWeeksFilters
> {
  constructor() {
    super(
      courseWeeks,
      CourseWeeksSelectSchema,
      CourseWeeksInsertSchema,
      CourseWeeksUpdateSchema,
      CourseWeeksFiltersSchema,
    );
  }
}

export const courseWeeksService = new CourseWeeksService();
