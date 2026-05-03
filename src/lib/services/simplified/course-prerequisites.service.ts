import { coursePrerequisites } from "@/lib/db/schema";
import {
  CoursePrerequisitesSelectSchema,
  CoursePrerequisitesInsertSchema,
  CoursePrerequisitesUpdateSchema,
  CoursePrerequisitesFiltersSchema,
  type CoursePrerequisites,
  type CoursePrerequisitesCreate,
  type CoursePrerequisitesUpdate,
  type CoursePrerequisitesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class CoursePrerequisitesService extends SimplifiedService<
  typeof coursePrerequisites,
  CoursePrerequisites,
  CoursePrerequisitesCreate,
  CoursePrerequisitesUpdate,
  CoursePrerequisitesFilters
> {
  constructor() {
    super(
      coursePrerequisites,
      CoursePrerequisitesSelectSchema,
      CoursePrerequisitesInsertSchema,
      CoursePrerequisitesUpdateSchema,
      CoursePrerequisitesFiltersSchema,
    );
  }
}

export const coursePrerequisitesService = new CoursePrerequisitesService();
